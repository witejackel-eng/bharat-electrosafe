import { Zap, Bolt, Shield, Ruler } from 'lucide-react';

/**
 * TechnicalProductStrip — Server Component.
 *
 * Compact horizontal strip showing IS 15652:2006 insulating mat
 * configurations: three voltage classes and standard thickness
 * options. Serves as a technical bridge between the hero and
 * product content.
 *
 * Design:
 *   - Warm white / light background
 *   - Navy/dark blue primary text
 *   - Bharat yellow/gold accent
 *   - Compact horizontal strip with circular icon + heading + sublabel
 *   - Desktop: 4 items in one row
 *   - Tablet: 2×2
 *   - Mobile: 2×2
 *
 * No animation — purely static, factual content.
 */

const items = [
  {
    heading: 'Class A',
    sublabel: '3.3 kV working voltage',
    icon: Zap,
  },
  {
    heading: 'Class B',
    sublabel: '11 kV working voltage',
    icon: Bolt,
  },
  {
    heading: 'Class C',
    sublabel: '33 kV working voltage',
    icon: Shield,
  },
  {
    heading: '2.0 · 2.5 · 3.0 mm',
    sublabel: 'Standard thickness options',
    icon: Ruler,
  },
] as const;

export default function TechnicalProductStrip() {
  return (
    <section
      className="bg-be-warm-white border-y border-be-grey-250"
      aria-label="IS 15652:2006 insulating mat configurations"
    >
      <div className="container-site page-horizontal-padding py-5 sm:py-6">
        {/* Section label */}
        <p className="text-center text-xs sm:text-sm font-semibold text-be-grey-650 uppercase tracking-[0.08em] mb-4 sm:mb-5">
          IS 15652:2006 insulating mat configurations
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.heading}
                className="flex flex-col items-center text-center gap-1.5"
              >
                {/* Icon */}
                <div className="flex items-center justify-center size-9 rounded-full bg-be-yellow-50 border border-be-yellow-100">
                  <Icon className="size-4 text-be-yellow-text" aria-hidden="true" focusable="false" />
                </div>
                {/* Heading — bold, navy */}
                <span className="text-sm sm:text-base font-bold tracking-tight text-be-navy-800 leading-none">
                  {item.heading}
                </span>
                {/* Sublabel — small, muted */}
                <span className="text-[0.6875rem] sm:text-xs font-medium text-be-grey-650 leading-snug">
                  {item.sublabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
