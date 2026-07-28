'use client';

import { useEffect, useRef } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { TechnicalBadge } from '@/components/ui/TechnicalBadge';
import HeroTechnicalVisual from '@/components/home/HeroTechnicalVisual';

const proofItems = [
  'IS 15652:2006',
  'BIS Licence CM/L:8800129617',
  'ERDA / NTH Tested',
  'Conforming to IEC 61111',
];

export default function HomeHero() {
  const staggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!staggerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(staggerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-be-warm-white hero-padding">
      <div className="container-site page-horizontal-padding">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 min-h-[560px] lg:min-h-[640px]">
          {/* Copy — ~55% */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center reveal-up relative">
            {/* Vertical yellow decorative bar — ties to the mat's yellow edge */}
            <div className="hidden lg:block absolute -left-6 top-0 bottom-0 w-1 bg-be-yellow-500 rounded-full" />

            {/* Eyebrow with animated underline */}
            <div className="mb-6 relative">
              <Eyebrow>
                ELECTRICAL INSULATION AND INDUSTRIAL PROTECTION
              </Eyebrow>
              {/* Animated yellow underline that slides in */}
              <div className="mt-2 h-0.5 bg-be-yellow-500 rounded animate-slide-in" style={{ width: '80px' }} />
            </div>

            <h1 className="text-hero-h1 text-be-charcoal-950 mb-6">
              Certified protection
              <br className="hidden lg:block" /> for critical electrical environments.
            </h1>

            <p className="text-body-large text-be-grey-650 max-w-xl mb-8">
              Electrical insulating mats and engineered protection products for
              control panels, substations, utilities, industry and
              infrastructure.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <PrimaryButton
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
              >
                View Products
              </PrimaryButton>
              <SecondaryButton href="/contact-us">
                Request a Quote
              </SecondaryButton>
            </div>

            {/* Subtle horizontal separator */}
            <div className="w-full h-px bg-be-grey-250 mb-6" />

            {/* Proof line — staggered reveal */}
            <div ref={staggerRef} className="stagger-reveal flex flex-wrap gap-2">
              {proofItems.map((item) => (
                <TechnicalBadge key={item} label={item} />
              ))}
            </div>
          </div>

          {/* Technical visual — ~45%, aligned toward the right edge */}
          <div className="w-full lg:w-[45%] lg:ml-auto">
            <HeroTechnicalVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
