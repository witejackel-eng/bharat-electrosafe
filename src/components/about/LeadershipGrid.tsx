'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import type { Leader } from '@/data/team';
import { cn } from '@/lib/utils';

/**
 * LeadershipGrid — clean three-column leadership card grid.
 *
 * Per client brief (revised):
 *   • Cards are normal, compact cards. Hovering a card does NOT make it
 *     wider, larger, scaled, floating, or visually dominant.
 *   • Only the biography content inside the card expands/collapses.
 *
 * Desktop (≥1024px):
 *   • Three equal-width cards in a single row, always. No grid column
 *     ratio changes, no scale, no dimming of neighbours, no overlap.
 *   • Hovering a card reveals its full biography (height grows by the
 *     exact amount needed for the bio, nothing more). Implemented via
 *     JS state (mouse enter/leave) for guaranteed cross-browser
 *     reliability — pure CSS `:hover` is brittle under headless test
 *     runners that report `(hover: hover)` as false even on desktop.
 *   • Keyboard focus-within also reveals the biography (CSS-driven).
 *   • A real "View biography" / "Close biography" button is also
 *     available for click users who prefer not to hover.
 *
 * Tablet (640–1023px) & Mobile (<640px):
 *   • Two-column (tablet) / one-column (mobile) grid.
 *   • Hover is not required — a 44px "View biography" button toggles
 *     the biography inline. Tapping again collapses it.
 *   • Only one biography is open at a time on touch devices.
 *
 * Accessibility:
 *   • Cards are <article> elements with descriptive aria-labels.
 *   • The biography button is a real <button> with aria-expanded and
 *     aria-controls pointing to the biography region.
 *   • Keyboard users get the biography revealed via :focus-within.
 *   • prefers-reduced-motion disables all transitions (handled in CSS).
 *
 * Layout stability:
 *   • No horizontal layout movement during expansion.
 *   • Image dimensions never change.
 *   • Cards in the same row align to the tallest expanded card thanks
 *     to `align-items: start` on the grid; neighbours keep their
 *     original width and appearance.
 */

interface LeadershipGridProps {
  leaders: Leader[];
}

export function LeadershipGrid({ leaders }: LeadershipGridProps) {
  // `openIndex` is the card whose biography is currently OPEN via the
  // toggle button (click/Enter/Space/tap). `hoveredIndex` is the card
  // currently being hovered (desktop only). Either state reveals the
  // biography; the toggle button takes precedence for label correctness.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleToggle = useCallback(
    (index: number) => {
      setOpenIndex((current) => (current === index ? null : index));
    },
    []
  );

  const handleHoverEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleHoverLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <div className="be-leadership-grid">
      {leaders.map((leader, index) => {
        const isOpen = openIndex === index;
        const isHovered = hoveredIndex === index;
        // Biography is revealed when EITHER the toggle is open OR the
        // card is hovered (desktop). Card width and scale never change.
        const isBioRevealed = isOpen || isHovered;
        return (
          <LeaderCard
            key={leader.name}
            leader={leader}
            index={index}
            isOpen={isOpen}
            isBioRevealed={isBioRevealed}
            onToggle={handleToggle}
            onHoverEnter={handleHoverEnter}
            onHoverLeave={handleHoverLeave}
          />
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────
   LeaderCard — a single leadership card.
   ──────────────────────────────────────────── */

interface LeaderCardProps {
  leader: Leader;
  index: number;
  isOpen: boolean;
  isBioRevealed: boolean;
  onToggle: (index: number) => void;
  onHoverEnter: (index: number) => void;
  onHoverLeave: () => void;
}

function LeaderCard({
  leader,
  index,
  isOpen,
  isBioRevealed,
  onToggle,
  onHoverEnter,
  onHoverLeave,
}: LeaderCardProps) {
  const buttonId = `leader-bio-toggle-${index}`;
  const bioRegionId = `leader-bio-region-${index}`;

  return (
    <article
      className={cn(
        'be-leader-card',
        // Expanded class drives the yellow border + soft shadow whether
        // the user opened the bio via toggle button, hover, or keyboard
        // focus-within (CSS). Card width and scale never change.
        isBioRevealed && 'be-leader-card-expanded'
      )}
      aria-label={`${leader.name}, ${leader.role}`}
      onMouseEnter={() => onHoverEnter(index)}
      onMouseLeave={onHoverLeave}
    >
      {/* ── Portrait ───────────────────────────────────────────
          Consistent 4:5 crop with controlled head size/alignment.
          Portrait is never used as a full-card background and is
          not enlarged significantly (low-res source images). The
          bg-be-navy-800 gives a consistent neutral backdrop behind
          transparent-edge portraits. */}
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
          // First portrait is loaded eagerly for LCP; the rest are lazy.
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Name — H3 for logical heading order (H1 → H2 → H3) */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-be-charcoal-950 leading-tight">
          {leader.name}
        </h3>

        {/* Role — yellow accent label */}
        <p className="mt-1.5 text-sm font-semibold tracking-wide text-be-yellow-text">
          {leader.role}
        </p>

        {/* Short summary — always visible (2-3 lines, approved content) */}
        <p className="mt-3 text-[0.95rem] leading-relaxed text-be-grey-650">
          {leader.shortBio}
        </p>

        {/* Expertise labels — always visible, 2-3 concise labels */}
        {leader.expertise && leader.expertise.length > 0 && (
          <ul
            className="mt-4 flex flex-wrap gap-1.5"
            aria-label="Areas of expertise"
          >
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

        {/* ── Biography reveal ──────────────────────────────
            Hidden by default. Revealed when:
              • The toggle button below is clicked (isOpen)
              • The pointer hovers the card (isHovered, desktop)
              • The card receives keyboard focus-within (CSS)
            The grid-template-rows 0fr → 1fr technique animates
            height smoothly without measuring. Card width, image,
            and typography positions remain stable. */}
        <div
          id={bioRegionId}
          role="region"
          aria-labelledby={buttonId}
          className={cn(
            'be-leader-bio mt-4',
            isBioRevealed && 'be-leader-bio-open'
          )}
        >
          <div className="be-leader-bio-inner">
            {/* Leadership focus — small accent block above bio */}
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

            {/* Fuller biography — multi-paragraph, no clamping.
                Concise approved content keeps the expanded card at a
                reasonable height. */}
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
        </div>

        {/* ── Toggle button ────────────────────────────────
            Real <button> with aria-expanded + aria-controls. Works
            on every device: desktop click, mobile tap, keyboard
            Enter/Space. Label flips between "View biography" /
            "Close biography". 44px minimum touch target. */}
        <button
          id={buttonId}
          type="button"
          onClick={() => onToggle(index)}
          aria-expanded={isOpen}
          aria-controls={bioRegionId}
          className="mt-4 inline-flex items-center justify-center gap-1.5 self-start min-h-[44px] px-4 py-2 rounded-md border border-be-grey-250 bg-be-white text-[0.875rem] font-semibold text-be-charcoal-950 hover:border-be-yellow-400 hover:bg-be-yellow-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-be-warm-white"
        >
          {isOpen ? 'Close biography' : 'View biography'}
          <ChevronDown
            className={cn(
              'size-4 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
            aria-hidden="true"
            focusable="false"
          />
        </button>
      </div>
    </article>
  );
}

export default LeadershipGrid;
