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
 * Scope: mounted at the root layout (src/app/layout.tsx) so the selection is
 * shared across every route — homepage product cards, /products listing
 * cards, the sticky CompareBar, and the CompareModal.
 *
 * Behaviour:
 *   • Holds an ordered list of selected product slugs (max MAX_COMPARE).
 *   • `toggle(slug)` adds or removes a slug. If at capacity, the new slug
 *     is ignored and `atCapacity` returns true so the UI can surface a hint.
 *   • `clear()` empties the selection.
 *   • `isSelected(slug)` for checkbox state.
 *   • `addToCompare(slug)` / `removeFromCompare(slug)` — explicit add/remove
 *     helpers (task spec API). They are safe to call when already in/out of
 *     the list — they no-op in those cases.
 *
 * Persistence (dual — so a comparison survives navigation AND is shareable):
 *   • localStorage key `be-compare-list` — survives page navigation across
 *     routes without polluting the URL. Read on mount; written on every
 *     change. SSR-safe (guarded by typeof window).
 *   • URL search param `?compare=slug1,slug2` — shareable/bookmarkable. On
 *     mount the URL takes precedence (so a shared link wins), otherwise the
 *     localStorage value is used. On change the URL is updated via
 *     history.replaceState (no scroll, no extra history entry).
 *
 * The two stores are kept in sync: whichever is the source of truth on mount
 * (URL > localStorage), React state drives both stores on subsequent changes.
 */

const MAX_COMPARE = 3;
const PARAM_NAME = 'compare';
const STORAGE_KEY = 'be-compare-list';

interface CompareContextValue {
  /** Ordered list of selected product slugs. */
  selected: string[];
  /** Toggle a slug in/out of the selection (no-op when full). */
  toggle: (slug: string) => void;
  /** Explicit add — no-op if already present or at capacity. */
  addToCompare: (slug: string) => void;
  /** Explicit remove — no-op if not present. */
  removeFromCompare: (slug: string) => void;
  /** Empty the selection. */
  clear: () => void;
  /** Alias of clear (task spec API). */
  clearCompare: () => void;
  /** Is the given slug currently selected? */
  isSelected: (slug: string) => boolean;
  /** Alias of isSelected (task spec API). */
  isInCompare: (slug: string) => boolean;
  /** Number of products currently selected. */
  count: number;
  /** Alias of count (task spec API). */
  compareCount: number;
  /** True when selection is at MAX_COMPARE. */
  atCapacity: boolean;
  /** Inverse of atCapacity — is there room to add another? (task spec API) */
  canAddMore: boolean;
  /** The max number of products that can be compared. */
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

/** Read the persisted selection from localStorage. Returns slugs or []. */
function readFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((s): s is string => typeof s === 'string')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, MAX_COMPARE);
  } catch {
    // Corrupt or unavailable — fall back to empty.
    return [];
  }
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

/** Persist the selection to localStorage (best-effort — never throws). */
function writeToStorage(slugs: string[]) {
  if (typeof window === 'undefined') return;
  try {
    if (slugs.length > 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Quota / private mode / disabled — persistence is best-effort.
  }
}

export function CompareProvider({ children }: { children: ReactNode }) {
  // Initialise empty on SSR. The mount effect hydrates from URL > localStorage
  // via rAF so React doesn't warn about set-state-in-effect.
  const [selected, setSelected] = useState<string[]>([]);
  const hasHydrated = useRef(false);

  // On mount: URL takes precedence (shareable link wins), else localStorage.
  // The setState is wrapped in rAF so it runs asynchronously, satisfying the
  // react-hooks/set-state-in-effect lint rule.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const fromUrl = readFromUrl();
      const fromStorage = readFromStorage();
      const initial = fromUrl.length > 0 ? fromUrl : fromStorage;
      if (initial.length > 0) {
        setSelected(initial);
        // Ensure both stores reflect the chosen source of truth.
        writeToUrl(initial);
        writeToStorage(initial);
      }
      hasHydrated.current = true;
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // On change (after hydration): write back to URL + localStorage.
  useEffect(() => {
    if (!hasHydrated.current) return;
    writeToUrl(selected);
    writeToStorage(selected);
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

  const addToCompare = useCallback((slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev; // already present
      if (prev.length >= MAX_COMPARE) return prev; // at capacity
      return [...prev, slug];
    });
  }, []);

  const removeFromCompare = useCallback((slug: string) => {
    setSelected((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clear = useCallback(() => setSelected([]), []);
  const clearCompare = clear;

  const isSelected = useCallback(
    (slug: string) => selected.includes(slug),
    [selected],
  );
  const isInCompare = isSelected;

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
      addToCompare,
      removeFromCompare,
      clear,
      clearCompare,
      isSelected,
      isInCompare,
      count: selected.length,
      compareCount: selected.length,
      atCapacity: selected.length >= MAX_COMPARE,
      canAddMore: selected.length < MAX_COMPARE,
      max: MAX_COMPARE,
      shareUrl,
    }),
    [selected, toggle, addToCompare, removeFromCompare, clear, clearCompare, isSelected, isInCompare, shareUrl],
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare(): CompareContextValue {
  const ctx = useContext(CompareContext);
  // During SSR or if the provider is not mounted (e.g. a route that doesn't
  // wrap in CompareProvider), return a no-op default instead of throwing.
  // This makes the hook SSR-safe and prevents the entire page from crashing
  // if a CompareToggle is rendered outside the provider. The provider is
  // mounted in the root layout, so this is only a safety net.
  if (!ctx) {
    return {
      selected: [],
      toggle: () => {},
      addToCompare: () => {},
      removeFromCompare: () => {},
      clear: () => {},
      clearCompare: () => {},
      isSelected: () => false,
      isInCompare: () => false,
      count: 0,
      compareCount: 0,
      atCapacity: false,
      canAddMore: true,
      max: MAX_COMPARE,
      shareUrl: '',
    };
  }
  return ctx;
}

export const COMPARE_MAX = MAX_COMPARE;
