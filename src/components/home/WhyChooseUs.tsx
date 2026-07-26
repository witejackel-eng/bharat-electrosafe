'use client';

import { Shield, FlaskConical, Clock, Truck, Eye, FileCheck } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

const features = [
  {
    icon: Shield,
    title: 'BIS Licensed Manufacturing',
    description:
      'Every insulating mat carries a valid Bureau of Indian Standards licence. Batch-level traceability ensures audit-ready documentation.',
  },
  {
    icon: FlaskConical,
    title: 'Independent Lab Testing',
    description:
      'NABL-accredited laboratories test dielectric strength, leakage current, tensile properties and flame resistance on every production batch.',
  },
  {
    icon: Clock,
    title: '35+ Years of Production',
    description:
      'Continuous manufacturing since 1989. Government utilities, railways and private-sector infrastructure rely on our established supply chain.',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery',
    description:
      'Products shipped to 16+ states across India. Custom sizing, project-specific packaging and mill-marked rolls for large infrastructure orders.',
  },
  {
    icon: Eye,
    title: 'Visible-Safety Innovation',
    description:
      'High-visibility colour strips, bi-colour patterns and auto-glow surfaces help maintenance teams identify safe zones in dimly-lit environments.',
  },
  {
    icon: FileCheck,
    title: 'Complete Documentation',
    description:
      'BIS licence, test reports, ISO 9001 certificate, product traceability and marking — documentation that engineering and procurement teams actually use.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-background py-20 md:py-28">
      {/* Orange safety-line accent */}
      <div className="h-1 bg-gradient-to-r from-orange via-orange/30 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-10 md:pt-14">
        <Reveal delay={0}>
          <span className="text-eyebrow" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Why choose us
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mt-3 max-w-[600px]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Engineering discipline that infrastructure projects depend on.
          </h2>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={160 + i * 60} translateY={12}>
                <div
                  className="p-6 rounded-2xl border border-border bg-white/80 backdrop-blur-[2px] hover:border-orange/30 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-soft flex items-center justify-center shrink-0 mb-4">
                    <Icon className="size-6 text-orange" />
                  </div>
                  <h3 className="text-navy font-semibold text-sm md:text-base mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-steel text-xs md:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
