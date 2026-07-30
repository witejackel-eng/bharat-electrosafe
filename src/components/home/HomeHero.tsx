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
  { label: 'ERDA / NTH Tested', icon: FlaskConical },
  { label: 'Conforming to IEC 61111', icon: Globe2 },
];

const HERO_IMG_ALT =
  'Electrical technician operating switchgear while standing on an electrical insulating mat covering the control-room floor.';

/**
 * HomeHero — Server Component.
 *
 * Premium split hero. Copy lives in the left column on a warm off-white
 * background; the switchgear-room photograph lives in a dedicated visual
 * frame on the right. No text overlays the photograph — no readability
 * scrim, no callout chips, no collage labels. The photograph is composed
 * (cropped at asset-build time) to keep the technician (head, hands,
 * feet), the switchgear being operated, and a substantial portion of the
 * blue insulating mat in the foreground.
 *
 * Composition:
 *   Desktop / tablet-landscape (≥1024px):
 *     • Two-column grid: ~42% copy left, ~58% visual right, 32–48px gap.
 *     • Hero vertical padding ~48–64px; total height fits comfortably in
 *       a 1366×768 laptop viewport (no forced 680px minimum).
 *     • Image frame: 4:3 aspect, object-cover, restrained radius, thin
 *       neutral border, very subtle shadow.
 *   Mobile / tablet-portrait (<1024px):
 *     • Copy first on warm-white background, then full-width image below.
 *     • Image keeps its natural ~900×780 aspect (slightly taller than 4:3
 *       to preserve the technician's helmet and feet — no vertical crop).
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
 *   • Single visible Image per viewport — both crops carry the full
 *     descriptive alt text; the hidden one is removed from the a11y
 *     tree via `display:none` on its wrapper, so the scene is announced
 *     exactly once.
 *   • All text is real HTML — never embedded in the image.
 *
 * Performance:
 *   • Desktop image is `priority` (LCP) at 1200×900, served with proper
 *     `sizes` so a 360px viewport doesn't download it.
 *   • Mobile image is `priority` only on mobile (rendered above the fold
 *     right under the copy block) at 900×780.
 *   • Explicit aspect-ratio on both frames → no layout shift.
 */
export default function HomeHero() {
  return (
    <section
      aria-label="Bharat Electrosafe electrical insulating mats — homepage introduction"
      className="be-split-hero"
    >
      <div className="container-site page-horizontal-padding be-split-hero__inner">
        {/* ── Copy column (renders once, single <h1>) ─────────────── */}
        <div className="be-split-hero__copy">
          <div className="mb-5">
            <Eyebrow>ELECTRICAL INSULATION FOR HIGH-RISK ENVIRONMENTS</Eyebrow>
            <div
              className="mt-2 h-0.5 bg-be-yellow-500 rounded animate-slide-in"
              style={{ width: '80px' }}
            />
          </div>

          <h1 className="be-split-hero__headline text-be-charcoal-950 mb-5">
            Protection engineered between people and electrical risk.
          </h1>

          <p className="be-split-hero__lede text-be-grey-650 mb-6">
            Electrical insulating mats designed for safer operation around
            switchgear, substations and industrial electrical installations.
          </p>

          <div className="flex flex-wrap gap-4 mb-5">
            <PrimaryButton href="/products" size="lg">
              Explore Products
            </PrimaryButton>
            <SecondaryButton href="/contact-us">
              Request a Quote
            </SecondaryButton>
          </div>

          <div className="flex flex-wrap gap-2">
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

        {/* ── Visual column ─────────────────────────────────────────
            Desktop crop (1200×900, 4:3) shown on ≥lg; mobile crop
            (900×780) shown on <lg. Both images carry the full alt
            text — the hidden wrapper has `display:none` which removes
            it from the accessibility tree, so screen readers announce
            the scene exactly once (from whichever image is visible). */}
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
      </div>
    </section>
  );
}
