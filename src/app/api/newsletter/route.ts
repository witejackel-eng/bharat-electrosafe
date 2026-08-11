import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';
import { isAllowedOrigin, parseOrigin } from '@/lib/origin';

/**
 * Newsletter subscription API route.
 *
 * Accepts `{ email: string }`, validates the email server-side, rate-limits
 * per client IP, persists the subscription to SQLite via Prisma, and returns
 * a JSON envelope. Duplicates are treated as success (`alreadySubscribed: true`)
 * so legitimate repeat submissions remain a no-op rather than surfacing as an
 * error to the visitor.
 *
 * Security controls:
 *   - Strict JSON content-type enforcement
 *   - Small request body size limit (4 KB)
 *   - Exact-origin validation (no substring/startsWith)
 *   - Distributed rate limiting (Upstash Redis with in-memory fallback)
 *   - Server-side email validation (format + length)
 *   - Email normalised to lowercase before persistence
 *   - PII not logged — only length + redacted metadata
 *   - `Cache-Control: no-store` + `X-Robots-Tag: noindex, nofollow`
 */

export const runtime = 'nodejs';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const MAX_BODY_BYTES = 4 * 1024; // 4 KB — email payload is tiny
// Reuse the rate limiter from src/lib/rate-limit.ts. The default policy
// (5 requests / 10 minutes / IP) is deliberately conservative — newsletter
// signups are low-volume and a single submit should be the happy path.

// ---------------------------------------------------------------------------
// Email validation — RFC 5322 simplified, server-side authoritative
// ---------------------------------------------------------------------------

const EMAIL_MAX_LENGTH = 254; // RFC 5321 practical limit
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normaliseEmail(value: string): string {
  return value.trim().toLowerCase();
}

function isValidEmail(value: string): boolean {
  if (!value || value.length > EMAIL_MAX_LENGTH) return false;
  if (!EMAIL_REGEX.test(value)) return false;
  // Reject consecutive dots, leading/trailing dots in local part, and
  // common malformed patterns.
  const [local, domain] = value.split('@');
  if (!local || !domain) return false;
  if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
  if (domain.startsWith('.') || domain.endsWith('.') || domain.includes('..')) return false;
  if (domain.length < 3) return false; // need at least "x.y"
  return true;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return 'unknown';
}

function readOriginFromHeaders(req: Request): string | null {
  const origin = req.headers.get('origin');
  if (origin) return parseOrigin(origin);
  const referer = req.headers.get('referer');
  if (referer) return parseOrigin(referer);
  return null;
}

function apiHeaders(): HeadersInit {
  return {
    'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex, nofollow',
  };
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  // --- Content-type check (only application/json accepted) ---
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json(
      { success: false, error: 'Unsupported content type.' },
      { status: 415, headers: apiHeaders() },
    );
  }

  // --- Request body size limit ---
  const contentLength = req.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, error: 'Request too large.' },
      { status: 413, headers: apiHeaders() },
    );
  }

  // --- Origin check (exact comparison) ---
  const requestOrigin = readOriginFromHeaders(req);
  if (!isAllowedOrigin(requestOrigin)) {
    return NextResponse.json(
      {
        success: false,
        error:
          'This form can only be submitted from the official Bharat Electrosafe website.',
      },
      { status: 403, headers: apiHeaders() },
    );
  }

  // --- Rate limiting (Upstash Redis with in-memory fallback) ---
  const clientIp = getClientIp(req);
  const rateCheck = await checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          ...apiHeaders(),
          'Retry-After': String(Math.ceil(rateCheck.retryAfterMs / 1000)),
        },
      },
    );
  }

  // --- Body parse ---
  let payload: unknown;
  try {
    const rawBody = await req.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, error: 'Request too large.' },
        { status: 413, headers: apiHeaders() },
      );
    }
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400, headers: apiHeaders() },
    );
  }

  // --- Shape check + email validation ---
  if (typeof payload !== 'object' || payload === null) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400, headers: apiHeaders() },
    );
  }

  const emailRaw = (payload as { email?: unknown }).email;
  if (typeof emailRaw !== 'string' || emailRaw.length === 0) {
    return NextResponse.json(
      { success: false, error: 'Email is required.' },
      { status: 400, headers: apiHeaders() },
    );
  }

  const email = normaliseEmail(emailRaw);
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: 'Please enter a valid email address.' },
      { status: 400, headers: apiHeaders() },
    );
  }

  const userAgent = req.headers.get('user-agent')?.slice(0, 500) ?? null;

  // --- Persist subscription (handle duplicates gracefully) ---
  try {
    await db.newsletterSubscription.create({
      data: {
        email,
        ip: clientIp === 'unknown' ? null : clientIp.slice(0, 100),
        userAgent,
      },
    });

    // Redacted success log — no PII
    console.info('[newsletter] subscription created', {
      emailLength: email.length,
      domain: email.split('@')[1] ?? '',
    });

    return NextResponse.json(
      { success: true },
      { status: 200, headers: apiHeaders() },
    );
  } catch (err) {
    // Prisma unique-constraint violation → already subscribed
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return NextResponse.json(
        { success: true, alreadySubscribed: true },
        { status: 200, headers: apiHeaders() },
      );
    }

    // Log redacted error and return a generic 500
    console.error('[newsletter] persistence failure', {
      message: err instanceof Error ? err.message : 'unknown',
      code:
        err instanceof Prisma.PrismaClientKnownRequestError ? err.code : undefined,
      emailLength: email.length,
    });

    return NextResponse.json(
      { success: false, error: 'Could not subscribe right now. Please try again later.' },
      { status: 500, headers: apiHeaders() },
    );
  }
}

// ---------------------------------------------------------------------------
// GET — explicitly disallowed. Returns 405 with the same no-store/noindex
// headers so the endpoint is never cached or indexed.
// ---------------------------------------------------------------------------

export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed.' },
    {
      status: 405,
      headers: {
        ...apiHeaders(),
        Allow: 'POST',
      },
    },
  );
}
