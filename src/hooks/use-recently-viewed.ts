'use client';

/**
 * useRecentlyViewed — client-side recently viewed product tracker.
 *
 * Persists an ordered list of product slugs (max 4, most-recent-first) in
 * localStorage under the key `be-recently-viewed`. The hook is SSR-safe —
 * it returns an empty array on the server and during client hydration,
 * then populates from localStorage after mount via useSyncExternalStore.
 *
 * Cross-tab sync is handled via the native `storage` event, so opening a
 * product page in a second tab will be reflected on the first tab's
 * homepage without a full reload.
 *
 * Implementation note: we use useSyncExternalStore (the same pattern as
 * `src/hooks/use-mobile.ts`) instead of useEffect + setState. This avoids
 * cascading renders flagged by react-hooks/set-state-in-effect and gives
 * us a stable snapshot between renders.
 */

import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'be-recently-viewed';
const MAX_ITEMS = 4;

const EMPTY_LIST: readonly string[] = Object.freeze([]) as readonly string[];

/* ────────────────────────────────────────────
   In-memory cache + pub/sub
   ────────────────────────────────────────────
   A module-level cache so multiple hook instances in the same tab stay
   in sync and so getSnapshot returns a stable reference between renders. */

let cache: readonly string[] = EMPTY_LIST;
let cacheInitialized = false;
const subscribers = new Set<() => void>();

function notifySubscribers(): void {
  for (const cb of subscribers) cb();
}

/** Parse and validate the localStorage payload. Returns [] on any error. */
function readFromLocalStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((v): v is string => typeof v === 'string' && v.length > 0)
      .slice(0, MAX_ITEMS);
  } catch {
    // Corrupt JSON, disabled localStorage, quota errors — treat as empty.
    return [];
  }
}

/** Write the slug array back to localStorage. Silently no-ops on the server. */
function writeToLocalStorage(slugs: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // Ignore write failures (private mode, quota, disabled storage).
  }
}

/** Refresh the in-memory cache from localStorage and notify subscribers. */
function refreshCacheFromStorage(): void {
  cache = readFromLocalStorage();
  cacheInitialized = true;
  notifySubscribers();
}

/* ────────────────────────────────────────────
   useSyncExternalStore bindings
   ──────────────────────────────────────────── */

function subscribe(onStoreChange: () => void): () => void {
  // Lazy-init the cache on first subscription in the browser so the very
  // first client snapshot (taken after hydration) sees real localStorage
  // data instead of the empty placeholder.
  if (!cacheInitialized && typeof window !== 'undefined') {
    cache = readFromLocalStorage();
    cacheInitialized = true;
  }

  subscribers.add(onStoreChange);

  // Cross-tab synchronisation — native storage events fire on other tabs.
  function handleStorage(e: StorageEvent) {
    if (e.key === STORAGE_KEY) {
      cache = readFromLocalStorage();
      notifySubscribers();
    }
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
  }

  return () => {
    subscribers.delete(onStoreChange);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
    }
  };
}

function getSnapshot(): readonly string[] {
  return cache;
}

function getServerSnapshot(): readonly string[] {
  // SSR and the very first client render — empty so the homepage layout
  // never reserves empty space for Recently Viewed before hydration.
  return EMPTY_LIST;
}

export interface UseRecentlyViewedResult {
  /** Ordered list of recently viewed product slugs (most-recent-first). */
  recentlyViewed: readonly string[];
  /** Prepend a slug to the list, dedupe, and trim to MAX_ITEMS. */
  addToRecentlyViewed: (slug: string) => void;
  /** Empty the list and remove the localStorage entry. */
  clearRecentlyViewed: () => void;
}

export function useRecentlyViewed(): UseRecentlyViewedResult {
  const recentlyViewed = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const addToRecentlyViewed = useCallback((slug: string) => {
    if (!slug) return;
    const current = readFromLocalStorage();
    const deduped = [slug, ...current.filter((s) => s !== slug)].slice(
      0,
      MAX_ITEMS,
    );
    writeToLocalStorage(deduped);
    cache = deduped;
    cacheInitialized = true;
    notifySubscribers();
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    writeToLocalStorage([]);
    cache = EMPTY_LIST;
    cacheInitialized = true;
    notifySubscribers();
  }, []);

  return { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed };
}
