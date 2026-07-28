/**
 * HeroTechnicalLegend — Server Component.
 *
 * A mobile-first technical legend that appears below the hero illustration
 * on small viewports (<768px). It provides the complete set of four technical
 * terms with concise explanations, ensuring no terminology is lost on mobile
 * even when the illustration can only fit three short inline labels.
 *
 * Desktop/tablet (≥768px): the legend is hidden because the full four
 * callout labels are visible in the illustration itself.
 *
 * Layout:
 *   - Two-column grid at ~430px when space allows
 *   - One-column stacked list at 360–390px
 *   - Gap: 10–12px
 *   - Compact cards with yellow numbered markers
 *
 * Uses semantic <dl> markup for accessibility.
 * All terms match the verified desktop callout labels exactly.
 */

const legendItems = [
  {
    id: 'electrical-switchgear',
    term: 'Electrical Switchgear',
    description:
      'The electrical cabinet being operated or inspected.',
  },
  {
    id: 'operator-standing-area',
    term: 'Operator Standing Area',
    description:
      'The working zone where the technician stands fully on the mat.',
  },
  {
    id: 'insulating-barrier',
    term: 'Insulating Barrier',
    description:
      'The mat separates the operator\u2019s standing surface from the floor.',
  },
  {
    id: 'anti-skid-surface',
    term: 'Anti-Skid Surface',
    description:
      'The textured surface is designed to improve footing during use.',
  },
];

export default function HeroTechnicalLegend() {
  return (
    <dl
      className="md:hidden mt-4 grid grid-cols-1 max-w-[430px]:grid-cols-2 gap-[10px] px-1"
      aria-label="Technical illustration legend"
    >
      {legendItems.map((item, index) => (
        <div
          key={item.id}
          className="flex items-start gap-2 rounded border border-be-grey-250/60 bg-be-warm-white px-2.5 py-2"
        >
          {/* Yellow numbered marker */}
          <span
            className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-be-yellow-500 text-[0.5625rem] font-bold text-be-charcoal-950 leading-none"
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <div className="min-w-0">
            <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-be-charcoal-800 leading-tight">
              {item.term}
            </dt>
            <dd className="mt-0.5 text-[0.625rem] leading-snug text-be-grey-650">
              {item.description}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
