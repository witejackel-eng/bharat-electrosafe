'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

/**
 * SectionProgressIndicator
 *
 * A subtle progress indicator on the left side of the viewport that shows
 * the user's scroll position through the page and which section they are in.
 *
 * Visibility rules (mirrors StickyCTABar so the two never compete):
 *   1. Hidden until `window.scrollY > 600` (past the hero).
 *   2. Hidden once the FinalCTA (`#quote`) section approaches the viewport
 *      (its top is within 70% of viewport height) — that section already has
 *      its own conversion actions.
 *   3. Only visible on desktop (hidden on < lg screens).
 *
 * Active-section detection uses IntersectionObserver with a thin root
 * margin band (`-40% 0px -55% 0px`) so the "active" section is the one
 * crossing roughly the 42% line of the viewport.
 *
 * Reduced motion: shows a static indicator without transition animations.
 */

interface SectionDef {
  id: string;
}

const SECTIONS: SectionDef[] = [
  { id: 'stats' },
  { id: 'voltage-calculator' },
  { id: 'why-choose-us' },
  { id: 'products' },
  { id: 'product-selection' },
  { id: 'thickness-comparator' },
  { id: 'manufacturing' },
  { id: 'proof' },
  { id: 'applications' },
  { id: 'case-studies' },
  { id: 'project-gallery' },
  { id: 'sustainability' },
  { id: 'testimonials' },
  { id: 'insights' },
  { id: 'resources' },
  { id: 'distributors' },
  { id: 'contact' },
];

const SCROLL_TRIGGER_PX = 600;
const QUOTE_REVEAL_RATIO = 0.7;

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

export function SectionProgressIndicator() {
  const [visible, setVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeIndex, setActiveIndex] = useState(1);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionClient,
    getReducedMotionServer,
  );

  const rafRef = useRef<number | null>(null);
  const visibleRatiosRef = useRef<Map<string, number>>(new Map());
  const ioRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const evaluate = () => {
      rafRef.current = null;

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

      // Calculate scroll progress
      const scrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      setScrollPct(pct);

      setVisible(true);
    };

    const scheduleEvaluate = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(evaluate);
    };

    window.addEventListener('scroll', scheduleEvaluate, { passive: true });
    window.addEventListener('resize', scheduleEvaluate, { passive: true });

    // IntersectionObserver: thin band around the 42% viewport line.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleRatiosRef.current.set(
            entry.target.id,
            entry.intersectionRatio,
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
        if (bestId) {
          const idx = SECTIONS.findIndex((s) => s.id === bestId);
          if (idx >= 0) setActiveIndex(idx + 1);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5, 1] },
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });

    ioRef.current = io;

    // First evaluation.
    scheduleEvaluate();

    return () => {
      window.removeEventListener('scroll', scheduleEvaluate);
      window.removeEventListener('resize', scheduleEvaluate);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      io.disconnect();
      ioRef.current = null;
    };
  }, []);

  const total = SECTIONS.length;
  const fillHeight = scrollPct * 80;

  const transitionStyle = reducedMotion
    ? 'none'
    : 'opacity 300ms ease-out, transform 300ms ease-out';

  return (
    <div
      aria-hidden="true"
      className="hidden lg:block fixed left-4 top-1/2 -translate-y-1/2 z-40 pointer-events-none"
      style={{
        fontFamily: 'Manrope, sans-serif',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(-50%)' : 'translateY(-50%) translateX(-0.5rem)',
        transition: transitionStyle,
      }}
    >
      <div className="rounded-full bg-navy/90 backdrop-blur-md border border-white/10 shadow-lg p-2 flex flex-col items-center gap-1.5">
        {/* Progress bar container */}
        <div className="w-2 h-[80px] bg-border/40 rounded-full relative overflow-hidden">
          {/* Orange fill */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-full bg-orange"
            style={{
              height: `${fillHeight}px`,
              transition: reducedMotion ? 'none' : 'height 80ms linear',
            }}
          />
        </div>
        {/* Section counter */}
        <span className="text-xs text-steel font-medium text-center leading-none">
          {activeIndex} of {total}
        </span>
      </div>
    </div>
  );
}

export default SectionProgressIndicator;
