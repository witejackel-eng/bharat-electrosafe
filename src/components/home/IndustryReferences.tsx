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
 * Rendered as its own section immediately after Certifications (per final
 * homepage production pass). Information architecture:
 *   Header → Hero → Statistics → Product Range → Certifications → Industry
 *   References → Capability → FAQ → Footer.
 *
 * Visual model: a clean editorial logo rail — no boxed cards, no heavy
 * borders, no shadows. Logos are larger and sit on a subtle cream
 * off-white background with the organisation name beneath each.
 *
 * Organisations are presented as references. The client-approved heading
 * and supporting copy are used verbatim; no stronger claim ("our clients
 * include", "partnered with") is introduced elsewhere. Trademarks and
 * organisation names are never altered.
 */
export default function IndustryReferences() {
  return (
    <SectionShell variant="compact" bg="bg-be-cream" className="reveal-up">
      <div className="reveal-up mb-6">
        <SectionHeader
          eyebrow={organisationReferenceEyebrow}
          title={organisationReferenceTitle}
          supportingText={organisationReferenceNote}
        />
      </div>

      <div className="reveal-up">
        <HorizontalCarousel label="Industry references" autoAdvanceMs={4500}>
          {organisationReferences.map((org) => (
            <div
              key={org.name}
              className="w-[160px] sm:w-[180px] md:w-[200px] lg:w-[215px] xl:w-[225px] flex flex-col items-center gap-3 px-2 py-1"
            >
              {/* Logo — large, clean, no box. object-contain never crops. */}
              <div className="relative h-12 sm:h-14 md:h-16 lg:h-[64px] w-full flex items-center justify-center">
                <Image
                  src={org.logo}
                  alt={`${org.name} logo`}
                  fill
                  className="object-contain"
                  sizes="160px"
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
