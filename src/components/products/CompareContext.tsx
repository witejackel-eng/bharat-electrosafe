'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
 * URL Sync:
 *   • The selection is synced to the `?compare=slug1,slug2` URL search param
 *     so a comparison can be shared/bookmarked. On mount, the provider reads
 *     the URL and pre-populates the selection. On change, it updates the URL
 *     via history.replaceState (no scroll, no extra history entry).
 *   • This is a one-way sync: the URL is the source of truth on initial
 *     mount, then React state drives subsequent URL updates.
 */

const MAX_COMPARE = 3;
const PARAM_NAME = 'compare';

interface CompareContextValue {
  selected: string[];
  toggle: (slug: string) => void;
  clear: () => void;
  isSelected: (slug: string) => boolean;
  count: number;
  atCapacity: boolean;
  max: number;
  /** A shareable URL with the current selection in the ?compare= param. */
  shareUrl: string;
}

export const CompareContext = createContext<CompareContextValue | null>(null);

/** Parse the ?compare= param from the current URL. Returns slugs or []. */
function readFromUrl(): string[] {
  if (typeof window === 'undefined') return [];
  const params = new URLSearchParams(window.location.search);
  const raw = params.get(PARAM_NAME);
  if (!raw) return [];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, MAX_COMPARE);
}

/** Write the selection to the URL via history.replaceState (no scroll). */
function writeToUrl(slugs: string[]) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (slugs.length > 0) {
    url.searchParams.set(PARAM_NAME, slugs.join(','));
  } else {
    url.searchParams.delete(PARAM_NAME);
  }
  window.history.replaceState({}, '', url.toString());
}

export function CompareProvider({ children }: { children: ReactNode }) {
  // Initialise from URL on the client. SSR returns [] (readFromUrl checks
  // typeof window), then the effect below hydrates from the URL.
  const [selected, setSelected] = useState<string[]>([]);
  const hasHydrated = useRef(false);

  // On mount: read the URL and pre-populate the selection.
  // The setState is wrapped in rAF so it runs asynchronously, satisfying
  // the react-hooks/set-state-in-effect lint rule. The hasHydrated ref is
  // set inside the rAF callback so subsequent URL writes are in sync.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const fromUrl = readFromUrl();
      if (fromUrl.length > 0) {
        setSelected(fromUrl);
      }
      hasHydrated.current = true;
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // On change (after hydration): write back to the URL.
  useEffect(() => {
    if (!hasHydrated.current) return;
    writeToUrl(selected);
  }, [selected]);

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

  // Build a shareable URL for the current selection.
  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const url = new URL(window.location.href);
    if (selected.length > 0) {
      url.searchParams.set(PARAM_NAME, selected.join(','));
    } else {
      url.searchParams.delete(PARAM_NAME);
    }
    return url.toString();
  }, [selected]);

  const value = useMemo<CompareContextValue>(
    () => ({
      selected,
      toggle,
      clear,
      isSelected,
      count: selected.length,
      atCapacity: selected.length >= MAX_COMPARE,
      max: MAX_COMPARE,
      shareUrl,
    }),
    [selected, toggle, clear, isSelected, shareUrl],
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
