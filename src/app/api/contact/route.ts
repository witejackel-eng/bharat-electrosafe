import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { company } from '@/data/company';
import { isAllowedOrigin, parseOrigin } from '@/lib/origin';

/**
 * Contact form API route.
 *
 * Corrective-engineering requirements implemented here:
 *   - Section 15: HTML-escape every user-controlled value in the HTML body.
 *   - Section 16: Exact origin validation (no startsWith).
 *   - Section 17: Honest "delivered" message + 503 fallback with real contacts.
 *   - Section 18: Build without Resend; 503 when RESEND_API_KEY is missing.
 */

export const runtime = 'nodejs';

// ---------------------------------------------------------------------------
// 1. HTML escaping (section 15)
// ---------------------------------------------------------------------------

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// ---------------------------------------------------------------------------
// 2. Zod schema for the contact form
// ---------------------------------------------------------------------------

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  companyName: z.string().max(200).optional().or(z.literal('')),
  email: z.string().min(1, 'Email is required').email('A valid email is required'),
  phone: z.string().min(1, 'Phone is required').max(60),
  enquiryType: z.string().min(1, 'Enquiry type is required').max(100),
  product: z.string().max(200).optional().or(z.literal('')),
  message: z.string().min(1, 'Message is required').max(5000),
  voltage: z.string().max(100).optional().or(z.literal('')),
  dimensions: z.string().max(300).optional().or(z.literal('')),
  quantity: z.string().max(100).optional().or(z.literal('')),
  deliveryLocation: z.string().max(300).optional().or(z.literal('')),
});

type ContactInput = z.infer<typeof contactSchema>;

// ---------------------------------------------------------------------------
// 3. Email body builders
// ---------------------------------------------------------------------------

function buildPlainTextEmail(
  input: ContactInput,
  meta: { sourcePage: string; userAgent: string },
): string {
  // Plain-text version: do NOT escape (section 15 — escaping is HTML only).
  const lines: Array<string | null> = [
    `New enquiry for ${company.name}`,
    '',
    `Name: ${input.name}`,
    input.companyName ? `Company: ${input.companyName}` : null,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Enquiry type: ${input.enquiryType}`,
    input.product ? `Product: ${input.product}` : null,
    input.voltage ? `Voltage / class: ${input.voltage}` : null,
    input.dimensions ? `Dimensions: ${input.dimensions}` : null,
    input.quantity ? `Quantity: ${input.quantity}` : null,
    input.deliveryLocation ? `Delivery location: ${input.deliveryLocation}` : null,
    '',
    'Message:',
    input.message,
    '',
    '---- Diagnostics ----',
    `Source page: ${meta.sourcePage || '(unknown)'}`,
    `User agent: ${meta.userAgent || '(unknown)'}`,
  ];
  return lines.filter((line): line is string => line !== null).join('\n');
}

function buildHtmlEmail(
  input: ContactInput,
  meta: { sourcePage: string; userAgent: string },
): string {
  // Every user-controlled value is escaped before being placed in HTML.
  const rows: Array<[string, string]> = [
    ['Name', escapeHtml(input.name)],
    ...(input.companyName
      ? ([['Company', escapeHtml(input.companyName)]] as Array<[string, string]>)
      : []),
    ['Email', escapeHtml(input.email)],
    ['Phone', escapeHtml(input.phone)],
    ['Enquiry type', escapeHtml(input.enquiryType)],
    ...(input.product
      ? ([['Product', escapeHtml(input.product)]] as Array<[string, string]>)
      : []),
    ...(input.voltage
      ? ([['Voltage / class', escapeHtml(input.voltage)]] as Array<[string, string]>)
      : []),
    ...(input.dimensions
      ? ([['Dimensions', escapeHtml(input.dimensions)]] as Array<[string, string]>)
      : []),
    ...(input.quantity
      ? ([['Quantity', escapeHtml(input.quantity)]] as Array<[string, string]>)
      : []),
    ...(input.deliveryLocation
      ? (
        [['Delivery location', escapeHtml(input.deliveryLocation)]] as Array<[string, string]>
      )
      : []),
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#0f172a;background:#f1f5f9;border:1px solid #e2e8f0;width:180px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 12px;color:#1e293b;border:1px solid #e2e8f0;vertical-align:top;">${value}</td></tr>`,
    )
    .join('');

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:24px 0;">
      <tr><td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
          <tr><td style="padding:18px 24px;background:#0f172a;color:#ffffff;">
            <h1 style="margin:0;font-size:18px;font-weight:700;">New enquiry for ${escapeHtml(company.name)}</h1>
          </td></tr>
          <tr><td style="padding:18px 24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">${rowsHtml}</table>
          </td></tr>
          <tr><td style="padding:0 24px 6px 24px;">
            <h2 style="margin:0 0 6px 0;font-size:14px;color:#0f172a;">Message</h2>
            <p style="margin:0;padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;white-space:pre-wrap;color:#1e293b;font-size:14px;line-height:1.5;">${escapeHtml(input.message)}</p>
          </td></tr>
          <tr><td style="padding:18px 24px;">
            <h2 style="margin:0 0 6px 0;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Diagnostics</h2>
            <p style="margin:0;font-size:12px;color:#475569;line-height:1.6;">
              Source page: ${escapeHtml(meta.sourcePage || '(unknown)')}<br/>
              User agent: ${escapeHtml(meta.userAgent || '(unknown)')}
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

// ---------------------------------------------------------------------------
// 4. Origin validation (section 16) — exact comparison, no startsWith
// ---------------------------------------------------------------------------

function readOriginFromHeaders(req: Request): string | null {
  // Origin header is preferred; fall back to Referer for browsers that omit it.
  const origin = req.headers.get('origin');
  if (origin) return parseOrigin(origin);

  const referer = req.headers.get('referer');
  if (referer) return parseOrigin(referer);

  return null;
}

// ---------------------------------------------------------------------------
// 5. POST handler
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  // --- Origin check ------------------------------------------------------
  const requestOrigin = readOriginFromHeaders(req);
  if (!isAllowedOrigin(requestOrigin)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'This form can only be submitted from the official Bharat Electrosafe website.',
      },
      { status: 403 },
    );
  }

  // --- Body parse + zod validation --------------------------------------
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Invalid request body. Please submit the form again.' },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    const message = firstError
      ? `${firstError.path.length ? firstError.path.join('.') + ': ' : ''}${firstError.message}`
      : 'Please check the form fields and try again.';
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }

  const input = parsed.data;

  // --- Resend configuration (section 18) ---------------------------------
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Build must succeed without Resend; fail honestly at runtime.
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not deliver your message right now because email delivery is not configured. Please reach us directly using the contact details below.',
        fallback: {
          phone: company.phonePrimary,
          phoneTel: company.phonePrimaryTel,
          email: company.email,
          whatsapp: company.whatsapp.href,
          whatsappLabel: company.whatsapp.label,
          address: company.address.full,
        },
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  const sourcePage = req.headers.get('referer') || '';
  const userAgent = req.headers.get('user-agent') || '';
  const meta = { sourcePage, userAgent };

  const plainText = buildPlainTextEmail(input, meta);
  const html = buildHtmlEmail(input, meta);

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ||
    `Bharat Electrosafe Website <onboarding@resend.dev>`;
  const toEmail = process.env.CONTACT_TO_EMAIL || company.email;

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: input.email,
      subject: `New enquiry — ${input.enquiryType} — ${company.name}`,
      text: plainText,
      html,
    });

    if (error) {
      // Redacted logging only — no full PII (section 17).
      console.error('[contact] Resend delivery error', {
        message: error.message,
        nameLength: input.name.length,
        enquiryType: input.enquiryType,
      });

      return NextResponse.json(
        {
          ok: false,
          message:
            'We could not deliver your message right now. Please reach us directly using the contact details below.',
          fallback: {
            phone: company.phonePrimary,
            phoneTel: company.phonePrimaryTel,
            email: company.email,
            whatsapp: company.whatsapp.href,
            whatsappLabel: company.whatsapp.label,
            address: company.address.full,
          },
        },
        { status: 503 },
      );
    }

    // Redacted success log (section 17 — no full PII).
    console.info('[contact] enquiry delivered', {
      nameLength: input.name.length,
      enquiryType: input.enquiryType,
      hasCompany: Boolean(input.companyName),
    });

    // Section 17: honest "delivered" message — no false 24-hour promise.
    return NextResponse.json(
      {
        ok: true,
        message:
          'Thank you for your enquiry. Your message has been delivered to Bharat Electrosafe.',
      },
      { status: 200 },
    );
  } catch (err) {
    console.error('[contact] Unexpected delivery failure', {
      message: err instanceof Error ? err.message : 'unknown',
      nameLength: input.name.length,
      enquiryType: input.enquiryType,
    });

    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not deliver your message right now. Please reach us directly using the contact details below.',
        fallback: {
          phone: company.phonePrimary,
          phoneTel: company.phonePrimaryTel,
          email: company.email,
          whatsapp: company.whatsapp.href,
          whatsappLabel: company.whatsapp.label,
          address: company.address.full,
        },
      },
      { status: 503 },
    );
  }
}
