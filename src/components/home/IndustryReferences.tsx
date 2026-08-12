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
 * homepage production pass). Previously this content was bundled inside
 * TrustDocuments; it is now split out so the information architecture reads
 * Header → Hero → Statistics → Product Range → Certifications → Industry
 * References → Capability → FAQ → Footer.
 *
 * The heading is left-aligned and shares the same content grid alignment as
 * Product Range, Certifications and Capability (SectionShell +
 * SectionHeader with default left alignment).
 *
 * Organisations are presented as references, not as confirmed direct
 * customers — the source site shows these logos but publishes nothing that
 * establishes the nature of each relationship. Trademarks and organisation
 * names are never altered.
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
              className="w-[160px] sm:w-[180px] md:w-[200px] lg:w-[210px] xl:w-[220px] flex flex-col items-center gap-2.5 rounded-lg border border-be-grey-250 bg-be-white p-4 text-center hover:border-be-yellow-400 transition-colors duration-300"
            >
              <div className="relative h-12 w-full flex items-center justify-center">
                <Image
                  src={org.logo}
                  alt={`${org.name} logo`}
                  fill
                  className="object-contain"
                  sizes="140px"
                />
              </div>
              <span className="text-metadata font-semibold text-be-charcoal-950">
                {org.name}
              </span>
            </div>
          ))}
        </HorizontalCarousel>
      </div>
    </SectionShell>
  );
}
