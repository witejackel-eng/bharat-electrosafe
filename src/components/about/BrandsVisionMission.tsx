'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { Target, Compass } from 'lucide-react';

/**
 * BrandsVisionMission — Combined BES Brands + Vision/Mission section.
 *
 * Desktop layout: Brands on top row (two brand cards side-by-side),
 * Vision/Mission in navy band below.
 * Mobile: stacks vertically.
 *
 * Uses existing brand logo assets and client-provided Vision/Mission text.
 */

const brands = [
  {
    name: 'Bharat Electrosafe®',
    description:
      'India\'s trusted name in precision-engineered electrical safety, industrial safety, infrastructure protection, PVC flooring and waterproofing solutions.',
    logo: '/brand/bharat-electrosafe-light.webp',
    alt: 'Bharat Electrosafe registered trademark logo',
  },
  {
    name: 'INSULATICAA',
    description:
      'Specialised brand for high-voltage electrical insulating mat solutions — representing safety, reliability and compliance in electrical insulation.',
    logo: '/brand/insulaticaa-logo.webp',
    alt: 'INSULATICAA brand logo',
  },
];

const vision =
  'To become India\'s most trusted and preferred brand in electrical safety, industrial safety, infrastructure protection, PVC flooring, and waterproofing solutions by delivering innovative, high-quality, and standards-compliant products that contribute to safer workplaces and stronger infrastructure.';

const mission =
  'To protect lives, assets, and infrastructure by providing reliable, durable, and high-performance safety and protection solutions that meet the highest quality standards, support industrial growth, and strengthen the nation\'s development under the Make in India initiative.';

export default function BrandsVisionMission() {
  return (
    <section className="relative" aria-label="Brands, Vision and Mission">
      {/* ── Brands sub-section ── */}
      <div className="bg-be-navy-900 pt-12 md:pt-14 pb-8 md:pb-10 border-t border-be-navy-700">
        <div className="container-site page-horizontal-padding">
          <div className="reveal-up mb-8">
            <SectionHeader
              eyebrow="BES Brands"
              title="Our brand family"
              supportingText="Two complementary brands serving the electrical safety, industrial protection and infrastructure markets."
              // Override text colour for dark bg
              className="[&_h2]:text-be-white [&_p]:text-be-grey-300 [&_span]:text-be-yellow-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="reveal-up flex flex-col items-center text-center gap-4 rounded-lg border border-be-navy-600 bg-be-navy-800/60 p-5 lg:p-6"
              >
                {/* Logo container */}
                <div className="relative w-full max-w-[240px] aspect-[3/1] flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={brand.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 240px, 240px"
                  />
                </div>

                {/* Brand name */}
                <h3 className="text-lg font-bold text-be-white tracking-tight">
                  {brand.name}
                </h3>

                {/* Description */}
                <p className="text-body text-be-grey-300 max-w-sm">
                  {brand.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Vision & Mission sub-section (navy band) ── */}
      <div className="bg-be-navy-800 pt-8 md:pt-10 pb-12 md:pb-14">
        <div className="container-site page-horizontal-padding">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Vision */}
            <div className="lg:w-1/2 reveal-up">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-md bg-be-yellow-500/20">
                  <Compass className="h-4.5 w-4.5 text-be-yellow-400" aria-hidden="true" />
                </div>
                <p className="text-metadata font-semibold uppercase tracking-wider text-be-yellow-400">
                  Vision
                </p>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-be-white mb-3 tracking-tight">
                Where we aspire to be
              </h3>
              <p className="text-body text-be-grey-300 leading-relaxed">
                {vision}
              </p>
            </div>

            {/* Divider — visible on mobile */}
            <div className="lg:hidden h-px bg-be-navy-600" />

            {/* Mission */}
            <div className="lg:w-1/2 reveal-up">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-md bg-be-yellow-500/20">
                  <Target className="h-4.5 w-4.5 text-be-yellow-400" aria-hidden="true" />
                </div>
                <p className="text-metadata font-semibold uppercase tracking-wider text-be-yellow-400">
                  Mission
                </p>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-be-white mb-3 tracking-tight">
                What drives us
              </h3>
              <p className="text-body text-be-grey-300 leading-relaxed">
                {mission}
              </p>
            </div>
          </div>

          {/* Yellow accent line at bottom */}
          <div className="mt-8 h-[3px] bg-gradient-to-r from-transparent via-be-yellow-500 to-transparent" />
        </div>
      </div>
    </section>
  );
}
