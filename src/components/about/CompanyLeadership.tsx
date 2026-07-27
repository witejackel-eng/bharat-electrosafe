'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FeatureList } from '@/components/ui/FeatureList';
import { leaders } from '@/data/team';
import { ShieldCheck, BadgeCheck, HeadsetIcon, FileText } from 'lucide-react';

export default function CompanyLeadership() {
  return (
    <section className="bg-be-warm-white section-padding-major page-horizontal-padding">
      <div className="container-site">
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
                testing, clear documentation and responsive technical guidance.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="lg:w-1/2 reveal-up">
            <h3 className="text-card-title text-be-charcoal-950 mb-5">Our Values</h3>
            <FeatureList
              items={[
                { icon: ShieldCheck, text: 'Safety-first engineering' },
                { icon: BadgeCheck, text: 'Certified quality assurance' },
                { icon: HeadsetIcon, text: 'Customer application support' },
                { icon: FileText, text: 'Transparent documentation' },
              ]}
            />
          </div>
        </div>

        {/* Leadership profiles — using real portraits */}
        <div className="reveal-up mb-8">
          <SectionHeader
            eyebrow="Leadership"
            title="Our Team"
            supportingText="Experienced professionals driving quality, compliance and customer success."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {leaders.map((leader) => (
            <div key={leader.name} className="reveal-up hover-card-lift rounded-lg border border-be-grey-250 bg-be-white overflow-hidden">
              {/* Real portrait */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={leader.image}
                  alt={leader.imageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 p-5">
                <h3 className="text-card-title text-be-charcoal-950">{leader.name}</h3>
                <p className="text-metadata text-be-yellow-600 font-semibold">{leader.role}</p>
                <p className="text-body text-be-grey-650">{leader.shortBio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
