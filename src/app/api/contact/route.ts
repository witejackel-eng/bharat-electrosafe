import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/* ────────────────────────────────────────────
   Sliding-window rate limiting (in-memory)
   ──────────────────────────────────────────── */

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 submissions per window per IP

// Store an array of timestamps per IP for sliding-window
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter out timestamps outside the sliding window
  const recentTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (recentTimestamps.length >= RATE_LIMIT_MAX) {
    // Still store for cleanup
    rateLimitMap.set(ip, recentTimestamps);
    return false;
  }

  // Add current timestamp
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return true;
}

// Clean up old entries periodically (remove IPs with no recent requests)
function cleanupRateLimit() {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
    if (recent.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, recent);
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

    // Content-type validation: must be application/json
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, message: 'Request must be application/json.' },
        { status: 415 }
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
    const data = result.data;

    // Log the enquiry (server-side only)
    console.log('[Contact Form] Successful submission:', {
      name: data.name,
      email: data.email,
      enquiryType: data.enquiryType,
      productInterest: data.productInterest || 'none',
      timestamp: new Date().toISOString(),
      ip,
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
