'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Leader } from '@/data/team';
import { cn } from '@/lib/utils';

/**
 * LeadershipGrid — three-column flip-card leadership grid.
 *
 * Reproduces the original bharatelectrosafe.com/about-us.php interaction:
 * each card has a front (portrait) face and a back (biography) face.
 * The card flips on Y-axis to reveal the biography inside a fixed-size
 * card, with internal scrolling where biography length exceeds the card body.
 *
 * The card itself does NOT expand the page vertically. The biography is
 * read inside the card via overflow-y scroll.
 *
 * Interaction:
 *   • Desktop: hover OR click toggles the flip.
 *   • Mobile/Tablet: tap toggles the flip (hover does not exist).
 *   • Keyboard: Enter/Space toggles; Escape returns to portrait.
 *
 * Accessibility:
 *   • aria-expanded on the toggle button.
 *   • Back-face content hidden from screen readers when not flipped
 *     (aria-hidden on the back face when collapsed).
 *   • Clear focus ring.
 *   • prefers-reduced-motion: replaces 3D flip with immediate/fade change.
 *
 * Layout:
 *   • Desktop (≥1024px): three equal columns, fixed card height.
 *   • Tablet (640–1023px): two columns.
 *   • Mobile (<640px): one column.
 */

interface LeadershipGridProps {
  leaders: Leader[];
}

export function LeadershipGrid({ leaders }: LeadershipGridProps) {
  return (
    <div className="be-leadership-grid">
      {leaders.map((leader, index) => (
        <LeaderFlipCard
          key={leader.name}
          leader={leader}
          index={index}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   LeaderFlipCard — a single flip/swivel leadership card.
   ──────────────────────────────────────────── */

interface LeaderFlipCardProps {
  leader: Leader;
  index: number;
}

function LeaderFlipCard({ leader, index }: LeaderFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonId = `leader-flip-toggle-${index}`;
  const bioRegionId = `leader-flip-bio-${index}`;

  const handleToggle = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // Escape returns to portrait state
  useEffect(() => {
    if (!isFlipped) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsFlipped(false);
      }
    };
    const node = cardRef.current;
    if (!node) return;
    node.addEventListener('keydown', handleKeyDown);
    return () => node.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'be-leader-flip-card',
        isFlipped && 'be-leader-flip-card-flipped'
      )}
    >
      {/* ── Front face — Portrait presentation ── */}
      <div className="be-leader-flip-front" aria-hidden={isFlipped || undefined}>
        {/* Portrait */}
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-be-navy-800">
          <Image
            src={leader.image}
            alt={leader.imageAlt}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover"
            style={
              leader.imagePosition
                ? { objectPosition: leader.imagePosition }
                : undefined
            }
            loading={index === 0 ? 'eager' : 'lazy'}
          />
          {/* Subtle gradient overlay at bottom for text readability */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-be-navy-800/60 to-transparent pointer-events-none" />
        </div>

        {/* Name + Role below portrait */}
        <div className="p-4 sm:p-5">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-be-charcoal-950 leading-tight">
            {leader.name}
          </h3>
          <p className="mt-1 text-sm font-semibold tracking-wide text-be-yellow-text">
            {leader.role}
          </p>

          {/* Toggle button on front */}
          <button
            id={buttonId}
            type="button"
            onClick={handleToggle}
            aria-expanded={isFlipped}
            aria-controls={bioRegionId}
            aria-label={`View profile of ${leader.name}`}
            className="mt-3 inline-flex items-center justify-center gap-1.5 self-start min-h-[44px] px-4 py-2 rounded-md bg-be-navy-800 text-[0.8125rem] font-semibold text-be-white hover:bg-be-navy-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-be-warm-white"
          >
            View Profile
          </button>
        </div>
      </div>

      {/* ── Back face — Biography/details presentation ── */}
      <div
        id={bioRegionId}
        className="be-leader-flip-back"
        aria-hidden={!isFlipped || undefined}
        role={isFlipped ? 'region' : undefined}
        aria-labelledby={buttonId}
      >
        <div className="be-leader-flip-back-inner">
          {/* Name + Role */}
          <div className="p-4 sm:p-5 border-b border-be-grey-250">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-be-charcoal-950 leading-tight">
              {leader.name}
            </h3>
            <p className="mt-1 text-sm font-semibold tracking-wide text-be-yellow-text">
              {leader.role}
            </p>
          </div>

          {/* Divider accent */}
          <div className="h-[3px] bg-gradient-to-r from-be-brand-yellow via-be-brand-blue to-be-brand-yellow mx-4 sm:mx-5" />

          {/* Scrollable biography area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 be-flip-card-scroll">
            {/* Leadership focus */}
            {leader.leadershipFocus && (
              <div className="mb-3 rounded-md border border-be-grey-250 bg-be-yellow-50/60 px-3 py-2.5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-be-yellow-text mb-0.5">
                  Leadership focus
                </p>
                <p className="text-[0.85rem] leading-snug text-be-charcoal-950">
                  {leader.leadershipFocus}
                </p>
              </div>
            )}

            {/* Expertise labels */}
            {leader.expertise && leader.expertise.length > 0 && (
              <ul className="mb-3 flex flex-wrap gap-1.5" aria-label="Areas of expertise">
                {leader.expertise.map((label) => (
                  <li
                    key={label}
                    className="rounded-sm border border-be-grey-250 bg-be-cream px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider text-be-charcoal-800"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            )}

            {/* Biography paragraphs */}
            <div className="space-y-2.5">
              {leader.fullProfile.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[0.875rem] leading-[1.65] text-be-grey-650"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Back button — always visible at bottom */}
          <div className="p-4 sm:p-5 border-t border-be-grey-250">
            <button
              type="button"
              onClick={handleToggle}
              aria-expanded={isFlipped}
              aria-controls={bioRegionId}
              aria-label={`Return to portrait of ${leader.name}`}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-md border border-be-grey-250 bg-be-white text-[0.8125rem] font-semibold text-be-charcoal-950 hover:border-be-yellow-400 hover:bg-be-yellow-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-be-warm-white w-full"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadershipGrid;
