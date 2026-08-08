'use client';

import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionShell } from '@/components/ui/SectionShell';
import { ShieldCheck, Layers, Droplets, Zap } from 'lucide-react';

/**
 * AboutIntro — "Who We Are" hero section.
 *
 * Two-column layout with client-provided company description and
 * product-range summary. Uses a manufacturing/product image (NOT the
 * old Tata-branded visual).
 *
 * Content source: client About docx.
 */

const productRange = [
  {
    icon: Zap,
    title: 'High Voltage Electrical Insulating Mats',
    standard: 'IS 15652 & IEC 61111',
  },
  {
    icon: Layers,
    title: 'Geo Membrane Lining Solutions',
    standard: 'IS 15909:2020',
  },
  {
    icon: Droplets,
    title: 'Water Proofing Solutions',
    standard: 'BharatHydro Water Stop Seals, IS 15058:2002',
  },
  {
    icon: ShieldCheck,
    title: 'PVC Flooring Solutions',
    standard: 'IS 3462:1986',
  },
];

const otherProducts = [
  'Rubber Sheets',
  'Rubber Hose Pipes',
  'ESD Mats',
  'Conveyor Belts',
];

export default function AboutIntro() {
  return (
    <SectionShell variant="hero" bg="be-page-top-tint">
      {/* Breadcrumb */}
      <div className="reveal-up mb-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
        {/* Left — Who We Are */}
        <div className="lg:w-[55%] reveal-up">
          <p className="text-metadata font-semibold uppercase tracking-wider text-be-yellow-text mb-3">
            Who We Are
          </p>
          <h1 className="text-page-h1 text-be-charcoal-950 mb-6">
            About Bharat Electrosafe
          </h1>
          <p className="text-body-large text-be-grey-650 max-w-xl mb-8">
            Bharat Electrosafe — India&apos;s trusted name in precision-engineered
            electrical safety, industrial safety, infrastructure protection, PVC
            flooring, and waterproofing solutions. Proudly contributing to the
            nation&apos;s safety and development under the Make in India initiative,
            we are committed to delivering high-quality products that protect
            lives, ensure compliance, and support critical industrial, commercial,
            and infrastructure operations across multiple sectors.
          </p>

          {/* Product range highlights */}
          <div className="flex flex-col gap-4">
            {productRange.map(({ icon: Icon, title, standard }) => (
              <div
                key={title}
                className="flex items-start gap-3 p-3 rounded-lg bg-be-cream/60"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-md bg-be-yellow-50 shrink-0 mt-0.5">
                  <Icon className="h-4.5 w-4.5 text-be-yellow-text" aria-hidden="true" />
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

            {/* Other Products row */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-be-cream/60">
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-be-yellow-50 shrink-0 mt-0.5">
                <Layers className="h-4.5 w-4.5 text-be-yellow-text" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-be-charcoal-950 leading-snug">
                  Other Products
                </p>
                <p className="text-metadata text-be-grey-650 mt-0.5">
                  {otherProducts.join(' • ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — manufacturing/product visual */}
        <div className="lg:w-[45%] reveal-up">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/media/hero/bharat-electrosafe-insulating-mat-hero.webp"
              alt="Bharat Electrosafe — precision-engineered electrical safety products"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
