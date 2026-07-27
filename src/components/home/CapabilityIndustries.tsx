'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FeatureList } from '@/components/ui/FeatureList';
import { TextLink } from '@/components/ui/TextLink';
import { ShieldCheck, Layers, Ruler, FileText, Zap, Building2, TrainFront, Flame, Factory, HardHat } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const proofPoints = [
  { icon: ShieldCheck, text: 'Certified and tested products' },
  { icon: Layers, text: 'Classes A, B and C available' },
  { icon: Ruler, text: 'Custom dimensions and configurations' },
  { icon: FileText, text: 'Technical documentation and enquiry support' },
];

const industries: { name: string; icon: LucideIcon }[] = [
  { name: 'Power Utilities', icon: Zap },
  { name: 'Substations & Switchrooms', icon: Building2 },
  { name: 'Railways & Metro', icon: TrainFront },
  { name: 'Oil & Gas', icon: Flame },
  { name: 'Manufacturing', icon: Factory },
  { name: 'Infrastructure & Construction', icon: HardHat },
];

export default function CapabilityIndustries() {
  return (
    <section id="capability" className="bg-be-warm-white section-padding-major">
      <div className="container-site page-horizontal-padding">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 reveal-up">
          {/* Left — Image */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/media/manufacturing/production-line.webp"
                alt="Bharat Electrosafe manufacturing facility — production line"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right — Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <SectionHeader
              eyebrow="CAPABILITY"
              title="Built around safety, quality and application support"
            />

            <p className="text-body-large text-be-grey-650">
              Bharat Electrosafe manufactures certified electrical insulating
              mats and engineered protection products, serving utilities,
              substations, railways and industrial facilities across India.
            </p>

            {/* Decorative "Est. India" text */}
            <p className="text-metadata text-be-grey-400 font-medium tracking-wider">
              Est. India — Serving since decades
            </p>

            {/* Feature list with yellow left border */}
            <div className="[&_li]:border-l-2 [&_li]:border-be-yellow-400 [&_li]:pl-3 [&_li]:ml-[-3px]">
              <FeatureList items={proofPoints} />
            </div>

            {/* Industry chips */}
            <div className="mt-2">
              <p className="text-metadata text-be-grey-650 font-semibold uppercase tracking-wider mb-3">
                Industries we serve
              </p>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => {
                  const Icon = industry.icon;
                  return (
                    <span
                      key={industry.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-be-yellow-50 border border-be-yellow-400/30 text-sm text-be-charcoal-800 font-medium"
                    >
                      <Icon className="size-3.5 text-be-yellow-600" />
                      {industry.name}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="mt-2">
              <TextLink
                href="/about-us"
                className="text-lg font-semibold hover-arrow-shift inline-flex items-center gap-2 text-be-charcoal-800 hover:text-be-yellow-600 transition-colors duration-200"
              >
                About Us
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </TextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
