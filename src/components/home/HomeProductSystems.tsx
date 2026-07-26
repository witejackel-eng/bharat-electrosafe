'use client';

import { useState } from 'react';
import { productSystems } from '@/data/products';
import { Reveal } from '@/components/motion/Reveal';
import Image from 'next/image';
import { useProductDetail } from '@/components/products/ProductDetailProvider';

export function HomeProductSystems() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { openProduct, openCompare } = useProductDetail();

  return (
    <section id="products" className="bg-background py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-3">
            <Reveal delay={0}>
              <span className="text-eyebrow">What we make</span>
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy max-w-[600px] leading-tight"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Three product systems covering electrical insulation, visible safety and civil protection.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p
                className="text-sm md:text-base text-steel max-w-[480px] leading-relaxed"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Each system is engineered to a specific operational risk — electrical, visual or civil — and qualified by third-party testing.
              </p>
            </Reveal>
          </div>
          {/* Compare CTA */}
          <Reveal delay={140}>
            <button
              type="button"
              onClick={openCompare}
              className="group inline-flex items-center gap-2 px-5 h-10 rounded-lg border border-border bg-white text-navy hover:border-orange/50 hover:text-orange hover:shadow-sm transition-all text-sm font-medium shrink-0"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-orange-soft text-orange text-[0.65rem] font-bold tabular-nums">
                vs
              </span>
              Compare systems
              <span className="text-orange transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </button>
          </Reveal>
        </div>

        {/* Product panels */}
        <div className="mt-12 md:mt-16 flex flex-col gap-8 md:gap-16">
          {productSystems.map((system, i) => (
            <div key={system.id} id={system.id} className="scroll-mt-32">
              <Reveal delay={i * 120} translateY={24}>
                <div
                  className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center group ${
                    i % 2 === 1 ? 'md:[direction:rtl]' : ''
                  }`}
                  onMouseEnter={() => setHovered(system.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    opacity: hovered !== null && hovered !== system.id ? 0.6 : 1,
                    transition: 'opacity 300ms ease',
                  }}
                >
                  {/* Image - alternates position */}
                  <button
                    type="button"
                    onClick={() => openProduct(system.id)}
                    className={`md:col-span-7 relative w-full ${i % 2 === 1 ? 'md:[direction:ltr]' : ''} text-left group/img`}
                    aria-label={`View ${system.name} details`}
                  >
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-muted cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300 ring-1 ring-border/40">
                      {/* Orange safety line at edge - animated height */}
                      <div className="absolute left-0 w-[3px] bg-orange rounded-full z-10 transition-all duration-500 ease-out top-[20%] bottom-[20%] group-hover/img:top-[10%] group-hover/img:bottom-[10%]" />
                      {/* Glassmorphism overlay on hover */}
                      <div className="absolute inset-0 bg-navy/0 group-hover/img:bg-navy/15 backdrop-blur-[0px] group-hover/img:backdrop-blur-[2px] transition-all duration-300" />
                      {/* Inner shadow for glassmorphism */}
                      <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(27,42,74,0.0)] group-hover/img:shadow-[inset_0_0_30px_rgba(27,42,74,0.08)] transition-shadow duration-300 pointer-events-none" />
                      <Image
                        src={system.image}
                        alt={system.name}
                        fill
                        className="object-cover transition-transform duration-[800ms] ease-out group-hover/img:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 58vw"
                      />
                      {/* Image index marker */}
                      <div className="absolute top-3 right-3 inline-flex items-center justify-center min-w-7 h-7 px-2 rounded-full bg-white/95 backdrop-blur-sm border border-white/50 text-[0.65rem] font-bold text-navy tabular-nums shadow-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>
                        {system.index}
                      </div>
                      {/* View details hint */}
                      <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy/85 backdrop-blur-sm text-[0.65rem] font-medium text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" style={{ fontFamily: "'Manrope', sans-serif" }}>
                        View details
                        <span aria-hidden="true">→</span>
                      </div>
                    </div>
                  </button>

                  {/* Copy - alternates position */}
                  <div className={`md:col-span-5 flex flex-col gap-3 ${i % 2 === 1 ? 'md:[direction:ltr]' : ''} relative`}>
                    {/* Decorative "technical specification" watermark */}
                    <span
                      className="absolute -top-8 -right-4 text-[4rem] font-bold text-navy/[0.02] rotate-[12deg] pointer-events-none select-none whitespace-nowrap"
                      aria-hidden="true"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      SPEC
                    </span>
                    {/* Animated gradient border wrapper */}
                    <div className="relative rounded-2xl p-0 overflow-hidden">
                      {/* Gradient border pseudo-element via a wrapper div */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, var(--color-orange), var(--color-navy), var(--color-orange), var(--color-navy))',
                          backgroundSize: '300% 300%',
                          animation: 'border-sweep 4s linear infinite',
                        }}
                        aria-hidden="true"
                      />
                      {/* Inner content area with its own bg to create the "border" illusion */}
                      <div className="relative m-[2px] rounded-[14px] bg-transparent p-0">
                        {/* Index label + safety line connector */}
                        <div className="flex items-center gap-3">
                          <span className="text-index" style={{ fontFamily: "'Manrope', sans-serif" }}>{system.index}</span>
                          <div className="w-[2px] self-stretch min-h-[32px] bg-orange rounded-full" />
                          <span className="text-eyebrow">{system.name}</span>
                        </div>
                        <p
                          className="text-base md:text-lg text-navy font-medium leading-snug"
                          style={{ fontFamily: "'Manrope', sans-serif" }}
                        >
                          {system.description}
                        </p>
                        <div className="flex flex-col gap-1.5 mt-1">
                          {system.variants.map((v) => (
                            <div key={v} className="flex items-center gap-2 group/var">
                              <div className="w-1.5 h-1.5 rounded-full bg-orange/40 transition-transform duration-200 group-hover/var:scale-[1.5]" />
                              <span className="text-sm text-steel">{v}</span>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => openProduct(system.id)}
                          className="inline-flex items-center gap-2 text-sm font-medium text-orange hover:text-orange-hover mt-3 transition-colors group/link self-start"
                        >
                          Explore {system.shortName.toLowerCase()}
                          <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
