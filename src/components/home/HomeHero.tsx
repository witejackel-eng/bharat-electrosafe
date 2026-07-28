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
 * Product-led hero that tells the insulating-mat safety story in one frame:
 *
 *   Electrical switchgear environment  →  insulating mat beneath the
 *   operator  →  protected working zone.
 *
 * Composition (desktop):
 *   • Left column  — eyebrow, headline, supporting copy, two CTAs, proof line.
 *   • Right column — a real photograph of industrial switchgear as the
 *     hazard context, with a real mat product close-up inset that overlaps
 *     the lower-left of the scene. A yellow “protected zone” frame and two
 *     restrained callouts identify the mat as the protective equipment,
 *     not ordinary flooring.
 *
 * The hero background uses a restrained navy illumination at the top that
 * fades into the warm-white page — a designed continuation of the navy
 * header, not a separate banner.
 *
 * Static-first: all content is server-rendered. No entry animation gates
 * legibility. Motion is limited to a single soft fade via @starting-style
 * (CSS-only) and respects prefers-reduced-motion.
 *
 * Proof badges render immediately visible (no JS reveal) so IS 15652:2006
 * and the BIS licence appear in the first paint for SEO and trust.
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

          {/* Proof line — visible immediately, no JS reveal.
              Each badge pairs a small icon with the label so the trust
              signals read at a glance. */}
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

        {/* ── Product scene column ── */}
        <div className="w-full lg:w-[48%] lg:ml-auto">
          <ProductHeroScene />
        </div>
      </div>
    </SectionShell>
  );
}

/**
 * ProductHeroScene — the right-column visual.
 *
 * A real industrial switchgear photograph provides the hazard context. A
 * real mat product close-up is inset at the lower-left, overlapping the
 * scene, so the mat reads as the protective equipment placed in that
 * environment — not as a decorative tile. A thin yellow “protected zone”
 * frame and two restrained callouts make the product’s role explicit.
 *
 * Accessibility: the wrapper is role="img" with one descriptive aria-label.
 * The individual images use empty alt (decorative) because the composite
 * meaning is conveyed by the wrapper label — avoiding duplicate
 * announcements.
 */
function ProductHeroScene() {
  return (
    <div
      role="img"
      aria-label="Electrical insulating mat positioned as a protective standing surface in front of industrial switchgear, defining the operator’s protected working zone."
      className="relative w-full overflow-hidden rounded-xl shadow-xl be-hero-scene"
    >
      {/* Industrial switchgear context — real photograph */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src="/media/hero/switchgear-scene.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 48vw"
          className="object-cover"
        />
        {/* Subtle dark gradient at bottom for inset legibility + depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,26,67,0.04) 0%, rgba(0,26,67,0) 35%, rgba(0,26,67,0.28) 100%)',
          }}
          aria-hidden="true"
        />
        {/* Thin navy border to tie the scene to the header */}
        <div
          className="absolute inset-0 ring-1 ring-inset ring-be-navy-800/20 rounded-xl"
          aria-hidden="true"
        />
      </div>

      {/* Mat product close-up — overlapping inset, lower-left.
          Reads as the protective product placed in this environment. */}
      <div className="absolute -bottom-5 -left-3 sm:-left-5 w-[44%] max-w-[280px] be-hero-mat-inset">
        <div className="relative aspect-square overflow-hidden rounded-lg shadow-2xl ring-1 ring-be-navy-900/30 be-hero-mat-frame">
          <Image
            src="/media/hero/mat-product-closeup.webp"
            alt=""
            fill
            sizes="(max-width: 1023px) 44vw, 240px"
            className="object-cover"
          />
          {/* Yellow safety edge accent — brand identifier on the mat inset */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1.5 bg-be-yellow-500"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Protected-zone yellow dashed frame — hugs the mat inset,
          conveys “this is the protected working area”. */}
      <div
        className="absolute -bottom-7 -left-5 sm:-left-7 w-[48%] max-w-[300px] h-[calc(44%+40px)] max-h-[320px] rounded-lg pointer-events-none be-hero-zone"
        aria-hidden="true"
      />

      {/* Callout: switchgear (top-right) */}
      <div className="absolute top-3 right-3 hidden sm:flex items-center gap-1.5 rounded-md px-2 py-1 bg-white/90 backdrop-blur-sm border border-be-grey-250/70 shadow-sm be-hero-callout">
        <span
          className="h-1.5 w-1.5 rounded-full shrink-0 bg-be-navy-700"
          aria-hidden="true"
        />
        <span className="whitespace-nowrap font-semibold uppercase tracking-[0.1em] text-be-charcoal-800 text-[0.625rem]">
          Switchgear
        </span>
      </div>

      {/* Callout: insulating mat (near the inset) */}
      <div className="absolute bottom-3 right-3 hidden sm:flex items-center gap-1.5 rounded-md px-2 py-1 bg-be-yellow-500/95 border border-be-yellow-600/40 shadow-sm be-hero-callout">
        <span
          className="h-1.5 w-1.5 rounded-full shrink-0 bg-be-navy-900"
          aria-hidden="true"
        />
        <span className="whitespace-nowrap font-semibold uppercase tracking-[0.1em] text-be-charcoal-950 text-[0.625rem]">
          Insulating Mat
        </span>
      </div>
    </div>
  );
}
