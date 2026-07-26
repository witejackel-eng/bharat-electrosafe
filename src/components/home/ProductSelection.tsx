'use client';

import { useState } from 'react';
import { insulationClasses } from '@/data/products';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ProductSelection() {
  const [activeClass, setActiveClass] = useState<string | null>(null);

  return (
    <section className="bg-navy py-20 md:py-28 relative overflow-hidden">
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
              <div
                className="relative bg-navy-dark border border-white/10 rounded-2xl p-6 md:p-8 cursor-pointer group transition-all duration-300"
                onMouseEnter={() => setActiveClass(cls.className)}
                onMouseLeave={() => setActiveClass(null)}
                style={{
                  opacity: activeClass !== null && activeClass !== cls.className ? 0.5 : 1,
                  borderColor: activeClass === cls.className ? 'rgba(232, 97, 26, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                  background: activeClass === cls.className
                    ? 'linear-gradient(135deg, rgba(232, 97, 26, 0.06), rgba(15, 29, 53, 1))'
                    : 'rgba(15, 29, 53, 1)',
                }}
              >
                {/* Orange accent line */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-orange/0 via-orange/30 to-orange/0 group-hover:via-orange/60 transition-all duration-300" />

                {/* Class label */}
                <span className="text-eyebrow mb-4 block" style={{ color: '#F07830', fontFamily: "'Manrope', sans-serif" }}>
                  CLASS {cls.className}
                </span>

                {/* Voltage - large tabular numeral */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className="text-4xl md:text-5xl font-bold text-white"
                    style={{ fontVariantNumeric: 'tabular-nums', fontFamily: "'Manrope', sans-serif" }}
                  >
                    {cls.voltage}
                  </span>
                  <span className="text-spec text-white/60" style={{ fontFamily: "'Manrope', sans-serif" }}>{cls.voltageUnit}</span>
                </div>

                {/* Thickness */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span
                    className="text-xl md:text-2xl font-semibold text-white"
                    style={{ fontVariantNumeric: 'tabular-nums', fontFamily: "'Manrope', sans-serif" }}
                  >
                    {cls.thickness}
                  </span>
                  <span className="text-spec text-white/60" style={{ fontFamily: "'Manrope', sans-serif" }}>{cls.thicknessUnit}</span>
                </div>

                {/* Separator line */}
                <div className="w-full h-[2px] bg-orange/30 mb-4 rounded-full" />

                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {cls.description}
                </p>
              </div>
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
              <Link href="#products">
                Compare full specifications
                <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/30 font-medium px-6 h-11 rounded-lg"
              asChild
            >
              <Link href="#quote">Ask technical sales</Link>
            </Button>
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
