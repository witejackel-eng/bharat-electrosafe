'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { HorizontalCarousel } from '@/components/ui/HorizontalCarousel';
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
 * Visual model: a clean editorial logo rail — no boxed cards, no heavy
 * borders, no shadows. Logos are larger and sit on the same white
 * background used for Certifications, with the organisation name beneath
 * each.
 *
 * Organisations are presented as references. The client-approved heading
 * and supporting copy are used verbatim; no stronger claim ("our clients
 * include", "partnered with") is introduced elsewhere. Trademarks and
 * organisation names are never altered.
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
        <HorizontalCarousel
          label="Industry references"
          autoAdvanceMs={4500}
          gapClassName="gap-2 sm:gap-3"
        >
          {organisationReferences.map((org) => (
            <div
              key={org.name}
              className="w-[140px] sm:w-[150px] md:w-[160px] lg:w-[170px] xl:w-[180px] flex flex-col items-center gap-3 px-2 py-1"
            >
              {/* Logo — large, clean, no box. object-contain never crops. */}
              <div className="relative h-[58px] sm:h-[68px] md:h-[76px] lg:h-[78px] w-full flex items-center justify-center">
                <Image
                  src={org.logo}
                  alt={`${org.name} logo`}
                  fill
                  className="object-contain"
                  sizes="170px"
                />
              </div>
              <span className="text-metadata font-semibold text-be-charcoal-950 text-center leading-tight">
                {org.name}
              </span>
            </div>
          ))}
        </HorizontalCarousel>
      </div>
    </SectionShell>
  );
}
