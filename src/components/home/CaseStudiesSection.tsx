'use client';

import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import {
  Factory,
  Train,
  Building2,
  Zap,
  TrendingUp,
  Calendar,
  ShieldCheck,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

interface CaseStudy {
  id: string;
  type: string;
  typeIcon: LucideIcon;
  client: string;
  title: string;
  kpis: Array<{ value: string; label: string; icon: LucideIcon }>;
  outcome: string;
  /** Tailwind gradient classes used for the header image area */
  headerGradient: string;
  /** Accent dot colour used on the project type badge row */
  accent: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'case-power-utility',
    type: 'Power Utility',
    typeIcon: Zap,
    client: 'Western Region Transmission Corp.',
    title: '33 kV substation matting upgrade across 47 sites',
    kpis: [
      { value: '47', label: 'Sites upgraded', icon: Building2 },
      { value: '12', label: 'Weeks to deliver', icon: Calendar },
      { value: '0', label: 'Safety incidents', icon: ShieldCheck },
    ],
    outcome:
      'Aging IS 5424 mats across 47 transmission substations were replaced with IS 15652 Class C insulating mats rated for 33 kV. Mill-marked rolls, batch-level test certificates and pre-cut panel layouts let site crews swap each bay during planned outages without extending shutdown windows.',
    headerGradient: 'from-navy via-navy-light to-navy-dark',
    accent: 'bg-orange',
  },
  {
    id: 'case-railway-metro',
    type: 'Railway / Metro',
    typeIcon: Train,
    client: 'South Indian Metro Rail Corporation',
    title: 'Platform and traction substation safety upgrade',
    kpis: [
      { value: '18', label: 'Stations covered', icon: Building2 },
      { value: '6.5 km', label: 'Platform edge lined', icon: TrendingUp },
      { value: '100%', label: 'Compliance achieved', icon: ShieldCheck },
    ],
    outcome:
      'Visible-safety bi-colour mats were installed along platform edges and inside traction substations. The orange-on-charcoal contrast gives train operators and maintenance staff a clear visual cue of safe standing zones, even under low-voltage emergency lighting inside depots and tunnels.',
    headerGradient: 'from-orange-light via-orange to-navy',
    accent: 'bg-orange',
  },
  {
    id: 'case-manufacturing',
    type: 'Manufacturing',
    typeIcon: Factory,
    client: 'Bharat Heavy Electricals Limited',
    title: 'Plant-wide electrical insulation standardization',
    kpis: [
      { value: '4', label: 'Plants standardized', icon: Factory },
      { value: '3200 m²', label: 'Matting installed', icon: TrendingUp },
      { value: '35%', label: 'Downtime reduction', icon: ShieldCheck },
    ],
    outcome:
      'Class A insulating mats were specified across switchgear rooms, motor control centres and generator terminals at four manufacturing plants. Standardised sizing, colour-coded class markings and a 12-month inspection cycle helped maintenance teams isolate panels faster and cut unplanned outage time by more than a third.',
    headerGradient: 'from-steel via-navy to-navy-dark',
    accent: 'bg-orange',
  },
];

export function CaseStudiesSection() {
  return (
    <section
      id="case-studies"
      className="bg-background py-20 md:py-28 scroll-mt-32 relative overflow-hidden"
    >
      {/* Subtle dotted pattern background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(var(--color-navy) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <Reveal delay={0}>
              <span
                className="inline-block text-xs font-semibold tracking-wider uppercase text-orange"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Case Studies
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="text-3xl md:text-4xl font-bold text-navy mt-3"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Project outcomes that engineered trust.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p
                className="text-base md:text-lg text-steel mt-4 max-w-2xl leading-relaxed"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Real installations across Indian utilities, metros and heavy
                manufacturing — measured in sites, weeks, square metres and the
                one number that matters most: zero.
              </p>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-orange transition-colors group/link"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              All case studies
              <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Case study cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => {
            const TypeIcon = cs.typeIcon;
            return (
              <Reveal key={cs.id} delay={150 + i * 80} translateY={16}>
                <article
                  tabIndex={0}
                  className="group h-full flex flex-col rounded-2xl border border-border/60 bg-white p-6 hover:border-orange/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-orange focus-visible:outline-offset-2 focus-visible:rounded-2xl"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                  aria-labelledby={`${cs.id}-title`}
                >
                  {/* Header gradient with project type icon */}
                  <div
                    className={`relative h-32 rounded-xl bg-gradient-to-br ${cs.headerGradient} overflow-hidden mb-5`}
                    aria-hidden="true"
                  >
                    {/* Diagonal sheen */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 10px)',
                      }}
                    />
                    {/* Watermark icon */}
                    <TypeIcon
                      className="absolute -bottom-3 -right-3 size-24 text-white/10 pointer-events-none"
                      strokeWidth={1.5}
                    />
                    {/* Centre icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20">
                        <TypeIcon className="size-6 text-white" strokeWidth={1.75} />
                      </div>
                    </div>
                  </div>

                  {/* Project type badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full ${cs.accent}`}
                      aria-hidden="true"
                    />
                    <span
                      className="text-xs font-semibold tracking-wider uppercase text-orange"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {cs.type}
                    </span>
                  </div>

                  {/* Client name */}
                  <p
                    className="text-xs text-steel mb-1"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {cs.client}
                  </p>

                  {/* Project title */}
                  <h3
                    id={`${cs.id}-title`}
                    className="text-base md:text-lg font-semibold text-navy leading-snug mb-4"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {cs.title}
                  </h3>

                  {/* KPI grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl bg-ivory-light border border-border/40">
                    {cs.kpis.map((kpi) => {
                      const KpiIcon = kpi.icon;
                      return (
                        <div
                          key={kpi.label}
                          className="flex flex-col items-center text-center"
                        >
                          <KpiIcon
                            className="size-3.5 text-steel mb-1.5"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          <span
                            className="text-lg font-bold text-orange tabular-nums leading-none"
                            style={{ fontFamily: "'Manrope', sans-serif" }}
                          >
                            {kpi.value}
                          </span>
                          <span
                            className="text-[10px] text-steel mt-1 leading-tight"
                            style={{ fontFamily: "'Manrope', sans-serif" }}
                          >
                            {kpi.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Outcome summary */}
                  <p
                    className="text-sm text-steel leading-relaxed flex-1"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {cs.outcome}
                  </p>

                  {/* Read full case study link */}
                  <Link
                    href="#"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-orange hover:underline group/link"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    Read full case study
                    <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Footer note */}
        <Reveal delay={420}>
          <p
            className="mt-10 text-xs text-steel text-center md:text-left"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Want a similar rollout scoped for your network?{' '}
            <Link
              href="#"
              className="text-orange font-medium hover:underline"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Talk to a project engineer
            </Link>{' '}
            about site surveys, batch traceability and shutdown scheduling.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
