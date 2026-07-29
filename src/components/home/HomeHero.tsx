import Image from 'next/image';
import { ShieldCheck, BadgeCheck, FlaskConical, Globe2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { SectionShell } from '@/components/ui/SectionShell';

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

/**
 * HomeHero — Server Component.
 *
 * Product-first hero that tells the insulating-mat safety story in ONE
 * coherent scene (per client spec):
 *
 *   Industrial switchgear environment (background)
 *   → large Bharat Electrosafe insulating mat in the foreground
 *   → yellow safety edge + coin-surface texture clearly visible
 *   → the mat IS the subject, not a small inset tile.
 *
 * The previous "small square inset over a switchgear photo" composition
 * felt like two unrelated images. This version uses the mat as the
 * dominant foreground element (≈45% of the visual) with the switchgear
 * scene softly visible behind it — one perspective, one lighting
 * treatment, one product story.
 *
 * Composition (desktop):
 *   • Left column  — eyebrow, headline, supporting copy, two CTAs,
 *     proof badges.
 *   • Right column — one integrated product scene: switchgear context
 *     softly blurred/darkened behind a large, sharp mat product image
 *     with a yellow safety-edge accent and a single restrained callout.
 *
 * Mobile:
 *   • Copy first, then the product scene at full width with the mat
 *     clearly visible — no tiny crop, no hidden product.
 *
 * Motion: soft fade via @starting-style only (CSS-only). Respects
 * prefers-reduced-motion. Static-first: all content is server-rendered
 * and legible on first paint.
 */
export default function HomeHero() {
  return (
    <SectionShell
      variant="hero"
      bg="be-hero-to-navy"
      className="home-hero-compact pt-10 md:pt-14 lg:pt-16 pb-10 md:pb-14 lg:pb-16"
    >
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 min-h-0 lg:min-h-[540px]">
        {/* ── Copy column ── */}
        <div className="w-full lg:w-[52%] flex flex-col justify-center relative">
          {/* Vertical yellow decorative bar — ties to the mat's yellow edge */}
          <div
            className="hidden lg:block absolute -left-6 top-0 bottom-0 w-1 bg-be-yellow-500 rounded-full"
            aria-hidden="true"
          />

          <div className="home-hero-eyebrow mb-5 relative">
            <Eyebrow>
              ELECTRICAL INSULATION FOR HIGH-RISK ENVIRONMENTS
            </Eyebrow>
            <div
              className="mt-2 h-0.5 bg-be-yellow-500 rounded animate-slide-in"
              style={{ width: '80px' }}
            />
          </div>

          <h1 className="home-hero-heading text-home-hero-h1 text-be-charcoal-950 mb-5">
            Protection engineered between people and electrical risk.
          </h1>

          <p className="home-hero-paragraph text-body-large text-be-grey-650 max-w-xl mb-6">
            Electrical insulating mats designed for safer operation around
            switchgear, substations and industrial electrical installations.
          </p>

          {/* CTA buttons */}
          <div className="home-hero-ctas flex flex-wrap gap-4 mb-5">
            <PrimaryButton href="/products" size="lg">
              Explore Products
            </PrimaryButton>
            <SecondaryButton href="/contact-us">
              Request a Quote
            </SecondaryButton>
          </div>

          {/* Subtle horizontal separator */}
          <div
            className="home-hero-separator w-full h-px bg-be-grey-250 mb-5"
            aria-hidden="true"
          />

          {/* Proof line — visible immediately, no JS reveal. */}
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
        </div>

        {/* ── Product scene column ──
            Desktop: integrated switchgear + mat composition.
            Mobile/tablet (<lg): portrait-friendly product-first scene
            with a taller aspect ratio so the mat remains dominant. */}
        <div className="w-full lg:w-[48%] lg:ml-auto">
          {/* Desktop / tablet-landscape scene — 4:3 aspect */}
          <div className="hidden lg:block">
            <ProductHeroScene />
          </div>
          {/* Mobile / tablet-portrait scene — 3:4 aspect, mat dominant */}
          <div className="lg:hidden">
            <ProductHeroSceneMobile />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

/**
 * ProductHeroScene — one integrated product-first composition.
 *
 * Layers (back to front):
 *   1. Switchgear environment photograph — softly darkened + blurred
 *      to recede as context, not compete with the product.
 *   2. Subtle navy gradient overlay — ties the scene to the header and
 *      improves mat legibility against the background.
 *   3. Large mat product image — the dominant foreground element
 *      (≈45% of scene area). Shows the coin-surface texture, the yellow
 *      safety edge, and the IEC 61111 marking. Sharp, well-lit.
 *   4. Single restrained callout — "Insulating Mat" tag on the product
 *      itself, so the role is explicit without cluttering the scene.
 *
 * No separate floating thumbnail. No collage. One perspective, one
 * lighting treatment, one product story.
 *
 * Accessibility: the wrapper is role="img" with one descriptive
 * aria-label. Individual images use empty alt (decorative) because the
 * composite meaning is conveyed by the wrapper label.
 */
function ProductHeroScene() {
  return (
    <div
      role="img"
      aria-label="Bharat Electrosafe electrical insulating mat with coin-surface texture and yellow safety edge, positioned as the protective standing surface in front of industrial switchgear."
      className="relative w-full overflow-hidden rounded-xl shadow-xl be-hero-scene"
    >
      {/* ── Layer 1: Switchgear environment (background context) ──
          Real photograph, softly darkened so it recedes. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src="/media/hero/switchgear-scene.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 48vw"
          className="object-cover be-hero-bg-image"
        />
        {/* Navy gradient overlay — darkens the background for mat
            legibility and ties the scene to the navy header. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,26,67,0.35) 0%, rgba(0,26,67,0.45) 50%, rgba(0,26,67,0.65) 100%)',
          }}
          aria-hidden="true"
        />
        {/* Thin navy inner ring — ties to header */}
        <div
          className="absolute inset-0 ring-1 ring-inset ring-be-navy-800/30 rounded-xl"
          aria-hidden="true"
        />
      </div>

      {/* ── Layer 2: Large mat product (foreground, dominant) ──
          The mat occupies ~45% of the scene area and sits in the
          lower portion — reading as the protective surface the
          operator stands on. Coin-surface texture + yellow safety
          edge are clearly visible. Sharp, well-lit, unmistakable. */}
      <div className="absolute bottom-0 left-0 right-0 be-hero-mat-foreground">
        {/* Mat image — large, sharp, dominant */}
        <div className="relative mx-auto w-[88%] max-w-[440px] aspect-[16/10] overflow-hidden rounded-t-lg shadow-2xl ring-1 ring-be-navy-900/40 be-hero-mat-image">
          <Image
            src="/media/products/electrical-insulating-mats/gallery/01-blue-coin-mat.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 1023px) 88vw, 440px"
            className="object-cover"
          />
          {/* Yellow safety edge — brand identifier, runs along the
              bottom of the mat image (the leading edge the operator
              would see when approaching the panel). */}
          <div
            className="absolute bottom-0 left-0 right-0 h-2 bg-be-yellow-500"
            aria-hidden="true"
          />
          {/* Soft top gradient so the mat image blends into the
              switchgear background rather than pasting a hard edge. */}
          <div
            className="absolute top-0 left-0 right-0 h-8"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,26,67,0.35) 0%, transparent 100%)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* Single restrained callout — on the mat itself, so the
            product's role is explicit. Yellow background, dark text,
            high contrast, small. */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 bg-be-yellow-500/95 backdrop-blur-sm border border-be-yellow-600/40 shadow-lg be-hero-callout">
          <span
            className="h-1.5 w-1.5 rounded-full shrink-0 bg-be-navy-900"
            aria-hidden="true"
          />
          <span className="whitespace-nowrap font-semibold uppercase tracking-[0.1em] text-be-charcoal-950 text-[0.625rem] sm:text-[0.7rem]">
            Insulating Mat
          </span>
        </div>
      </div>

      {/* ── Layer 3: Switchgear context callout (top-left) ──
          Identifies the hazard context without cluttering the scene.
          Hidden on very small screens to avoid crowding the mat. */}
      <div className="absolute top-3 left-3 hidden sm:flex items-center gap-1.5 rounded-md px-2.5 py-1.5 bg-white/85 backdrop-blur-sm border border-white/40 shadow-sm be-hero-callout">
        <span
          className="h-1.5 w-1.5 rounded-full shrink-0 bg-be-navy-700"
          aria-hidden="true"
        />
        <span className="whitespace-nowrap font-semibold uppercase tracking-[0.1em] text-be-charcoal-800 text-[0.625rem]">
          Switchgear
        </span>
      </div>
    </div>
  );
}

/**
 * ProductHeroSceneMobile — portrait-friendly product-first scene for
 * mobile and tablet-portrait (<lg).
 *
 * Uses a 3:4 aspect ratio with the switchgear environment as a darkened
 * background and the mat product as the dominant foreground element
 * occupying the lower portion of the frame. The mat's coin-surface
 * texture, yellow safety edge, and "Insulating Mat" callout are all
 * clearly visible at small screen sizes.
 *
 * Accessibility: same role="img" + single aria-label pattern as the
 * desktop scene.
 */
function ProductHeroSceneMobile() {
  return (
    <div
      role="img"
      aria-label="Bharat Electrosafe electrical insulating mat with coin-surface texture and yellow safety edge, positioned as the protective standing surface in front of industrial switchgear."
      className="relative w-full overflow-hidden rounded-xl shadow-xl be-hero-scene"
    >
      {/* Switchgear background — portrait crop, darkened */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src="/media/hero/switchgear-scene-mobile.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover be-hero-bg-image"
        />
        {/* Navy gradient overlay — darker at bottom for mat legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,26,67,0.30) 0%, rgba(0,26,67,0.45) 45%, rgba(0,26,67,0.70) 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 ring-1 ring-inset ring-be-navy-800/30 rounded-xl"
          aria-hidden="true"
        />
      </div>

      {/* Mat product — dominant foreground, lower portion of frame */}
      <div className="absolute bottom-0 left-0 right-0 be-hero-mat-foreground">
        <div className="relative mx-auto w-[92%] max-w-[380px] aspect-[16/10] overflow-hidden rounded-t-lg shadow-2xl ring-1 ring-be-navy-900/40 be-hero-mat-image">
          <Image
            src="/media/products/electrical-insulating-mats/gallery/01-blue-coin-mat.webp"
            alt=""
            fill
            priority
            sizes="92vw"
            className="object-cover"
          />
          {/* Yellow safety edge — bottom of mat */}
          <div
            className="absolute bottom-0 left-0 right-0 h-2 bg-be-yellow-500"
            aria-hidden="true"
          />
          {/* Soft top blend */}
          <div
            className="absolute top-0 left-0 right-0 h-8"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,26,67,0.40) 0%, transparent 100%)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* "Insulating Mat" callout — on the mat, always visible on mobile */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 bg-be-yellow-500/95 backdrop-blur-sm border border-be-yellow-600/40 shadow-lg be-hero-callout">
          <span
            className="h-1.5 w-1.5 rounded-full shrink-0 bg-be-navy-900"
            aria-hidden="true"
          />
          <span className="whitespace-nowrap font-semibold uppercase tracking-[0.1em] text-be-charcoal-950 text-[0.7rem]">
            Insulating Mat
          </span>
        </div>
      </div>
    </div>
  );
}
