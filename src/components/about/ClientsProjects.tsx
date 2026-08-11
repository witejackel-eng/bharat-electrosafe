'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { HorizontalCarousel } from '@/components/ui/HorizontalCarousel';
import { organisationReferences } from '@/data/trust';

/**
 * ClientsProjects — Clients & Projects section.
 *
 * Combines:
 *   1. Existing organisation references (with logos) from trust.ts
 *      — presented in a horizontal carousel
 *   2. Additional client names from client direction (text only, no logos)
 *      — compact list below the carousel
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

/** Number of extra clients to show before the "View all" disclosure */
const VISIBLE_CLIENT_COUNT = 10;

export default function ClientsProjects() {
  const [showAllClients, setShowAllClients] = useState(false);
  const visibleClients = showAllClients
    ? additionalClients
    : additionalClients.slice(0, VISIBLE_CLIENT_COUNT);

  return (
    <SectionShell variant="standard" bg="bg-be-yellow-50/40" topRule>
      <div className="reveal-up mb-10">
        <SectionHeader
          eyebrow="Clients & Projects"
          title="Trusted across critical industries"
          supportingText="A selection of organisations and projects served by Bharat Electrosafe across power, steel, infrastructure, metro rail, defence and more."
        />
      </div>

      {/* Organisation references — horizontal carousel */}
      <div className="reveal-up mb-10">
        <p className="text-metadata font-semibold uppercase tracking-wider text-be-grey-650 mb-4">
          Organisation references
        </p>
        <HorizontalCarousel label="Organisation references" autoAdvanceMs={4000}>
          {organisationReferences.map((org) => (
            <div
              key={org.name}
              className="w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px] flex flex-col items-center gap-3 rounded-lg border border-be-grey-250 bg-be-white p-5 text-center"
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

      {/* Additional client names — compact list below the carousel */}
      <div className="reveal-up">
        <p className="text-metadata font-semibold uppercase tracking-wider text-be-grey-650 mb-4">
          Clients served
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3">
          {visibleClients.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2.5 text-body text-be-charcoal-950"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-be-yellow-500 shrink-0" aria-hidden="true" />
              <span>{name}</span>
            </div>
          ))}
        </div>
        {!showAllClients && additionalClients.length > VISIBLE_CLIENT_COUNT && (
          <button
            type="button"
            onClick={() => setShowAllClients(true)}
            className="mt-4 text-metadata font-semibold text-be-yellow-text underline underline-offset-2 hover:text-be-yellow-text-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 rounded-sm"
          >
            View all clients
          </button>
        )}
      </div>
    </SectionShell>
  );
}
