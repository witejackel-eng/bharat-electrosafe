'use client';

import { useSyncExternalStore } from 'react';

/**
 * Per-quote status tracking, persisted to localStorage so admins can
 * triage quote requests across sessions.
 *
 * Uses the `useSyncExternalStore` pattern (same shape as CookieConsent)
 * so React can subscribe to localStorage changes without triggering the
 * "setState synchronously inside an effect" lint rule.
 */

export type QuoteStatus = 'new' | 'reviewed' | 'quoted' | 'archived';

export const QUOTE_STATUS_ORDER: readonly QuoteStatus[] = [
  'new',
  'reviewed',
  'quoted',
  'archived',
] as const;

export const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  new: 'New',
  reviewed: 'Reviewed',
  quoted: 'Quoted',
  archived: 'Archived',
};

const STORAGE_KEY = 'be-quote-status';
const VALID_STATUSES: readonly string[] = [...QUOTE_STATUS_ORDER];

export type QuoteStatusMap = Record<string, QuoteStatus>;

/* ------------------------------------------------------------------ */
/* Internal store                                                      */
/* ------------------------------------------------------------------ */

const listeners = new Set<() => void>();

// Module-level stable empty object — React's useSyncExternalStore requires
// getServerSnapshot to return a referentially-stable value (otherwise it
// detects an infinite render loop on the server).
const EMPTY_STATUS_MAP: QuoteStatusMap = Object.freeze({}) as QuoteStatusMap;

// Cache the raw localStorage string + parsed object so useSyncExternalStore
// gets a stable reference between renders when nothing changed (otherwise
// React detects an infinite render loop).
let cachedRaw: string | null = null;
let cachedParsed: QuoteStatusMap = EMPTY_STATUS_MAP;

function isValidStatus(v: unknown): v is QuoteStatus {
  return typeof v === 'string' && VALID_STATUSES.includes(v);
}

function parseMap(raw: string | null): QuoteStatusMap {
  if (!raw) return EMPTY_STATUS_MAP;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return EMPTY_STATUS_MAP;
    const result: QuoteStatusMap = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (isValidStatus(value)) {
        result[key] = value;
      }
    }
    // Return the stable empty reference when the parsed map is empty so
    // useSyncExternalStore always gets a referentially-stable value.
    return Object.keys(result).length === 0 ? EMPTY_STATUS_MAP : result;
  } catch {
    return EMPTY_STATUS_MAP;
  }
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage);
  }
  return () => {
    listeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', onStorage);
    }
  };
}

function getSnapshot(): QuoteStatusMap {
  if (typeof window === 'undefined') return EMPTY_STATUS_MAP;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw === cachedRaw) {
    return cachedParsed;
  }
  cachedRaw = raw;
  cachedParsed = parseMap(raw);
  return cachedParsed;
}

function getServerSnapshot(): QuoteStatusMap {
  return EMPTY_STATUS_MAP;
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

/** Read the full status map (reactive — re-renders on change). */
export function useQuoteStatuses(): QuoteStatusMap {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Read a single quote's status (reactive — re-renders on change). */
export function useQuoteStatus(quoteId: string): QuoteStatus {
  const map = useQuoteStatuses();
  return map[quoteId] ?? 'new';
}

/** Imperatively read a status (non-reactive). Useful for one-shot reads. */
export function readQuoteStatus(quoteId: string): QuoteStatus {
  return getSnapshot()[quoteId] ?? 'new';
}

/** Persist a status change for the given quote id and notify subscribers. */
export function setQuoteStatus(quoteId: string, status: QuoteStatus): void {
  if (typeof window === 'undefined') return;
  if (!isValidStatus(status)) return;
  if (!quoteId) return;
  const current = getSnapshot();
  // Skip if no change (avoids spurious re-renders).
  if (current[quoteId] === status) return;
  const next: QuoteStatusMap = { ...current, [quoteId]: status };
  const serialized = JSON.stringify(next);
  try {
    window.localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    /* no-op: storage unavailable (private mode, quota, etc.) */
  }
  // Bump cache so the next getSnapshot returns the same reference.
  cachedRaw = serialized;
  cachedParsed = next;
  notifyListeners();
}
