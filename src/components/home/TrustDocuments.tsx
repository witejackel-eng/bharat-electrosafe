'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { trustMarks, organisationRefs } from '@/data/trust';

export default function TrustDocuments() {
  return (
    <section id="documentation" className="bg-be-cream section-padding-major relative">
      {/* Subtle gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-be-cream to-transparent pointer-events-none" />

      <div className="container-site page-horizontal-padding">
        <div className="reveal-up mb-12">
          <SectionHeader
            eyebrow="CERTIFICATIONS & TESTING"
            title="Certifications, testing and registrations"
            supportingText="Verified by national standards bodies and third-party testing authorities."
          />
        </div>

        {/* Trust marks grid */}
        <div className="reveal-up grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-10 pb-6 border-b-[3px] border-be-yellow-500/30">
          {trustMarks.map((mark) => (
            <div key={mark.name} className="flex flex-col items-center gap-2 p-4 rounded-lg border border-be-grey-250 bg-be-white hover:border-be-yellow-400 transition-colors duration-300">
              <Image
                src={mark.imagePath}
                alt={`${mark.name} certification mark`}
                width={60}
                height={60}
                className="object-contain"
                sizes="60px"
              />
              <span className="text-metadata text-be-grey-650 font-medium text-center">{mark.label}</span>
            </div>
          ))}
        </div>

        {/* Trust facts row */}
        <div className="reveal-up flex flex-wrap items-center justify-center gap-6 mb-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-be-yellow-50 border border-be-yellow-400/30">
            <span className="text-sm font-semibold text-be-charcoal-950">11+</span>
            <span className="text-metadata text-be-grey-650">Countries served</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-be-yellow-50 border border-be-yellow-400/30">
            <span className="text-sm font-semibold text-be-charcoal-950">5</span>
            <span className="text-metadata text-be-grey-650">Product Families</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-be-yellow-50 border border-be-yellow-400/30">
            <span className="text-sm font-semibold text-be-charcoal-950">IS 15652:2006</span>
            <span className="text-metadata text-be-grey-650">Governing Standard</span>
          </div>
        </div>

        {/* Organisation logo rail */}
        <div className="reveal-up mb-8">
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

        {/* Small link to About Us for awards and leadership */}
        <div className="reveal-up text-center">
          <Link
            href="/about-us"
            className="text-sm text-be-grey-650 hover:text-be-yellow-600 transition-colors underline underline-offset-4"
          >
            View awards and leadership on our About Us page
          </Link>
        </div>
      </div>
    </section>
  );
}
