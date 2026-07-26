'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 35, suffix: '+', label: 'Years of manufacturing' },
  { value: 500, suffix: '+', label: 'Industrial clients served' },
  { value: 16, suffix: '', label: 'States supplied across India' },
  { value: 3, suffix: '', label: 'Product systems engineered' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const start = Date.now();
          const step = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span
      ref={ref}
      className="text-4xl md:text-5xl font-bold text-navy dark:text-white counter-glow"
      style={{ fontVariantNumeric: 'tabular-nums', fontFamily: "'Manrope', sans-serif" }}
    >
      {count}
      <span className="text-orange">{suffix}</span>
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="bg-ivory-light py-16 md:py-20 border-y border-border/40 relative overflow-hidden">
      {/* Subtle decorative grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, var(--color-navy) 1px, transparent 1px), linear-gradient(to bottom, var(--color-navy) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} translateY={12}>
              <div className="text-center md:text-left group/stat transition-transform duration-300 hover:scale-[1.02]">
                {/* Animated gradient separator before each stat on md+ (except first) */}
                {i > 0 && (
                  <div
                    className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-[60%] animate-gradient-separator opacity-20"
                    style={{
                      background: 'linear-gradient(180deg, transparent, var(--color-orange), transparent)',
                    }}
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-baseline justify-center md:justify-start gap-1 mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <span
                  className="text-xs md:text-sm text-[#4B5563] dark:text-white/70 font-medium uppercase tracking-wider flex items-center justify-center md:justify-start"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {/* Orange dot bullet before label */}
                  <span className="inline-block w-1 h-1 rounded-full bg-orange mr-1.5" aria-hidden="true" />
                  {stat.label}
                </span>
                {/* Orange safety line under each stat - smoother animation */}
                <div className="hidden md:block h-px bg-gradient-to-r from-orange/60 via-orange/20 to-transparent mt-3 max-w-[80px] group-hover/stat:max-w-[120px] transition-all duration-700 ease-out" />
              </div>
            </Reveal>
          ))}
        </div>
        {/* Animated gradient line separators between columns on md+ */}
        <div className="hidden md:flex absolute inset-0 pointer-events-none" aria-hidden="true">
          {[1, 2, 3].map((col) => (
            <div
              key={col}
              className="absolute top-[15%] bottom-[15%] w-px animate-gradient-separator opacity-20"
              style={{
                left: `${(col / 4) * 100}%`,
                background: 'linear-gradient(180deg, transparent, var(--color-orange), transparent)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
