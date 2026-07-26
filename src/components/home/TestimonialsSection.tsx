'use client';

import { useState, useEffect, useCallback } from 'react';
import { testimonials } from '@/data/testimonials';
import { Reveal } from '@/components/motion/Reveal';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const count = testimonials.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((prev) => (prev + dir + count) % count);
    },
    [count]
  );

  // Auto-advance every 8 seconds (pauses on tab hidden)
  useEffect(() => {
    const id = setInterval(() => {
      if (!document.hidden) setActive((prev) => (prev + 1) % count);
    }, 8000);
    return () => clearInterval(id);
  }, [count]);

  const t = testimonials[active];

  return (
    <section id="testimonials" className="bg-ivory-light py-20 md:py-28 scroll-mt-32 relative overflow-hidden">
      {/* Decorative background quote mark */}
      <Quote
        className="absolute top-8 right-8 size-32 text-navy/[0.05] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <Reveal delay={0}>
              <span className="text-eyebrow">Client experience</span>
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mt-3 max-w-[560px]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                What our project partners say.
              </h2>
            </Reveal>
          </div>

          {/* Nav arrows */}
          <Reveal delay={140}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-border bg-white text-navy hover:border-orange hover:text-orange transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-border bg-white text-navy hover:border-orange hover:text-orange transition-colors flex items-center justify-center"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Testimonial card */}
        <Reveal delay={120} translateY={20}>
          <div
            key={t.id}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 p-6 md:p-10 rounded-2xl bg-white border border-border shadow-sm"
          >
            {/* Left: avatar + organization */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full bg-navy text-white font-bold flex items-center justify-center shrink-0">
                  {t.abbreviation}
                  {/* small orange ring */}
                  <div className="absolute -inset-1 rounded-full border border-orange/40 pointer-events-none" />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold text-navy"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {t.author}
                  </p>
                  <p
                    className="text-xs text-steel"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/60">
                <span className="text-eyebrow block mb-1">Organisation</span>
                <p
                  className="text-sm font-semibold text-navy"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {t.organization}
                </p>
                <p
                  className="text-xs text-steel mt-0.5"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {t.sector}
                </p>
              </div>

              <div className="pt-4 border-t border-border/60">
                <span className="text-eyebrow block mb-1">Project context</span>
                <p
                  className="text-xs text-steel leading-relaxed"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {t.projectContext}
                </p>
              </div>
            </div>

            {/* Right: quote */}
            <div className="md:col-span-8 flex flex-col gap-5 md:border-l md:border-border/60 md:pl-10">
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${
                      i < t.rating ? 'fill-orange text-orange' : 'text-border'
                    }`}
                    aria-hidden="true"
                  />
                ))}
                <span
                  className="text-xs text-steel ml-2 tabular-nums"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {t.rating}.0 / 5.0
                </span>
              </div>

              {/* Quote */}
              <blockquote className="relative">
                <Quote
                  className="size-6 text-orange/40 mb-3"
                  aria-hidden="true"
                />
                <p
                  className="text-lg md:text-xl text-navy font-medium leading-relaxed"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              {/* Counter */}
              <div className="mt-auto pt-5 flex items-center gap-3">
                <span
                  className="text-xs text-steel tabular-nums"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>
                <div className="flex-1 h-px bg-border/60 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-orange transition-all duration-500"
                    style={{ width: `${((active + 1) / count) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((tt, i) => (
            <button
              key={tt.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-orange' : 'w-1.5 bg-border hover:bg-steel/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
