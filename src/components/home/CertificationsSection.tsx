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
 * sits on plain whitespace with its name and, where a released document
 * exists, a "View certificate" link. The per-item explanatory description
 * is intentionally omitted here so the logos read as a compact identity
 * strip.
 *
 * Responsive visibility (per spec):
 *   - Desktop  : ~5–6 items visible
 *   - Tablet   : ~3–4 items visible
 *   - Mobile   : ~1.5–2 items visible (swipe / arrow / keyboard)
 *
 * Logo heights (enlarged ~30%):
 *   - Desktop  : ~100px visual height
 *   - Tablet   : ~94px
 *   - Mobile   : ~72px
 *
 * The carousel respects `prefers-reduced-motion` and supports touch/swipe,
 * arrow controls and keyboard navigation (←/→).
 */
export default function CertificationsSection() {
  return (
    <SectionShell variant="standard" bg="bg-be-white" topRule className="reveal-up">
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="CERTIFICATIONS & MEMBERSHIPS"
          title="Industry Certifications, Testing & Registrations"
          supportingText="We are proudly affiliated with several esteemed organizations in the rubber industry. Our up-to-date certifications reflect our ongoing commitment to delivering value to our clients' businesses."
        />
      </div>

      <div className="reveal-up pb-2">
        <HorizontalCarousel
          label="Certifications, testing and registrations"
          autoAdvanceMs={5000}
          gapClassName="gap-2 sm:gap-3 md:gap-3"
        >
          {allTrustMarks.map((mark) => (
            <div
              key={mark.label}
              className="w-[155px] sm:w-[175px] md:w-[185px] lg:w-[195px] xl:w-[205px] flex flex-col items-center gap-2.5 px-2 py-1"
            >
              {/* Logo — large, clean, no box. object-contain never crops. */}
              <span className="relative flex h-[72px] sm:h-[84px] md:h-[94px] lg:h-[100px] w-full items-center justify-center">
                <Image
                  src={mark.logo}
                  alt={mark.alt}
                  fill
                  className="object-contain"
                  sizes="190px"
                />
              </span>
              <span className="text-metadata text-center font-semibold text-be-charcoal-950 leading-tight">
                {mark.label}
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
