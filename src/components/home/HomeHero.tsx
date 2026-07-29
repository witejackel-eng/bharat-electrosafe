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
 * Photographic full-width hero. The attached switchgear-room photograph
 * (technician right-of-centre, blue insulating mat across the floor,
 * closed cabinets on both sides, open left) is used as a single
 * edge-to-edge background image. Real HTML content sits over the
 * naturally open left side of the photograph, restrained by a soft
 * warm-white readability gradient that never reaches the right side.
 *
 * Composition:
 *   Desktop / tablet-landscape (≥1024px):
 *     • Full-bleed photograph (1920×780, ≈2.46:1) at min-height 620px.
 *     • Left ~52% holds eyebrow → headline → supporting copy → CTAs →
 *       proof badges, over a left-to-right warm-white gradient that
 *       fades to transparent before reaching the technician.
 *   Mobile / tablet-portrait (<1024px):
 *     • Copy first on warm-white background (eyebrow → headline → copy →
 *       CTAs → badges), then the photograph immediately below at 4:3,
 *       cropped to keep technician + mat + cabinets in frame.
 *
 * Accessibility:
 *   • Single semantic <h1>.
 *   • Single decorative Image for the background (alt="" on desktop
 *     because the same photograph is described by the visible mobile
 *     <img>; the visible mobile image carries the full alt text).
 *   • All text is real HTML — never embedded in the image.
 *
 * Performance:
 *   • Desktop image is `priority` + `preload` for LCP.
 *   • Mobile image is `priority` but lazy-decodable; explicit sizes to
 *     avoid loading the 1920px asset on a 360px screen.
 *   • No layout shift — the section reserves min-height before image
 *     load via CSS aspect-ratio fallback on the image wrapper.
 */
export default function HomeHero() {
  return (
    <section
      aria-label="Bharat Electrosafe electrical insulating mats — homepage introduction"
      className="be-photo-hero"
    >
      {/* ── Desktop / tablet-landscape photographic hero (≥lg) ── */}
      <div className="be-photo-hero__desktop hidden lg:block">
        {/* Background photograph — covers the full hero, technician stays
            right-of-centre, mat stays across the lower foreground. */}
        <Image
          src="/media/hero/bharat-electrosafe-insulating-mat-hero.webp"
          alt={HERO_IMG_ALT}
          fill
          priority
          sizes="100vw"
          className="object-cover be-photo-hero__image"
        />
        {/* Left-side readability gradient only. Fades to transparent well
            before the technician so the photograph stays visible behind
            and around the content. */}
        <div
          className="absolute inset-0 be-photo-hero__scrim"
          aria-hidden="true"
        />
        {/* Content — positioned over the open left side of the photo. */}
        <div className="relative h-full container-site page-horizontal-padding">
          <div className="flex h-full items-center">
            <div className="be-photo-hero__content max-w-[600px]">
              <HeroContent />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile / tablet-portrait hero (<lg) ──
          Copy first on warm-white, image immediately below. */}
      <div className="lg:hidden">
        <div className="container-site page-horizontal-padding pt-10 pb-6 sm:pt-12 sm:pb-8 bg-be-warm-white">
          <div className="max-w-[560px]">
            <HeroContent />
          </div>
        </div>
        <div className="relative w-full aspect-[4/3] bg-be-cream overflow-hidden">
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
    </section>
  );
}

/**
 * HeroContent — shared eyebrow / headline / supporting copy / CTAs /
 * proof badges. Rendered identically on desktop (over the photograph)
 * and on mobile (above the photograph), so the message is consistent.
 */
function HeroContent() {
  return (
    <>
      <div className="mb-5">
        <Eyebrow>ELECTRICAL INSULATION FOR HIGH-RISK ENVIRONMENTS</Eyebrow>
        <div
          className="mt-2 h-0.5 bg-be-yellow-500 rounded animate-slide-in"
          style={{ width: '80px' }}
        />
      </div>

      <h1 className="be-photo-hero__headline text-be-charcoal-950 mb-5">
        Protection engineered between people and electrical risk.
      </h1>

      <p className="be-photo-hero__lede text-be-grey-650 mb-6">
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
              <Icon className="be-proof-badge__icon size-3.5" aria-hidden="true" />
              <span className="be-proof-badge__label">{item.label}</span>
            </span>
          );
        })}
      </div>
    </>
  );
}
