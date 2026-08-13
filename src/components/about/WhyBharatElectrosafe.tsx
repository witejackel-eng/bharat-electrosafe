'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { capabilityPoints } from '@/data/trust';
import { companyValues } from '@/data/team';
import { CheckCircle2, ShieldCheck, BadgeCheck, HeadsetIcon, Sparkles, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * WhyBharatElectrosafe — Combined "Why Bharat Electrosafe" section.
 *
 * Merges three former sections into one compact presentation:
 *   - Why Choose Us (capability points from trust.ts)
 *   - Company Values (from team.ts companyValues)
 *   - Manufacturing quality (production-line image + DataTable)
 *
 * Desktop layout: Left = capability bullets (max 6) + values strip,
 *                 Right = manufacturing image.
 * Mobile: stacks vertically.
 *
 * Content sources: src/data/trust.ts capabilityPoints,
 *                  src/data/team.ts companyValues.
 */

const iconMap: Record<string, LucideIcon> = {
  Respect: ShieldCheck,
  Trust: BadgeCheck,
  Ownership: HeadsetIcon,
  Teamwork: Users,
};

/** Only the core values (not Mission/Vision — those are in BrandsVisionMission) */
const values = companyValues.filter(
  (v) => v.title !== 'Mission' && v.title !== 'Vision',
);

/** Cap the capability points to max 6 for compact layout */
const displayCapabilities = capabilityPoints.slice(0, 6);

export default function WhyBharatElectrosafe() {
  return (
    <SectionShell variant="standard" bg="bg-be-cream" topRule>
      {/* Section header */}
      <div className="reveal-up mb-10">
        <SectionHeader
          eyebrow="Why Bharat Electrosafe"
          title="Capabilities and values that set us apart"
          supportingText="Every capability claim is traceable to our documented manufacturing and product credentials. Our values shape every decision — from specification to support."
        />
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        {/* Left — capability points */}
        <div className="lg:w-[58%]">
          <ul className="flex flex-col gap-4 mb-8">
            {displayCapabilities.map((point, index) => (
              <li
                key={point.title}
                className="reveal-up flex items-start gap-3"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <CheckCircle2
                  className="h-5 w-5 text-be-yellow-text mt-0.5 shrink-0"
                  aria-hidden="true"
                  focusable="false"
                />
                <div>
                  <p className="text-sm font-semibold text-be-charcoal-950 leading-snug">
                    {point.title}
                  </p>
                  <p className="text-body text-be-grey-650 mt-1">
                    {point.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Values strip — compact horizontal row */}
          <div className="reveal-up">
            <p className="text-metadata font-semibold uppercase tracking-wider text-be-yellow-text mb-3">
              Our Values
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {values.map((value) => {
                const Icon = iconMap[value.title] ?? ShieldCheck;
                return (
                  <div
                    key={value.title}
                    className="flex flex-col items-center text-center gap-2 rounded-lg border border-be-grey-250 bg-be-white p-3"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-be-navy-800">
                      <Icon
                        className="h-4 w-4 text-be-white"
                        aria-hidden="true"
                        focusable="false"
                      />
                    </div>
                    <p className="text-xs font-bold text-be-charcoal-950 tracking-tight leading-tight">
                      {value.title}
                    </p>
                    <p className="text-[0.7rem] text-be-grey-650 leading-snug hidden sm:block">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right — manufacturing image */}
        <div className="lg:w-[42%] reveal-up">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/media/manufacturing/production-line.webp"
              alt="Bharat Electrosafe manufacturing facility — production line"
              width={700}
              height={500}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </div>

          {/* Compact manufacturing proof summary */}
          <div className="mt-4 rounded-lg border border-be-grey-250 bg-be-white p-4">
            <p className="text-metadata font-semibold uppercase tracking-wider text-be-yellow-text mb-2">
              Manufacturing & Quality
            </p>
            <p className="text-body text-be-grey-650 leading-relaxed">
              Standard and project-specific insulating-mat configurations with
              options for class, thickness, surface pattern, dimensions and
              visible-safety markings. Three-stage quality: raw material
              inspection → in-process testing → final product documentation.
              IS&nbsp;15652:2006, BIS licensed, ERDA/NTH tested.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
