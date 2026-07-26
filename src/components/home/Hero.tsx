'use client';

import { useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { useProductDetail } from '@/components/products/ProductDetailProvider';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { productSystems } from '@/data/products';

const systemIndicators = [
  {
    index: '01',
    id: 'electrical-insulation',
    name: 'Electrical insulation',
    description: 'Insulating mats for Class A, B and C requirements',
  },
  {
    index: '02',
    id: 'visible-safety',
    name: 'Visible safety',
    description: 'Strip, bi-colour and reflective safety variants',
  },
  {
    index: '03',
    id: 'civil-protection',
    name: 'Civil protection',
    description: 'Geomembrane and water-stop systems',
  },
];

export function Hero() {
  const [activeSystem, setActiveSystem] = useState<number | null>(null);
  const { openProduct } = useProductDetail();

  return (
    <section className="relative overflow-hidden bg-background pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-24">
      {/* Subtle material texture band at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-orange/20" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Desktop: Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left column: Copy */}
          <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-6 lg:pt-8">
            <Reveal delay={0} as="p">
              <span className="text-eyebrow">Electrical and infrastructure protection</span>
            </Reveal>

            <Reveal delay={80} as="div">
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.2rem] font-bold text-navy leading-[1.1] tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Protection systems for environments that cannot afford failure.
              </h1>
            </Reveal>

            <Reveal delay={160} as="div">
              <p className="text-base md:text-lg text-steel leading-relaxed max-w-[520px]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Electrical insulating mats, visible-safety variants, geomembranes and water-stop solutions for industrial, utility and infrastructure projects.
              </p>
            </Reveal>

            {/* System indicators */}
            <div className="flex flex-col gap-2 mt-2">
              {systemIndicators.map((system, i) => (
                <Reveal key={system.index} delay={240 + i * 80}>
                  <button
                    type="button"
                    onClick={() => openProduct(system.id)}
                    className="group flex items-start gap-3 py-2 w-full text-left cursor-pointer rounded-lg"
                    onMouseEnter={() => setActiveSystem(i)}
                    onMouseLeave={() => setActiveSystem(null)}
                    style={{
                      opacity: activeSystem !== null && activeSystem !== i ? 0.55 : 1,
                      transition: 'opacity 200ms ease',
                    }}
                  >
                    <span className="text-eyebrow shrink-0 mt-0.5">{system.index}</span>
                    <div>
                      <span className="text-sm font-semibold text-navy block group-hover:text-orange transition-colors">
                        {system.name}
                      </span>
                      <span className="text-xs text-steel">{system.description}</span>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>

            {/* CTAs */}
            <Reveal delay={480} as="div">
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <Button
                  className="bg-orange hover:bg-orange-hover text-white font-medium px-6 h-11 rounded-lg"
                  asChild
                >
                  <Link href="#products">
                    Explore our products
                    <ArrowRight className="size-4 ml-1" />
                  </Link>
                </Button>
                <QuoteButton
                  variant="outline"
                  className="border-navy text-navy hover:bg-navy hover:text-white font-medium px-6 h-11 rounded-lg"
                >
                  Request a technical quote
                </QuoteButton>
              </div>
              <Link
                href="#proof"
                className="inline-flex items-center gap-1 text-sm text-steel hover:text-orange mt-3 transition-colors"
              >
                View certificates and testing →
              </Link>
            </Reveal>
          </div>

          {/* Right column: Hero composition */}
          <div className="lg:col-span-7 relative">
            <Reveal delay={300} translateY={30} duration={800}>
              <div className="relative w-full aspect-[7/4] rounded-2xl overflow-hidden bg-muted">
                {/* Material texture strip as section accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange via-orange/60 to-transparent z-10" />
                <Image
                  src="/images/hero-composition.png"
                  alt="Bharat Electrosafe product systems — insulating mats, visible-safety variants, geomembranes and water-stop solutions"
                  fill
                  className="object-cover transition-transform duration-[800ms] ease-out"
                  style={{ transform: 'scale(1.035)' }}
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                {/* Floating label overlays */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {productSystems.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => openProduct(s.id)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/40 text-xs font-medium text-navy hover:bg-white transition-colors"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      <span className="text-orange font-bold">{s.index}</span>
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
