import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { LeadershipSwivel } from '@/components/about/LeadershipSwivel';
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
          Premium swivel-and-scroll management portfolio. One active
          profile is centred; previous and next cards are partially
          visible with a subtle rotateY. Each card carries substantial
          professional information (portrait, role, short bio, expertise,
          leadership focus) and a “View Full Profile” action that opens
          an accessible drawer with the complete biography.

          All biographical content comes from src/data/team.ts. The
          component does not duplicate or rewrite any profile text. */}
      <div className="reveal-up">
        <SectionHeader
          eyebrow="Leadership"
          title="The people guiding Bharat Electrosafe"
          supportingText="Meet the directors shaping the company’s manufacturing, finance, quality, operations, partnerships and international development. Drag, swipe or use the arrows to browse each profile."
        />

        <div className="mt-10 lg:mt-12">
          <LeadershipSwivel leaders={leaders} />
        </div>
      </div>
    </SectionShell>
  );
}
