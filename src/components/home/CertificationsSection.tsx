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
 * Visual model: a clean corporate certification strip where the LOGOS are
 * the focus — no boxed cards, no tinted backgrounds, no shadows. Each mark
 * sits on plain whitespace with a concise factual label and, where a
 * released document exists, a "View certificate" link.
 *
 * Responsive visibility (per spec):
 *   - Desktop  : ~5–6 items visible
 *   - Tablet   : ~3–4 items visible
 *   - Mobile   : ~1.5–2 items visible (swipe / arrow / keyboard)
 *
 * Logo heights:
 *   - Desktop  : ~76px visual height
 *   - Tablet   : ~64px
 *   - Mobile   : ~56px
 *
 * The carousel respects `prefers-reduced-motion` and supports touch/swipe,
 * arrow controls and keyboard navigation (←/→).
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
              className="w-[160px] sm:w-[185px] md:w-[200px] lg:w-[220px] xl:w-[230px] flex flex-col items-center gap-2.5 px-2 py-1"
            >
              {/* Logo — large, clean, no box. object-contain never crops. */}
              <span className="relative flex h-14 sm:h-16 md:h-[72px] lg:h-[76px] w-full items-center justify-center">
                <Image
                  src={mark.logo}
                  alt={mark.alt}
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </span>
              <span className="text-metadata text-center font-semibold text-be-charcoal-950 leading-tight">
                {mark.label}
              </span>
              <span className="text-metadata text-center text-be-grey-650 leading-snug min-h-[2.4em]">
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
