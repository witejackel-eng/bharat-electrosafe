'use client';

import { Globe } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import {
  subscribeLocale,
  getLocaleSnapshot,
  getLocaleServerSnapshot,
  setLocale,
  type Locale,
} from '@/lib/i18n';

/**
 * Visible EN/HI language toggle.
 *
 * Renders a pill-shaped button with a Globe icon and the current locale's
 * short label (EN / हिं). The "next" locale is shown muted on the right
 * side so the affordance is obvious: "EN / हिं" means "currently English,
 * click to switch to Hindi".
 *
 * Uses the cached-raw useSyncExternalStore pattern so the snapshot is stable
 * across renders and there is no hydration mismatch.
 */
export function LocaleToggle({ className = '' }: { className?: string }) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getLocaleServerSnapshot,
  );
  const next: Locale = locale === 'en' ? 'hi' : 'en';
  const label = locale === 'en' ? 'EN' : 'हिं';
  const nextLabel = next === 'en' ? 'EN' : 'हिं';

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={`Switch language to ${nextLabel}`}
      title={`Switch to ${next === 'hi' ? 'हिंदी' : 'English'}`}
      className={`group inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white dark:bg-card px-3 py-1.5 text-xs font-semibold text-navy dark:text-white hover:border-orange/40 hover:text-orange transition-colors ${className}`}
    >
      <Globe className="w-3.5 h-3.5" aria-hidden="true" />
      <span className="tabular-nums">{label}</span>
      <span
        className="text-white/30 dark:text-white/30 group-hover:text-orange/40 transition-colors"
        aria-hidden="true"
      >
        /
      </span>
      <span className="text-steel dark:text-white/50 group-hover:text-orange transition-colors text-[0.7rem]">
        {nextLabel}
      </span>
    </button>
  );
}
