'use client';

import { useEffect, useRef, useState } from 'react';
import { Building2, Layers, MapPin, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { productFamilyCount } from '@/data/products';

interface Stat {
  /* Numeric stats animate from 0 → target on scroll into view.
     Non-numeric stats (identifiers, codes) render their `display` string
     verbatim with no count-up — counting up an IS standard number would
     be misleading. */
  kind: 'count' | 'text';
  target?: number;
  display: string;
  label: string;
  icon: LucideIcon;
}

const stats: Stat[] = [
  {
    kind: 'count',
    target: productFamilyCount,
    display: String(productFamilyCount),
    label: 'Product Families',
    icon: Layers,
  },
  {
    kind: 'text',
    display: 'A·B·C',
    label: 'Insulation Classes',
    icon: Zap,
  },
  {
    kind: 'text',
    display: 'IS 15652:2006',
    label: 'Manufacturing Standard',
    icon: Building2,
  },
  {
    kind: 'text',
    display: 'CM/L:8800129617',
    label: 'BIS Licence Number',
    icon: MapPin,
  },
];

/* Count-up hook — animates from 0 to `target` over `duration` ms using
   requestAnimationFrame with an ease-out curve. Respects
   prefers-reduced-motion: the very first rAF callback jumps straight to
   the target value (no animated count-up). The setValue call lives
   inside the rAF callback, not the effect body, so it never triggers
   the "synchronous setState in effect" lint rule. */
function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      if (prefersReduced) {
        setValue(target);
        return;
      }
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

function StatCard({ stat, index, active }: { stat: Stat; index: number; active: boolean }) {
  const Icon = stat.icon;
  const count = useCountUp(stat.target ?? 0, active && stat.kind === 'count');

  return (
    <div
      className="group relative flex flex-col items-start gap-3 px-2 py-2 rounded-lg transition-all duration-300 hover:bg-be-yellow-50/40"
      style={{ transitionDelay: active ? `${index * 90}ms` : '0ms' }}
    >
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-be-yellow-50 text-be-yellow-text border border-be-yellow-100 group-hover:bg-be-yellow-500 group-hover:text-be-charcoal-950 group-hover:scale-105 transition-all duration-300">
        <Icon className="h-5 w-5" />
      </div>

      {/* Number */}
      <div className="flex items-baseline">
        {stat.kind === 'count' ? (
          <span
            className="text-4xl font-bold text-be-yellow-text tabular-nums"
            aria-label={stat.display}
          >
            {count}
          </span>
        ) : (
          <span className="text-2xl sm:text-3xl font-bold text-be-charcoal-950 tabular-nums">
            {stat.display}
          </span>
        )}
      </div>

      {/* Subtle yellow underline — grows on hover */}
      <div className="h-0.5 w-10 bg-be-yellow-500 rounded-full group-hover:w-14 transition-all duration-300" />

      {/* Label */}
      <span className="text-metadata text-be-grey-650 uppercase tracking-wider leading-relaxed">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsSection() {
  const staggerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!staggerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            setActive(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(staggerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="Company statistics"
      className="bg-be-cream border-y border-be-grey-250 section-padding-supporting relative overflow-hidden"
    >
      {/* Faint decorative diagonal stripe — adds depth without distraction */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, var(--be-navy-900) 0, var(--be-navy-900) 1px, transparent 1px, transparent 14px)',
        }}
        aria-hidden="true"
      />
      <div className="container-site page-horizontal-padding relative">
        <div
          ref={staggerRef}
          className="stagger-reveal grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 lg:gap-x-8"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
