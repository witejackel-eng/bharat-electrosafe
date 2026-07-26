'use client';

import { useSyncExternalStore } from 'react';
import {
  subscribeLocale,
  getLocaleSnapshot,
  getLocaleServerSnapshot,
} from '@/lib/i18n';

/**
 * Reactive Locale hook for client components.
 *
 * Wraps the cached-raw external store so any component can subscribe to
 * locale changes without re-implementing the useSyncExternalStore boilerplate.
 *
 * The server snapshot is always DEFAULT_LOCALE ('en') so the first client
 * render matches the server render — React then re-renders with the saved
 * locale once the client subscription is established.
 */
export function useLocale() {
  return useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getLocaleServerSnapshot,
  );
}
