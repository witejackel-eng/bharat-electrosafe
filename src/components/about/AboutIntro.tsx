'use client';

import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionShell } from '@/components/ui/SectionShell';
import { ShieldCheck, Layers, Droplets, Zap } from 'lucide-react';

/**
 * AboutIntro — "Who We Are" hero section.
 *
 * Tight, premium two-column layout with concise company description
 * and compact product-range summary. Controlled editorial image frame
 * (aspect-ratio 4:3, max-height ~440px).
 *
 * Content source: client About docx.
 */

const productRange = [
  { icon: Zap, title: 'High Voltage Insulating Mats', standard: 'IS 15652 & IEC 61111' },
  { icon: Layers, title: 'Geo Membrane Lining', standard: 'IS 15909:2020' },
  { icon: Droplets, title: 'Water Proofing Solutions', standard: 'BharatHydro Water Stop Seals' },
  { icon: ShieldCheck, title: 'PVC Flooring + Other Products', standard: 'IS 3462 • ESD Mats • Conveyor Belts' },
];

export default function AboutIntro() {
  return (
    <SectionShell variant="hero" bg="be-page-top-tint">
      {/* Breadcrumb */}
      <div className="reveal-up mb-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
      </div>

      {/* Two-column layout — 55/45 split */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Left — Who We Are */}
        <div className="lg:w-[55%] reveal-up">
          <p className="text-metadata font-semibold uppercase tracking-wider text-be-yellow-text mb-2">
            Who We Are
          </p>
          <h1 className="text-page-h1 text-be-charcoal-950 mb-4">
            About Bharat Electrosafe
          </h1>
          <p className="text-body-large text-be-grey-650 max-w-xl mb-5">
            India&apos;s trusted name in precision-engineered electrical safety,
            industrial safety, infrastructure protection, PVC flooring, and
            waterproofing solutions — proudly contributing to the nation&apos;s
            safety and development under the Make in India initiative.
          </p>

          {/* Product range — compact 2×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {productRange.map(({ icon: Icon, title, standard }) => (
              <div
                key={title}
                className="flex items-start gap-2.5 p-2.5 rounded-md bg-be-cream/60"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-be-yellow-50 shrink-0">
                  <Icon className="h-4 w-4 text-be-yellow-text" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-be-charcoal-950 leading-snug">
                    {title}
                  </p>
                  <p className="text-metadata text-be-grey-650 mt-0.5">
                    {standard}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — manufacturing/product visual — controlled editorial frame */}
        <div className="lg:w-[45%] reveal-up">
          <div className="rounded-lg overflow-hidden max-h-[400px]">
            <Image
              src="/media/hero/bharat-electrosafe-insulating-mat-hero.webp"
              alt="Bharat Electrosafe — precision-engineered electrical safety products"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
