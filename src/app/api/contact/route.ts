import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/* ────────────────────────────────────────────
   Rate limiting (simple in-memory counter)
   ──────────────────────────────────────────── */

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 submissions per window per IP

const rateLimitMap = new Map<string, { count: number; startTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.startTime > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

// Clean up old entries periodically
function cleanupRateLimit() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now - entry.startTime > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(ip);
    }
  }
}

/* ────────────────────────────────────────────
   Zod validation schema
   ──────────────────────────────────────────── */

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  enquiryType: z.enum(['general', 'product-info', 'quote', 'support']),
  productInterest: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  operatingVoltage: z.string().optional(),
  requiredDimensions: z.string().optional(),
  quantity: z.string().optional(),
  deliveryLocation: z.string().optional(),
  _honeypot: z.string().max(0, 'Bot detected').optional(),
});

/* ────────────────────────────────────────────
   POST handler
   ──────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  try {
    // Cleanup old rate limit entries
    cleanupRateLimit();

    // Get client IP (use X-Forwarded-For or fallback)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    // Rate limit check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Honeypot check — if filled, silently reject
    if (body._honeypot && body._honeypot.length > 0) {
      // Return a fake success so bots don't know they were blocked
      return NextResponse.json({ success: true, message: 'Enquiry received.' });
    }

    // Validate with zod
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Please check your form inputs and try again.' },
        { status: 400 }
      );
    }

    // In production, you would save to database or send email here
    // For now, just return success
    const data = result.data;

    // Log the enquiry (server-side only)
    console.log('[Contact Form] Enquiry received:', {
      name: data.name,
      email: data.email,
      enquiryType: data.enquiryType,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your enquiry. Our team will respond within 24 business hours.',
    });

  } catch {
    // Safe error — never expose internal details
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
