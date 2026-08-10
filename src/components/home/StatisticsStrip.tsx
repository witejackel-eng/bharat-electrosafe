import { Calendar, Globe, Users, CircleCheckBig } from 'lucide-react';
import { companyStatistics } from '@/data/trust';
import StatCounter from './StatCounter';

/**
 * StatisticsStrip — Server Component.
 *
 * Client-provided company statistics displayed as a compact horizontal
 * strip immediately below the homepage hero. Serves as a credibility
 * bridge between the hero and product content.
 *
 * Design:
 *   - Warm white / light background
 *   - Navy/dark blue primary text
 *   - Bharat yellow/gold accent
 *   - Compact horizontal strip with icon + number + label
 *   - Desktop: 4 items in one row
 *   - Tablet: 2×2
 *   - Mobile: 2×2
 *
 * Animation:
 *   - StatCounter (client component) adds count-up animation on viewport entry
 *   - Final values are server-rendered in HTML for SEO/crawlers
 *   - sr-only span preserves real value for screen readers
 *   - No external animation library — pure requestAnimationFrame
 */

const iconMap: Record<string, React.ReactNode> = {
  calendar: <Calendar className="size-5 text-be-yellow-text" aria-hidden="true" focusable="false" />,
  globe: <Globe className="size-5 text-be-yellow-text" aria-hidden="true" focusable="false" />,
  users: <Users className="size-5 text-be-yellow-text" aria-hidden="true" focusable="false" />,
  check: <CircleCheckBig className="size-5 text-be-yellow-text" aria-hidden="true" focusable="false" />,
};

export default function StatisticsStrip() {
  return (
    <section
      className="bg-be-warm-white border-y border-be-grey-250"
      aria-label="Company statistics"
    >
      <div className="container-site page-horizontal-padding py-6 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
          {companyStatistics.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center gap-1.5"
            >
              {/* Icon */}
              <div className="flex items-center justify-center size-10 rounded-full bg-be-yellow-50 border border-be-yellow-100 mb-0.5">
                {iconMap[stat.icon] ?? iconMap.calendar}
              </div>
              {/* Number — large, bold, navy — animated via StatCounter */}
              <StatCounter
                value={stat.value}
                className="text-2xl sm:text-3xl font-bold tracking-tight text-be-navy-800 leading-none"
              />
              {/* Label — small, muted */}
              <span className="text-xs sm:text-sm font-medium text-be-grey-650 leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
