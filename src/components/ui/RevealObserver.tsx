'use client';

import { useEffect } from 'react';

/**
 * RevealObserver — progressive-enhancement client component.
 *
 * Directly observes all elements with `.reveal-up` or `.stagger-reveal` classes.
 * When an observed element enters the viewport, the `revealed` CSS class is added
 * to it, triggering the entrance animation defined in globals.css.
 *
 * Renders nothing visible. Mounted once per route.
 *
 * Progressive enhancement:
 * - If JS is disabled/fails, the <noscript> tag in layout.tsx forces
 *   `.reveal-up` and `.stagger-reveal` content to be visible.
 * - A safety timeout (6 s) reveals any remaining unrevealed elements,
 *   so content is never permanently hidden even if the observer fails.
 * - Reduced-motion users skip the opacity-0 → opacity-1 transition entirely
 *   via the `prefers-reduced-motion: reduce` media query in globals.css.
 */
export function RevealObserver() {
  useEffect(() => {
    const REVEAL_SELECTORS = '.reveal-up, .stagger-reveal';
    const SAFETY_TIMEOUT_MS = 6000;

    // Collect all reveal elements currently in the DOM
    const revealElements = document.querySelectorAll(REVEAL_SELECTORS);

    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-40px' }
    );

    revealElements.forEach((el) => observer.observe(el));

    // Safety timeout: reveal any elements the observer hasn't reached yet.
    // This guarantees content is never permanently hidden.
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll(REVEAL_SELECTORS).forEach((el) => {
        if (!el.classList.contains('revealed')) {
          el.classList.add('revealed');
        }
      });
      observer.disconnect();
    }, SAFETY_TIMEOUT_MS);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, []);

  return null;
}
