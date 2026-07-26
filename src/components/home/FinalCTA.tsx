'use client';

import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';

export function FinalCTA() {
  return (
    <section id="quote" className="bg-ivory-light py-20 md:py-28 border-t border-border/40 relative">
      {/* Subtle accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-orange/40 rounded-full" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
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
            <p className="text-base text-steel mt-4 max-w-[560px] mx-auto" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Share the product, operating voltage, dimensions, quantity and delivery location. Our team will help identify the appropriate solution.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Button
                className="bg-orange hover:bg-orange-hover text-white font-medium px-7 h-12 rounded-lg text-base"
                asChild
              >
                <Link href="#quote">
                  Request a Quote
                  <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-navy text-navy hover:bg-navy hover:text-white font-medium px-6 h-12 rounded-lg transition-all"
                asChild
              >
                <a href="tel:+911234567890">
                  <Phone className="size-4 mr-2" />
                  Call technical sales
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-border text-steel hover:bg-white hover:text-navy hover:border-navy/30 font-medium px-6 h-12 rounded-lg transition-all"
                asChild
              >
                <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
