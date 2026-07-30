import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { LogoGrid } from '@/components/ui/LogoGrid';
import {
  primaryTrustMarks,
  organisationReferences,
  organisationReferenceEyebrow,
  organisationReferenceTitle,
  organisationReferenceNote,
  organisationReferenceCtaLabel,
  scaleFacts,
} from '@/data/trust';

/**
 * TrustDocuments — homepage section that anchors the company's credibility.
 *
 * Layout (top → bottom):
 *
 *   A. Certifications & testing grid (preserved, unchanged content)
 *      Six trust marks (BIS, ISI, ERDA, NTH, ISO 9001, CE) in a 2 / 3 / 6
 *      column responsive grid with optional certificate downloads.
 *
 *   B. Company reach statistics — three equal cards (11+ countries,
 *      1,000+ customers, 6 product families) with a single muted footnote
 *      replacing the per-card "company-stated" wording. Dominant number,
 *      short label beneath, yellow top accent, thin border.
 *
 *   C. Industry References heading — eyebrow + heading + supporting copy,
 *      centred in a controlled ~680px column. Does not claim every
 *      organisation is a current client (the source site does not
 *      substantiate that claim).
 *
 *   D. Organisation logos — static 4×2 grid (desktop), 3 cols (tablet),
 *      2 cols (mobile) of equal-height cells with `object-fit: contain`.
 *
 *   E. About Us link — "View awards and leadership" with a right arrow,
 *      styled as a quiet text link with visible keyboard focus.
 *
 * Why the statistics + Industry References portion was rebuilt: the previous
 * version rendered the statistics as small pill badges (which read as
 * decoration rather than headline figures), stacked the "company-stated"
 * qualifier inside each badge (cluttering the number), and used a marquee
 * for the logos (which moved too fast to recognise the marks and clipped
 * the rightmost tile).
 */
export default function TrustDocuments() {
  return (
    <SectionShell variant="compact" bg="bg-be-cream" yellowAccent>
      {/* ───────────────────────────────────────────────────────
          A. Certifications, testing and registrations grid (preserved) */}
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="CERTIFICATIONS & TESTING"
          title="Certifications, testing and registrations"
          supportingText="Verified by national standards bodies and third-party testing authorities."
        />
      </div>

      <div className="reveal-up grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10 pb-6 border-b-[3px] border-be-yellow-500/30">
        {primaryTrustMarks.map((mark) => (
          <div key={mark.label} className="flex flex-col items-center gap-2 p-4 rounded-lg border border-be-grey-250 bg-be-white hover:border-be-yellow-400 transition-colors duration-300">
            <span className="relative flex h-14 w-full items-center justify-center">
              <Image
                src={mark.logo}
                alt={mark.alt}
                fill
                className="object-contain"
                sizes="120px"
              />
            </span>
            <span className="text-metadata text-be-grey-650 font-medium text-center">{mark.label}</span>
            <span className="text-metadata text-be-grey-650 text-center">{mark.note}</span>
            {mark.document && (
              <a
                href={mark.document}
                target="_blank"
                rel="noopener noreferrer"
                className="text-metadata font-semibold text-be-yellow-text underline underline-offset-2 hover:text-be-yellow-text-hover rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500"
              >
                View certificate
              </a>
            )}
          </div>
        ))}
      </div>

      {/* ───────────────────────────────────────────────────────
          B. Company reach statistics
          Three equal cards in one row (max-width ~840px centred).
          Each card: white bg, thin pale-yellow border, small yellow top
          accent, dominant number, label beneath. The "company-stated"
          qualifier lives in a single muted footnote below the row. */}
      <div className="reveal-up flex flex-col items-center">
        <ul
          role="list"
          aria-label="Company reach statistics"
          className="be-stat-grid w-full max-w-[840px] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {scaleFacts.map((fact) => (
            <li key={fact.shortLabel} className="be-stat-card">
              <span className="be-stat-card__accent" aria-hidden="true" />
              <p className="be-stat-card__number text-be-navy-900">
                {fact.value}
                {fact.companyStated && (
                  <span className="be-stat-card__asterisk" aria-hidden="true">
                    *
                  </span>
                )}
              </p>
              <p className="be-stat-card__label text-be-grey-650">
                {fact.shortLabel}
              </p>
            </li>
          ))}
        </ul>
        <p className="be-stat-footnote text-be-grey-650 mt-3 text-center">
          *Company-stated figures.
        </p>
      </div>

      {/* ───────────────────────────────────────────────────────
          C. Industry References heading
          Centred group, controlled width ~680px. The eyebrow + heading
          establish the section topic without claiming every organisation
          is a current client (the source site does not substantiate
          that claim). */}
      <div className="reveal-up mt-8 md:mt-10 flex flex-col items-center text-center">
        <span className="be-industry-eyebrow text-be-grey-650">
          {organisationReferenceEyebrow}
        </span>
        <h2 className="be-industry-title text-be-charcoal-950 mt-3">
          {organisationReferenceTitle}
        </h2>
        <p className="be-industry-note text-be-grey-650 mt-2">
          {organisationReferenceNote}
        </p>
      </div>

      {/* ───────────────────────────────────────────────────────
          D. Organisation logos
          Compact structured grid container (max-width aligned with the
          site container). White bg, thin neutral border, ~24px internal
          padding so no logo touches the edge. 4×2 desktop, 3 tablet,
          2 mobile. */}
      <div className="reveal-up mt-6 md:mt-8">
        <div className="be-logo-grid-container mx-auto">
          <LogoGrid logos={organisationReferences.map((org) => ({ name: org.name, src: org.logo }))} />
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────
          E. About Us link
          Quiet text link, not a button. Dark navy text, yellow arrow +
          underline on hover, visible keyboard focus ring. Sits ~28px
          below the logo grid. */}
      <div className="reveal-up mt-7 md:mt-8 flex justify-center">
        <Link
          href="/about-us"
          className="be-about-link group inline-flex items-center gap-1.5 text-be-charcoal-950 font-semibold rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-be-cream"
        >
          <span>{organisationReferenceCtaLabel}</span>
          <ArrowRight
            className="h-4 w-4 shrink-0 text-be-yellow-600 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
            focusable="false"
          />
        </Link>
      </div>
    </SectionShell>
  );
}
