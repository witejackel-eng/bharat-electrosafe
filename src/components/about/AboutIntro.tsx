'use client';

import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionShell } from '@/components/ui/SectionShell';
import { CheckCircle2 } from 'lucide-react';

/**
 * AboutIntro — "Who We Are" single coherent About section.
 *
 * Layout (desktop):
 *   ┌──────────────────────────┬──────────────────────────┐
 *   │ WHO WE ARE               │                          │
 *   │ Bharat Electrosafe       │  insulating-mat hero     │
 *   │ profile paragraph 1      │  image (stretched to     │
 *   │ profile paragraph 2      │  match content height)   │
 *   │ Product Scope heading    │                          │
 *   │ product list...          │                          │
 *   ├──────────────────────────┼──────────────────────────┤
 *   │                          │                          │
 *   │ electrical-insulation    │  closing company         │
 *   │ poster image             │  paragraph (centered     │
 *   │                          │  beside poster)          │
 *   └──────────────────────────┴──────────────────────────┘
 *
 * Upper section: CSS Grid with items-stretch. The image column
 * uses flex-col + flex-1 internally so the image container
 * stretches to fill the full grid cell height, and the Image
 * (fill + object-cover) fills that container.
 *
 * Lower section: CSS Grid with items-stretch. The text cell uses
 * flex-col + justify-center internally to vertically center the
 * short closing paragraph beside the taller poster image.
 * The poster renders at its natural portrait dimensions
 * (object-contain preserves the artwork).
 *
 * Mobile: stacks vertically — image → text → image → text.
 * On mobile the image returns to a natural aspect-ratio
 * (aspect-[4/3]) instead of stretching.
 *
 * "Bharat Electrosafe" is a single-line heading on desktop
 * (whitespace-nowrap at lg+), natural wrap on smaller viewports.
 *
 * Content source: client-approved About docx — verbatim.
 *
 * Product names are bold (font-bold), standards remain normal weight.
 */

export default function AboutIntro() {
  return (
    <SectionShell variant="hero" bg="be-page-top-tint">
      {/* Breadcrumb */}
      <div className="reveal-up mb-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
      </div>

      {/* ── Upper area: Who We Are text (left) + hero image (right) ──
       *  CSS Grid with items-stretch: the image column stretches to
       *  match the content column height, eliminating the gap where
       *  the image previously ended prematurely. */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] items-stretch gap-8 lg:gap-10">
        {/* Left — Who We Are text column */}
        <div className="reveal-up">
          <p className="text-metadata font-semibold uppercase tracking-wider text-be-yellow-text mb-2">
            Who We Are
          </p>
          {/* Single-line on desktop (lg+), natural wrap on mobile */}
          <h1 className="text-page-h1 text-be-charcoal-950 mb-5 whitespace-normal lg:whitespace-nowrap">
            Bharat Electrosafe
          </h1>

          <p className="text-body-large text-be-grey-650 leading-relaxed mb-4">
            At Bharat Electrosafe, we are India&rsquo;s trusted name in
            precision-engineered electrical safety, industrial safety,
            infrastructure protection, PVC flooring, and waterproofing
            solutions. Proudly contributing to the nation&rsquo;s safety and
            development under the Make in India initiative, we are committed
            to delivering high-quality products that protect lives, ensure
            compliance, and support critical industrial, commercial, and
            infrastructure operations across multiple sectors.
          </p>

          <p className="text-body text-be-grey-650 leading-relaxed mb-5">
            With a strong focus on quality, durability, and regulatory
            compliance, our solutions are designed to meet the highest Indian
            standards and serve industries such as power, construction,
            infrastructure, water management, manufacturing, and industrial
            utilities.
          </p>

          {/* ── Product Scope ── */}
          <p className="text-sm font-bold uppercase tracking-wider text-be-charcoal-950 mb-3">
            Our wide product range includes:
          </p>

          <ul className="flex flex-col gap-3 mb-0">
            {/* 1. High Voltage Electrical Insulating Mats */}
            <li className="flex items-start gap-2.5">
              <CheckCircle2
                className="h-4 w-4 text-be-yellow-text mt-1.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-body font-bold text-be-charcoal-950 leading-snug">
                  High Voltage Electrical Insulating Mats
                </p>
                <p className="text-body text-be-grey-650 leading-snug mt-0.5">
                  (As per IS 15652 &amp; IEC 61111 standards; ERDA-tested and BIS-certified)
                </p>
              </div>
            </li>

            {/* 2. Geo Membrane Lining Solutions */}
            <li className="flex items-start gap-2.5">
              <CheckCircle2
                className="h-4 w-4 text-be-yellow-text mt-1.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-body font-bold text-be-charcoal-950 leading-snug">
                  Geo Membrane Lining Solutions
                </p>
                <p className="text-body text-be-grey-650 leading-snug mt-0.5">
                  (As per IS 15909:2020 for containment, lining, and environmental protection applications)
                </p>
              </div>
            </li>

            {/* 3. Water Proofing Solutions */}
            <li className="flex items-start gap-2.5">
              <CheckCircle2
                className="h-4 w-4 text-be-yellow-text mt-1.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-body font-bold text-be-charcoal-950 leading-snug">
                  Water Proofing Solutions
                </p>
                <p className="text-body text-be-grey-650 leading-snug mt-0.5">
                  (Including BharatHydro Water Stop Seals as per IS 15058:2002 for concrete joint sealing and water leakage prevention)
                </p>
              </div>
            </li>

            {/* 4. PVC Flooring Solutions */}
            <li className="flex items-start gap-2.5">
              <CheckCircle2
                className="h-4 w-4 text-be-yellow-text mt-1.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-body font-bold text-be-charcoal-950 leading-snug">
                  PVC Flooring Solutions
                </p>
                <p className="text-body text-be-grey-650 leading-snug mt-0.5">
                  (As per IS 3462:1986 for industrial, electrical, and commercial flooring applications)
                </p>
              </div>
            </li>

            {/* 5. Other Products */}
            <li className="flex items-start gap-2.5">
              <CheckCircle2
                className="h-4 w-4 text-be-yellow-text mt-1.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-body text-be-charcoal-950 leading-snug">
                  <span className="font-bold">Other Products:</span> Rubber Sheets, Rubber Hose Pipes, ESD Mats, Conveyor Belts, and other industrial rubber and safety solutions.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Right — Hero image — stretches to match content height on
         *  desktop. The grid child uses lg:flex-col so the inner image
         *  container (lg:flex-1) stretches to fill the full cell height.
         *  On mobile, returns to a natural 4:3 aspect ratio. The Image
         *  (fill + object-cover) fills the container without distortion. */}
        <div className="reveal-up lg:flex lg:flex-col">
          <div className="relative rounded-lg overflow-hidden
            aspect-[4/3] lg:aspect-auto lg:flex-1
          ">
            <Image
              src="/media/hero/bharat-electrosafe-insulating-mat-hero.webp"
              alt="Bharat Electrosafe electrical insulating mat in use"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </div>

      {/* ── Lower area: poster image (left) + closing paragraph (right) ──
       *  CSS Grid with items-stretch. The poster image (portrait) is
       *  naturally taller than the short closing paragraph. The text
       *  cell uses flex items-center to vertically center the text
       *  beside the poster on desktop, creating a balanced
       *  image/content relationship. */}
      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] items-stretch gap-8 lg:gap-10 mt-10 lg:mt-14">
        {/* Left — Client-supplied poster */}
        <div className="reveal-up order-2 lg:order-1">
          <div className="rounded-lg overflow-hidden bg-be-cream/40 p-3">
            <Image
              src="/media/about/electrical-insulation-mat-poster-client-provided.png"
              alt="Bharat Electrosafe electrical insulation mat poster"
              width={700}
              height={900}
              className="w-full h-auto object-contain"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>

        {/* Right — Closing company paragraph — vertically centered
         *  beside the poster on desktop via flex-col + justify-center
         *  within the stretched grid cell, for a balanced layout. */}
        <div className="reveal-up order-1 lg:order-2 lg:flex lg:flex-col lg:justify-center">
          <p className="text-body-large text-be-grey-650 leading-relaxed">
            At Bharat Electrosafe, we combine engineering excellence,
            compliance assurance, and customer-centric innovation to deliver
            reliable, durable, and standards-compliant solutions for modern
            industry and infrastructure.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
