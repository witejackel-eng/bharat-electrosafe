'use client';

import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionShell } from '@/components/ui/SectionShell';
import { ShieldCheck, Layers, Droplets, Zap } from 'lucide-react';

/**
 * AboutIntro — "Who We Are" hero section.
 *
 * Two-column editorial layout:
 *   LEFT  — text column (eyebrow, H1, intro, product range)
 *   RIGHT — media column (two approved images stacked vertically)
 *
 * The stacked media column visually balances the full company profile
 * height. On mobile, images and6stack naturally.
 *
 * Content source: client About docx.
 */

const productRange = [
  { icon: Zap, title: 'High Voltage Insulating Mats', standard: 'IS 15652:2006 & IEC 61111:2009' },
  { icon: Layers, title: 'Geo Membrane Lining', standard: 'IS 15909:2020' },
  { icon: Droplets, title: 'Water Stop Seal', standard: 'IS 15058:2002' },
  { icon: ShieldCheck, title: 'PVC Flooring', standard: 'IS 3462:1986' },
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
        {/* Left — Who We Are text column */}
        <div className="lg:w-[55%] reveal-up">
          <p className="text-metadata font-semibold uppercase tracking-wider text-be-yellow-text mb-2">
            Who We Are
          </p>
          <h1 className="text-page-h1 text-be-charcoal-950 mb-4">
            Bharat Electrosafe
          </h1>
          <p className="text-body-large text-be-grey-650 max-w-xl mb-5">
            Bharat Electrosafe manufactures electrical insulating mats for
            switchgear, substations and industrial electrical work areas. Its
            product range also includes waterproofing systems, PVC flooring and
            related industrial products for infrastructure and industrial
            applications.
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

        {/* Right — media column: two approved images stacked vertically */}
        <div className="lg:w-[45%] reveal-up flex flex-col gap-4">
          {/* Technician / insulating-mat application image — object-cover */}
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/media/hero/bharat-electrosafe-insulating-mat-hero.webp"
              alt="Bharat Electrosafe electrical insulating mat in use"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>

          {/* Client-supplied poster — object-contain (never crop embedded text or logos) */}
          <div className="rounded-lg overflow-hidden bg-be-cream/40 p-3">
            <Image
              src="/media/about/electrical-insulation-mat-poster-client-provided.png"
              alt="Bharat Electrosafe electrical insulation mat poster"
              width={700}
              height={900}
              className="w-full h-auto object-contain"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
