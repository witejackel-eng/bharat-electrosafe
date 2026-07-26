'use client';

import { Reveal } from '@/components/motion/Reveal';
import { MapPin, Phone, Mail, Building2, ArrowRight } from 'lucide-react';

interface Distributor {
  region: string;
  cities: string;
  partner: string;
  phone: string;
  email: string;
}

const distributors: Distributor[] = [
  {
    region: 'Northern Region',
    cities: 'Delhi NCR · Chandigarh · Jaipur',
    partner: 'Securemat India',
    phone: '+91-98100-12345',
    email: 'north@securemat.in',
  },
  {
    region: 'Western Region',
    cities: 'Mumbai · Pune · Ahmedabad',
    partner: 'Westline Safety',
    phone: '+91-98200-23456',
    email: 'west@westlinesafety.in',
  },
  {
    region: 'Southern Region',
    cities: 'Bengaluru · Chennai · Hyderabad',
    partner: 'Southtech Electricals',
    phone: '+91-98400-34567',
    email: 'south@southtech.in',
  },
  {
    region: 'Eastern Region',
    cities: 'Kolkata · Bhubaneswar · Patna',
    partner: 'Eastern Insulators',
    phone: '+91-98300-45678',
    email: 'east@easterninsulators.in',
  },
  {
    region: 'Central Region',
    cities: 'Raipur · Bhopal · Nagpur',
    partner: 'CoreMat Distribution',
    phone: '+91-98260-56789',
    email: 'central@coremat.in',
  },
  {
    region: 'North-Eastern Region',
    cities: 'Guwahati · Shillong · Imphal',
    partner: 'NE Industrial Supply',
    phone: '+91-98640-67890',
    email: 'ne@neindustrial.in',
  },
];

// Approximate positions of major Indian cities / regions on a stylised map
const mapDots = [
  { top: '20%', left: '30%', label: 'Delhi' },
  { top: '35%', left: '20%', label: 'Gujarat' },
  { top: '40%', left: '55%', label: 'MP' },
  { top: '55%', left: '60%', label: 'Maharashtra' },
  { top: '60%', left: '35%', label: 'Hyderabad' },
  { top: '70%', left: '45%', label: 'Karnataka' },
  { top: '78%', left: '55%', label: 'Tamil Nadu' },
  { top: '45%', left: '80%', label: 'Kolkata / East' },
];

const miniStats = [
  { value: '28', label: 'Partner outlets' },
  { value: '72h', label: 'Avg dispatch' },
  { value: '4', label: 'Warehouses' },
];

export function DistributorSection() {
  return (
    <section
      id="distributors"
      className="bg-background py-20 md:py-28 scroll-mt-32 relative overflow-hidden grain-overlay"
      style={{ fontFamily: 'Manrope, ui-sans-serif, system-ui, sans-serif' }}
    >
      {/* Floating decorative shapes */}
      <div className="floating-shape w-32 h-32 rounded-full bg-navy top-20 right-[15%]" aria-hidden="true" />
      <div className="floating-shape w-24 h-24 bg-orange rotate-45 bottom-16 left-[8%]" aria-hidden="true" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Section header */}
        <div className="max-w-2xl">
          <Reveal delay={0}>
            <span className="text-eyebrow gradient-text text-orange text-xs font-semibold uppercase tracking-[0.2em]">
              Find a Distributor
            </span>
          </Reveal>
          <Reveal delay={60}>
            <div className="w-16 h-1 rounded-full bg-orange animate-underline-reveal mt-2" aria-hidden="true" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mt-3">
              Stocked where you build.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[#374151] dark:text-white/75 max-w-2xl leading-relaxed mt-4">
              Authorised channel partners across 16 Indian states carry inventory, technical
              literature, and on-site support for electrical insulating mats, visible-safety
              variants, and water-stop profiles.
            </p>
          </Reveal>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 mt-10 md:mt-14">
          {/* Left column: India map + summary stats */}
          <div className="md:col-span-2">
            <Reveal delay={0}>
              <div className="bg-white dark:bg-card border border-border/60 rounded-2xl p-6 h-full">
                <h3 className="text-lg font-bold text-navy dark:text-white">Coverage map</h3>

                {/* Stylised India map placeholder */}
                <div className="relative aspect-[4/5] bg-ivory-light dark:bg-navy/40 rounded-xl mt-4 overflow-hidden border border-border/40">
                  {/* Decorative grid pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'linear-gradient(45deg, transparent 48%, rgba(27,42,74,0.08) 49%, rgba(27,42,74,0.08) 51%, transparent 52%)',
                      backgroundSize: '32px 32px',
                    }}
                    aria-hidden="true"
                  />

                  {/* Pulsing state dots (decorative) */}
                  <div className="absolute inset-0" aria-hidden="true">
                    {mapDots.map((dot) => (
                      <div
                        key={dot.label}
                        className="absolute w-3 h-3 rounded-full bg-orange"
                        style={{ top: dot.top, left: dot.left }}
                      >
                        <span className="absolute inset-0 rounded-full bg-orange/40 animate-breathing-glow" />
                      </div>
                    ))}
                  </div>

                  {/* Center coverage label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4">
                      <div className="text-4xl font-bold text-navy dark:text-white tabular-nums">
                        16
                      </div>
                      <div className="text-xs text-steel dark:text-white/60 mt-1">
                        States covered
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mini-stats row */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {miniStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-border/40 bg-ivory-light/60 dark:bg-navy/30 p-3 text-center"
                    >
                      <div className="text-xl font-bold text-navy dark:text-white tabular-nums">
                        {stat.value}
                      </div>
                      <div className="text-[0.65rem] uppercase tracking-wider text-steel dark:text-white/60 mt-1 leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right column: Regional partner cards */}
          <div className="md:col-span-3">
            <p className="text-eyebrow text-orange text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Regional partners
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {distributors.map((d, i) => (
                <Reveal key={d.region} delay={i * 80}>
                  <article className="bg-white dark:bg-card border border-border/60 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 hover:border-orange/30 transition-all h-full flex flex-col card-tilt diagonal-line relative overflow-hidden">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-bold text-navy dark:text-white">
                          {d.region}
                        </h3>
                        <p className="text-xs text-steel dark:text-white/60 mt-1">{d.cities}</p>
                      </div>
                      <span className="w-9 h-9 rounded-lg bg-orange-soft/40 text-orange flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border/60 flex-1">
                      <p className="text-xs uppercase tracking-wider text-steel dark:text-white/60">
                        Authorised partner
                      </p>
                      <p className="text-sm font-semibold text-navy dark:text-white mt-1">
                        {d.partner}
                      </p>
                    </div>
                    <div className="mt-3 space-y-1.5">
                      <a
                        href={`tel:${d.phone.replace(/[^+\d]/g, '')}`}
                        className="flex items-center gap-2 text-xs text-[#4B5563] dark:text-white/70 hover:text-orange transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        <span>{d.phone}</span>
                      </a>
                      <a
                        href={`mailto:${d.email}`}
                        className="flex items-center gap-2 text-xs text-[#4B5563] dark:text-white/70 hover:text-orange transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{d.email}</span>
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <Reveal delay={120}>
          <div className="mt-10 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy dark:text-white hover:text-orange transition-colors"
            >
              <Building2 className="w-4 h-4" />
              Become a distributor
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
