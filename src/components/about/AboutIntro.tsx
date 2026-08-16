'use client';

import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionShell } from '@/components/ui/SectionShell';

/**
 * AboutIntro — "Who We Are" section (intro only, no product list).
 *
 * Layout (desktop):
 *   ┌──────────────────────────┬──────────────────────────┐
 *   │ WHO WE ARE               │                          │
 *   │ Bharat Electrosafe       │  insulating-mat hero     │
 *   │ profile paragraph 1      │  image (centered         │
 *   │ profile paragraph 2      │  vertically beside       │
 *   │ profile paragraph 3      │  the text content)       │
 *   │ [BIS · ERDA · ISO]      │                          │
 *   └──────────────────────────┴──────────────────────────┘
 *
 * CSS Grid with items-center: the image column is vertically
 * centered beside the text column. The image uses a fixed
 * aspect-[4/3] ratio container on all viewports.
 *
 * Compact trust-badge row beneath the third paragraph adds
 * visual weight and reinforces credibility at a glance.
 *
 * The product bullet list lives in the separate ProductScope
 * component that pairs with the poster image.
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
       *  CSS Grid with items-center: the image is vertically
       *  centered beside the text column. */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] items-center gap-8 lg:gap-10">
        {/* Left — Who We Are text column (three paragraphs + badge row) */}
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

          <p className="text-body text-be-grey-650 leading-relaxed mb-5">
            At Bharat Electrosafe, we combine engineering excellence,
            compliance assurance, and customer-centric innovation to deliver
            reliable, durable, and standards-compliant solutions for modern
            industry and infrastructure.
          </p>

          {/* Compact trust-badge row — adds visual weight and
           * reinforces credibility at a glance. */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-be-yellow-50 border border-be-yellow-400/60 px-3 py-1 text-xs font-semibold text-be-charcoal-950 tracking-wide">
              BIS Licensed
            </span>
            <span className="inline-flex items-center rounded-full bg-be-yellow-50 border border-be-yellow-400/60 px-3 py-1 text-xs font-semibold text-be-charcoal-950 tracking-wide">
              ERDA Tested
            </span>
            <span className="inline-flex items-center rounded-full bg-be-yellow-50 border border-be-yellow-400/60 px-3 py-1 text-xs font-semibold text-be-charcoal-950 tracking-wide">
              ISO 9001:2015
            </span>
          </div>
        </div>

        {/* Right — Hero image — fixed aspect ratio, centered
         *  vertically beside the text column via items-center. */}
        <div className="reveal-up">
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
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
