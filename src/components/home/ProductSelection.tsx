'use client';

import { useState } from 'react';
import { insulationClasses } from '@/data/products';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import { QuoteButton } from '@/components/quote/QuoteButton';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ProductSelection() {
  const [activeClass, setActiveClass] = useState<string | null>(null);

  return (
    <section id="product-selection" className="bg-navy py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'url(/images/mat-texture.png)',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative">
        {/* Section header */}
        <Reveal delay={0}>
          <span className="text-eyebrow" style={{ color: '#F07830' }}>Start with the requirement</span>
        </Reveal>
        <Reveal delay={80}>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-3 max-w-[640px]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Choose electrical insulation by the highest operating voltage.
          </h2>
        </Reveal>

        {/* Class cards */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {insulationClasses.map((cls, i) => (
            <Reveal key={cls.className} delay={i * 100} translateY={18}>
              <QuoteButton
                productSystem="electrical-insulation"
                productClass={cls.className}
                variant="ghost"
                className="w-full !bg-navy-dark hover:!bg-navy-light/30 !border !border-white/10 hover:!border-orange/40 !rounded-2xl !p-6 md:!p-8 !h-auto !flex !flex-col !items-start !text-left transition-all duration-300"
              >
                <span className="text-eyebrow mb-4 block" style={{ color: '#F07830', fontFamily: "'Manrope', sans-serif" }}>
                  CLASS {cls.className}
                </span>
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className="text-4xl md:text-5xl font-bold text-white"
                    style={{ fontVariantNumeric: 'tabular-nums', fontFamily: "'Manrope', sans-serif" }}
                  >
                    {cls.voltage}
                  </span>
                  <span className="text-spec text-white/60" style={{ fontFamily: "'Manrope', sans-serif" }}>{cls.voltageUnit}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span
                    className="text-xl md:text-2xl font-semibold text-white"
                    style={{ fontVariantNumeric: 'tabular-nums', fontFamily: "'Manrope', sans-serif" }}
                  >
                    {cls.thickness}
                  </span>
                  <span className="text-spec text-white/60" style={{ fontFamily: "'Manrope', sans-serif" }}>{cls.thicknessUnit}</span>
                </div>
                <div className="w-full h-[2px] bg-orange/30 mb-4 rounded-full" />
                <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {cls.description}
                </p>
                <span className="mt-4 text-xs text-orange/80 inline-flex items-center gap-1">
                  Request quote for Class {cls.className}
                  <ArrowRight className="size-3" />
                </span>
              </QuoteButton>
            </Reveal>
          ))}
        </div>

        {/* CTAs */}
        <Reveal delay={300}>
          <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
            <Button
              className="bg-orange hover:bg-orange-hover text-white font-medium px-6 h-11 rounded-lg"
              asChild
            >
              <Link href="#electrical-insulation">
                Compare full specifications
                <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
            <QuoteButton
              variant="outline"
              className="border-white/20 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/30 font-medium px-6 h-11 rounded-lg"
            >
              Ask technical sales
            </QuoteButton>
          </div>

          {/* Alternative path */}
          <Link
            href="#civil-protection"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-orange mt-6 transition-colors"
          >
            Not selecting an electrical mat?
            <span className="transition-transform duration-200 hover:translate-x-1">Explore waterproofing and water-stop systems →</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
