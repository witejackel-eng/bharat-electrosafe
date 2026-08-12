'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { HorizontalCarousel } from '@/components/ui/HorizontalCarousel';
import { allTrustMarks } from '@/data/trust';

/**
 * CertificationsSection — homepage certifications, testing and registrations
 * rail.
 *
 * Splits the former TrustDocuments block into a dedicated certifications
 * section (per final homepage production pass). The duplicate company-reach
 * statistics that used to live here are removed — the homepage
 * StatisticsStrip already carries those figures — and the Industry
 * References content now renders as its own section immediately after this
 * one.
 *
 * Heading is the exact, title-case string required by the spec:
 *   "Certifications, Testing and Registrations"
 *
 * Visual model emphasises logos/marks. Marks that ship with a released
 * document get a "View certificate" link; marks without one get a label
 * only — never an invented certificate number or expiry.
 *
 * Responsive visibility (per spec):
 *   - Desktop  : ~5–6 items visible
 *   - Tablet   : ~3–4 items visible
 *   - Mobile   : ~1.5–2 items visible (swipe / arrow / keyboard)
 *
 * Item widths are tuned so the container (max-width 1360px) shows the
 * target count at each breakpoint without overflowing.
 *
 * The carousel respects `prefers-reduced-motion` (auto-advance disabled
 * when the user prefers reduced motion) and supports touch/swipe, arrow
 * controls and keyboard navigation (←/→).
 */
export default function CertificationsSection() {
  return (
    <SectionShell variant="standard" bg="bg-be-white" topRule className="reveal-up">
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="CERTIFICATIONS & TESTING"
          title="Certifications, Testing and Registrations"
          supportingText="Verified by national standards bodies and third-party testing authorities."
        />
      </div>

      <div className="reveal-up pb-2">
        <HorizontalCarousel label="Certifications, testing and registrations" autoAdvanceMs={5000}>
          {allTrustMarks.map((mark) => (
            <div
              key={mark.label}
              className="w-[150px] sm:w-[185px] md:w-[200px] lg:w-[210px] xl:w-[220px] flex flex-col items-center gap-2 p-3.5 rounded-lg border border-be-grey-250 bg-be-warm-white hover:border-be-yellow-400 transition-colors duration-300"
            >
              <span className="relative flex h-12 w-full items-center justify-center">
                <Image
                  src={mark.logo}
                  alt={mark.alt}
                  fill
                  className="object-contain"
                  sizes="120px"
                />
              </span>
              <span className="text-metadata text-be-grey-650 font-medium text-center">
                {mark.label}
              </span>
              <span className="text-metadata text-be-grey-650 text-center leading-snug">
                {mark.note}
              </span>
              {mark.document && (
                <a
                  href={mark.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-metadata font-semibold text-be-yellow-text underline underline-offset-2 hover:text-be-yellow-text-hover rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500"
                >
                  View certificate
                </a>
              )}
            </div>
          ))}
        </HorizontalCarousel>
      </div>
    </SectionShell>
  );
}
