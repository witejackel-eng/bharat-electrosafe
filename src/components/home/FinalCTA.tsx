'use client';

import { Reveal } from '@/components/motion/Reveal';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';

export function FinalCTA() {
  return (
    <section id="quote" className="bg-ivory-light py-20 md:py-28 border-t border-border/40 relative overflow-hidden">
      {/* Subtle accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-orange/40 rounded-full" />
      {/* Decorative concentric circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
        <div className="w-[480px] h-[480px] md:w-[640px] md:h-[640px] rounded-full border border-navy/[0.04]" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
        <div className="w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full border border-orange/[0.06]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative">
        <div className="max-w-[720px] mx-auto text-center">
          <Reveal delay={0}>
            <span className="text-eyebrow">Get in touch</span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mt-3"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Tell us what your site requires.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-base text-steel mt-4 max-w-[560px] mx-auto leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Share the product, operating voltage, dimensions, quantity and delivery location. Our team will help identify the appropriate solution.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <QuoteButton
                className="bg-orange hover:bg-orange-hover text-white font-medium px-7 h-12 rounded-lg text-base shadow-md hover:shadow-lg transition-all"
                showArrow
              >
                Request a Quote
              </QuoteButton>
              <a
                href="tel:+911234567890"
                className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg border border-navy text-navy hover:bg-navy hover:text-white font-medium transition-all"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                <Phone className="size-4 transition-transform group-hover:scale-110" />
                Call technical sales
              </a>
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg border border-border text-steel hover:bg-white hover:text-navy hover:border-navy/30 font-medium transition-all"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                <MessageCircle className="size-4 transition-transform group-hover:scale-110" />
                WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Trust indicators */}
          <Reveal delay={280}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-steel" style={{ fontFamily: "'Manrope', sans-serif" }}>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange" aria-hidden="true" />
                Response within 1 working day
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange" aria-hidden="true" />
                BIS licensed manufacturer
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange" aria-hidden="true" />
                35+ years in production
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
