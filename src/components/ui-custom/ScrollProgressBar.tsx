'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollProgressBar
 *
 * A thin (3px) progress bar fixed to the top of the viewport that visualises
 * how far the user has scrolled through the document. It sits above the
 * site header (header is z-50; this bar is z-[60]).
 *
 * Behaviour notes:
 * - Tracks `scrollY / (scrollHeight - innerHeight)` and updates on scroll + resize.
 * - Updates are throttled via `requestAnimationFrame` so we never schedule more
 *   than one paint per frame.
 * - The inner bar's `width` is updated via a ref (direct DOM mutation) rather
 *   than React state — this avoids a re-render on every scroll event.
 * - Visible only after the user scrolls past 100px (fades in via opacity).
 * - Respects `prefers-reduced-motion`: still updates width but removes the
 *   width transition so updates feel instant.
 * - Subtle orange glow via box-shadow.
 */
export function ScrollProgressBar() {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const applyTransition = (reduced: boolean) => {
      const el = innerRef.current;
      if (!el) return;
      el.style.transition = reduced
        ? 'opacity 200ms ease'
        : 'width 80ms linear, opacity 200ms ease';
    };
    applyTransition(mq.matches);

    const handleMqChange = (e: MediaQueryListEvent) => {
      applyTransition(e.matches);
    };
    mq.addEventListener('change', handleMqChange);

    const update = () => {
      rafRef.current = null;
      const el = innerRef.current;
      if (!el) return;

      const scrollY = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;

      el.style.width = `${pct * 100}%`;
      // Only reveal after the user has scrolled past 100px.
      el.style.opacity = scrollY > 100 ? '1' : '0';
    };

    const scheduleUpdate = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    // Initial paint (in case the page is loaded already scrolled, e.g. refresh).
    scheduleUpdate();

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      mq.removeEventListener('change', handleMqChange);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className="h-full bg-gradient-to-r from-orange via-orange-light to-orange"
        style={{
          width: '0%',
          transition: 'width 80ms linear, opacity 200ms ease',
          boxShadow: '0 0 8px rgba(232, 97, 26, 0.4)',
          opacity: 0,
        }}
      />
    </div>
  );
}

export default ScrollProgressBar;
