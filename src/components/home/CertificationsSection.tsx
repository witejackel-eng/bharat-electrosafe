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
 * Logo heights (enlarged for prominence):
 *   - Desktop  : ~132px visual height
 *   - Tablet   : ~106-120px
 *   - Mobile   : ~88px
 *
 * Item cell widths are fixed responsively so the rail reserves its
 * layout before images load (no CLS). Inter-logo spacing is tight
 * and dense per the design direction — logos dominate, gaps recede.
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
          itemSpacingClassName="pr-2 sm:pr-3 md:pr-4"
        >
          {allTrustMarks.map((mark) => (
            <div
              key={mark.label}
              className="w-[105px] sm:w-[120px] md:w-[130px] lg:w-[135px] xl:w-[140px] flex flex-col items-center gap-2.5 py-1"
            >
              {/* Logo — large, clean, no box. object-contain never crops.
                  Eager + unoptimized: these are tiny local WebP identity
                  assets drifting through a continuously moving rail, so
                  they must be fetched/decoded immediately and served
                  directly (no Next image-optimization hop). No priority
                  is set so these never compete with hero/above-the-fold
                  resources. */}
              <span className="relative flex h-[88px] sm:h-[106px] md:h-[120px] lg:h-[132px] w-full items-center justify-center">
                <Image
                  src={mark.logo}
                  alt={mark.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 639px) 105px, (max-width: 767px) 120px, (max-width: 1023px) 130px, 140px"
                  loading="eager"
                  unoptimized
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
