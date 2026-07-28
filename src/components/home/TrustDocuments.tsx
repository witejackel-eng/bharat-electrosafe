'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { primaryTrustMarks, organisationReferences, organisationReferenceHeading, organisationReferenceNote, scaleFacts } from '@/data/trust';

export default function TrustDocuments() {
  return (
    <SectionShell variant="compact" bg="bg-be-cream" yellowAccent>
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="CERTIFICATIONS & TESTING"
          title="Certifications, testing and registrations"
          supportingText="Verified by national standards bodies and third-party testing authorities."
        />
      </div>

      {/* Trust marks grid */}
      <div className="reveal-up grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 pb-5 border-b-[3px] border-be-yellow-500/30">
        {primaryTrustMarks.map((mark) => (
          <div key={mark.label} className="flex flex-col items-center gap-2 p-4 rounded-lg border border-be-grey-250 bg-be-white hover:border-be-yellow-400 transition-colors duration-300">
            <span className="relative flex h-14 w-full items-center justify-center">
              <Image
                src={mark.logo}
                alt={mark.alt}
                fill
                className="object-contain"
                sizes="120px"
              />
            </span>
            <span className="text-metadata text-be-grey-650 font-medium text-center">{mark.label}</span>
            <span className="text-metadata text-be-grey-650 text-center">{mark.note}</span>
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
      </div>

      {/* Trust facts row */}
      <div className="reveal-up flex flex-wrap items-center justify-center gap-4 mb-8">
        {scaleFacts.map((fact) => (
          <div key={fact.label} className="flex items-center gap-2 px-4 py-2 rounded-md bg-be-yellow-50 border border-be-yellow-400/30">
            <span className="text-sm font-semibold text-be-charcoal-950">{fact.value}</span>
            <span className="text-metadata text-be-grey-650">{fact.label}</span>
          </div>
        ))}
      </div>

      {/* Organisation logo rail — conservative wording */}
      <div className="reveal-up mb-2">
        <p className="text-sm text-be-grey-650 font-semibold uppercase tracking-wider mb-3 text-center">
          {organisationReferenceHeading}
        </p>
        <p className="text-metadata text-be-grey-650 text-center mb-3">{organisationReferenceNote}</p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {organisationReferences.map((org) => (
            <div key={org.name} className="flex items-center justify-center p-3 rounded-lg border border-be-grey-250 bg-be-white/60">
              <Image
                src={org.logo}
                alt={`${org.name} logo`}
                width={80}
                height={40}
                className="object-contain"
                sizes="80px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Small link to About Us for awards and leadership */}
      <div className="reveal-up text-center">
        <Link
          href="/about-us"
          className="text-sm text-be-grey-650 hover:text-be-yellow-text-hover transition-colors underline underline-offset-4"
        >
          View awards and leadership on our About Us page
        </Link>
      </div>
    </SectionShell>
  );
}
