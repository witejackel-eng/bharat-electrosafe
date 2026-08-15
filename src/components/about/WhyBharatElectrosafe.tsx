'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { capabilityPoints } from '@/data/trust';
import { companyValues } from '@/data/team';
import { CheckCircle2, ShieldCheck, BadgeCheck, HeadsetIcon, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * WhyBharatElectrosafe — Combined "Why Bharat Electrosafe" section.
 *
 * Merges three former sections into one compact presentation:
 *   - Why Choose Us (capability points from trust.ts)
 *   - Company Values (from team.ts companyValues) — now with
 *     official Core Values client artwork image beside value points
 *   - Manufacturing quality (production-line image + summary)
 *
 * Content sources: src/data/trust.ts capabilityPoints,
 *                  src/data/team.ts companyValues.
 */

const iconMap: Record<string, LucideIcon> = {
  Respect: ShieldCheck,
  Trust: BadgeCheck,
  Ownership: HeadsetIcon,
  'Integrated Team Work': Users,
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

          {/* Core Values — compact horizontal cards in 2×2 grid */}
          <div className="reveal-up">
            <p className="text-metadata font-semibold uppercase tracking-wider text-be-yellow-text mb-3">
              Core Values
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {values.map((value) => {
                const Icon = iconMap[value.title] ?? ShieldCheck;
                return (
                  <div
                    key={value.title}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-be-grey-250 bg-be-white"
                  >
                    <div className="flex items-center justify-center w-7 h-7 rounded-md bg-be-navy-800 shrink-0">
                      <Icon
                        className="h-3.5 w-3.5 text-be-white"
                        aria-hidden="true"
                        focusable="false"
                      />
                    </div>
                    <p className="text-xs font-bold text-be-charcoal-950 tracking-tight leading-tight">
                      {value.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right — core values image + manufacturing summary (sticky to fill space) */}
        <div className="lg:w-[42%] reveal-up lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/media/about/core-values.webp"
              alt="Bharat Electrosafe Core Values artwork showing Respect, Trust, Ownership and Integrated Team Work"
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
