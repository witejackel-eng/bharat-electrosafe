'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/**
 * CompareContext — client state for the interactive product comparison tool.
 *
 * Scope: mounted on the /products route so state is shared between product
 * cards (CompareToggle), the sticky CompareBar, and the CompareModal.
 *
 * Behaviour:
 *   • Holds an ordered list of selected product slugs (max MAX_COMPARE).
 *   • `toggle(slug)` adds or removes a slug. If at capacity, the new slug
 *     is ignored and `atCapacity` returns true so the UI can surface a hint.
 *   • `clear()` empties the selection.
 *   • `isSelected(slug)` for checkbox state.
 *
 * The state is intentionally NOT persisted to localStorage — comparison
 * selection is a per-session decision and persisting it would surprise
 * returning users with a stale bar.
 */

const MAX_COMPARE = 3;

interface CompareContextValue {
  selected: string[];
  toggle: (slug: string) => void;
  clear: () => void;
  isSelected: (slug: string) => boolean;
  count: number;
  atCapacity: boolean;
  max: number;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = useCallback((slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= MAX_COMPARE) {
        return prev; // ignore — caller can read atCapacity
      }
      return [...prev, slug];
    });
  }, []);

  const clear = useCallback(() => setSelected([]), []);

  const isSelected = useCallback(
    (slug: string) => selected.includes(slug),
    [selected],
  );

  const value = useMemo<CompareContextValue>(
    () => ({
      selected,
      toggle,
      clear,
      isSelected,
      count: selected.length,
      atCapacity: selected.length >= MAX_COMPARE,
      max: MAX_COMPARE,
    }),
    [selected, toggle, clear, isSelected],
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return ctx;
}

export const COMPARE_MAX = MAX_COMPARE;
