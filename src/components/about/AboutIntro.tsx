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
 *   │ profile paragraph 1      │  image                   │
 *   │ profile paragraph 2      │                          │
 *   │ Product Scope heading    │                          │
 *   │ product list...          │                          │
 *   ├──────────────────────────┼──────────────────────────┤
 *   │                          │                          │
 *   │ electrical-insulation    │  closing company         │
 *   │ poster image             │  paragraph               │
 *   │                          │                          │
 *   └──────────────────────────┴──────────────────────────┘
 *
 * Mobile: stacks vertically — image → text → image → text.
 *
 * "Bharat Electrosafe" is a single-line heading on desktop
 * (whitespace-nowrap at lg+), natural wrap on smaller viewports.
 *
 * Content source: client-approved About docx — verbatim.
 *
 * Product names are bold (font-bold), standards remain normal weight.
 * The old 2×2 product-range card grid is removed — it duplicated
 * the same information as the Product Scope list below it.
 */

export default function AboutIntro() {
  return (
    <SectionShell variant="hero" bg="be-page-top-tint">
      {/* Breadcrumb */}
      <div className="reveal-up mb-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
      </div>

      {/* ── Upper area: Who We Are text (left) + hero image (right) ── */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
        {/* Left — Who We Are text column */}
        <div className="lg:w-[55%] reveal-up">
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

        {/* Right — Who We Are image (insulating-mat hero) */}
        <div className="lg:w-[45%] reveal-up">
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
        </div>
      </div>

      {/* ── Lower area: poster image (left) + closing paragraph (right) ── */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start mt-10 lg:mt-14">
        {/* Left — Client-supplied poster */}
        <div className="lg:w-[45%] reveal-up order-2 lg:order-1">
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

        {/* Right — Closing company paragraph */}
        <div className="lg:w-[55%] reveal-up order-1 lg:order-2">
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
