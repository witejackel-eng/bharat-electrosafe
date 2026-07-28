'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FeatureList } from '@/components/ui/FeatureList';
import { SectionShell } from '@/components/ui/SectionShell';
import { leaders } from '@/data/team';
import { ShieldCheck, BadgeCheck, HeadsetIcon, FileText } from 'lucide-react';

export default function CompanyLeadership() {
  return (
    <SectionShell variant="standard" bg="bg-be-warm-white" topRule>
      {/* Company journey */}
      <div className="reveal-up mb-12">
        <SectionHeader
          eyebrow="Our Journey"
          title="Building Trust Through Quality"
          supportingText="Founded with a commitment to electrical safety, Bharat Electrosafe has grown into a trusted manufacturer serving critical infrastructure across India. Our focus on certified quality, technical documentation and application support sets us apart."
        />
      </div>

      {/* Mission + Values */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-16">
        {/* Mission statement */}
        <div className="lg:w-1/2 reveal-up">
          <div className="rounded-lg border border-be-grey-250 bg-be-cream p-6">
            <h3 className="text-card-title text-be-charcoal-950 mb-3">Our Mission</h3>
            <p className="text-body-large text-be-grey-650">
              To manufacture and supply certified electrical insulation products that protect
              people and assets in critical electrical environments, supported by rigorous
              testing and comprehensive documentation.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="lg:w-1/2 reveal-up">
          <div className="rounded-lg border border-be-grey-250 bg-be-yellow-50 p-6">
            <h3 className="text-card-title text-be-charcoal-950 mb-3">Our Values</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2 text-sm text-be-grey-650">
                <ShieldCheck className="size-4 text-be-yellow-text mt-0.5 shrink-0" aria-hidden="true" focusable="false" />
                <span><strong className="text-be-charcoal-950">Certified quality</strong> — every product is tested and documented</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-be-grey-650">
                <BadgeCheck className="size-4 text-be-yellow-text mt-0.5 shrink-0" aria-hidden="true" focusable="false" />
                <span><strong className="text-be-charcoal-950">Standards compliance</strong> — IS 15652:2006, BIS licensed</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-be-grey-650">
                <HeadsetIcon className="size-4 text-be-yellow-text mt-0.5 shrink-0" aria-hidden="true" focusable="false" />
                <span><strong className="text-be-charcoal-950">Application support</strong> — technical guidance for every project</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-be-grey-650">
                <FileText className="size-4 text-be-yellow-text mt-0.5 shrink-0" aria-hidden="true" focusable="false" />
                <span><strong className="text-be-charcoal-950">Documentation</strong> — test reports and certificates available</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="reveal-up">
        <SectionHeader
          eyebrow="Leadership"
          title="Our leadership team"
          supportingText="Experienced professionals guiding our commitment to quality and customer service."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {leaders.map((leader) => (
            <div key={leader.name} className="flex items-start gap-4 p-4 rounded-lg border border-be-grey-250 bg-be-white">
              <div className="shrink-0 size-16 rounded-full overflow-hidden bg-be-cream">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-base font-semibold text-be-charcoal-950">{leader.name}</h4>
                <p className="text-sm text-be-yellow-text font-medium">{leader.role}</p>
                <p className="text-sm text-be-grey-650 mt-1 leading-relaxed">{leader.shortBio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
