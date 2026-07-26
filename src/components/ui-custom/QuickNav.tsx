'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { cn } from '@/lib/utils';

/**
 * QuickNav — sticky section navigator.
 *
 * A thin horizontal pill bar pinned to the bottom of the viewport (above the
 * StickyCTABar) that lets desktop users jump between the major homepage
 * sections and shows which one is currently in view.
 *
 * Visibility rules (mirrors StickyCTABar so the two bars never compete):
 *   1. Hidden until `window.scrollY > 600` (past the hero).
 *   2. Hidden once the FinalCTA (`#quote`) section approaches the viewport
 *      (its top is within 70% of viewport height) — that section already has
 *      its own conversion actions.
 *   3. Hidden while the cookie consent banner is likely on screen (subscribed
 *      via the shared `be:cookie-visible` external store + a 5s fallback).
 *
 * Active-section detection uses an IntersectionObserver with a thin root
 * margin band (`-40% 0px -55% 0px`) so the "active" section is the one
 * crossing roughly the 42% line of the viewport. The intersection ratios of
 * all observed sections are tracked in a ref so the best candidate can be
 * picked on every callback.
 *
 * Layering: z-30 (below modals z-50, above page content; StickyCTABar is z-40
 * and sits 5rem lower at `bottom-4`, this bar sits at `bottom-24`).
 *
 * Mobile (`< md`): hidden entirely — mobile users get the regular scroll
 * experience plus the StickyCTABar.
 */

interface NavSection {
  id: string;
  label: string;
}

const SECTIONS: NavSection[] = [
  { id: 'products', label: 'Products' },
  { id: 'product-selection', label: 'Selection' },
  { id: 'proof', label: 'Proof' },
  { id: 'applications', label: 'Applications' },
  { id: 'case-studies', label: 'Case studies' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'insights', label: 'Insights' },
  { id: 'resources', label: 'Resources' },
  { id: 'contact', label: 'Contact' },
  { id: 'faq', label: 'FAQ' },
  { id: 'quote', label: 'Get a quote' },
];

const SCROLL_TRIGGER_PX = 600;
const QUOTE_REVEAL_RATIO = 0.7;
const SCROLL_OFFSET_PX = 90;
const COOKIE_STORAGE_KEY = 'be-cookie-consent';
const COOKIE_BLOCK_WINDOW_MS = 5000;

/* ---------- prefers-reduced-motion external store (SSR-safe) ---------- */
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

/* ---------- cookie banner visibility external store ----------
 * Mirrors StickyCTABar.tsx so both components react to the same
 * `be:cookie-visible` custom event dispatched by CookieConsent.
 */
const cookieBannerListeners = new Set<() => void>();
let cookieBannerVisibleCached = false;
let cookieBannerInitialized = false;

function notifyCookieBannerListeners() {
  cookieBannerListeners.forEach((l) => l());
}

function initCookieBannerStore() {
  if (cookieBannerInitialized || typeof window === 'undefined') return;
  cookieBannerInitialized = true;
  try {
    const consent = window.localStorage.getItem(COOKIE_STORAGE_KEY);
    cookieBannerVisibleCached = !consent;
  } catch {
    cookieBannerVisibleCached = false;
  }
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

export function QuickNav() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);

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
  const visibleRatiosRef = useRef<Map<string, number>>(new Map());

  /* ----- main effect: visibility + active-section observer -----
   * Re-runs when the cookie banner visibility flips so the bar re-evaluates
   * immediately (mirrors StickyCTABar's pattern).
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    mountTimeRef.current = Date.now();

    let rafId: number | null = null;

    const evaluate = () => {
      rafId = null;

      // Rule 1: only show after the hero.
      if (window.scrollY <= SCROLL_TRIGGER_PX) {
        setVisible(false);
        return;
      }

      // Rule 2: hide when FinalCTA (#quote) is approaching the viewport.
      const quoteEl = document.getElementById('quote');
      if (quoteEl) {
        const rect = quoteEl.getBoundingClientRect();
        if (rect.top < window.innerHeight * QUOTE_REVEAL_RATIO) {
          setVisible(false);
          return;
        }
      }

      // Rule 3: defer to the cookie banner while it may be on screen.
      if (cookieBannerVisible) {
        setVisible(false);
        return;
      }
      try {
        const consent = window.localStorage.getItem(COOKIE_STORAGE_KEY);
        if (!consent) {
          const elapsed = Date.now() - mountTimeRef.current;
          if (elapsed < COOKIE_BLOCK_WINDOW_MS) {
            setVisible(false);
            return;
          }
        }
      } catch {
        /* localStorage unavailable — ignore */
      }

      setVisible(true);
    };

    const scheduleEvaluate = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(evaluate);
    };

    window.addEventListener('scroll', scheduleEvaluate, { passive: true });
    window.addEventListener('resize', scheduleEvaluate, { passive: true });

    // IntersectionObserver: thin band around the 42% viewport line.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleRatiosRef.current.set(
            entry.target.id,
            entry.intersectionRatio
          );
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        visibleRatiosRef.current.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId) setActiveId(bestId);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5, 1] }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });

    // After the cookie-blocking window expires, re-evaluate so the bar can
    // reveal itself even if the user hasn't scrolled in the meantime.
    const cookieTimer = window.setTimeout(
      scheduleEvaluate,
      COOKIE_BLOCK_WINDOW_MS + 100
    );

    // First evaluation.
    scheduleEvaluate();

    return () => {
      window.removeEventListener('scroll', scheduleEvaluate);
      window.removeEventListener('resize', scheduleEvaluate);
      window.clearTimeout(cookieTimer);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      io.disconnect();
    };
  }, [cookieBannerVisible]);

  /* ----- smooth scroll on click ----- */
  const handleJump = (id: string) => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById(id);
    if (!el) return;
    const targetY = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: Math.max(0, targetY - SCROLL_OFFSET_PX),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
    // Proactively mark active so the pill updates before the IO fires.
    setActiveId(id);
  };

  const transition = reducedMotion
    ? 'none'
    : 'opacity 300ms ease-out, transform 300ms ease-out';

  return (
    <nav
      aria-label="On this page navigation"
      aria-hidden={!visible}
      className={cn(
        'hidden md:flex fixed bottom-28 left-1/2 -translate-x-1/2 z-30',
        'max-w-[calc(100vw-2rem)]',
        'pointer-events-none'
      )}
      {...(!visible ? ({ inert: true } as Record<string, unknown>) : {})}
    >
      <div
        className="pointer-events-none"
        style={{
          fontFamily: "'Manrope', sans-serif",
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(1rem)',
          transition,
        }}
      >
        <div
          className={cn(
            'pointer-events-auto',
            'flex items-center gap-1 max-w-full overflow-x-auto',
            'rounded-full bg-navy/90 backdrop-blur-md border border-white/10 shadow-lg',
            'px-2 py-1.5',
            // Hide the horizontal scrollbar for a cleaner pill look.
            '[scrollbar-width:none] [-ms-overflow-style:none]',
            '[&::-webkit-scrollbar]:hidden'
          )}
        >
          {/* "On this page" label: sr-only by default, visible on lg+. */}
          <span
            className="sr-only lg:not-sr-only text-[0.6rem] uppercase tracking-wider text-white/40 px-2 shrink-0"
            aria-hidden="true"
          >
            On this page
          </span>

          {SECTIONS.map((s) => {
            const active = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleJump(s.id)}
                aria-current={active ? 'location' : undefined}
                className={cn(
                  'shrink-0 text-xs px-3 py-1.5 rounded-full',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-1 focus-visible:ring-offset-navy',
                  active
                    ? 'bg-orange text-white font-semibold'
                    : 'text-white/60 font-medium hover:bg-white/10 hover:text-white',
                  reducedMotion ? '' : 'transition-colors'
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default QuickNav;
