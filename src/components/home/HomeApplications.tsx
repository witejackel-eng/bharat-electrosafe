'use client';

import { applications } from '@/data/applications';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import { useApplicationDetail } from '@/components/applications/ApplicationDetailProvider';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export function HomeApplications() {
  const { openApplication } = useApplicationDetail();

  return (
    <section id="applications" className="bg-background py-20 md:py-28 relative overflow-hidden grain-overlay">
      {/* Floating decorative shapes */}
      <div className="floating-shape w-32 h-32 rounded-full bg-orange top-12 right-[8%]" aria-hidden="true" />
      <div className="floating-shape w-20 h-20 bg-navy rotate-45 bottom-20 left-[15%]" aria-hidden="true" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Section header */}
        <Reveal delay={0}>
          <span className="text-eyebrow gradient-text">Applications</span>
        </Reveal>
        <Reveal delay={80}>
          <div className="w-16 h-1 rounded-full bg-orange animate-underline-reveal mt-2" aria-hidden="true" />
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mt-3 max-w-[560px]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Designed for critical environments
          </h2>
        </Reveal>

        {/* Application mosaic */}
        <div id="applications-grid" className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {applications.map((app, i) => (
            <Reveal key={app.id} delay={i * 80} translateY={16}>
              <button
                type="button"
                onClick={() => openApplication(app.id)}
                aria-label={`${app.name} — ${app.system}. Open application details.`}
                className="group relative block w-full text-left rounded-2xl overflow-hidden bg-muted aspect-[4/3] md:aspect-[3/2] lg:aspect-square cursor-pointer card-tilt diagonal-line"
              >
                <Image
                  src={app.image}
                  alt={app.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
                {/* Orange safety line on hover */}
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[3px] bg-orange transition-all duration-300" />
                {/* Index number top-left */}
                <div className="absolute top-3 left-3 text-xs font-semibold text-white/70 tabular-nums" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  0{i + 1}
                </div>
                {/* "View details" hint icon (top-right, hover-only) */}
                <div className="absolute top-3 right-3 inline-flex items-center justify-center size-7 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowUpRight className="size-3.5" />
                </div>
                {/* Anchor for backward-compat with footer/hash links */}
                <div id={app.id} className="absolute -top-32" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <span className="text-sm md:text-base font-semibold text-white block" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {app.name}
                  </span>
                  <span className="text-xs text-orange/80 font-medium inline-flex items-center gap-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {app.system}
                    <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={500}>
          <div className="mt-8 md:mt-10">
            <Button
              variant="outline"
              className="border-navy text-navy hover:bg-navy hover:text-white font-medium px-6 h-11 rounded-lg transition-all"
              asChild
            >
              <Link href="#applications">
                Explore applications
                <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          </div>
        </Reveal>

        {/* Company credibility strip */}
        <div id="company" className="mt-20 md:mt-28 scroll-mt-32 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
          {/* Factory image */}
          <div className="md:col-span-5">
            <Reveal delay={0} translateY={20}>
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
                {/* Safety line accent */}
                <div className="absolute top-4 left-0 w-[3px] h-[50%] bg-orange rounded-full" />
                <Image
                  src="/images/factory.png"
                  alt="Bharat Electrosafe manufacturing facility"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </div>
            </Reveal>
          </div>

          {/* Company info */}
          <div id="about" className="md:col-span-7 flex flex-col gap-4 scroll-mt-32">
            <Reveal delay={80}>
              <span className="text-eyebrow">Company</span>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="text-xl md:text-2xl font-bold text-navy" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Manufacturing electrical safety systems since 1989.
              </h3>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-sm text-steel leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Bharat Electrosafe produces insulating mats, visible-safety variants and civil-protection systems from its IMT Manesar facility, serving government utilities, railways and private-sector infrastructure.
              </p>
            </Reveal>

            {/* Recognition labels */}
            <Reveal delay={200}>
              <div className="flex flex-wrap gap-3 mt-3">
                <div className="inline-flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-white hover:border-orange/30 hover:bg-orange-soft transition-all duration-200">
                  <div className="w-2 h-2 rounded-full bg-orange" />
                  <span className="text-spec text-navy" style={{ fontFamily: "'Manrope', sans-serif" }}>BIS Licensed</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-white hover:border-orange/30 hover:bg-orange-soft transition-all duration-200">
                  <div className="w-2 h-2 rounded-full bg-orange" />
                  <span className="text-spec text-navy" style={{ fontFamily: "'Manrope', sans-serif" }}>ISO 9001:2015</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-white hover:border-orange/30 hover:bg-orange-soft transition-all duration-200">
                  <div className="w-2 h-2 rounded-full bg-orange" />
                  <span className="text-spec text-navy" style={{ fontFamily: "'Manrope', sans-serif" }}>IS 15652</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <Link
                href="#about"
                className="inline-flex items-center gap-2 text-sm font-medium text-orange hover:text-orange-hover transition-colors mt-2"
              >
                Learn more about Bharat Electrosafe
                <span className="transition-transform duration-200 hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
