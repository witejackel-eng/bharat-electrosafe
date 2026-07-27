'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DocumentCard } from '@/components/ui/DocumentCard';
import { trustMarks, awards, organisationRefs } from '@/data/trust';

const certificates = [
  {
    type: 'Standard',
    name: 'IS 15652:2006 Standard',
    issuer: 'Bureau of Indian Standards',
  },
  {
    type: 'Licence',
    name: 'BIS Certification Licence',
    issuer: 'BIS',
  },
  {
    type: 'Test Report',
    name: 'ERDA Type Test Report',
    issuer: 'ERDA',
  },
  {
    type: 'Test Report',
    name: 'NTH Type Test Report',
    issuer: 'NTH',
  },
  {
    type: 'Certification',
    name: 'ISO 9001:2015',
    issuer: 'ISO',
  },
];

export default function AwardsCertifications() {
  return (
    <section className="bg-be-white section-padding-major page-horizontal-padding">
      <div className="container-site">
        {/* ── Certificates ── */}
        <div className="reveal-up mb-12">
          <SectionHeader
            eyebrow="Certificates & Standards"
            title="Certified Compliance"
            supportingText="Our products and processes are verified by national standards bodies and third-party testing authorities."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {certificates.map((cert) => (
            <div key={cert.name} className="reveal-up">
              <DocumentCard
                type={cert.type}
                name={cert.name}
                issuer={cert.issuer}
              />
            </div>
          ))}
        </div>

        {/* ── Certification marks ── */}
        <div className="reveal-up mb-16">
          <p className="text-sm text-be-grey-650 font-semibold uppercase tracking-wider mb-4 text-center">
            Registered and certified marks
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {trustMarks.map((mark) => (
              <div key={mark.name} className="flex items-center justify-center p-3 rounded-lg border border-be-grey-250 bg-be-white">
                <Image
                  src={mark.imagePath}
                  alt={`${mark.name} — ${mark.label}`}
                  width={50}
                  height={50}
                  className="object-contain"
                  sizes="50px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Awards ── */}
        <div className="reveal-up mb-10">
          <SectionHeader
            eyebrow="Awards & Recognition"
            title="Industry Recognition"
            supportingText="Awards that validate our commitment to quality, innovation and domestic manufacturing."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {awards.map((award) => (
            <div key={award.title} className="reveal-up hover-card-lift rounded-lg border border-be-grey-250 bg-be-warm-white overflow-hidden">
              {/* Image-led card */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={award.imagePath}
                  alt={`${award.title} — ${award.associatedPerson}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col gap-2 p-5">
                <h3 className="text-card-title text-be-charcoal-950">{award.title}</h3>
                <p className="text-body text-be-grey-650">{award.context}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Organisation references ── */}
        <div className="reveal-up">
          <p className="text-sm text-be-grey-650 font-semibold uppercase tracking-wider mb-4 text-center">
            Trusted by leading organisations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {organisationRefs.map((org) => (
              <div key={org.name} className="flex items-center justify-center p-3 rounded-lg border border-be-grey-250 bg-be-white/60">
                <Image
                  src={org.imagePath}
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
      </div>
    </section>
  );
}
