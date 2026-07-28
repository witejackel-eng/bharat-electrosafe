/**
 * SectionShell — Contextual section spacing for narrative page architecture
 *
 * Replaces the old section-padding-major / section-padding-supporting system
 * with semantic variants that control both vertical rhythm and background tone.
 *
 * Each variant has a specific purpose:
 * - hero: First section on a page (larger top padding, generous bottom)
 * - standard: Default content section (balanced spacing)
 * - compact: Dense sections like FAQ, trust indicators (tighter spacing)
 * - connected: Follows the previous section without a gap (uses a thin rule or tone change)
 * - technical: Specifications, data tables (slightly tighter, focused)
 * - conversion: CTA sections (warm background, prominent spacing)
 *
 * The "single gap owner" principle: only the SectionShell owns the gap between
 * sections. Child components never add their own top/bottom margin to create
 * section-level spacing.
 */

import { cn } from '@/lib/utils';

export type SectionVariant =
  | 'hero'
  | 'standard'
  | 'compact'
  | 'connected'
  | 'technical'
  | 'conversion';

export interface SectionShellProps {
  /** Which spacing/tonal variant to use */
  variant?: SectionVariant;
  /** Background color override — use brand tokens or Tailwind classes */
  bg?: string;
  /** Additional CSS classes */
  className?: string;
  /** HTML id attribute */
  id?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Section content */
  children: React.ReactNode;
  /** Whether to render a thin separator rule at the top */
  topRule?: boolean;
  /** Whether to render a yellow accent line at the top */
  yellowAccent?: boolean;
}

/* ────────────────────────────────────────────
   Spacing tokens per variant
   ──────────────────────────────────────────── */

const variantSpacing: Record<SectionVariant, string> = {
  hero: 'pt-16 md:pt-20 pb-14 md:pb-20',
  standard: 'pt-12 md:pt-16 pb-12 md:pb-16',
  compact: 'pt-10 md:pt-14 pb-10 md:pb-14',
  connected: 'pt-0 md:pt-0 pb-12 md:pb-16',
  technical: 'pt-10 md:pt-14 pb-10 md:pb-14',
  conversion: 'pt-14 md:pt-18 pb-14 md:pb-18',
};

const variantBg: Record<SectionVariant, string> = {
  hero: 'bg-be-warm-white',
  standard: 'bg-be-white',
  compact: 'bg-be-white',
  connected: 'bg-be-white',
  technical: 'bg-be-cream',
  conversion: 'bg-be-yellow-50',
};

export function SectionShell({
  variant = 'standard',
  bg,
  className,
  id,
  ariaLabel,
  children,
  topRule = false,
  yellowAccent = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        // Base
        'relative',
        // Spacing
        variantSpacing[variant],
        // Background
        bg || variantBg[variant],
        // Top rule separator
        topRule && 'border-t border-be-grey-250',
        // Yellow accent at top
        yellowAccent && 'before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-be-yellow-500',
        className
      )}
    >
      <div className="container-site page-horizontal-padding">
        {children}
      </div>
    </section>
  );
}
