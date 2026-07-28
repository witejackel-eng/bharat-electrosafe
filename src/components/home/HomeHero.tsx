import { Eyebrow } from '@/components/ui/Eyebrow';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { TechnicalBadge } from '@/components/ui/TechnicalBadge';
import { SectionShell } from '@/components/ui/SectionShell';
import HeroTechnicalVisual from '@/components/home/HeroTechnicalVisual';
import HeroTechnicalLegend from '@/components/home/HeroTechnicalLegend';

const proofItems = [
  'IS 15652:2006',
  'BIS Licence CM/L:8800129617',
  'ERDA / NTH Tested',
  'Conforming to IEC 61111',
];

/**
 * HomeHero — Server Component.
 *
 * The hero is above the fold and must be server-rendered so its H1, copy,
 * CTAs and proof badges appear in the initial HTML without waiting for
 * hydration. No IntersectionObserver, no opacity-zero initial states, no
 * Framer Motion. The proof badges render immediately visible.
 *
 * The companion HeroTechnicalVisual is also a static Server Component
 * (pure SVG/CSS, no animation, no client JS).
 *
 * Sizing strategy (desktop compression):
 *   - Homepage-specific .text-home-hero-h1 (smaller than global text-hero-h1)
 *   - Compact section padding via className override (not changing SectionShell)
 *   - Reduced min-height (lg:min-h-[460px] instead of 560px)
 *   - Tightened internal vertical rhythm
 *   - Rebalanced columns (53%/47% with gap-10)
 *   - Laptop-height media query (.home-hero-compact) for ≤820px viewports
 *
 * Mobile remains fully stacked with all content intact.
 */
export default function HomeHero() {
  return (
    <SectionShell
      variant="hero"
      bg="bg-be-warm-white"
      className="home-hero-compact pt-10 md:pt-12 lg:pt-14 pb-10 md:pb-12 lg:pb-14"
    >
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10 min-h-0 lg:min-h-[460px]">
        {/* Copy — 53% on desktop */}
        <div className="w-full lg:w-[53%] flex flex-col justify-center relative">
          {/* Vertical yellow decorative bar — ties to the mat's yellow edge */}
          <div className="hidden lg:block absolute -left-6 top-0 bottom-0 w-1 bg-be-yellow-500 rounded-full" aria-hidden="true" />

          {/* Eyebrow with animated underline (CSS-only, reduced-motion safe) */}
          <div className="home-hero-eyebrow mb-4 relative">
            <Eyebrow>
              ELECTRICAL INSULATION AND INDUSTRIAL PROTECTION
            </Eyebrow>
            <div className="mt-2 h-0.5 bg-be-yellow-500 rounded animate-slide-in" style={{ width: '80px' }} />
          </div>

          <h1 className="home-hero-heading text-home-hero-h1 text-be-charcoal-950 mb-4">
            Certified protection
            <br className="hidden lg:block" /> for critical electrical environments.
          </h1>

          <p className="home-hero-paragraph text-body-large text-be-grey-650 max-w-xl mb-5">
            Electrical insulating mats create a protective standing surface
            for personnel working around switchgear, control panels and
            substations.
          </p>

          {/* CTA buttons */}
          <div className="home-hero-ctas flex flex-wrap gap-4 mb-4">
            <PrimaryButton
              href="/products"
              size="lg"
            >
              View Products
            </PrimaryButton>
            <SecondaryButton href="/contact-us">
              Request a Quote
            </SecondaryButton>
          </div>

          {/* Subtle horizontal separator */}
          <div className="home-hero-separator w-full h-px bg-be-grey-250 mb-4" aria-hidden="true" />

          {/* Proof line — visible immediately, no JS reveal */}
          <div className="flex flex-wrap gap-2">
            {proofItems.map((item) => (
              <TechnicalBadge key={item} label={item} />
            ))}
          </div>
        </div>

        {/* Technical visual — 47% on desktop, aligned toward the right edge */}
        <div className="w-full lg:w-[47%] lg:ml-auto">
          <HeroTechnicalVisual />
          {/* Mobile legend — complete four-term reference, hidden on desktop */}
          <HeroTechnicalLegend />
        </div>
      </div>
    </SectionShell>
  );
}
