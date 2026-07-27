import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

/* ────────────────────────────────────────────────────────────────
   Bharat Electrosafe — Contact Form API Route
   ──────────────────────────────────────────────────────────────── */

// ── Zod validation schema ──
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  company: z.string().max(200).optional(),
  email: z.string().email('Please provide a valid email address').max(200),
  phone: z.string().max(20).optional(),
  enquiryType: z.enum(['general', 'quotation']),
  product: z
    .enum([
      'electrical-insulating-mats',
      'coloured-strip-insulating-mats',
      'bi-color-insulating-mats',
      'auto-glow-reflective-band-insulating-mats',
      'bharat-membrane',
      'not-specified',
    ])
    .optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  // Conditional quotation fields
  productClass: z.enum(['A', 'B', 'C', 'not-applicable']).optional(),
  operatingVoltage: z.string().max(50).optional(),
  thickness: z.string().max(50).optional(),
  width: z.string().max(50).optional(),
  length: z.string().max(50).optional(),
  quantity: z.string().max(20).optional(),
  colourOrStrip: z.string().max(100).optional(),
  deliveryLocation: z.string().max(200).optional(),
  installationRequirement: z.string().max(200).optional(),
  // Honeypot — must be empty
  website: z.string().max(0, 'Honeypot field must be empty'),
  // Privacy consent — must be true
  privacyConsent: z.literal(true, {
    message: 'You must accept the privacy policy',
  }),
})

// ── In-memory rate limiter (max 5 submissions per IP per hour) ──
const rateLimiter = new Map<string, { count: number; firstAttempt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function isRateLimited(ip: string): boolean {
  const entry = rateLimiter.get(ip)
  if (!entry) return false

  const elapsed = Date.now() - entry.firstAttempt
  if (elapsed > RATE_LIMIT_WINDOW_MS) {
    // Window expired — reset
    rateLimiter.delete(ip)
    return false
  }

  return entry.count >= RATE_LIMIT_MAX
}

function recordRateLimitAttempt(ip: string): void {
  const entry = rateLimiter.get(ip)
  if (!entry || Date.now() - entry.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    rateLimiter.set(ip, { count: 1, firstAttempt: Date.now() })
  } else {
    entry.count += 1
  }
}

// ── In-memory submission log (for when email delivery is not configured) ──
interface ContactSubmission {
  id: string
  submittedAt: string
  name: string
  company?: string
  email: string
  phone?: string
  enquiryType: string
  product?: string
  message: string
  productClass?: string
  operatingVoltage?: string
  thickness?: string
  width?: string
  length?: string
  quantity?: string
  colourOrStrip?: string
  deliveryLocation?: string
  installationRequirement?: string
}

const submissionLog: ContactSubmission[] = []

// ── Payload size limit (10KB) ──
const MAX_PAYLOAD_SIZE = 10 * 1024

// ── Environment variables ──
const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || 'info@bharatelectrosafe.com'
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917617494968'

export async function POST(request: NextRequest) {
  try {
    // ── Payload size check ──
    const rawBody = await request.text()
    if (rawBody.length > MAX_PAYLOAD_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: 'Submission too large. Please shorten your message.',
          alternatives: {
            email: CONTACT_TO_EMAIL,
            phone: '+91 7617494968',
            whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
          },
        },
        { status: 413 }
      )
    }

    // ── Parse JSON ──
    let body: unknown
    try {
      body = JSON.parse(rawBody)
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request format.',
        },
        { status: 400 }
      )
    }

    // ── Zod validation ──
    const validated = contactSchema.safeParse(body)

    if (!validated.success) {
      const fieldErrors = validated.error.flatten().fieldErrors
      // Filter out honeypot errors — never reveal them
      const sanitizedErrors: Record<string, string[]> = {}
      for (const [key, value] of Object.entries(fieldErrors)) {
        if (key !== 'website') {
          sanitizedErrors[key] = value as string[]
        }
      }

      return NextResponse.json(
        {
          success: false,
          errors: sanitizedErrors,
          message: 'Please check the highlighted fields and try again.',
        },
        { status: 400 }
      )
    }

    // ── Honeypot check (extra safety — already validated by zod) ──
    if (validated.data.website !== '') {
      // Silently reject — return a fake "success" to bots
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you for your enquiry. We will respond shortly.',
        },
        { status: 200 }
      )
    }

    // ── IP rate limiting ──
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Too many submissions. Please wait an hour before trying again, or contact us directly.',
          alternatives: {
            email: CONTACT_TO_EMAIL,
            phone: '+91 7617494968',
            whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
          },
        },
        { status: 429 }
      )
    }

    recordRateLimitAttempt(ip)

    // ── Sanitize text fields (strip HTML) ──
    const sanitize = (str: string): string =>
      str
        .replace(/<[^>]*>/g, '') // strip HTML tags
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .trim()

    const sanitizedData = {
      name: sanitize(validated.data.name),
      company: validated.data.company ? sanitize(validated.data.company) : undefined,
      email: validated.data.email.trim(), // emails shouldn't be heavily sanitized
      phone: validated.data.phone?.trim(),
      enquiryType: validated.data.enquiryType,
      product: validated.data.product,
      message: sanitize(validated.data.message),
      productClass: validated.data.productClass,
      operatingVoltage: validated.data.operatingVoltage?.trim(),
      thickness: validated.data.thickness?.trim(),
      width: validated.data.width?.trim(),
      length: validated.data.length?.trim(),
      quantity: validated.data.quantity?.trim(),
      colourOrStrip: validated.data.colourOrStrip?.trim(),
      deliveryLocation: validated.data.deliveryLocation
        ? sanitize(validated.data.deliveryLocation)
        : undefined,
      installationRequirement: validated.data.installationRequirement
        ? sanitize(validated.data.installationRequirement)
        : undefined,
    }

    // ── Build submission record ──
    const submission: ContactSubmission = {
      id: `C-${Date.now().toString(36).toUpperCase()}`,
      submittedAt: new Date().toISOString(),
      ...sanitizedData,
    }

    submissionLog.push(submission)

    // ── Attempt email delivery via Resend (if configured) ──
    if (RESEND_API_KEY && CONTACT_FROM_EMAIL) {
      try {
        // Dynamic import to avoid bundling Resend in client
        const { Resend } = await import('resend')

        const resend = new Resend(RESEND_API_KEY)

        // Build email content
        const emailLines = [
          `Contact Enquiry — ${sanitizedData.enquiryType.toUpperCase()}`,
          '',
          `From: ${sanitizedData.name}${sanitizedData.company ? ` (${sanitizedData.company})` : ''}`,
          `Email: ${sanitizedData.email}`,
          sanitizedData.phone ? `Phone: ${sanitizedData.phone}` : '',
          sanitizedData.product ? `Product: ${sanitizedData.product}` : '',
          '',
          'Message:',
          sanitizedData.message,
        ]

        // Add quotation-specific fields if present
        if (sanitizedData.enquiryType === 'quotation') {
          emailLines.push('', '--- Quotation Details ---')
          if (sanitizedData.productClass) emailLines.push(`Class: ${sanitizedData.productClass}`)
          if (sanitizedData.operatingVoltage) emailLines.push(`Voltage: ${sanitizedData.operatingVoltage}`)
          if (sanitizedData.thickness) emailLines.push(`Thickness: ${sanitizedData.thickness}`)
          if (sanitizedData.width) emailLines.push(`Width: ${sanitizedData.width}`)
          if (sanitizedData.length) emailLines.push(`Length: ${sanitizedData.length}`)
          if (sanitizedData.quantity) emailLines.push(`Quantity: ${sanitizedData.quantity}`)
          if (sanitizedData.colourOrStrip) emailLines.push(`Colour/Strip: ${sanitizedData.colourOrStrip}`)
          if (sanitizedData.deliveryLocation) emailLines.push(`Delivery: ${sanitizedData.deliveryLocation}`)
          if (sanitizedData.installationRequirement) emailLines.push(`Installation: ${sanitizedData.installationRequirement}`)
        }

        await resend.emails.send({
          from: CONTACT_FROM_EMAIL,
          to: CONTACT_TO_EMAIL,
          subject: `Contact: ${sanitizedData.enquiryType} from ${sanitizedData.name}`,
          text: emailLines.filter(Boolean).join('\n'),
        })

        return NextResponse.json({
          success: true,
          message:
            'Thank you for your enquiry! We have received your message and will respond within 24 hours.',
          submissionId: submission.id,
        })
      } catch {
        // Email delivery failed — but we still stored the submission
        return NextResponse.json(
          {
            success: false,
            message:
              'Your submission was recorded, but email delivery encountered an issue. Please contact us directly for an immediate response.',
            submissionId: submission.id,
            alternatives: {
              email: CONTACT_TO_EMAIL,
              phone: '+91 7617494968',
              whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
            },
          },
          { status: 503 }
        )
      }
    }

    // ── Email delivery NOT configured ──
    // Do NOT return fake success — be honest about the situation
    return NextResponse.json(
      {
        success: false,
        message:
          'Your submission has been recorded, but direct email delivery is not yet configured on this site. For an immediate response, please contact us directly using the options below.',
        submissionId: submission.id,
        alternatives: {
          email: CONTACT_TO_EMAIL,
          phone: '+91 7617494968',
          whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
        },
      },
      { status: 503 }
    )
  } catch {
    // ── Catch-all — never expose internal details ──
    return NextResponse.json(
      {
        success: false,
        message:
          'Something went wrong. Please try again later, or contact us directly.',
        alternatives: {
          email: 'info@bharatelectrosafe.com',
          phone: '+91 7617494968',
          whatsapp: `https://wa.me/917617494968`,
        },
      },
      { status: 500 }
    )
  }
}

// ── GET endpoint for admin inspection (would be auth-gated in production) ──
export async function GET() {
  return NextResponse.json({
    count: submissionLog.length,
    submissions: submissionLog.map((s) => ({
      id: s.id,
      submittedAt: s.submittedAt,
      name: s.name,
      email: s.email,
      enquiryType: s.enquiryType,
    })),
  })
}
