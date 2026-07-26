'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { ArrowUp } from 'lucide-react';

// Shared external store for cookie banner visibility (defined in StickyCTABar.tsx
// but duplicated here so this file is self-contained). The actual store is
// the `be:cookie-visible` window custom event + localStorage fallback.
const COOKIE_STORAGE_KEY = 'be-cookie-consent';
const cookieListeners = new Set<() => void>();
let cookieCached = false;
let cookieInit = false;

function initCookieStore() {
  if (cookieInit || typeof window === 'undefined') return;
  cookieInit = true;
  try {
    const consent = window.localStorage.getItem(COOKIE_STORAGE_KEY);
    cookieCached = !consent;
  } catch {
    cookieCached = false;
  }
  window.addEventListener('be:cookie-visible', (e: Event) => {
    const ce = e as CustomEvent<{ visible: boolean }>;
    const next = Boolean(ce.detail?.visible);
    if (next !== cookieCached) {
      cookieCached = next;
      cookieListeners.forEach((l) => l());
    }
  });
}

function subscribeCookie(cb: () => void) {
  initCookieStore();
  cookieListeners.add(cb);
  return () => {
    cookieListeners.delete(cb);
  };
}
function getCookieClient() {
  initCookieStore();
  return cookieCached;
}
function getCookieServer() {
  return false;
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const cookieVisible = useSyncExternalStore(
    subscribeCookie,
    getCookieClient,
    getCookieServer
  );

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Shift the button up when the cookie banner is visible so they don't overlap.
  const bottomOffset = cookieVisible ? '7.5rem' : '1.5rem';

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed right-6 z-40 w-11 h-11 rounded-full bg-navy hover:bg-navy-light text-white shadow-lg flex items-center justify-center transition-all duration-300"
      style={{
        bottom: bottomOffset,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
