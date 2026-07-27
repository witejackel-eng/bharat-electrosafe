'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { Zap, Building2, TrainFront, Flame, Factory, HardHat } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Industry {
  name: string;
  phrase: string;
  icon: LucideIcon;
  accent?: 'left' | 'top';
}

const industries: Industry[] = [
  {
    name: 'Power Utilities',
    phrase: 'Generation, transmission and distribution',
    icon: Zap,
    accent: 'top',
  },
  {
    name: 'Substations & Switchrooms',
    phrase: 'High-voltage protection zones',
    icon: Building2,
    accent: 'left',
  },
  {
    name: 'Railways & Metro',
    phrase: 'Traction and depot safety',
    icon: TrainFront,
    accent: 'left',
  },
  {
    name: 'Oil & Gas',
    phrase: 'Hazardous area compliance',
    icon: Flame,
    accent: 'top',
  },
  {
    name: 'Manufacturing',
    phrase: 'Plant floor and panel safety',
    icon: Factory,
    accent: 'left',
  },
  {
    name: 'Infrastructure & Construction',
    phrase: 'Site electrical safety',
    icon: HardHat,
    accent: 'top',
  },
];

function IndustryCard({ industry }: { industry: Industry }) {
  const Icon = industry.icon;

  return (
    <div className="group relative flex items-start gap-4 p-5 rounded-lg bg-be-white border border-be-grey-250 hover:border-be-yellow-400 transition-colors duration-300">
      {/* Accent line */}
      {industry.accent === 'top' && (
        <div className="absolute top-0 left-5 right-5 h-0.5 bg-be-yellow-500 rounded-b" />
      )}
      {industry.accent === 'left' && (
        <div className="absolute top-5 bottom-5 left-0 w-0.5 bg-be-yellow-500 rounded-r" />
      )}

      <div className="shrink-0 mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-be-yellow-50 text-be-yellow-600 group-hover:bg-be-yellow-100 transition-colors duration-300">
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-card-title text-be-charcoal-950">
          {industry.name}
        </h3>
        <p className="text-metadata text-be-grey-650">
          {industry.phrase}
        </p>
      </div>
    </div>
  );
}

export default function IndustryApplications() {
  return (
    <section id="industries" className="bg-be-white section-padding-major">
      <div className="container-site page-horizontal-padding">
        <div className="reveal-up mb-12">
          <SectionHeader
            eyebrow="INDUSTRIES"
            title="Industries and applications"
            supportingText="Serving critical sectors where electrical safety is non-negotiable."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal-up">
          {industries.map((industry) => (
            <IndustryCard key={industry.name} industry={industry} />
          ))}
        </div>
      </div>
    </section>
  );
}
