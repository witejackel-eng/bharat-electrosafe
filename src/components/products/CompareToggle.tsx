'use client';

import { Check, GitCompare } from 'lucide-react';
import { useCompare, COMPARE_MAX } from './CompareContext';
import { cn } from '@/lib/utils';

/**
 * CompareToggle — a small "Add to compare" / "Remove from compare" button.
 * Uses the shared CompareContext so the selection drives the sticky
 * CompareBar and the CompareModal.
 *
 * Two visual variants:
 *   • `variant="chip"` (default) — compact pill used inside product cards,
 *     below or beside the card content. Shows "Compare" / "Added" plus a
 *     live count badge.
 *   • `variant="overlay"` — opaque-on-image pill designed to sit absolutely
 *     positioned over a card image (top-right corner). Slightly larger hit
 *     target and a stronger background so it stays legible over photographs.
 *
 * Interaction:
 *   • Click toggles selection. When selected, shows a check + filled state.
 *   • When at capacity (3) and this card is NOT selected, the button is
 *     disabled and the title attribute explains the limit.
 *   • stopPropagation + preventDefault so the card's wrapping <Link> is not
 *     fired when the toggle is clicked.
 *
 * Accessibility:
 *   • role="checkbox" with aria-checked
 *   • aria-label includes product name + current state
 *   • disabled state surfaced via aria-disabled
 *   • focus-ring utility for keyboard users
 */
export function CompareToggle({
  slug,
  productName,
  className,
  variant = 'chip',
}: {
  slug: string;
  productName: string;
  className?: string;
  variant?: 'chip' | 'overlay';
}) {
  const { isSelected, toggle, count, atCapacity } = useCompare();
  const selected = isSelected(slug);
  const disabled = !selected && atCapacity;
  const label = selected
    ? `Remove ${productName} from comparison`
    : `Add ${productName} to comparison`;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      aria-label={label}
      aria-disabled={disabled}
      title={
        disabled
          ? `You can compare up to ${COMPARE_MAX} products. Remove one to add ${productName}.`
          : selected
            ? `Remove ${productName} from comparison`
            : `Add ${productName} to comparison`
      }
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) toggle(slug);
      }}
      className={cn(
        'group/compare inline-flex items-center gap-1.5 rounded-full font-medium transition-colors focus-ring',
        variant === 'overlay'
          ? 'px-2.5 py-1 text-[0.7rem] shadow-sm backdrop-blur-sm'
          : 'px-2.5 py-1 text-[0.7rem]',
        selected
          ? 'bg-be-yellow-500 text-be-charcoal-950 hover:bg-be-yellow-400'
          : variant === 'overlay'
            ? 'bg-be-white/90 text-be-charcoal-950 border border-be-grey-200 hover:border-be-yellow-400 hover:bg-be-white'
            : 'bg-be-white/80 text-be-grey-550 border border-be-grey-200 hover:border-be-yellow-400 hover:text-be-charcoal-950',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {selected ? (
        <Check className="size-3.5" aria-hidden="true" focusable="false" />
      ) : (
        <GitCompare className="size-3.5" aria-hidden="true" focusable="false" />
      )}
      <span>{selected ? 'Remove' : 'Compare'}</span>
      {!selected && count > 0 && (
        <span
          className={cn(
            'tabular-nums text-[0.65rem] font-semibold',
            variant === 'overlay' ? 'text-be-grey-650' : 'text-be-grey-450',
          )}
        >
          {count}/{COMPARE_MAX}
        </span>
      )}
    </button>
  );
}
