'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import type { Leader } from '@/data/team';
import { cn } from '@/lib/utils';

/**
 * LeadershipGrid — clean three-column leadership card grid.
 *
 * Single source of truth: `openIndex`. The biography on each card opens
 * ONLY when `openIndex === index`. There is no `hoveredIndex`, no
 * `isBioRevealed = isOpen || isHovered`, and no CSS `:hover` or
 * `:focus-within` selector that opens the biography. Hover may change
 * only border colour and a very subtle shadow; it never controls
 * biography visibility.
 *
 * Behaviour:
 *   • Click "View biography" → opens that biography (`openIndex = index`).
 *   • Click "Close biography" (same button) → closes immediately and
 *     smoothly, even while the pointer remains over the card and even
 *     while the button retains keyboard focus.
 *   • Click another card's "View biography" → closes the previous
 *     biography and opens the new one. Only one open at a time on all
 *     screen sizes.
 *   • Pressing Escape while focus is inside an open card closes it
 *     (focus stays on the button so the user can re-open or tab away).
 *
 * Layout:
 *   • Desktop (≥1024px): three equal columns.
 *   • Tablet (640–1023px): two columns.
 *   • Mobile (<640px): one column.
 *   • Cards never widen, scale, rotate, or move on hover/open. Only the
 *     biography region expands downward via grid-template-rows 0fr → 1fr
 *     + opacity, ~250–320ms, respects prefers-reduced-motion.
 *
 * Accessibility:
 *   • Cards are <article> elements with descriptive aria-labels.
 *   • Toggle button is a real <button> with `aria-expanded` and
 *     `aria-controls` pointing to the biography region.
 *   • Button label flips between "View biography" / "Close biography".
 *   • Chevron rotates only when `isOpen` is true.
 *   • 44px minimum touch target, visible keyboard focus ring.
 *   • Escape closes the open biography without moving focus.
 */

interface LeadershipGridProps {
  leaders: Leader[];
}

export function LeadershipGrid({ leaders }: LeadershipGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  }, []);

  const handleClose = useCallback(() => {
    setOpenIndex(null);
  }, []);

  return (
    <div className="be-leadership-grid">
      {leaders.map((leader, index) => {
        const isOpen = openIndex === index;
        return (
          <LeaderCard
            key={leader.name}
            leader={leader}
            index={index}
            isOpen={isOpen}
            onToggle={handleToggle}
            onClose={handleClose}
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
  onToggle: (index: number) => void;
  onClose: () => void;
}

function LeaderCard({
  leader,
  index,
  isOpen,
  onToggle,
  onClose,
}: LeaderCardProps) {
  const buttonId = `leader-bio-toggle-${index}`;
  const bioRegionId = `leader-bio-region-${index}`;
  const articleRef = useRef<HTMLElement>(null);

  // Escape closes the open biography without moving focus. The button
  // keeps focus so the user can re-open or tab away cleanly.
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    const node = articleRef.current;
    if (!node) return;
    node.addEventListener('keydown', handleKeyDown);
    return () => node.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <article
      ref={articleRef}
      className={cn(
        'be-leader-card',
        // The expanded class drives ONLY the yellow border + soft
        // shadow when the biography is open via the toggle button.
        // Hover and focus-within never add this class.
        isOpen && 'be-leader-card-expanded'
      )}
      aria-label={`${leader.name}, ${leader.role}`}
      // NOTE: no onMouseEnter / onMouseLeave. Hover does not control
      // biography visibility.
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
            Hidden by default. Revealed ONLY when `isOpen` is true
            (toggle button click/Enter/Space/tap). The
            grid-template-rows 0fr → 1fr technique animates height
            smoothly without measuring. Card width, image, and
            typography positions remain stable. No hover or
            focus-within involvement. */}
        <div
          id={bioRegionId}
          role="region"
          aria-labelledby={buttonId}
          className={cn(
            'be-leader-bio mt-4',
            isOpen && 'be-leader-bio-open'
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
