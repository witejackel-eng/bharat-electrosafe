'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { InfiniteLogoRail } from '@/components/ui/InfiniteLogoRail';
import {
  organisationReferences,
  organisationReferenceEyebrow,
  organisationReferenceTitle,
  organisationReferenceNote,
} from '@/data/trust';

/**
 * IndustryReferences — homepage industry references rail.
 *
 * Rendered as its own section immediately after Capability (per final
 * homepage production pass). Information architecture:
 *   Header → Hero → Statistics → Product Range → Certifications →
 *   Capability → Industry References → FAQ → Footer.
 *
 * Interaction model: a seamless, continuously moving horizontal logo
 * rail (InfiniteLogoRail) — the same interaction as the Certifications
 * section above, but slightly faster (32 s vs 42 s) because the
 * content is simpler. Pauses on hover/focus; falls back to a static
 * scrollable rail under reduced motion.
 *
 * Visual model: a clean editorial logo rail — no boxed cards, no
 * borders, no shadows. Logos sit on the same white background used
 * for Certifications, with the organisation name beneath each.
 * Logos are enlarged for prominence; inter-logo spacing is tight
 * so the row reads as a dense, premium brand strip.
 *
 * Organisations are presented as references. The client-approved
 * heading and supporting copy are used verbatim; no stronger claim
 * ("our clients include", "partnered with") is introduced elsewhere.
 * Trademarks and organisation names are never altered.
 */
export default function IndustryReferences() {
  return (
    <SectionShell variant="compact" bg="bg-be-white" topRule className="reveal-up">
      <div className="reveal-up mb-6">
        <SectionHeader
          eyebrow={organisationReferenceEyebrow}
          title={organisationReferenceTitle}
          supportingText={organisationReferenceNote}
        />
      </div>

      <div className="reveal-up">
        <InfiniteLogoRail
          ariaLabel="Industry references"
          duration={32}
          pauseOnHover
          pauseOnFocus
          itemSpacingClassName="pr-3 sm:pr-4 md:pr-5"
        >
          {organisationReferences.map((org) => (
            <div
              key={org.name}
              className="w-[125px] sm:w-[140px] md:w-[150px] lg:w-[160px] xl:w-[165px] flex flex-col items-center gap-3 py-1"
            >
              {/* Logo — large, clean, no box. object-contain never crops.
                  Eager + unoptimized: these are tiny local WebP identity
                  assets drifting through a continuously moving rail, so
                  they must be fetched/decoded immediately and served
                  directly (no Next image-optimization hop). No priority
                  is set so these never compete with hero/above-the-fold
                  resources. */}
              <div className="relative h-[74px] sm:h-[88px] md:h-[98px] lg:h-[104px] w-full flex items-center justify-center">
                <Image
                  src={org.logo}
                  alt={`${org.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 639px) 125px, (max-width: 767px) 140px, (max-width: 1023px) 150px, 165px"
                  loading="eager"
                  unoptimized
                />
              </div>
              <span className="text-metadata font-semibold text-be-charcoal-950 text-center leading-tight">
                {org.name}
              </span>
            </div>
          ))}
        </InfiniteLogoRail>
      </div>
    </SectionShell>
  );
}
