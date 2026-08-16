'use client';

import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionShell } from '@/components/ui/SectionShell';
import { CheckCircle2 } from 'lucide-react';

/**
 * AboutIntro — "Who We Are" section (intro only, no product list).
 *
 * Layout (desktop):
 *   ┌──────────────────────────┬──────────────────────────┐
 *   │ WHO WE ARE               │                          │
 *   │ Bharat Electrosafe       │  insulating-mat hero     │
 *   │ profile paragraph 1      │  image (stretched to     │
 *   │ profile paragraph 2      │  match content height)   │
 *   │ profile paragraph 3      │                          │
 *   └──────────────────────────┴──────────────────────────┘
 *
 * CSS Grid with items-stretch. The image column uses `position:
 * relative` on the grid item and `position: absolute; inset: 0`
 * on the image container, guaranteeing the image fills the full
 * stretched grid cell height. On mobile, an in-flow aspect-[4/3]
 * spacer provides natural height.
 *
 * The product bullet list has been moved to a separate
 * ProductScope component that pairs with the poster image.
 *
 * "Bharat Electrosafe" is a single-line heading on desktop
 * (whitespace-nowrap at lg+), natural wrap on smaller viewports.
 *
 * Content source: client-approved restructured copy — verbatim.
 */

export default function AboutIntro() {
  return (
    <SectionShell variant="hero" bg="be-page-top-tint">
      {/* Breadcrumb */}
      <div className="reveal-up mb-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
      </div>

      {/* ── Who We Are text (left) + hero image (right) ──
       *  CSS Grid with items-stretch: the image column stretches to
       *  match the content column height. */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] items-stretch gap-8 lg:gap-10">
        {/* Left — Who We Are text column (three paragraphs only) */}
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

          <p className="text-body text-be-grey-650 leading-relaxed mb-4">
            With a strong focus on quality, durability, and regulatory
            compliance, our solutions are designed to meet the highest Indian
            standards and serve industries such as power, construction,
            infrastructure, water management, manufacturing, and industrial
            utilities.
          </p>

          <p className="text-body text-be-grey-650 leading-relaxed">
            At Bharat Electrosafe, we combine engineering excellence,
            compliance assurance, and customer-centric innovation to deliver
            reliable, durable, and standards-compliant solutions for modern
            industry and infrastructure.
          </p>
        </div>

        {/* Right — Hero image — fills the full grid cell height on
         *  desktop. The grid item is `relative` so the absolutely
         *  positioned image container (`inset-0`) fills the entire
         *  stretched cell. On mobile, an in-flow aspect-[4/3] spacer
         *  provides the container's natural height. */}
        <div className="reveal-up relative">
          <div className="aspect-[4/3] lg:aspect-auto" aria-hidden="true" />
          <div className="absolute inset-0 rounded-lg overflow-hidden">
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
    </SectionShell>
  );
}
