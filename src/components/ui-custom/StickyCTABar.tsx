'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { cn } from '@/lib/utils';

/**
 * prefers-reduced-motion subscription via useSyncExternalStore so we never
 * call setState synchronously inside an effect (avoids the cascading-render
 * lint rule and stays SSR-safe — server snapshot is `false`).
 */
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}
function getReducedMotionClient() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function getReducedMotionServer() {
  return false;
}

/**
 * StickyCTABar
 *
 * A conversion-focused pill bar that floats near the bottom of the viewport
 * after the user has scrolled past the hero (~600px). It hides again when the
 * FinalCTA section (`#quote`) is approaching the viewport, since that section
 * already offers the same contact actions — showing the bar there would be
 * redundant.
 *
 * Visibility rules (all evaluated together on every scroll / resize):
 *   1. Hidden until `window.scrollY > 600`
 *   2. Hidden once `#quote` element's top is within 70% of viewport height
 *   3. Hidden while the cookie consent banner is likely visible (no
 *      `be-cookie-consent` in localStorage AND < 5s since mount). Also
 *      re-evaluated on a custom `be:cookie-visible` event for forward-compat.
 *
 * Layering: z-40 (same as the chat widget). The cookie banner (z-50) and
 * site header (z-50) sit above it; the scroll-to-top button (z-40) is on the
 * opposite side so they don't collide.
 *
 * The container is a pill centred on desktop (`bottom-4`, `max-w-3xl`,
 * `w-[calc(100vw-2rem)]`) and edge-to-edge on mobile (`bottom-2 left-2 right-2`).
 */

const WHATSAPP_URL = 'https://wa.me/911234567890';
const COOKIE_STORAGE_KEY = 'be-cookie-consent';
const SCROLL_TRIGGER_PX = 600;
const COOKIE_BLOCK_WINDOW_MS = 5000;
const QUOTE_REVEAL_RATIO = 0.7;

// External store for cookie banner visibility, shared across components
// via the `be:cookie-visible` custom event. This avoids the cascading-render
// lint rule by using useSyncExternalStore instead of setState-in-effect.
const cookieBannerListeners = new Set<() => void>();
let cookieBannerVisibleCached = false;
let cookieBannerInitialized = false;

function notifyCookieBannerListeners() {
  cookieBannerListeners.forEach((l) => l());
}

function initCookieBannerStore() {
  if (cookieBannerInitialized || typeof window === 'undefined') return;
  cookieBannerInitialized = true;
  // Initial state: if no consent stored, banner will likely show after 1.5s.
  try {
    const consent = window.localStorage.getItem(COOKIE_STORAGE_KEY);
    cookieBannerVisibleCached = !consent;
  } catch {
    cookieBannerVisibleCached = false;
  }
  // Subscribe to visibility events dispatched by CookieConsent.
  window.addEventListener('be:cookie-visible', (e: Event) => {
    const ce = e as CustomEvent<{ visible: boolean }>;
    const next = Boolean(ce.detail?.visible);
    if (next !== cookieBannerVisibleCached) {
      cookieBannerVisibleCached = next;
      notifyCookieBannerListeners();
    }
  });
}

function subscribeCookieBanner(cb: () => void) {
  initCookieBannerStore();
  cookieBannerListeners.add(cb);
  return () => {
    cookieBannerListeners.delete(cb);
  };
}

function getCookieBannerClient() {
  initCookieBannerStore();
  return cookieBannerVisibleCached;
}

function getCookieBannerServer() {
  return false;
}

export function StickyCTABar() {
  const [visible, setVisible] = useState(false);
  const cookieBannerVisible = useSyncExternalStore(
    subscribeCookieBanner,
    getCookieBannerClient,
    getCookieBannerServer
  );
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionClient,
    getReducedMotionServer
  );

  const mountTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    mountTimeRef.current = Date.now();

    const shouldHideForCookie = (): boolean => {
      // Direct signal from CookieConsent component (most reliable).
      if (cookieBannerVisible) return true;
      // Fallback: in the first 5s, if no consent yet, assume banner is showing.
      try {
        const consent = window.localStorage.getItem(COOKIE_STORAGE_KEY);
        if (consent) return false;
        const elapsed = Date.now() - mountTimeRef.current;
        return elapsed < COOKIE_BLOCK_WINDOW_MS;
      } catch {
        return false;
      }
    };

    const update = () => {
      rafRef.current = null;

      // Rule 1: only show after the hero.
      if (window.scrollY <= SCROLL_TRIGGER_PX) {
        setVisible(false);
        return;
      }

      // Rule 2: hide when FinalCTA section is approaching the viewport.
      const quoteEl = document.getElementById('quote');
      if (quoteEl) {
        const rect = quoteEl.getBoundingClientRect();
        if (rect.top < window.innerHeight * QUOTE_REVEAL_RATIO) {
          setVisible(false);
          return;
        }
      }

      // Rule 3: defer to the cookie banner while it may be on screen.
      if (shouldHideForCookie()) {
        setVisible(false);
        return;
      }

      setVisible(true);
    };

    const scheduleUpdate = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    // After the cookie-blocking window expires, re-evaluate so the bar can
    // reveal itself even if the user hasn't scrolled in the meantime.
    const cookieTimer = window.setTimeout(
      scheduleUpdate,
      COOKIE_BLOCK_WINDOW_MS + 100
    );

    // First evaluation.
    scheduleUpdate();

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.clearTimeout(cookieTimer);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    // Re-run when cookie banner visibility changes.
  }, [cookieBannerVisible]);

  // Re-evaluate visibility whenever the cookie banner visibility changes.
  useEffect(() => {
    if (!cookieBannerVisible) {
      // Banner just hid — re-check whether the CTA should now show.
      const raf = requestAnimationFrame(() => {
        if (window.scrollY > SCROLL_TRIGGER_PX) {
          const quoteEl = document.getElementById('quote');
          if (!quoteEl || quoteEl.getBoundingClientRect().top >= window.innerHeight * QUOTE_REVEAL_RATIO) {
            setVisible(true);
          }
        }
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [cookieBannerVisible]);

  const transition = reducedMotion
    ? 'none'
    : 'transform 400ms ease-out, opacity 400ms ease-out';

  return (
    <aside
      role="region"
      aria-label="Quick contact"
      aria-hidden={!visible}
      className={cn(
        'fixed z-40',
        // Mobile: edge-to-edge with a small inset.
        'left-2 right-2 bottom-2 max-w-none',
        // Desktop: centred pill.
        'sm:left-1/2 sm:right-auto sm:bottom-4 sm:-translate-x-1/2',
        'sm:max-w-3xl sm:w-[calc(100vw-2rem)]',
        // Container itself never blocks pointer events; inner does.
        'pointer-events-none'
      )}
      // Forward-compatible: when not visible, mark the whole region inert so
      // keyboard users can't Tab into the hidden buttons. Spread-conditionally
      // applied so SSR + older TS lib configs stay happy.
      {...(!visible ? ({ inert: true } as Record<string, unknown>) : {})}
    >
      <div
        className="pointer-events-none"
        style={{
          fontFamily: "'Manrope', sans-serif",
          transform: visible ? 'translateY(0)' : 'translateY(4rem)',
          opacity: visible ? 1 : 0,
          transition,
        }}
      >
        <div
          className={cn(
            'pointer-events-auto',
            'rounded-full bg-navy/95 backdrop-blur-md border border-white/10 shadow-2xl text-white',
            'px-4 py-2.5',
            'flex items-center justify-between gap-3'
          )}
        >
          {/* Left: technical-sales prompt */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="shrink-0 grid place-items-center w-8 h-8 rounded-full bg-orange/15 border border-orange/30 text-orange"
              aria-hidden="true"
            >
              <Phone className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-tight truncate">
                Talk to technical sales
              </p>
              <p className="hidden sm:block text-[0.7rem] text-white/60 leading-tight mt-0.5 truncate">
                +91-123-456-7890 · Mon–Sat 9:30–18:30 IST
              </p>
            </div>
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full',
                'bg-[#25D366] hover:bg-[#1DA851] text-white',
                'text-xs sm:text-sm font-semibold',
                'transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-navy'
              )}
              aria-label="Chat with us on WhatsApp (opens in a new tab)"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
            <QuoteButton
              className="bg-orange hover:bg-orange-hover text-white text-sm font-medium h-9 px-5 rounded-full"
            >
              Request a quote
            </QuoteButton>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default StickyCTABar;
