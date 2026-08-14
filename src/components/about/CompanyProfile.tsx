'use client';

import Image from 'next/image';
import { SectionShell } from '@/components/ui/SectionShell';
import { CheckCircle2 } from 'lucide-react';

/**
 * CompanyProfile — "Who We Are" editorial block.
 *
 * Compact image-left / copy-right layout on desktop (35-40% / 60-65%),
 * copy-first / image-second on mobile. White/warm-white background.
 *
 * Image: client-supplied poster — object-contain to never crop text or logo.
 * Content: client-supplied source material (no Tata Precision relationship).
 */

const productScope = [
  'High Voltage Electrical Insulating Mats (IS 15652:2006 & IEC 61111:2009; ERDA-tested and BIS licensed)',
  'Geo Membrane Lining (IS 15909:2020 for containment, lining and environmental protection applications)',
  'Water Stop Seal (IS 15058:2002 for concrete joint sealing and water leakage prevention)',
  'PVC Flooring Solutions (IS 3462:1986 for industrial, electrical and commercial flooring applications)',
  'Other Products: Rubber Sheets, Rubber Hose Pipes, ESD Mats, Conveyor Belts',
];

export default function CompanyProfile() {
  return (
    <SectionShell variant="standard" bg="bg-be-warm-white">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
        {/* Desktop: image left (35-40%) — Mobile: image second */}
        <div className="order-2 lg:order-1 lg:w-[38%] reveal-up">
          <div className="rounded-lg overflow-hidden bg-be-cream/40 p-4">
            <Image
              src="/media/about/electrical-insulation-mat-poster-client-provided.png"
              alt="Bharat Electrosafe electrical insulation mat poster"
              width={700}
              height={900}
              className="w-full h-auto object-contain"
              sizes="(max-width: 1024px) 100vw, 38vw"
            />
          </div>
        </div>

        {/* Desktop: copy right (60-65%) — Mobile: copy first */}
        <div className="order-1 lg:order-2 lg:w-[62%] reveal-up">
          <p className="text-metadata font-semibold uppercase tracking-wider text-be-yellow-text mb-2">
            Who We Are
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-be-charcoal-950 tracking-tight leading-snug mb-5">
            Company Profile
          </h2>

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

          <p className="text-body text-be-grey-650 leading-relaxed mb-6">
            With a strong focus on quality, durability, and regulatory
            compliance, our solutions are designed to meet the highest Indian
            standards and serve industries such as power, construction,
            infrastructure, water management, manufacturing, and industrial
            utilities.
          </p>

          {/* Product scope list */}
          <p className="text-sm font-semibold uppercase tracking-wider text-be-charcoal-950 mb-3">
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
      </div>
    </SectionShell>
  );
}
