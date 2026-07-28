import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { LeaderProfileCard } from '@/components/about/LeaderProfileCard';
import { leaders } from '@/data/team';
import { ShieldCheck, BadgeCheck, HeadsetIcon, FileText } from 'lucide-react';

/**
 * CompanyLeadership — Server Component.
 *
 * Contains four content blocks on the About page:
 *   1. "Our Journey" — company overview
 *   2. "Our Mission" + "Our Values" — two side-by-side cards
 *   3. "Leadership" — three large editorial profile cards
 *
 * The leadership section was redesigned from small 64px circular avatars
 * to substantial editorial cards with large 4:3 portraits, full
 * multi-paragraph biographies, and factual expertise labels. All
 * biographical content comes from src/data/team.ts — no content is
 * duplicated or invented here.
 *
 * The existing `.reveal-up` classes on the Journey/Mission/Values blocks
 * are driven by the shared <RevealObserver /> mounted in the page shell.
 * The leadership cards use @starting-style CSS animations (no JS needed).
 */

export default function CompanyLeadership() {
  return (
    <SectionShell variant="standard" bg="bg-be-warm-white" topRule>
      {/* ── Company journey ─────────────────────────────────────── */}
      <div className="reveal-up mb-12">
        <SectionHeader
          eyebrow="Our Journey"
          title="Building Trust Through Quality"
          supportingText="Founded with a commitment to electrical safety, Bharat Electrosafe has grown into a trusted manufacturer serving critical infrastructure across India. Our focus on certified quality, technical documentation and application support sets us apart."
        />
      </div>

      {/* ── Mission + Values ────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-16">
        {/* Mission statement */}
        <div className="lg:w-1/2 reveal-up">
          <div className="rounded-lg border border-be-grey-250 bg-be-cream p-6">
            <h3 className="text-card-title text-be-charcoal-950 mb-3">Our Mission</h3>
            <p className="text-body-large text-be-grey-650">
              To manufacture and supply certified electrical insulation products that protect
              people and assets in critical electrical environments, supported by rigorous
              testing and comprehensive documentation.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="lg:w-1/2 reveal-up">
          <div className="rounded-lg border border-be-grey-250 bg-be-yellow-50 p-6">
            <h3 className="text-card-title text-be-charcoal-950 mb-3">Our Values</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2 text-sm text-be-grey-650">
                <ShieldCheck className="size-4 text-be-yellow-text mt-0.5 shrink-0" aria-hidden="true" focusable="false" />
                <span><strong className="text-be-charcoal-950">Certified quality</strong> — every product is tested and documented</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-be-grey-650">
                <BadgeCheck className="size-4 text-be-yellow-text mt-0.5 shrink-0" aria-hidden="true" focusable="false" />
                <span><strong className="text-be-charcoal-950">Standards compliance</strong> — IS 15652:2006, BIS licensed</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-be-grey-650">
                <HeadsetIcon className="size-4 text-be-yellow-text mt-0.5 shrink-0" aria-hidden="true" focusable="false" />
                <span><strong className="text-be-charcoal-950">Application support</strong> — technical guidance for every project</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-be-grey-650">
                <FileText className="size-4 text-be-yellow-text mt-0.5 shrink-0" aria-hidden="true" focusable="false" />
                <span><strong className="text-be-charcoal-950">Documentation</strong> — test reports and certificates available</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Leadership ────────────────────────────────────────────
          Editorial 3-card section. Each leader receives equal visual
          importance. On desktop (lg+): 3 equal columns. On tablet (md):
          2 columns with the third card spanning both columns and centred.
          On mobile: 1 column, full-width cards.

          All biographical content comes from src/data/team.ts. The
          component does not duplicate or rewrite any profile text. */}
      <div className="reveal-up">
        <SectionHeader
          eyebrow="Leadership"
          title="The people guiding Bharat Electrosafe"
          supportingText="Meet the leaders directing the company’s manufacturing, finance, quality, operations, partnerships and international development."
        />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:mt-10 lg:grid-cols-3 lg:gap-8">
          {leaders.map((leader, i) => (
            <LeaderProfileCard
              key={leader.name}
              leader={leader}
              /* On tablet (md, 2-col grid) the third card spans both
                 columns and is centred so it doesn't sit awkwardly on
                 the far left. On desktop (lg, 3-col grid) it returns
                 to a normal single-column span. */
              className={
                i === 2
                  ? 'md:col-span-2 md:max-w-md md:justify-self-center lg:col-span-1 lg:max-w-none lg:justify-self-stretch'
                  : ''
              }
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
