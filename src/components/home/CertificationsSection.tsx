'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { InfiniteLogoRail } from '@/components/ui/InfiniteLogoRail';
import { allTrustMarks } from '@/data/trust';

/**
 * CertificationsSection — homepage certifications, testing and
 * registrations rail.
 *
 * Interaction model: a seamless, continuously moving horizontal logo
 * rail (InfiniteLogoRail) that drifts right → left at a calm, linear
 * speed. The loop is mathematically seamless — no visible jump. The
 * rail pauses on hover and on keyboard focus, and falls back to a
 * static scrollable rail under `prefers-reduced-motion: reduce`.
 *
 * Visual model: a clean corporate certification strip where the LOGOS
 * are the focus — no boxed cards, no tinted backgrounds, no shadows.
 * Each mark sits on plain whitespace with its name and, where a
 * released document exists, a "View certificate" link. The per-item
 * explanatory description is intentionally omitted here so the logos
 * read as a compact identity strip.
 *
 * Logo heights (kept at the approved +30 % sizing):
 *   - Desktop  : ~100px visual height
 *   - Tablet   : ~94px
 *   - Mobile   : ~72px
 *
 * Item cell widths are fixed responsively so the rail reserves its
 * layout before images load (no CLS). Inter-logo spacing is small and
 * dense per the design direction.
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
        <InfiniteLogoRail
          ariaLabel="Certifications, testing and registrations"
          duration={42}
          pauseOnHover
          pauseOnFocus
          itemSpacingClassName="pr-6 sm:pr-9 md:pr-11"
        >
          {allTrustMarks.map((mark) => (
            <div
              key={mark.label}
              className="w-[155px] sm:w-[175px] md:w-[185px] lg:w-[195px] xl:w-[205px] flex flex-col items-center gap-2.5 py-1"
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
        </InfiniteLogoRail>
      </div>
    </SectionShell>
  );
}
