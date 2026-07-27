import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { productSlugs } from '@/data/products'
import { company, contactWhatsApp } from '@/data/company'

/* ────────────────────────────────────────────────────────────────
   Bharat Electrosafe — Contact / Enquiry API

   Delivery is via Resend's REST API called with `fetch`. That is a
   deliberate choice over the SDK: this route makes exactly one HTTP
   call, so a dependency would add supply-chain surface and version
   drift for no benefit.

   The route never reports success for an enquiry it did not deliver.
   If delivery is not configured or the provider rejects the send, the
   caller gets a non-2xx status and the direct contact routes instead.
   ──────────────────────────────────────────────────────────────── */

export const runtime = 'nodejs'

/* ── Limits ── */
const MAX_PAYLOAD_BYTES = 16 * 1024
/** Humans do not complete this form in under 3s; bots routinely do. */
const MIN_FILL_MS = 3_000
/** Older than this and the timestamp is stale or forged — re-render required. */
const MAX_FORM_AGE_MS = 12 * 60 * 60 * 1000
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000

/* ── Environment ── */
const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || company.email
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

/** Direct routes offered whenever the form cannot take the enquiry. */
const alternatives = {
  email: CONTACT_TO_EMAIL,
  phone: company.phone,
  whatsapp: contactWhatsApp,
}

/* ── Validation ────────────────────────────────────────────────── */

/** Rejects CR/LF so a value can never inject an extra email header. */
const singleLine = (max: number) =>
  z
    .string()
    .max(max)
    .refine((v) => !/[\r\n]/.test(v), 'Line breaks are not allowed in this field')

const contactSchema = z.object({
  name: singleLine(100).min(2, 'Name must be at least 2 characters'),
  company: singleLine(200).optional().default(''),
  email: singleLine(200).email('Please provide a valid email address'),
  phone: singleLine(32).optional().default(''),
  enquiryType: z.enum(['general', 'quotation'], {
    message: 'Select an enquiry type',
  }),
  product: z.enum([...productSlugs, 'not-specified'] as [string, ...string[]]).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),

  /* Quotation-only fields. */
  productClass: z.enum(['A', 'B', 'C', 'not-applicable']).optional(),
  operatingVoltage: singleLine(50).optional().default(''),
  thickness: singleLine(50).optional().default(''),
  width: singleLine(50).optional().default(''),
  length: singleLine(50).optional().default(''),
  quantity: singleLine(32).optional().default(''),
  requiredColourOrStrip: singleLine(100).optional().default(''),
  deliveryLocation: singleLine(200).optional().default(''),
  installationRequirement: singleLine(200).optional().default(''),

  privacyConsent: z.literal(true, { message: 'You must accept the privacy notice' }),

  /* Anti-bot. Optional so a missing field can never block a real person —
     the previous revision made this required and silently 400'd every
     legitimate submission. */
  website: z.string().optional().default(''),
  formLoadedAt: z.number().int().positive().optional(),
})

type ContactInput = z.infer<typeof contactSchema>

/* ── Rate limiting ─────────────────────────────────────────────── */

const memoryBuckets = new Map<string, { count: number; firstAttempt: number }>()

/**
 * Best-effort in-process limiter. On serverless this is per-instance, so it
 * throttles a single attacker imperfectly. Set the Upstash variables for a
 * limit that actually holds across instances.
 */
function memoryRateLimited(ip: string): boolean {
  const entry = memoryBuckets.get(ip)
  const now = Date.now()
  if (!entry || now - entry.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    memoryBuckets.set(ip, { count: 1, firstAttempt: now })
    return false
  }
  entry.count += 1
  return entry.count > RATE_LIMIT_MAX
}

/** Distributed counter via Upstash REST. Fails open — never blocks a real enquiry. */
async function upstashRateLimited(ip: string): Promise<boolean | null> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null
  const key = `bes:contact:${ip}`
  try {
    const res = await fetch(`${UPSTASH_URL}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, String(Math.floor(RATE_LIMIT_WINDOW_MS / 1000)), 'NX'],
      ]),
      cache: 'no-store',
    })
    if (!res.ok) return null
    const parsed = (await res.json()) as Array<{ result?: number }>
    const count = parsed?.[0]?.result
    return typeof count === 'number' ? count > RATE_LIMIT_MAX : null
  } catch {
    return null
  }
}

async function isRateLimited(ip: string): Promise<boolean> {
  const distributed = await upstashRateLimited(ip)
  if (distributed !== null) return distributed
  return memoryRateLimited(ip)
}

/* ── Email rendering ───────────────────────────────────────────── */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Field order is the order the recipient wants to read them in. */
function enquiryFields(data: ContactInput): Array<[string, string]> {
  const rows: Array<[string, string]> = [
    ['Name', data.name],
    ['Company', data.company],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Enquiry type', data.enquiryType === 'quotation' ? 'Quotation' : 'General enquiry'],
    ['Product', data.product && data.product !== 'not-specified' ? data.product : ''],
    ['Class', data.productClass && data.productClass !== 'not-applicable' ? data.productClass : ''],
    ['Operating voltage', data.operatingVoltage],
    ['Thickness', data.thickness],
    ['Width', data.width],
    ['Length', data.length],
    ['Quantity', data.quantity],
    ['Colour / strip', data.requiredColourOrStrip],
    ['Delivery location', data.deliveryLocation],
    ['Installation', data.installationRequirement],
  ]
  return rows.filter(([, value]) => value.trim().length > 0)
}

function renderText(data: ContactInput, reference: string): string {
  const rows = enquiryFields(data)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
  return `New website enquiry (${reference})\n\n${rows}\n\nMessage:\n${data.message}\n`
}

function renderHtml(data: ContactInput, reference: string): string {
  const rows = enquiryFields(data)
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 16px 6px 0;color:#4b5563;font-weight:600;white-space:nowrap;vertical-align:top">${escapeHtml(
          label
        )}</th><td style="padding:6px 0;color:#111827">${escapeHtml(value)}</td></tr>`
    )
    .join('')

  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f9fafb;font-family:system-ui,-apple-system,'Segoe UI',sans-serif">
<div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
  <div style="background:#facc15;padding:16px 24px">
    <h1 style="margin:0;font-size:16px;color:#111827">New website enquiry</h1>
    <p style="margin:4px 0 0;font-size:12px;color:#3f3f46">Reference ${escapeHtml(reference)}</p>
  </div>
  <div style="padding:24px">
    <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
    <h2 style="margin:24px 0 8px;font-size:14px;color:#111827">Message</h2>
    <p style="margin:0;font-size:14px;line-height:1.6;color:#111827;white-space:pre-wrap">${escapeHtml(
      data.message
    )}</p>
  </div>
</div>
</body></html>`
}

/* ── Handler ───────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  try {
    /* Reject anything that is not a JSON form post. */
    const contentType = request.headers.get('content-type') ?? ''
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json(
        { success: false, message: 'Unsupported content type.' },
        { status: 415 }
      )
    }

    /* Same-origin only. A browser cannot forge these headers cross-site. */
    const origin = request.headers.get('origin')
    if (origin) {
      let originHost: string
      try {
        originHost = new URL(origin).host
      } catch {
        return NextResponse.json({ success: false, message: 'Invalid origin.' }, { status: 403 })
      }
      if (originHost !== request.headers.get('host')) {
        return NextResponse.json({ success: false, message: 'Invalid origin.' }, { status: 403 })
      }
    }

    const rawBody = await request.text()
    if (rawBody.length > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { success: false, message: 'Submission too large. Please shorten your message.', alternatives },
        { status: 413 }
      )
    }

    let parsedJson: unknown
    try {
      parsedJson = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid request format.' }, { status: 400 })
    }

    const validated = contactSchema.safeParse(parsedJson)
    if (!validated.success) {
      /* Surface only real field errors. The honeypot is not a field the user
         can see, so it must never appear here — and must never be the sole
         reason a submission is rejected with an empty error map. */
      const fieldErrors = validated.error.flatten().fieldErrors
      const errors: Record<string, string[]> = {}
      for (const [key, value] of Object.entries(fieldErrors)) {
        if (key !== 'website' && key !== 'formLoadedAt' && value?.length) {
          errors[key] = value
        }
      }
      return NextResponse.json(
        { success: false, errors, message: 'Please check the highlighted fields and try again.' },
        { status: 400 }
      )
    }

    const data = validated.data

    /* Bot signals. Both respond 200 with the ordinary success shape so a bot
       learns nothing, but nothing is sent and nothing is stored. */
    const tooFast =
      typeof data.formLoadedAt === 'number' &&
      (() => {
        const age = Date.now() - data.formLoadedAt!
        return age < MIN_FILL_MS || age > MAX_FORM_AGE_MS
      })()

    if (data.website.trim() !== '' || tooFast) {
      return NextResponse.json({ success: true, message: 'Thank you for your enquiry.' })
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    if (await isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many submissions from this connection. Please contact us directly.',
          alternatives,
        },
        { status: 429 }
      )
    }

    const reference = `BES-${Date.now().toString(36).toUpperCase()}`

    /* No delivery configured — say so. Never claim an enquiry was received
       when it was not, and never retain it server-side as a consolation. */
    if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Our enquiry form is temporarily unavailable. Please reach us directly using the details below and we will respond right away.',
          alternatives,
        },
        { status: 503 }
      )
    }

    const subject =
      data.enquiryType === 'quotation'
        ? `Quotation request — ${data.name}${data.company ? ` (${data.company})` : ''}`
        : `Website enquiry — ${data.name}${data.company ? ` (${data.company})` : ''}`

    const send = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: data.email,
        subject,
        text: renderText(data, reference),
        html: renderHtml(data, reference),
      }),
      cache: 'no-store',
    })

    if (!send.ok) {
      /* Log the provider status only. The enquiry body is the customer's
         data and does not belong in platform logs. */
      console.error(`[contact] delivery failed ref=${reference} status=${send.status}`)
      return NextResponse.json(
        {
          success: false,
          message:
            'We could not deliver your enquiry just now. Please contact us directly using the details below.',
          alternatives,
        },
        { status: 502 }
      )
    }

    console.log(`[contact] delivered ref=${reference}`)

    return NextResponse.json({
      success: true,
      message: 'Thank you for your enquiry. Our team will respond as soon as possible.',
      reference,
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please contact us directly using the details below.',
        alternatives,
      },
      { status: 500 }
    )
  }
}
