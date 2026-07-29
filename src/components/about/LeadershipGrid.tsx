'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import type { Leader } from '@/data/team';
import { cn } from '@/lib/utils';

/**
 * LeadershipGrid — clean three-column leadership card grid.
 *
 * Replaces the previous LeadershipSwivel coverflow carousel with a
 * simpler, more readable layout that satisfies the client brief:
 *
 * Desktop (≥1024px):
 *   • Three equal-width cards in a single row, no overlap, no rotation.
 *   • Hovering a card smoothly expands it to ~1.25fr while the others
 *     shrink to ~0.875fr. The card scales to a restrained 1.02 and the
 *     fuller biography reveals inside the same card.
 *   • Other cards become slightly dimmer but stay visible and comparable.
 *   • 350–450ms cubic-bezier transition. No flip, no rotate, no drawer.
 *
 * Tablet (640–1023px):
 *   • Two-column grid. Hover does not apply.
 *   • Tap "Read biography" to expand the bio inline.
 *
 * Mobile (<640px):
 *   • One card per row.
 *   • Tap "Read biography" to expand the bio inline.
 *   • Only one card stays expanded at a time.
 *
 * Accessibility:
 *   • Cards are <article> elements with descriptive aria-labels.
 *   • The "Read biography" button is a real <button> with a 44px touch
 *     target, aria-expanded state, and visible focus ring.
 *   • Keyboard users get the biography revealed via :focus-within so
 *     tabbing into a card exposes the same content as hover.
 *   • prefers-reduced-motion disables all transitions (handled in CSS).
 *
 * Performance:
 *   • CSS grid + transform only. No 3D engine, no carousel runtime.
 *   • Portraits lazy-loaded except the first card (priority for LCP).
 *   • No body-scroll lock, no focus trap — the page scrolls naturally.
 */

interface LeadershipGridProps {
  leaders: Leader[];
}

export function LeadershipGrid({ leaders }: LeadershipGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);

  const handleHoverEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleHoverLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const handleToggleMobile = useCallback(
    (index: number) => {
      setMobileExpanded((current) => (current === index ? null : index));
    },
    []
  );

  // Compute desktop grid template based on hovered card.
  // Default: three equal columns. Hovered card expands to 1.25fr,
  // others shrink to 0.875fr. Total stays at 3fr so the section
  // width remains fixed.
  const gridCols =
    hoveredIndex !== null
      ? leaders
          .map((_, i) => (i === hoveredIndex ? '1.25fr' : '0.875fr'))
          .join(' ')
      : leaders.map(() => '1fr').join(' ');

  return (
    <div
      className="be-leadership-grid"
      style={{ ['--be-grid-cols' as string]: gridCols }}
    >
      {leaders.map((leader, index) => {
        const isHovered = hoveredIndex === index;
        const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
        const isMobileExpanded = mobileExpanded === index;

        return (
          <LeaderCard
            key={leader.name}
            leader={leader}
            index={index}
            isHovered={isHovered}
            isDimmed={isDimmed}
            isMobileExpanded={isMobileExpanded}
            onHoverEnter={handleHoverEnter}
            onHoverLeave={handleHoverLeave}
            onToggleMobile={handleToggleMobile}
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
  isHovered: boolean;
  isDimmed: boolean;
  isMobileExpanded: boolean;
  onHoverEnter: (index: number) => void;
  onHoverLeave: () => void;
  onToggleMobile: (index: number) => void;
}

function LeaderCard({
  leader,
  index,
  isHovered,
  isDimmed,
  isMobileExpanded,
  onHoverEnter,
  onHoverLeave,
  onToggleMobile,
}: LeaderCardProps) {
  const buttonId = `leader-bio-toggle-${index}`;
  const bioRegionId = `leader-bio-region-${index}`;

  return (
    <article
      className={cn(
        'be-leader-card',
        isHovered && 'be-leader-card-hovered',
        isDimmed && 'be-leader-card-dimmed',
        isMobileExpanded && 'be-leader-card-expanded'
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

        {/* Short summary — always visible (35–55 words spec) */}
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
            Hidden by default. Revealed on hover (desktop),
            tap (mobile/tablet) and keyboard focus-within.
            The grid-template-rows 0fr → 1fr technique animates
            height smoothly without measuring. */}
        <div
          id={bioRegionId}
          role="region"
          aria-labelledby={buttonId}
          className="be-leader-bio mt-4"
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

            {/* Fuller biography — multi-paragraph, no clamping */}
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

        {/* ── Toggle / indicator ───────────────────────────
            Desktop: subtle "View biography" indicator that
            visually clarifies the card is hover-expandable.
            Mobile/tablet: real 44px button that toggles the bio
            inline and changes label to "Close biography". */}

        {/* Desktop indicator (visible lg+ only, not focusable) */}
        <div
          className="hidden lg:flex items-center gap-1.5 mt-4 text-[0.8rem] font-semibold text-be-charcoal-950/70"
          aria-hidden="true"
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-be-yellow-500"
            aria-hidden="true"
          />
          <span>View biography</span>
        </div>

        {/* Mobile/tablet button (visible below lg only) */}
        <button
          id={buttonId}
          type="button"
          onClick={() => onToggleMobile(index)}
          aria-expanded={isMobileExpanded}
          aria-controls={bioRegionId}
          className="lg:hidden mt-4 inline-flex items-center justify-center gap-1.5 self-start min-h-[44px] px-4 py-2 rounded-md border border-be-grey-250 bg-be-white text-[0.875rem] font-semibold text-be-charcoal-950 hover:border-be-yellow-400 hover:bg-be-yellow-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-be-warm-white"
        >
          {isMobileExpanded ? 'Close biography' : 'Read biography'}
          <ChevronDown
            className={cn(
              'size-4 transition-transform duration-200',
              isMobileExpanded && 'rotate-180'
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
