import Image from 'next/image';
import type { Leader } from '@/data/team';
import { cn } from '@/lib/utils';

/**
 * LeaderProfileCard — Server Component.
 *
 * A premium editorial profile card for the About page Leadership section.
 * Renders a large portrait, name (H3), role, short bio, multi-paragraph
 * full profile, and optional factual expertise labels.
 *
 * Design principles:
 *   • Server-rendered — all biographical content is in the initial HTML
 *     for SEO, accessibility, and no-JS readability.
 *   • No internal scrollbars — the page scrolls naturally.
 *   • No fixed content height — biographies display at their natural length.
 *   • Portrait uses Next.js Image with `fill` + `object-cover` + responsive
 *     `sizes` for optimal loading. Lazy-loaded (no `priority`).
 *   • Entrance animation via @starting-style (CSS-only, no JS). Content
 *     is visible immediately when JS is disabled or reduced-motion is set.
 *   • Hover (pointer devices only): image scales to 1.02, border
 *     strengthens, accent extends. No layout shift.
 *
 * Accessibility:
 *   • Portrait alt text uses `leader.imageAlt` (descriptive, not just name).
 *   • H3 heading for the leader's name — maintains logical heading order
 *     (H1 page title → H2 section title → H3 leader name).
 *   • Expertise labels are in a semantic <ul> with small, restrained styling.
 */

interface LeaderProfileCardProps {
  leader: Leader;
  /** Optional extra className for layout (e.g. column spanning on tablet). */
  className?: string;
}

export function LeaderProfileCard({
  leader,
  className,
}: LeaderProfileCardProps) {
  return (
    <article
      className={cn(
        'leader-card group flex flex-col overflow-hidden rounded-lg border border-be-grey-250 bg-be-white',
        className
      )}
    >
      {/* ── Portrait ──────────────────────────────────────────────
          4:3 aspect ratio. At common card widths this yields:
            • Desktop (3-col, ~380px card): ~285px portrait height
            • Tablet  (2-col, ~360px card): ~270px portrait height
            • Mobile  (1-col, ~328px card): ~246px portrait height
          All within the 220–330px target range. Image is flush with
          the upper card edge (no top padding). */}
      <div className="leader-portrait relative aspect-[4/3] w-full overflow-hidden bg-be-grey-150">
        <Image
          src={leader.image}
          alt={leader.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="leader-portrait-img object-cover"
          style={
            leader.imagePosition
              ? { objectPosition: leader.imagePosition }
              : undefined
          }
        />
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        {/* Yellow accent rule — sits between portrait and name */}
        <div
          className="leader-accent mb-4 h-[3px] w-12 rounded-full bg-be-yellow-500"
          aria-hidden="true"
        />

        {/* Name — H3 for logical heading order (H1 → H2 → H3) */}
        <h3 className="text-xl font-bold tracking-tight text-be-charcoal-950 sm:text-2xl">
          {leader.name}
        </h3>

        {/* Role — dark amber / charcoal-accent */}
        <p className="mt-1.5 text-sm font-semibold tracking-wide text-be-yellow-text sm:text-[0.95rem]">
          {leader.role}
        </p>

        {/* Short summary — one concise sentence */}
        <p className="mt-3.5 text-[0.95rem] leading-relaxed text-be-grey-650">
          {leader.shortBio}
        </p>

        {/* Full profile — 2-3 readable paragraphs */}
        <div className="mt-4 space-y-3">
          {leader.fullProfile.map((paragraph, i) => (
            <p
              key={i}
              className="text-[0.9rem] leading-[1.65] text-be-grey-650"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Optional expertise labels — small, restrained, factual */}
        {leader.expertise && leader.expertise.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Areas of expertise">
            {leader.expertise.map((label) => (
              <li
                key={label}
                className="rounded-sm border border-be-grey-250 bg-be-cream px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-be-charcoal-800"
              >
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
