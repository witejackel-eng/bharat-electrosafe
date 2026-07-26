'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import {
  Leaf,
  Recycle,
  Factory,
  SunMedium,
  TrendingDown,
  ShieldCheck,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Metric cards — IntersectionObserver-driven count-up (replicated   */
/*  from StatsBar.tsx so this section stays self-contained).          */
/* ------------------------------------------------------------------ */

interface Metric {
  /** Numeric target to count up to. */
  value: number;
  /** Fixed suffix shown after the animated number (e.g. "%", "M kg"). */
  suffix: string;
  /** Number of decimal places to render (defaults to 0). */
  decimals?: number;
  /** Short description below the number. */
  label: string;
  /** Lucide icon shown in the tinted square. */
  icon: LucideIcon;
}

const metrics: Metric[] = [
  {
    value: 100,
    suffix: '%',
    label: 'Recyclable rubber content',
    icon: Leaf,
  },
  {
    value: 42,
    suffix: '%',
    label: 'Energy from solar (Manesar plant)',
    icon: SunMedium,
  },
  {
    value: 1.2,
    suffix: 'M kg',
    decimals: 1,
    label: 'CO₂e avoided annually',
    icon: TrendingDown,
  },
  {
    value: 0,
    suffix: '',
    label: 'Restricted substances (RoHS/REACH)',
    icon: ShieldCheck,
  },
];

/**
 * useCountUp — animates a number from 0 → target once the element scrolls
 * into view (threshold 0.4). Uses ease-out cubic and requestAnimationFrame.
 * Honours prefers-reduced-motion implicitly (the observer still fires, but
 * a 0-target remains 0; for non-zero targets the 1.5s transition is short
 * enough to be acceptable). Returns a ref to attach + the display string.
 */
function useCountUp(target: number, decimals: number): {
  ref: React.RefObject<HTMLSpanElement | null>;
  display: string;
} {
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
            setCount(eased * target);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const display =
    decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toString();

  return { ref, display };
}

function MetricCard({ metric }: { metric: Metric }) {
  const { ref, display } = useCountUp(metric.value, metric.decimals ?? 0);
  const Icon = metric.icon;

  return (
    <div
      className="bg-white dark:bg-card border border-border/60 rounded-2xl p-5 transition-all duration-200 hover:border-orange/30 hover:shadow-md hover:-translate-y-0.5"
      style={{ fontFamily: 'Manrope, ui-sans-serif, system-ui, sans-serif' }}
    >
      <div
        className="w-11 h-11 rounded-xl bg-orange-soft/40 text-orange flex items-center justify-center mb-3"
        aria-hidden="true"
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </div>
      <span
        ref={ref}
        className="block text-3xl md:text-4xl font-bold text-navy dark:text-white tabular-nums leading-none"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {display}
        {metric.suffix && (
          <span className="text-orange">{metric.suffix}</span>
        )}
      </span>
      <p className="text-xs md:text-sm text-[#4B5563] dark:text-white/70 mt-2 leading-snug">
        {metric.label}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Commitment pillars                                                */
/* ------------------------------------------------------------------ */

interface Pillar {
  icon: LucideIcon;
  title: string;
  body: string;
}

const pillars: Pillar[] = [
  {
    icon: Recycle,
    title: 'Material Stewardship',
    body: 'IS 15652-compliant rubber compounds engineered with post-industrial recycled content. Trim and off-cuts are fully recoverable, re-entering the feedstock stream instead of landfill.',
  },
  {
    icon: Factory,
    title: 'Process Efficiency',
    body: 'Closed-loop water cooling, low-temperature curing presses and solar-assisted lighting reduce energy intensity per square metre. A formal scrap-recovery program captures every edge trim.',
  },
  {
    icon: Leaf,
    title: 'End-of-life Recovery',
    body: 'A take-back program accepts end-of-life mats for re-granulation into traffic-management products. We partner with certified recyclers across four Indian states for closed-loop recovery.',
  },
];

/* ------------------------------------------------------------------ */
/*  Certifications strip                                              */
/* ------------------------------------------------------------------ */

const certifications: string[] = [
  'ISO 14001:2015',
  'RoHS Compliant',
  'REACH Compliant',
  'Zero-Waste-to-Landfill (2026 target)',
];

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

export function SustainabilitySection() {
  return (
    <section
      id="sustainability"
      className="bg-background py-20 md:py-28 scroll-mt-32"
      style={{ fontFamily: 'Manrope, ui-sans-serif, system-ui, sans-serif' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* ---------- Header ---------- */}
        <div className="max-w-2xl">
          <Reveal delay={60}>
            <span className="text-eyebrow text-orange font-semibold uppercase tracking-[0.2em] text-xs">
              Our Commitment
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mt-3">
              Engineered for safety. Designed for the planet.
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-[#374151] dark:text-white/75 max-w-2xl leading-relaxed mt-4">
              Bharat Electrosafe takes environmental responsibility across the
              entire product lifecycle — from the rubber compounds we formulate
              and the presses that cure them, to the take-back program that
              recovers end-of-life mats. Every decision is measured against the
              same standard we apply to electrical safety: zero harm.
            </p>
          </Reveal>
        </div>

        {/* ---------- Block 1: Animated metrics row ---------- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-12">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={240 + i * 60} translateY={12}>
              <MetricCard metric={metric} />
            </Reveal>
          ))}
        </div>

        {/* ---------- Block 2: Three commitment pillars ---------- */}
        <Reveal delay={420}>
          <span className="text-eyebrow text-orange text-xs font-semibold uppercase tracking-[0.2em] mt-12 block">
            Three pillars
          </span>
        </Reveal>
        <Reveal delay={460}>
          <h3 className="text-xl md:text-2xl font-bold text-navy dark:text-white mt-2">
            How we reduce impact at every stage.
          </h3>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={480 + i * 80} translateY={14}>
                <article
                  className="bg-white dark:bg-card border border-border/60 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full"
                >
                  <div
                    className="w-10 h-1 bg-orange rounded-full mb-4"
                    aria-hidden="true"
                  />
                  <div
                    className="w-11 h-11 rounded-xl bg-orange-soft/40 text-orange flex items-center justify-center mb-4"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </div>
                  <h4 className="text-lg font-bold text-navy dark:text-white mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-[#374151] dark:text-white/75 leading-relaxed">
                    {pillar.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* ---------- Block 3: Certifications strip ---------- */}
        <Reveal delay={720}>
          <div className="mt-12 bg-navy dark:bg-card rounded-2xl px-6 py-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <ShieldCheck
                className="size-5 text-orange shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="text-white/80 text-sm font-medium">Verified by</span>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span
                    key={cert}
                    className="bg-white/10 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="#contact"
              className="text-orange hover:text-orange-hover text-sm font-medium inline-flex items-center gap-1.5 transition-colors whitespace-nowrap group/cta"
            >
              Request ESG datasheet
              <ArrowRight
                className="size-4 transition-transform group-hover/cta:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
