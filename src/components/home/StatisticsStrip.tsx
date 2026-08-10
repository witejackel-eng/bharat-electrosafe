import { Globe, Users, LayoutGrid, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { companyStatistics, type StatIconKey } from '@/data/trust';

/**
 * StatisticsStrip — Server Component.
 *
 * Compact horizontal strip showing four company credibility statistics
 * below the homepage hero. Restored from the earlier statistics-style
 * presentation (replacing the IS 15652:2006 technical configuration strip).
 *
 * Design:
 *   - Warm white / light background
 *   - Navy/dark blue primary numbers
 *   - Muted labels
 *   - Small circular yellow-accent icons
 *   - Thin top/bottom separators (border-y)
 *   - Centered content
 *   - Desktop: 4 columns in one row
 *   - Tablet: 2×2
 *   - Mobile: 2×2
 *   - Compact height (no giant cards, no extra heading above)
 *
 * Data sourced from `companyStatistics` in `src/data/trust.ts`.
 * Product Families is dynamically derived from the product registry.
 *
 * No animation — purely static values. The StatCounter component
 * still exists but is not used; static values are acceptable and
 * avoid layout-shift risk.
 */

/** Map icon key to Lucide component. */
const iconMap: Record<StatIconKey, LucideIcon> = {
  globe: Globe,
  users: Users,
  grid: LayoutGrid,
  shield: ShieldCheck,
};

export default function StatisticsStrip() {
  return (
    <section
      className="bg-be-warm-white border-y border-be-grey-250"
      aria-label="Company statistics"
    >
      <div className="container-site page-horizontal-padding py-5 sm:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {companyStatistics.map((stat) => {
            const Icon = iconMap[stat.icon];
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center gap-1.5"
              >
                {/* Icon — small circular yellow-accent */}
                <div className="flex items-center justify-center size-9 rounded-full bg-be-yellow-50 border border-be-yellow-100">
                  <Icon className="size-4 text-be-yellow-text" aria-hidden="true" focusable="false" />
                </div>
                {/* Value — bold, navy, large */}
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-be-navy-800 leading-none">
                  {stat.value}
                </span>
                {/* Label — small, muted */}
                <span className="text-[0.6875rem] sm:text-xs font-medium text-be-grey-650 leading-snug">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
        {/* Subtle footnote for company-stated figures */}
        <p className="mt-3 text-center text-[0.625rem] sm:text-[0.6875rem] text-be-grey-500 leading-none">
          Countries served and customer figures are company-stated.
        </p>
      </div>
    </section>
  );
}
