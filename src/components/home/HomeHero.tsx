import Image from 'next/image';
import { ShieldCheck, BadgeCheck, FlaskConical, Globe2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';

interface ProofItem {
  label: string;
  icon: LucideIcon;
}

const proofItems: ProofItem[] = [
  { label: 'IS 15652:2006', icon: ShieldCheck },
  { label: 'BIS Licence CM/L:8800129617', icon: BadgeCheck },
  { label: 'ERDA / NTH tested', icon: FlaskConical },
  { label: 'IEC 61111 information available on request', icon: Globe2 },
];

const HERO_IMG_ALT =
  'Electrical technician operating switchgear while standing on an electrical insulating mat covering the control-room floor.';

/**
 * HomeHero — Server Component.
 *
 * Premium split hero. Copy lives in the left column on a warm off-white
 * background; the switchgear-room photograph lives in a dedicated visual
 * frame on the right. No text overlays the photograph — no readability
 * scrim, no callout chips, no collage labels.
 *
 * Composition:
 *   Desktop / tablet-landscape (≥1024px):
 *     • Two-column grid: ~42% copy left, ~58% visual right, 32–48px gap.
 *     • Hero vertical padding ~48–64px; total height fits comfortably in
 *       a 1366×768 laptop viewport (no forced 680px minimum).
 *     • Image frame: 4:3 aspect, object-cover, restrained radius, thin
 *       neutral border, very subtle shadow.
 *   Tablet-portrait (768–1023px):
 *     • Balanced two-column: ~44% copy left, ~56% visual right, 32px gap.
 *   Mobile (<768px):
 *     • Single column, content order:
 *         1. Eyebrow
 *         2. Headline
 *         3. Hero photograph (3:2 aspect, dedicated mobile crop showing
 *            the technician + blue insulating mat + yellow boundaries +
 *            switchgear context — no awkward cropping)
 *         4. Supporting paragraph
 *         5. CTAs (two equal-width buttons in one row, stacked only on
 *            very narrow screens)
 *         6. Proof badges (compact two-column grid)
 *
 * Single-source markup: the eyebrow / headline / lede / CTAs / proof
 * badges render exactly ONCE in the DOM (single `<h1>`). Two `<Image>`
 * elements exist (desktop crop + mobile crop) but only one is visible
 * at a time — the hidden wrapper has `display:none` which removes it
 * from the accessibility tree, so screen readers announce the scene
 * exactly once.
 *
 * Accessibility:
 *   • Single semantic <h1>.
 *   • All text is real HTML — never embedded in the image.
 *
 * Performance:
 *   • Desktop image is `priority` (LCP) at 1200×900, served with proper
 *     `sizes` so a 360px viewport doesn't download it.
 *   • Mobile image is `priority` only on mobile (rendered above the fold
 *     right under the headline) at 1080×720.
 *   • Explicit aspect-ratio on both frames → no layout shift.
 */
export default function HomeHero() {
  return (
    <section
      aria-label="Bharat Electrosafe electrical insulating mats — homepage introduction"
      className="be-split-hero"
    >
      <div className="container-site page-horizontal-padding be-split-hero__inner">
        {/* ── Copy block (pre-image): eyebrow + headline ─────────
            Renders at top of mobile column (above the photograph)
            and at top of desktop left column. */}
        <div className="be-split-hero__copy-pre">
          <div className="be-split-hero__eyebrow">
            <Eyebrow>ELECTRICAL INSULATION FOR HIGH-RISK ENVIRONMENTS</Eyebrow>
            <div
              className="mt-2 h-0.5 bg-be-yellow-500 rounded animate-slide-in"
              style={{ width: '80px' }}
            />
          </div>

          <h1 className="be-split-hero__headline text-be-charcoal-950">
            Electrical Insulating Mats — Protection Engineered Between People and Risk
          </h1>
        </div>

        {/* ── Visual column ─────────────────────────────────────
            Desktop crop (1200×900, 4:3) shown on ≥lg; mobile crop
            (1080×720, 3:2) shown on <lg. Both images carry the full
            alt text — the hidden wrapper has `display:none` which
            removes it from the accessibility tree, so screen readers
            announce the scene exactly once (from whichever image is
            visible). */}
        <div className="be-split-hero__visual">
          {/* Desktop visual — hidden on mobile via `display:none`, no
              layout shift thanks to the explicit aspect-ratio on the
              wrapper. */}
          <div className="be-split-hero__visual-desktop">
            <Image
              src="/media/hero/bharat-electrosafe-insulating-mat-hero.webp"
              alt={HERO_IMG_ALT}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="be-split-hero__image object-cover"
            />
          </div>
          {/* Mobile visual — hidden on desktop via `display:none`.
              Carries the full alt text so the visible image on mobile
              is fully described to assistive tech. */}
          <div className="be-split-hero__visual-mobile">
            <Image
              src="/media/hero/bharat-electrosafe-insulating-mat-hero-mobile.webp"
              alt={HERO_IMG_ALT}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* ── Copy block (post-image): paragraph + CTAs + badges ─
            Renders below the photograph on mobile, and below the
            headline in the desktop left column. */}
        <div className="be-split-hero__copy-post">
          <p className="be-split-hero__lede text-be-grey-650">
            Electrical insulating mats designed for safer operation around
            switchgear, substations and industrial electrical installations.
          </p>

          <div className="be-split-hero__ctas">
            <PrimaryButton href="/products" size="lg" className="be-hero-cta">
              Explore Products
            </PrimaryButton>
            <SecondaryButton href="/contact-us" className="be-hero-cta">
              Request a Quote
            </SecondaryButton>
          </div>

          <div className="be-split-hero__proof">
            {proofItems.map((item) => {
              const Icon = item.icon;
              return (
                <span key={item.label} className="be-proof-badge">
                  <Icon
                    className="be-proof-badge__icon size-3.5"
                    aria-hidden="true"
                  />
                  <span className="be-proof-badge__label">{item.label}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
