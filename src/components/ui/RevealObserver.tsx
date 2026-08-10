'use client';

import { useEffect } from 'react';

/**
 * RevealObserver — tiny progressive-enhancement client component.
 *
 * Runs a single IntersectionObserver that adds the `revealed` class to any
 * element with `.reveal-up` or `.stagger-reveal` when it scrolls into view.
 * Renders nothing visible. Mounted once per route.
 *
 * The observed elements are server-rendered and fully present in the DOM;
 * this component only toggles a CSS class for the entrance animation. If JS
 * is disabled or this component fails to load, the reveal-up/stagger-reveal
 * CSS keeps content visible via the reduced-motion fallback (which sets
 * opacity:1) — see globals.css.
 *
 * This is a progressive enhancement, not a content gate.
 */
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const revealElements = entry.target.querySelectorAll('.reveal-up');
            revealElements.forEach((el) => {
              el.classList.add('revealed');
            });
            const staggerElements = entry.target.querySelectorAll('.stagger-reveal');
            staggerElements.forEach((el) => {
              el.classList.add('revealed');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-40px' }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return null;
}
