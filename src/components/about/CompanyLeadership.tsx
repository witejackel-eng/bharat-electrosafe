import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { LeadershipGrid } from '@/components/about/LeadershipGrid';
import { leaders } from '@/data/team';
import { ShieldCheck, BadgeCheck, HeadsetIcon, Sparkles, Users } from 'lucide-react';

/**
 * CompanyLeadership — Server Component.
 *
 * Contains four content blocks on the About page:
 *   1. Company overview
 *   2. Mission + Values — two side-by-side cards
 *   3. Leadership — three clean editorial profile cards in a grid
 *
 * The leadership section was redesigned from the previous coverflow
 * swivel carousel into a clean three-column grid (desktop) with a
 * refined hover-expansion interaction. Mobile and tablet use a tap
 * to expand each biography inline. All biographical content comes
 * from src/data/team.ts — no content is duplicated or invented here.
 *
 * The existing `.reveal-up` classes on the Journey/Mission/Values blocks
 * are driven by the shared <RevealObserver /> mounted in the page shell.
 */

const valueRows = [
  {
    icon: ShieldCheck,
    title: 'Quality',
    text: 'Maintain consistency in product specification, documentation and delivery.',
  },
  {
    icon: BadgeCheck,
    title: 'Responsibility',
    text: 'Make careful claims, communicate limitations and support informed product selection.',
  },
  {
    icon: HeadsetIcon,
    title: 'Customer focus',
    text: 'Understand the application before recommending a configuration.',
  },
  {
    icon: Sparkles,
    title: 'Continuous improvement',
    text: 'Improve products, processes and customer support through practical learning and feedback.',
  },
  {
    icon: Users,
    title: 'Teamwork',
    text: 'Coordinate manufacturing, quality, sales and support around the customer’s requirement.',
  },
];

export default function CompanyLeadership() {
  return (
    <SectionShell variant="standard" bg="bg-be-warm-white" topRule>
      {/* ── Company overview ─────────────────────────────────────── */}
      <div className="reveal-up mb-12">
        <SectionHeader
          eyebrow="Company overview"
          title="About Bharat Electrosafe"
          supportingText="Bharat Electrosafe manufactures electrical insulating mats and engineered PVC products for electrical-safety and civil-protection applications. The product portfolio includes standard insulating mats, visible-safety variants, PVC geo-membranes and water-stop profiles."
        />
      </div>

      {/* ── Mission + Values ────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-16">
        {/* Mission statement */}
        <div className="lg:w-1/2 reveal-up">
          <div className="rounded-lg border border-be-grey-250 bg-be-cream p-6">
            <h3 className="text-card-title text-be-charcoal-950 mb-3">Mission</h3>
            <p className="text-body-large text-be-grey-650 mb-5">
              To support safer electrical and civil-engineering environments through clearly
              specified products, dependable documentation and responsive technical support.
            </p>
            <h3 className="text-card-title text-be-charcoal-950 mb-3">Vision</h3>
            <p className="text-body-large text-be-grey-650">
              To build long-term trust by supplying consistent electrical-insulation and
              civil-protection products for demanding industrial applications.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="lg:w-1/2 reveal-up">
          <div className="rounded-lg border border-be-grey-250 bg-be-yellow-50 p-6">
            <h3 className="text-card-title text-be-charcoal-950 mb-4">Values</h3>
            <ul className="flex flex-col gap-3.5">
              {valueRows.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex items-start gap-2 text-sm text-be-grey-650">
                  <Icon
                    className="size-4 text-be-yellow-text mt-0.5 shrink-0"
                    aria-hidden="true"
                    focusable="false"
                  />
                  <span>
                    <strong className="text-be-charcoal-950">{title}</strong> — {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Leadership ────────────────────────────────────────────
          Clean three-column leadership grid (desktop). Each card
          shows portrait, name, role, short bio, expertise labels and
          a “Know more” toggle button. Clicking the button
          (mouse, keyboard, or tap) reveals the fuller biography and
          leadership focus inside the same card — no drawer, no
          carousel, no overlap. Only one biography is open at a time.

          All biographical content comes from src/data/team.ts. The
          component does not duplicate or rewrite any profile text. */}
      <div className="reveal-up">
        <SectionHeader
          eyebrow="Leadership"
          title="The people guiding Bharat Electrosafe"
          supportingText="Meet the directors shaping the company’s manufacturing, finance, quality, operations, partnerships and international development. Tap “Know more” on any card to read the fuller profile."
        />

        <div className="mt-10 lg:mt-12">
          <LeadershipGrid leaders={leaders} />
        </div>
      </div>
    </SectionShell>
  );
}
