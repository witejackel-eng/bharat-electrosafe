/**
 * Shared Contact Form Contract — Bharat Electrosafe
 *
 * ONE authoritative schema for the contact form.
 * Both the client (React Hook Form + Zod resolver) and the server
 * (API route POST handler) derive their validation from this module.
 *
 * Field names, types, required/optional state, enquiry enum,
 * product identifiers, max lengths, anti-spam fields and
 * Turnstile token are all defined here.
 *
 * DO NOT duplicate these definitions in component or route files.
 */

import { z } from 'zod';

// ---------------------------------------------------------------------------
// Enquiry type enum — the canonical list
// ---------------------------------------------------------------------------

/**
 * Enquiry type values used in both the UI select and the API schema.
 *
 * Mapping rationale:
 *   'general'        → General enquiry
 *   'product-info'   → Product information request
 *   'quote'          → Request a quotation
 *   'technical'      → Technical support / technical guidance
 *   'datasheet'      → Product datasheet / specifications request
 *   'partnership'    → Partnership / business development
 *
 * The previous backend had 'product' (not 'product-info') and no
 * 'datasheet'. The previous frontend had 'product-info' and 'datasheet'
 * but no 'partnership'. This unified set covers all current CTA flows.
 */
export const ENQUIRY_TYPES = [
  'general',
  'product-info',
  'quote',
  'technical',
  'datasheet',
  'partnership',
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

/** Label map for UI rendering */
export const ENQUIRY_TYPE_LABELS: Record<EnquiryType, string> = {
  general: 'General Enquiry',
  'product-info': 'Product Information',
  quote: 'Request Quote',
  technical: 'Technical Support',
  datasheet: 'Product Datasheet Request',
  partnership: 'Partnership / Business Development',
};

/** Options array for Select components */
export const enquiryTypeOptions = ENQUIRY_TYPES.map((value) => ({
  value,
  label: ENQUIRY_TYPE_LABELS[value],
}));

// ---------------------------------------------------------------------------
// Product interest identifiers — derived from product-navigation data
// ---------------------------------------------------------------------------

/**
 * Product interest values for the contact form select.
 *
 * These map to the product slugs/routes used across the site.
 * When a CTA includes `?product=<slug>`, the value must exist here.
 */
export const PRODUCT_INTERESTS = [
  { value: 'eim', label: 'Electrical Insulating Mats' },
  { value: 'csim', label: 'Coloured Strip Insulating Mats' },
  { value: 'bcim', label: 'Bi-Color Insulating Mats' },
  { value: 'agrim', label: 'Auto-Glow / Reflective Band Insulating Mats' },
  { value: 'iec-hv-insulating-mats', label: 'IEC 61111 — HV Insulating Mats' },
  { value: 'iec-auto-glow', label: 'IEC 61111 — Auto Glow Mats' },
  { value: 'iec-bi-colour', label: 'IEC 61111 — Bi-Colour Mats' },
  { value: 'bm', label: 'BharatMembrane' },
  { value: 'bhs', label: 'Bharat Hydro Seal' },
  { value: 'pvc-flooring-solutions', label: 'PVC Flooring Solutions' },
  { value: 'rubber-sheet', label: 'Rubber Sheet' },
  { value: 'rubber-hose-pipe', label: 'Rubber Hose Pipe' },
  { value: 'esd-mat', label: 'ESD Mat' },
  { value: 'conveyor-belt', label: 'Conveyor Belt' },
] as const;

export type ProductInterestValue = (typeof PRODUCT_INTERESTS)[number]['value'];

/** All valid product interest values for Zod enum validation */
export const productInterestValues = PRODUCT_INTERESTS.map((p) => p.value);

// ---------------------------------------------------------------------------
// CTA type → enquiry type mapping
// ---------------------------------------------------------------------------

/**
 * Maps CTA `type` query parameter values to enquiry type enum values.
 *
 * Supports both current and legacy parameter formats:
 *   type=quote               → 'quote'
 *   type=technical-guidance  → 'technical'
 *   type=datasheet           → 'datasheet'
 *   type=product-info        → 'product-info'
 *   type=general             → 'general'
 *   type=partnership         → 'partnership'
 *
 * Legacy subject-based prefilling:
 *   subject=Product Datasheet Request → 'datasheet'
 */
export function ctaTypeToEnquiryType(
  type: string | null,
  subject?: string | null,
): EnquiryType | undefined {
  if (type) {
    const normalized = type.toLowerCase().trim();
    switch (normalized) {
      case 'quote':
        return 'quote';
      case 'technical-guidance':
      case 'technical':
      case 'support':
        return 'technical';
      case 'datasheet':
        return 'datasheet';
      case 'product-info':
      case 'product':
        return 'product-info';
      case 'general':
        return 'general';
      case 'partnership':
        return 'partnership';
      default:
        return undefined;
    }
  }

  // Legacy subject-based mapping
  if (subject) {
    const normalized = subject.toLowerCase().trim();
    if (normalized.includes('datasheet')) return 'datasheet';
    if (normalized.includes('quote')) return 'quote';
    if (normalized.includes('technical')) return 'technical';
  }

  return undefined;
}

/**
 * Maps a CTA `product` query parameter to a product interest value.
 *
 * Tries exact match first, then label match (case-insensitive),
 * then partial slug match.
 */
export function ctaProductToInterest(
  product: string | null,
): ProductInterestValue | undefined {
  if (!product) return undefined;

  const normalized = product.toLowerCase().trim();

  // Exact value match
  const exact = PRODUCT_INTERESTS.find((p) => p.value === normalized);
  if (exact) return exact.value;

  // Label match (case-insensitive)
  const byLabel = PRODUCT_INTERESTS.find(
    (p) => p.label.toLowerCase() === normalized,
  );
  if (byLabel) return byLabel.value;

  // Partial slug match (e.g. "iec-hv" matches "iec-hv-insulating-mats")
  const bySlug = PRODUCT_INTERESTS.find((p) => p.value.includes(normalized) || normalized.includes(p.value));
  if (bySlug) return bySlug.value;

  return undefined;
}

// ---------------------------------------------------------------------------
// API field names — the canonical wire format
// ---------------------------------------------------------------------------

/**
 * API field names that the server expects.
 * The frontend form uses user-friendly names internally but maps
 * to these names when submitting to the API.
 */
export const API_FIELDS = {
  name: 'name',
  companyName: 'companyName',
  email: 'email',
  phone: 'phone',
  enquiryType: 'enquiryType',
  product: 'product',
  message: 'message',
  voltage: 'voltage',
  dimensions: 'dimensions',
  quantity: 'quantity',
  deliveryLocation: 'deliveryLocation',
  /** Honeypot field — must be empty for legitimate submissions */
  website: 'website',
  /** Form-open timestamp for timing anti-spam */
  formOpenAt: '_formOpenAt',
  /** Turnstile verification token */
  turnstileToken: 'turnstileToken',
} as const;

// ---------------------------------------------------------------------------
// Server-side Zod schema (strict)
// ---------------------------------------------------------------------------

export const contactServerSchema = z.strictObject({
  name: z.string().trim().min(2, 'Name is required').max(200),
  companyName: z.string().trim().max(200).optional().default(''),
  email: z
    .string()
    .trim()
    .email('A valid email is required')
    .max(200)
    .transform((v) => v.toLowerCase()),
  phone: z
    .string()
    .trim()
    .max(60)
    .regex(/^[+\d\s\-().]{0,60}$/, 'Please enter a valid phone number')
    .optional()
    .default(''),
  enquiryType: z.enum(ENQUIRY_TYPES),
  product: z.string().trim().max(200).optional().default(''),
  message: z
    .string()
    .trim()
    .min(10, 'Please provide a message of at least 10 characters')
    .max(5000),
  voltage: z.string().trim().max(100).optional().default(''),
  dimensions: z.string().trim().max(300).optional().default(''),
  quantity: z.string().trim().max(100).optional().default(''),
  deliveryLocation: z.string().trim().max(300).optional().default(''),
  // Anti-spam: honeypot field — must be empty
  website: z.string().max(0).optional().default(''),
  // Anti-spam: timing — form open timestamp (ms epoch)
  _formOpenAt: z.string().optional(),
  // Turnstile: client-side verification token
  turnstileToken: z.string().trim().max(2048).optional(),
});

export type ContactServerInput = z.infer<typeof contactServerSchema>;

// ---------------------------------------------------------------------------
// Client-side Zod schema (for React Hook Form)
// ---------------------------------------------------------------------------

/**
 * Client-side form field names — these are the names used in the
 * React Hook Form register() calls and form state.
 *
 * They are more user-friendly than the API field names.
 * The onSubmit handler maps them to API field names before POST.
 */
export const contactClientSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(200),
  company: z.string().trim().max(200).optional(),
  email: z.string().trim().email('Please enter a valid email').max(200),
  phone: z
    .string()
    .trim()
    .max(60)
    .regex(/^[+\d\s\-().]{0,60}$/, 'Please enter a valid phone number')
    .optional(),
  enquiryType: z.enum(ENQUIRY_TYPES, {
    message: 'Please select an enquiry type',
  }),
  productInterest: z.string().trim().max(200).optional(),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000),
  operatingVoltage: z.string().trim().max(100).optional(),
  requiredDimensions: z.string().trim().max(300).optional(),
  quantity: z.string().trim().max(100).optional(),
  deliveryLocation: z.string().trim().max(300).optional(),
  /** Honeypot — hidden from users, must stay empty */
  website: z.string().max(0).optional(),
  /** Form-open timestamp for server timing anti-spam */
  _formOpenAt: z.string().optional(),
  /** Turnstile token (if configured) */
  turnstileToken: z.string().trim().max(2048).optional(),
});

export type ContactFormData = z.infer<typeof contactClientSchema>;

// ---------------------------------------------------------------------------
// Client → API field mapping
// ---------------------------------------------------------------------------

/**
 * Maps client-side form data to API-compatible payload.
 *
 * This is the ONLY place where field name mapping happens.
 * After this transform, the payload matches contactServerSchema exactly.
 */
export function mapFormToApi(
  data: ContactFormData,
): Record<string, unknown> {
  return {
    name: data.name,
    companyName: data.company ?? '',
    email: data.email,
    phone: data.phone ?? '',
    enquiryType: data.enquiryType,
    product: data.productInterest ?? '',
    message: data.message,
    voltage: data.operatingVoltage ?? '',
    dimensions: data.requiredDimensions ?? '',
    quantity: data.quantity ?? '',
    deliveryLocation: data.deliveryLocation ?? '',
    website: data.website ?? '',
    _formOpenAt: data._formOpenAt ?? '',
    turnstileToken: data.turnstileToken ?? '',
  };
}

// ---------------------------------------------------------------------------
// URL prefill helper
// ---------------------------------------------------------------------------

/**
 * Reads CTA query parameters from the current URL and returns
 * form prefill values.
 *
 * Supports:
 *   ?type=quote&product=iec-hv-insulating-mats
 *   ?type=technical-guidance&product=pvc-flooring-solutions
 *   ?type=datasheet&product=eim
 *   ?subject=Product Datasheet Request  (legacy)
 *   ?message=...                        (legacy)
 */
export function readPrefillFromUrl(): {
  enquiryType: EnquiryType | undefined;
  message: string;
  productInterest: ProductInterestValue | undefined;
} {
  try {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const subject = params.get('subject');
    const product = params.get('product');
    const message = params.get('message');

    const enquiryType = ctaTypeToEnquiryType(type, subject);
    const productInterest = ctaProductToInterest(product);

    return {
      enquiryType,
      message: message ?? '',
      productInterest,
    };
  } catch {
    return { enquiryType: undefined, message: '', productInterest: undefined };
  }
}
