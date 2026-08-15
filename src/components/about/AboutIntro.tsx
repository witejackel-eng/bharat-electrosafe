'use client';

import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionShell } from '@/components/ui/SectionShell';
import { ShieldCheck, Layers, Droplets, Zap, CheckCircle2 } from 'lucide-react';

/**
 * AboutIntro — "Who We Are" + "Company Profile" as two clearly separated sections.
 *
 * Layout:
 *   WHO WE ARE
 *     LEFT  — Who We Are text (breadcrumb + heading + intro + product grid)
 *     RIGHT — Who We Are image (insulating-mat hero)
 *
 *   ──────────────── full-viewport-width 1px divider ────────────────
 *
 *   COMPANY PROFILE
 *     LEFT  — Company Profile text (heading + paragraphs + product scope)
 *     RIGHT — Company Profile image (client-provided poster)
 *
 * The two sections are fully independent — images do NOT touch the divider,
 * and the divider spans the entire viewport width (not just the content
 * container). This creates clear structural separation with premium,
 * editorial spacing.
 *
 * "Bharat Electrosafe" is displayed as a single-line heading on desktop
 * (whitespace-nowrap at lg+) and naturally wraps on smaller viewports.
 *
 * Content source: client About docx.
 */

const productRange = [
  { icon: Zap, title: 'High Voltage Insulating Mats', standard: 'IS 15652:2006 & IEC 61111:2009' },
  { icon: Layers, title: 'Geo Membrane Lining', standard: 'IS 15909:2020' },
  { icon: Droplets, title: 'Water Stop Seal', standard: 'IS 15058:2002' },
  { icon: ShieldCheck, title: 'PVC Flooring', standard: 'IS 3462:1986' },
];

const productScope = [
  'High Voltage Electrical Insulating Mats (IS 15652:2006 & IEC 61111:2009; ERDA-tested and BIS licensed)',
  'Geo Membrane Lining (IS 15909:2020 for containment, lining and environmental protection applications)',
  'Water Stop Seal (IS 15058:2002 for concrete joint sealing and water leakage prevention)',
  'PVC Flooring Solutions (IS 3462:1986 for residential, office and commercial interior flooring applications)',
  'Other Products: Rubber Sheets, Rubber Hose Pipes, ESD Mats, Conveyor Belts',
];

export default function AboutIntro() {
  return (
    <>
      {/* ── WHO WE ARE ── */}
      <SectionShell variant="hero" bg="be-page-top-tint">
        {/* Breadcrumb */}
        <div className="reveal-up mb-6">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
        </div>

        {/* Two-column layout — 55/45 split */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* Left — Who We Are text column */}
          <div className="lg:w-[55%] reveal-up">
            <p className="text-metadata font-semibold uppercase tracking-wider text-be-yellow-text mb-2">
              Who We Are
            </p>
            {/* Single-line on desktop (lg+), natural wrap on mobile */}
            <h1 className="text-page-h1 text-be-charcoal-950 mb-4 whitespace-nowrap lg:whitespace-nowrap">
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

          {/* Right — Who We Are image */}
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
      </SectionShell>

      {/* ── Full-viewport-width section divider ── */}
      <div
        className="w-full h-px bg-be-grey-250"
        aria-hidden="true"
      />

      {/* ── COMPANY PROFILE ── */}
      <SectionShell variant="standard" bg="be-page-top-tint">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* Left — Company Profile text column */}
          <div className="lg:w-[55%] reveal-up">
            <p className="text-metadata font-semibold uppercase tracking-wider text-be-yellow-text mb-2">
              Company Profile
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-be-charcoal-950 tracking-tight leading-snug mb-4">
              About Bharat Electrosafe
            </h2>

            <p className="text-body-large text-be-grey-650 leading-relaxed mb-3">
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

            {/* Product scope list */}
            <p className="text-sm font-bold uppercase tracking-wider text-be-charcoal-950 mb-3">
              Product Scope
            </p>
            <ul className="flex flex-col gap-2.5">
              {productScope.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle2
                    className="h-4 w-4 text-be-yellow-text mt-1 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-body text-be-grey-650 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Company Profile image */}
          <div className="lg:w-[45%] reveal-up">
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
    </>
  );
}
