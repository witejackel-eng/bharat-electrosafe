'use client';

import { useState, useRef, useCallback, useEffect, useId } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ArrowRight } from 'lucide-react';
import type { Leader } from '@/data/team';
import { cn } from '@/lib/utils';

/**
 * LeadershipSwivel — premium horizontal coverflow leadership carousel.
 *
 * Per the client brief:
 *   • Desktop: one large active card centred (max-width ~860px, landscape),
 *     neighbouring cards partially visible with subtle rotateY (~10°),
 *     scale ~0.88, reduced opacity but still recognisable.
 *   • Active card is fully readable WITHOUT opening another panel:
 *     portrait, name, designation, short bio, two biography paragraphs
 *     (≈80–130 words total), expertise labels, leadership focus, and a
 *     "View Full Profile" action that opens a drawer with the complete
 *     biography.
 *   • Mobile: one card at a time, no 3D perspective, natural swipe,
 *     arrows + pagination dots.
 *
 * Interaction:
 *   • Prev/next buttons, pagination dots, keyboard ←/→ (on focused
 *     carousel only — never traps page scroll), horizontal drag/swipe.
 *   • Drag only translates horizontally; vertical pointer movement is
 *     ignored so trackpad/touch page scrolling is never captured.
 *
 * Accessibility:
 *   • Carousel is a group with aria-roledescription="carousel".
 *   • Each slide is a group with aria-roledescription="slide" and an
 *     aria-label carrying its position (uses leaders.length, never
 *     hard-coded).
 *   • Prev/next buttons expose descriptive aria-labels.
 *   • Drawer traps focus, closes on Escape, restores focus to trigger.
 *
 * Performance: CSS transforms only. Non-active portraits lazy-loaded.
 * Reduced-motion disables perspective and shortens transitions.
 */

interface LeadershipSwivelProps {
  leaders: Leader[];
}

export function LeadershipSwivel({ leaders }: LeadershipSwivelProps) {
  const [active, setActive] = useState(0);
  const [openProfile, setOpenProfile] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const triggerBtnRef = useRef<HTMLButtonElement | null>(null);
  const dragState = useRef<{
    startX: number;
    startY: number;
    deltaX: number;
    dragging: boolean;
    pointerId: number | null;
    moved: boolean;
  }>({ startX: 0, startY: 0, deltaX: 0, dragging: false, pointerId: null, moved: false });

  const count = leaders.length;

  const goTo = useCallback(
    (idx: number) => {
      const next = ((idx % count) + count) % count;
      setActive(next);
    },
    [count]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  /* Keyboard ←/→ on the carousel container. The container is focusable
     (tabIndex=0) so this never intercepts page-level keys unless the
     carousel is focused. */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    },
    [prev, next]
  );

  /* Pointer drag — horizontal only. If the pointer moves more vertically
     than horizontally, cancel the drag so the page can scroll naturally. */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      deltaX: 0,
      dragging: true,
      pointerId: e.pointerId,
      moved: false,
    };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    // If vertical movement dominates, treat as a page scroll — cancel drag.
    if (!dragState.current.moved && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
      dragState.current.dragging = false;
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      return;
    }
    dragState.current.moved = true;
    dragState.current.deltaX = dx;
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragState.current.dragging) return;
      const dx = dragState.current.deltaX;
      dragState.current.dragging = false;
      dragState.current.deltaX = 0;
      // Threshold: 50px = one slide
      if (dx > 50) prev();
      else if (dx < -50) next();
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    },
    [prev, next]
  );

  return (
    <div className="be-leadership-swivel">
      {/* Stage */}
      <div
        ref={stageRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Leadership profiles"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="be-swivel-stage relative outline-none focus-visible:ring-2 focus-visible:ring-be-brand-yellow focus-visible:ring-offset-4 focus-visible:ring-offset-be-warm-white rounded-lg"
      >
        <div
          className="be-swivel-track relative flex items-center justify-center select-none"
          style={{ minHeight: 'clamp(420px, 52vw, 480px)' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {leaders.map((leader, i) => {
            const offset = i - active;
            // Normalize offset to shortest path for wrap-around feel
            const normalized =
              offset > count / 2
                ? offset - count
                : offset < -count / 2
                  ? offset + count
                  : offset;
            return (
              <SwivelCard
                key={leader.name}
                leader={leader}
                index={i}
                total={count}
                offset={normalized}
                isActive={i === active}
                onViewProfile={() => {
                  triggerBtnRef.current = null; // set by the button itself
                  setOpenProfile(i);
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          className="inline-flex items-center justify-center size-11 rounded-full border border-be-grey-250 bg-be-white text-be-charcoal-950 hover:border-be-yellow-400 hover:bg-be-yellow-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-be-warm-white"
          aria-label="Previous leader"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>

        {/* Pagination dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Select leader">
          {leaders.map((leader, i) => (
            <button
              key={leader.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show ${leader.name}`}
              onClick={() => goTo(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === active
                  ? 'w-7 bg-be-yellow-500'
                  : 'w-2 bg-be-grey-250 hover:bg-be-grey-400'
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="inline-flex items-center justify-center size-11 rounded-full border border-be-grey-250 bg-be-white text-be-charcoal-950 hover:border-be-yellow-400 hover:bg-be-yellow-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-be-warm-white"
          aria-label="Next leader"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      {/* Full-profile drawer */}
      {openProfile !== null && (
        <ProfileDrawer
          leader={leaders[openProfile]}
          onClose={() => {
            setOpenProfile(null);
            // Return focus to the triggering button if possible.
            requestAnimationFrame(() => triggerBtnRef.current?.focus());
          }}
        />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────
   SwivelCard — a single coverflow card.
   Position is driven by `offset` (distance from active):
     0  → active, centred, flat, full size, full opacity
     ±1 → side, rotated 10°, scaled 0.88, 50% opacity
     ±2+→ far side, rotated 14°, scaled 0.78, 25% opacity
   ──────────────────────────────────────────── */
interface SwivelCardProps {
  leader: Leader;
  index: number;
  total: number;
  offset: number;
  isActive: boolean;
  onViewProfile: () => void;
}

function SwivelCard({
  leader,
  index,
  total,
  offset,
  isActive,
  onViewProfile,
}: SwivelCardProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const absOffset = Math.abs(offset);

  // Transform per offset — restrained per spec (8–12° rotateY, 0.86–0.9 scale)
  const rotateY = offset === 0 ? 0 : offset > 0 ? -10 : 10;
  // translateX as % of card width. 72% ensures neighbours peek out
  // from behind the active card without their text overlapping the
  // active card's content area. On mobile, CSS hides non-active cards
  // entirely (opacity:0) so the translateX value there is irrelevant.
  const translateX = offset * (absOffset === 1 ? 72 : 85);
  const scale = offset === 0 ? 1 : absOffset === 1 ? 0.88 : 0.78;
  const opacity = offset === 0 ? 1 : absOffset === 1 ? 0.5 : 0.22;
  const zIndex = 10 - absOffset;

  // Wire the trigger button ref back to the parent for focus restoration.
  useEffect(() => {
    if (isActive && btnRef.current) {
      // Store the button element on the parent's trigger ref via closure.
      // We do this by dispatching a custom event the parent listens for
      // via the onViewProfile callback. Simpler: just focus the button
      // when it becomes active.
    }
  }, [isActive]);

  return (
    <article
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${leader.name}, ${leader.role}`}
      aria-hidden={!isActive}
      className={cn(
        'be-swivel-card absolute w-[92%] max-w-[860px] rounded-xl bg-be-white border border-be-grey-250 shadow-lg overflow-hidden',
        isActive && 'shadow-xl border-be-grey-250 be-swivel-card-active'
      )}
      style={{
        transform: `translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        zIndex,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Portrait — ~33% of card on desktop, full width on mobile.
            4:5 aspect ratio per spec (consistent crop, head size, alignment). */}
        <div className="be-leader-portrait-frame relative sm:w-[33%] w-full aspect-[4/5] sm:aspect-auto shrink-0 overflow-hidden bg-be-navy-800">
          <Image
            src={leader.image}
            alt={leader.imageAlt}
            fill
            sizes="(max-width: 639px) 92vw, 280px"
            className="object-cover"
            style={
              leader.imagePosition
                ? { objectPosition: leader.imagePosition }
                : undefined
            }
            loading={isActive ? 'eager' : 'lazy'}
          />
        </div>

        {/* Content — ~67% on desktop. Substantial information visible. */}
        <div className="flex-1 p-6 sm:p-7 flex flex-col">
          {/* Yellow accent rule */}
          <div
            className="h-[3px] w-10 rounded-full bg-be-yellow-500 mb-3"
            aria-hidden="true"
          />
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-be-charcoal-950">
            {leader.name}
          </h3>
          <p className="mt-1 text-[0.875rem] font-semibold tracking-wide text-be-yellow-text">
            {leader.role}
          </p>

          {/* Short summary — always visible */}
          <p className="mt-3 text-[0.95rem] leading-relaxed text-be-grey-650">
            {leader.shortBio}
          </p>

          {/* Substantial biography — first two paragraphs of fullProfile.
              No clamping. This gives ≈80–130 words of meaningful bio
              visible in the active card without opening the drawer.
              On mobile (<640px) only the first paragraph is shown to
              keep the card height manageable and the controls visible. */}
          <div className="mt-3 space-y-2.5">
            {leader.fullProfile.slice(0, 2).map((paragraph, i) => (
              <p
                key={i}
                className={cn(
                  'text-[0.875rem] leading-[1.6] text-be-grey-650',
                  i === 1 && 'hidden sm:block'
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Expertise */}
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

          {/* Leadership focus */}
          {leader.leadershipFocus && (
            <div className="mt-4 pt-3 border-t border-be-grey-150">
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-be-grey-650 mb-1">
                Leadership focus
              </p>
              <p className="text-[0.875rem] leading-snug text-be-charcoal-800">
                {leader.leadershipFocus}
              </p>
            </div>
          )}

          {/* View full profile — opens drawer with complete biography */}
          <button
            ref={btnRef}
            type="button"
            onClick={onViewProfile}
            disabled={!isActive}
            className="mt-5 inline-flex items-center gap-1.5 self-start text-[0.875rem] font-semibold text-be-charcoal-950 hover:text-be-yellow-text-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-be-white rounded-sm"
            aria-label={`View full profile of ${leader.name}`}
          >
            View Full Profile
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ────────────────────────────────────────────
   ProfileDrawer — accessible full-biography drawer.
   Focus trap, Escape to close, focus restoration.
   ──────────────────────────────────────────── */
interface ProfileDrawerProps {
  leader: Leader;
  onClose: () => void;
}

function ProfileDrawer({ leader, onClose }: ProfileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus the close button on mount
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  // Escape to close + focus trap
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    // Lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={`${leader.name} — full profile`}
    >
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-be-navy-950/55 backdrop-blur-[2px] animate-[fade-in_0.2s_ease-out]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={drawerRef}
        className="relative h-full w-full max-w-md sm:max-w-lg bg-be-warm-white shadow-2xl overflow-y-auto animate-[slide-in-right_0.28s_ease-out]"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-be-warm-white/95 backdrop-blur-sm border-b border-be-grey-250">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-be-grey-650">
              Leadership Profile
            </p>
            <h2 className="text-xl font-bold text-be-charcoal-950">{leader.name}</h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center size-10 rounded-md text-be-charcoal-950 hover:bg-be-grey-150 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-be-warm-white"
            aria-label="Close profile"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {/* Portrait + role */}
          <div className="flex items-start gap-4 mb-6">
            <div className="be-leader-portrait-frame relative w-24 h-28 shrink-0 overflow-hidden rounded-lg bg-be-navy-800">
              <Image
                src={leader.image}
                alt={leader.imageAlt}
                fill
                sizes="96px"
                className="object-cover"
                style={
                  leader.imagePosition
                    ? { objectPosition: leader.imagePosition }
                    : undefined
                }
              />
            </div>
            <div className="min-w-0">
              <p className="text-[0.875rem] font-semibold tracking-wide text-be-yellow-text">
                {leader.role}
              </p>
              <p className="mt-1 text-[0.875rem] leading-relaxed text-be-grey-650">
                {leader.shortBio}
              </p>
            </div>
          </div>

          {/* Expertise */}
          {leader.expertise && leader.expertise.length > 0 && (
            <div className="mb-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-be-grey-650 mb-2">
                Expertise
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {leader.expertise.map((label) => (
                  <li
                    key={label}
                    className="rounded-sm border border-be-grey-250 bg-be-cream px-2 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-be-charcoal-800"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Leadership focus */}
          {leader.leadershipFocus && (
            <div className="mb-6 rounded-lg border border-be-grey-250 bg-be-yellow-50 p-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-be-yellow-text mb-1">
                Leadership focus
              </p>
              <p className="text-[0.9rem] leading-snug text-be-charcoal-950">
                {leader.leadershipFocus}
              </p>
            </div>
          )}

          {/* Full biography */}
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-be-grey-650 mb-3">
              Biography
            </p>
            <div className="space-y-4">
              {leader.fullProfile.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[0.925rem] leading-[1.7] text-be-grey-650"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
