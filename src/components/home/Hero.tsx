'use client';

import { useState, useRef, useCallback } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { useProductDetail } from '@/components/products/ProductDetailProvider';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Clock } from 'lucide-react';
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
  const sectionRef = useRef<HTMLElement>(null);
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Calculate offset: max 3px shift
    const dx = (e.clientX - centerX) / rect.width;
    const dy = (e.clientY - centerY) / rect.height;
    setImageOffset({
      x: dx * 3,
      y: dy * 3,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setImageOffset({ x: 0, y: 0 });
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-background pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-24"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.05] animate-hero-mesh-1"
          style={{
            background: 'radial-gradient(circle, var(--color-navy) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-10 -left-20 w-[300px] h-[300px] rounded-full opacity-[0.05] animate-hero-mesh-2"
          style={{
            background: 'radial-gradient(circle, var(--color-orange) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-[30%] w-[350px] h-[350px] rounded-full opacity-[0.04] animate-hero-mesh-1"
          style={{
            background: 'radial-gradient(circle, var(--color-navy) 0%, transparent 70%)',
            animationDelay: '-7s',
          }}
        />
      </div>

      {/* Animated safety-pulse line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange/40 to-transparent animate-safety-pulse" />

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
              <div className="relative w-full aspect-[7/4] rounded-2xl overflow-hidden bg-muted shadow-md ring-1 ring-border/40">
                {/* Material texture strip as section accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange via-orange/60 to-transparent z-10" />
                <Image
                  src="/images/hero-composition.png"
                  alt="Bharat Electrosafe product systems — insulating mats, visible-safety variants, geomembranes and water-stop solutions"
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04]"
                  style={{
                    transform: `scale(1.035) translate(${imageOffset.x}px, ${imageOffset.y}px)`,
                  }}
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />

                {/* Trust badge: ENGINEERED IN INDIA — top-right (existing) */}
                <div
                  className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-white/40 text-[0.65rem] font-semibold text-navy tabular-nums shadow-sm"
                  style={{ fontFamily: "'Manrope', sans-serif", animation: 'badgeFadeIn 0.6s ease-out 1.5s both' }}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange animate-pulse" aria-hidden="true" />
                  ENGINEERED IN INDIA
                </div>

                {/* Trust badge: BIS LICENCED — bottom-right */}
                <div
                  className="absolute bottom-14 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-white/40 text-[0.65rem] font-semibold text-navy tabular-nums shadow-sm"
                  style={{ fontFamily: "'Manrope', sans-serif", animation: 'badgeFadeIn 0.6s ease-out 2s both' }}
                >
                  <ShieldCheck className="size-3 text-orange" aria-hidden="true" />
                  BIS LICENCED
                </div>

                {/* Trust badge: 35+ YEARS — mid-left (lg+ only) */}
                <div
                  className="hidden lg:flex absolute top-[50%] -left-1 z-10 translate-y-[-50%] items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-white/40 text-[0.65rem] font-semibold text-navy tabular-nums shadow-sm"
                  style={{ fontFamily: "'Manrope', sans-serif", animation: 'badgeFadeIn 0.6s ease-out 2.5s both' }}
                >
                  <Clock className="size-3 text-orange" aria-hidden="true" />
                  35+ YEARS
                </div>

                {/* Floating label overlays */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {productSystems.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => openProduct(s.id)}
                      className="group/pill inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-white/40 text-xs font-medium text-navy hover:bg-white hover:border-orange/40 transition-all hover:shadow-sm"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      <span className="text-orange font-bold">{s.index}</span>
                      {s.name}
                      <span aria-hidden="true" className="text-orange opacity-0 group-hover/pill:opacity-100 transition-opacity">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
            {/* Decorative grid pattern below image */}
            <div className="hidden lg:block absolute -bottom-6 -left-6 -z-10 w-32 h-32 opacity-[0.04]" style={{
              backgroundImage: 'linear-gradient(to right, var(--color-navy) 1px, transparent 1px), linear-gradient(to bottom, var(--color-navy) 1px, transparent 1px)',
              backgroundSize: '12px 12px',
            }} aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Inline animations for badge fade-in */}
      <style jsx>{`
        @keyframes badgeFadeIn {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
