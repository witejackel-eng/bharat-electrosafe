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
      className="text-4xl md:text-5xl font-bold text-navy"
      style={{ fontVariantNumeric: 'tabular-nums', fontFamily: "'Manrope', sans-serif" }}
    >
      {count}
      <span className="text-orange">{suffix}</span>
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="bg-ivory-light py-16 md:py-20 border-y border-border/40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} translateY={12}>
              <div className="text-center md:text-left">
                <div className="flex items-baseline justify-center md:justify-start gap-1 mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <span
                  className="text-xs md:text-sm text-steel font-medium uppercase tracking-wider block"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
