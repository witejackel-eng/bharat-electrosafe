'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { DocumentCard } from '@/components/ui/DocumentCard';
import { LogoRail } from '@/components/ui/LogoRail';

interface DocItem {
  type: string;
  name: string;
  issuer: string;
  reference: string;
}

const documents: DocItem[] = [
  {
    type: 'Standard',
    name: 'IS 15652:2006',
    issuer: 'Bureau of Indian Standards',
    reference: 'Electrical Insulating Mats',
  },
  {
    type: 'Licence',
    name: 'BIS Certification',
    issuer: 'Bureau of Indian Standards',
    reference: 'CM/L-XXXXXX',
  },
  {
    type: 'Test Report',
    name: 'Type Test Report',
    issuer: 'CPRI / ERDA',
    reference: 'Class A, B & C',
  },
];

const logos = [
  { name: 'BIS' },
  { name: 'CPRI' },
  { name: 'ERDA' },
  { name: 'Make in India' },
  { name: 'ISO' },
];

export default function TrustDocuments() {
  return (
    <section id="documentation" className="bg-be-cream section-padding-major">
      <div className="container-site page-horizontal-padding">
        <div className="reveal-up mb-12">
          <SectionHeader
            eyebrow="DOCUMENTATION"
            title="Documentation that supports technical decisions"
            supportingText="Standards, licences, testing records and company credentials organised for faster technical evaluation."
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 reveal-up">
          {/* Document cards */}
          <div className="w-full lg:w-3/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <DocumentCard
                  key={doc.name}
                  type={doc.type}
                  name={doc.name}
                  issuer={doc.issuer}
                  reference={doc.reference}
                />
              ))}
            </div>
          </div>

          {/* Logo rail */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center">
            <div className="rounded-lg border border-be-grey-250 bg-be-white p-6">
              <p className="text-metadata text-be-grey-650 font-semibold uppercase tracking-wider mb-4">
                Recognised &amp; Certified By
              </p>
              <LogoRail logos={logos} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
