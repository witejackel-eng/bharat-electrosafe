'use client';

import { useEffect, useRef } from 'react';
import { Building2, Layers, MapPin, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Stat {
  value: string;
  digit: string;
  suffix: string;
  label: string;
  icon: LucideIcon;
}

const stats: Stat[] = [
  {
    value: '25+',
    digit: '25',
    suffix: '+',
    label: 'Years of manufacturing experience',
    icon: Building2,
  },
  {
    value: '5',
    digit: '5',
    suffix: '',
    label: 'Certified product families',
    icon: Layers,
  },
  {
    value: '1000+',
    digit: '1000',
    suffix: '+',
    label: 'Installations across India',
    icon: MapPin,
  },
  {
    value: '3',
    digit: '3',
    suffix: '',
    label: 'Voltage classes (A, B, C)',
    icon: Zap,
  },
];

function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;

  return (
    <div className="group flex flex-col items-start gap-3 px-2">
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-be-yellow-50 text-be-yellow-600 border border-be-yellow-100 group-hover:bg-be-yellow-100 transition-colors duration-300">
        <Icon className="h-5 w-5" />
      </div>

      {/* Number — charcoal with yellow accent on digit portion */}
      <div className="flex items-baseline">
        <span className="text-4xl font-bold text-be-yellow-600 tabular-nums">
          {stat.digit}
        </span>
        {stat.suffix && (
          <span className="text-4xl font-bold text-be-charcoal-950">
            {stat.suffix}
          </span>
        )}
      </div>

      {/* Subtle yellow underline */}
      <div className="h-0.5 w-10 bg-be-yellow-500 rounded-full" />

      {/* Label */}
      <span className="text-metadata text-be-grey-650 uppercase tracking-wider leading-relaxed">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsSection() {
  const staggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!staggerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(staggerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="Company statistics"
      className="bg-be-cream border-y border-be-grey-250 section-padding-supporting"
    >
      <div className="container-site page-horizontal-padding">
        <div
          ref={staggerRef}
          className="stagger-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10"
        >
          {stats.map((stat) => (
            <StatCard key={stat.value} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
