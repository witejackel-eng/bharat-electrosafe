'use client';

import { useState } from 'react';
import { insulationClasses } from '@/data/products';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { useProductDetail } from '@/components/products/ProductDetailProvider';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ProductSelection() {
  const [activeClass, setActiveClass] = useState<string | null>(null);
  const { openCompare } = useProductDetail();

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
      {/* Floating orange particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-orange opacity-[0.06] animate-float-particle-1" />
        <div className="absolute top-[60%] right-[25%] w-1.5 h-1.5 rounded-full bg-orange opacity-[0.06] animate-float-particle-2" />
        <div className="absolute bottom-[25%] left-[55%] w-2.5 h-2.5 rounded-full bg-orange opacity-[0.04] animate-float-particle-3" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative">
        {/* Section header */}
        <Reveal delay={0}>
          <span className="text-eyebrow gradient-text" style={{ color: '#F07830' }}>Start with the requirement</span>
          <div className="accent-bar animate-underline-reveal" />
        </Reveal>
        <Reveal delay={80}>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-3 max-w-[640px] gradient-text"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Choose electrical insulation by the highest operating voltage.
          </h2>
        </Reveal>

        {/* Class cards */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {insulationClasses.map((cls, i) => (
            <Reveal key={cls.className} delay={i * 100} translateY={18}>
              <div className="relative group/cls animate-morph-border">
                {/* Recommended badge on Class B */}
                {cls.className === 'B' && (
                  <div className="absolute -top-2 -right-2 z-20 inline-flex items-center px-2.5 py-1 rounded-full bg-orange text-white text-[0.65rem] font-bold uppercase tracking-wider shadow-md animate-badge-pulse animate-breathing-glow" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Recommended
                  </div>
                )}
                {/* Animated gradient border glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover/cls:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-orange), transparent, var(--color-orange))',
                    backgroundSize: '200% 200%',
                  }}
                  aria-hidden="true"
                />
                {/* Glassmorphism card background */}
                <div className="absolute inset-[2px] rounded-[14px] bg-gradient-to-b from-navy-dark/90 to-navy/95 backdrop-blur-[4px] pointer-events-none" aria-hidden="true" />
                <QuoteButton
                  productSystem="electrical-insulation"
                  productClass={cls.className}
                  variant="ghost"
                  className="w-full !bg-navy-dark/90 hover:!bg-navy-light/30 !border !border-white/10 hover:!border-orange/40 !rounded-2xl !p-6 md:!p-8 !h-auto !flex !flex-col !items-start !text-left transition-all duration-300 group/cls backdrop-blur-[4px] relative"
                >
                  {/* Pulsing orange accent line */}
                  <div className="w-full h-[2px] bg-orange/30 mb-4 rounded-full group-hover/cls:bg-orange/60 transition-colors duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange/40 to-transparent animate-shimmer opacity-0 group-hover/cls:opacity-100 transition-opacity duration-300" />
                  </div>
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
                    <span className="text-spec text-white/70" style={{ fontFamily: "'Manrope', sans-serif" }}>{cls.voltageUnit}</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span
                      className="text-xl md:text-2xl font-semibold text-white"
                      style={{ fontVariantNumeric: 'tabular-nums', fontFamily: "'Manrope', sans-serif" }}
                    >
                      {cls.thickness}
                    </span>
                    <span className="text-spec text-white/70" style={{ fontFamily: "'Manrope', sans-serif" }}>{cls.thicknessUnit}</span>
                  </div>
                  <p className="text-sm text-white/85 leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {cls.description}
                  </p>
                  <span className="mt-4 text-xs text-orange/90 inline-flex items-center gap-1 font-medium">
                    Request quote for Class {cls.className}
                    <ArrowRight className="size-3 transition-transform group-hover/cls:translate-x-1" />
                  </span>
                </QuoteButton>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTAs */}
        <Reveal delay={300}>
          <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
            <Button
              onClick={openCompare}
              className="bg-orange hover:bg-orange-hover text-white font-medium px-6 h-11 rounded-lg"
            >
              Compare full specifications
              <ArrowRight className="size-4 ml-1" />
            </Button>
            <QuoteButton
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50 font-medium px-6 h-11 rounded-lg"
            >
              Ask technical sales
            </QuoteButton>
          </div>

          {/* Alternative path */}
          <Link
            href="#civil-protection"
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-orange mt-6 transition-colors group/alt"
          >
            Not selecting an electrical mat?
            <span className="transition-transform duration-200 group-hover/alt:translate-x-1">Explore waterproofing and water-stop systems →</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
