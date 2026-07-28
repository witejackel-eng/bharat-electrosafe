'use client';

import { company } from '@/data/company';
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────
   Exact encoded Google Maps destination URL
   Built once from the canonical company address.
   Used by Contact page map + Get Directions + Footer address link.
   ──────────────────────────────────────────── */

const OFFICE_FULL_ADDRESS = `${company.name}, ${company.address.line1}, ${company.address.line2}, ${company.address.city}, ${company.address.state} ${company.address.pincode}, ${company.address.country}`;

export const officeMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  OFFICE_FULL_ADDRESS
)}`;

export const officeMapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  OFFICE_FULL_ADDRESS
)}&z=15&output=embed`;

/* ────────────────────────────────────────────
   Compact contact rows (replaces the old card grid)
   Each row: small icon + short metadata label + actionable value.
   ──────────────────────────────────────────── */

interface ContactRow {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  href?: string;
  external?: boolean;
}

const contactRows: ContactRow[] = [
  {
    icon: <Mail className="size-4 text-be-yellow-600" />,
    label: 'Email',
    value: company.email,
    href: `mailto:${company.email}`,
  },
  {
    icon: <Phone className="size-4 text-be-yellow-600" />,
    label: 'Primary Phone',
    value: company.phonePrimary,
    href: `tel:${company.phonePrimaryTel}`,
  },
  {
    icon: <Phone className="size-4 text-be-yellow-600" />,
    label: 'Secondary Phone',
    value: company.phoneSecondary,
    href: `tel:${company.phoneSecondaryTel}`,
  },
  {
    icon: <MessageCircle className="size-4 text-be-yellow-600" />,
    label: 'WhatsApp',
    value: 'Chat on WhatsApp',
    href: company.whatsapp.href,
    external: true,
  },
  {
    icon: <MapPin className="size-4 text-be-yellow-600" />,
    label: 'Address',
    value: (
      <>
        {company.address.line1}, {company.address.line2},
        <br />
        {company.address.city}, {company.address.state} — {company.address.pincode}
      </>
    ),
    href: officeMapsDirectionsUrl,
    external: true,
  },
];

/* ────────────────────────────────────────────
   Top of left column — Chapter 1
   Breadcrumb, H1, supporting paragraph, compact
   contact rows, response-time statement.
   ──────────────────────────────────────────── */

export default function ContactIntro() {
  return (
    <div className="reveal-up flex flex-col gap-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />

      {/* Title + supporting paragraph */}
      <div className="flex flex-col gap-3">
        <h1 className="text-page-h1 text-be-charcoal-950">
          Contact Bharat Electrosafe
        </h1>
        <p className="text-body-large text-be-grey-650">
          Reach our team for product enquiries, technical support, quotations or application guidance.
        </p>
      </div>

      {/* Compact contact rows */}
      <ul className="flex flex-col">
        {contactRows.map((row, idx) => (
          <li
            key={row.label}
            className={cn(
              'flex items-start gap-3 py-3.5 min-h-[44px]',
              idx !== contactRows.length - 1 && 'border-b border-be-grey-150'
            )}
          >
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-be-yellow-50 border border-be-yellow-100 mt-0.5"
            >
              {row.icon}
            </span>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-metadata font-semibold text-be-grey-650 uppercase tracking-wide">
                {row.label}
              </span>
              {row.href ? (
                <a
                  href={row.href}
                  target={row.external ? '_blank' : undefined}
                  rel={row.external ? 'noopener noreferrer' : undefined}
                  className="text-body font-medium text-be-charcoal-950 hover:text-be-yellow-600 transition-colors break-words"
                >
                  {row.value}
                </a>
              ) : (
                <span className="text-body font-medium text-be-charcoal-800 break-words">
                  {row.value}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Response-time statement */}
      <p className="text-metadata text-be-grey-650">
        We normally respond within one business day.
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────
   Bottom of left column — Chapter 1
   Immediate-assistance panel. Rendered after the
   enquiry form on mobile (per spec mobile order).
   ──────────────────────────────────────────── */

export function ImmediateAssistance() {
  return (
    <div className="reveal-up rounded-lg border border-be-grey-250 bg-be-cream p-5 flex flex-col gap-3">
      <p className="text-body font-semibold text-be-charcoal-950">
        Need immediate assistance?
      </p>
      <p className="text-body text-be-grey-650">
        Call our sales team directly for product selection guidance and quotation support.
      </p>
      <div className="flex flex-wrap gap-3">
        <SecondaryButton href={`tel:${company.phonePrimaryTel}`}>
          <Phone className="size-4 mr-1.5" />
          Call Sales
        </SecondaryButton>
        <SecondaryButton href={company.whatsapp.href} target="_blank">
          <MessageCircle className="size-4 mr-1.5" />
          WhatsApp
        </SecondaryButton>
      </div>
    </div>
  );
}
