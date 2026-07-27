/**
 * Central company data for Bharat Electrosafe.
 *
 * All contact literals live here. Do not duplicate phone numbers, emails,
 * addresses or WhatsApp links in component files — import from this module.
 */

export const company = {
  name: 'Bharat Electrosafe',
  legalName: 'Bharat Electrosafe',
  tagline: 'Electrical Safety. Engineered Right.',
  description:
    'Manufacturer of electrical insulating mats and engineered PVC membranes for industrial, civil and environmental safety applications in India and overseas.',

  // Contact details — single source of truth
  phonePrimary: '+91 7617494968',
  phonePrimaryTel: '+917617494968',
  phoneSecondary: '+91 9667171444',
  phoneSecondaryTel: '+919667171444',
  email: 'info@bharatelectrosafe.com',
  whatsapp: {
    href: 'https://wa.me/917617494968',
    label: '+91 76174 94968',
  },

  address: {
    line1: '704, 7th Floor, I-thum, Tower A',
    line2: 'Plot No. A-40, Sector-62',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201309',
    country: 'India',
    full: '704, 7th Floor, I-thum, Tower A, Plot No. A-40, Sector-62, Noida-201309, Uttar Pradesh, India',
  },

  // Regulatory / standards
  certifications: {
    isiStandard: 'IS 15652:2006',
    cmL: 'CM/L:8800129617',
    iec: 'IEC 61111',
    membraneStandard: 'IS 15909:2020',
    hydroStandard: 'IS 15058-2002',
  },

  // Only qualified, source-supported claims
  stats: [
    { value: '6', label: 'Product Families' },
    { value: 'A · B · C', label: 'Insulation Classes' },
    { value: 'IS 15652:2006', label: 'Certified Standard' },
    { value: '11+', label: 'Countries Served' },
  ],

  social: {
    linkedin: 'https://www.linkedin.com',
  },

  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://bharat-electrosafe.vercel.app',
} as const;

/**
 * Build a pre-filled WhatsApp URL from contact-form context.
 *
 * Renamed parameter avoids shadowing the imported `company` object.
 * Handles empty, partial and full-message calls.
 */
export function generateWhatsAppUrl(
  name?: string,
  companyName?: string,
  product?: string,
  message?: string,
): string {
  const parts: string[] = [];

  if (name) parts.push(`Hi, I'm ${name}`);
  if (companyName) parts.push(`from ${companyName}`);
  if (product) parts.push(`I'm interested in ${product}`);
  if (message) parts.push(message);

  const text = parts.length > 0 ? `${parts.join('. ')}.` : '';
  const base = company.whatsapp.href;

  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export type Company = typeof company;
