'use client';

import { Eyebrow } from '@/components/ui/Eyebrow';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { TechnicalBadge } from '@/components/ui/TechnicalBadge';
import { ImageFrame } from '@/components/ui/ImageFrame';

const proofItems = [
  'IS 15652:2006',
  'BIS licence',
  'Tested documentation',
  'Custom dimensions',
];

export default function HomeHero() {
  return (
    <section className="bg-be-warm-white section-padding-major">
      <div className="container-site page-horizontal-padding">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-[650px] lg:min-h-[720px]">
          {/* Copy — 55% */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center reveal-up">
            <Eyebrow className="mb-6">
              ELECTRICAL INSULATION AND INDUSTRIAL PROTECTION
            </Eyebrow>

            <h1 className="text-hero-h1 text-be-charcoal-950 mb-6">
              Certified protection for critical electrical environments.
            </h1>

            <p className="text-body-large text-be-grey-650 max-w-xl mb-8">
              Electrical insulating mats and engineered protection products for
              control panels, substations, utilities, industry and
              infrastructure.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <PrimaryButton href="/products/electrical-insulating-mats" size="lg">
                View Products
              </PrimaryButton>
              <SecondaryButton href="/contact-us">
                Request a Quote
              </SecondaryButton>
            </div>

            {/* Proof line */}
            <div className="flex flex-wrap gap-2">
              {proofItems.map((item) => (
                <TechnicalBadge key={item} label={item} />
              ))}
            </div>
          </div>

          {/* Media — 45% */}
          <div className="w-full lg:w-[45%] reveal-up">
            <div className="bg-be-yellow-50 rounded-lg">
              <ImageFrame
                alt="Electrical insulating mat product display"
                slotId="HOME-HERO-01"
                aspectRatio="landscape"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
