'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { HorizontalCarousel } from '@/components/ui/HorizontalCarousel';
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
 *   A. Certifications & testing — horizontal carousel with arrow controls
 *      and touch/swipe support. Shows 6 primary trust marks.
 *
 *   B. Company reach statistics — three equal cards (11+ countries,
 *      1,000+ customers, 6 product families).
 *
 *   C. Industry References heading — eyebrow + heading + supporting copy.
 *
 *   D. Organisation logos — horizontal carousel with auto-advance.
 *
 *   E. About Us link.
 */
export default function TrustDocuments() {
  return (
    <SectionShell variant="compact" bg="bg-be-cream" yellowAccent className="reveal-up">
      {/* ───────────────────────────────────────────────────────
          A. Certifications, testing and registrations — carousel */}
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="CERTIFICATIONS & TESTING"
          title="Certifications, testing and registrations"
          supportingText="Verified by national standards bodies and third-party testing authorities."
        />
      </div>

      <div className="reveal-up mb-10 pb-6 border-b-[3px] border-be-yellow-500/30">
        <HorizontalCarousel label="Certifications and testing" autoAdvanceMs={4500}>
          {primaryTrustMarks.map((mark) => (
            <div
              key={mark.label}
              className="w-[200px] sm:w-[230px] md:w-[250px] lg:w-[270px] flex flex-col items-center gap-2 p-3.5 rounded-lg border border-be-grey-250 bg-be-white hover:border-be-yellow-400 transition-colors duration-300"
            >
              <span className="relative flex h-12 w-full items-center justify-center">
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
        </HorizontalCarousel>
      </div>

      {/* ───────────────────────────────────────────────────────
          B. Company reach statistics */}
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
          C. Industry References heading */}
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
          D. Organisation logos — horizontal carousel */}
      <div className="reveal-up mt-6 md:mt-8">
        <HorizontalCarousel label="Organisation references" autoAdvanceMs={4000}>
          {organisationReferences.map((org) => (
            <div
              key={org.name}
              className="w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] flex flex-col items-center gap-2.5 rounded-lg border border-be-grey-250 bg-be-white p-4 text-center hover:border-be-yellow-400 transition-colors duration-300"
            >
              <div className="relative h-12 w-full flex items-center justify-center">
                <Image
                  src={org.logo}
                  alt={`${org.name} logo`}
                  fill
                  className="object-contain"
                  sizes="140px"
                />
              </div>
              <span className="text-metadata font-semibold text-be-charcoal-950">
                {org.name}
              </span>
            </div>
          ))}
        </HorizontalCarousel>
      </div>

      {/* ───────────────────────────────────────────────────────
          E. About Us link */}
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
