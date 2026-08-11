'use client';

import { Check, Scale } from 'lucide-react';
import { useCompare, COMPARE_MAX } from './CompareContext';
import { cn } from '@/lib/utils';

/**
 * CompareToggle — a small "Add to compare" checkbox-style button rendered
 * on each product card. Uses the shared CompareContext so the selection
 * drives the sticky CompareBar and CompareModal.
 *
 * Interaction:
 *   • Click toggles selection. When selected, shows a check + filled state.
 *   • When at capacity (3) and this card is NOT selected, the button is
 *     disabled and shows a tooltip explaining the limit.
 *   • Stop-propagation on click so the card's wrapping <Link> is not fired.
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
}: {
  slug: string;
  productName: string;
  className?: string;
}) {
  const { isSelected, toggle, count, atCapacity } = useCompare();
  const selected = isSelected(slug);
  const disabled = !selected && atCapacity;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      aria-label={`${selected ? 'Remove' : 'Add'} ${productName} from comparison`}
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
        'group/compare inline-flex items-center gap-1 rounded px-2 py-0.5 text-[0.68rem] font-medium transition-colors focus-ring',
        selected
          ? 'bg-be-yellow-500 text-be-charcoal-950 hover:bg-be-yellow-400'
          : 'bg-be-white/80 text-be-grey-550 border border-be-grey-200 hover:border-be-yellow-400 hover:text-be-charcoal-950',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {selected ? (
        <Check className="size-3" aria-hidden="true" focusable="false" />
      ) : (
        <Scale className="size-3" aria-hidden="true" focusable="false" />
      )}
      <span>{selected ? 'Selected' : 'Compare'}</span>
      {!selected && count > 0 && (
        <span className="text-be-grey-450 tabular-nums">{count}/{COMPARE_MAX}</span>
      )}
    </button>
  );
}
