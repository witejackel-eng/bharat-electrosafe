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
 */
export default function HomeHero() {
  return (
    <SectionShell variant="hero" bg="bg-be-warm-white">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 min-h-[480px] lg:min-h-[560px]">
        {/* Copy — ~55% */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center relative">
          {/* Vertical yellow decorative bar — ties to the mat's yellow edge */}
          <div className="hidden lg:block absolute -left-6 top-0 bottom-0 w-1 bg-be-yellow-500 rounded-full" aria-hidden="true" />

          {/* Eyebrow with animated underline (CSS-only, reduced-motion safe) */}
          <div className="mb-6 relative">
            <Eyebrow>
              ELECTRICAL INSULATION AND INDUSTRIAL PROTECTION
            </Eyebrow>
            <div className="mt-2 h-0.5 bg-be-yellow-500 rounded animate-slide-in" style={{ width: '80px' }} />
          </div>

          <h1 className="text-hero-h1 text-be-charcoal-950 mb-6">
            Certified protection
            <br className="hidden lg:block" /> for critical electrical environments.
          </h1>

          <p className="text-body-large text-be-grey-650 max-w-xl mb-8">
            Electrical insulating mats create a protective standing surface
            for personnel working around switchgear, control panels and
            substations.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
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
          <div className="w-full h-px bg-be-grey-250 mb-6" aria-hidden="true" />

          {/* Proof line — visible immediately, no JS reveal */}
          <div className="flex flex-wrap gap-2">
            {proofItems.map((item) => (
              <TechnicalBadge key={item} label={item} />
            ))}
          </div>
        </div>

        {/* Technical visual — ~45%, aligned toward the right edge */}
        <div className="w-full lg:w-[45%] lg:ml-auto">
          <HeroTechnicalVisual />
          {/* Mobile legend — complete four-term reference, hidden on desktop */}
          <HeroTechnicalLegend />
        </div>
      </div>
    </SectionShell>
  );
}
