'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { organisationReferences } from '@/data/trust';

/**
 * ClientsProjects — Clients & Projects section.
 *
 * Combines:
 *   1. Existing organisation references (with logos) from trust.ts
 *   2. Additional client names from client direction (text only, no logos)
 *
 * IMPORTANT: No project descriptions, testimonials, or logos are
 * invented. "Tata Steel Limited" is plain text — no Tata logo/image.
 *
 * Content sources: src/data/trust.ts organisationReferences (with logos),
 * client-provided client name list (text only).
 */

const additionalClients = [
  'Reliance Industries Limited',
  'Tata Steel Limited',
  'MRL Tyre Limited',
  'ArcelorMittal Nippon Steel India',
  'Ampin Energy',
  'KPI Green Energy',
  'Jindal India Power Limited',
  'Delhi Transco Limited',
  'Airport Authority of India',
  'Indian Navy',
  'Chennai Metro Rail Limited',
  'Metro Railway Kolkata',
  'NLC India Limited',
  'NMDC Steel Limited',
  'Rail Vikas Nigam Limited',
  'Punjab National Bank',
  'Uttar Pradesh Power Corporation Limited',
];

export default function ClientsProjects() {
  return (
    <SectionShell variant="standard" bg="bg-be-warm-white" topRule>
      <div className="reveal-up mb-10">
        <SectionHeader
          eyebrow="Clients & Projects"
          title="Trusted across critical industries"
          supportingText="A selection of organisations and projects served by Bharat Electrosafe across power, steel, infrastructure, metro rail, defence and more."
        />
      </div>

      {/* Organisation references with logos */}
      <div className="reveal-up mb-10">
        <p className="text-metadata font-semibold uppercase tracking-wider text-be-grey-650 mb-4">
          Organisation references
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {organisationReferences.map((org) => (
            <div
              key={org.name}
              className="flex flex-col items-center gap-3 rounded-lg border border-be-grey-250 bg-be-white p-4 text-center"
            >
              <div className="relative h-10 w-full flex items-center justify-center">
                <Image
                  src={org.logo}
                  alt={`${org.name} logo`}
                  fill
                  className="object-contain"
                  sizes="120px"
                />
              </div>
              <span className="text-metadata font-semibold text-be-charcoal-950">
                {org.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional client names — text only, no logos */}
      <div className="reveal-up">
        <p className="text-metadata font-semibold uppercase tracking-wider text-be-grey-650 mb-4">
          Clients served
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
          {additionalClients.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2.5 text-body text-be-charcoal-950"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-be-yellow-500 shrink-0" aria-hidden="true" />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
