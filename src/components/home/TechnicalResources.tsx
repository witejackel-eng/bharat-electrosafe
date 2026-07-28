'use client';

/**
 * TechnicalResources — centralised downloads & compliance library.
 *
 * Consolidates every verifiable document on the site (certifications, test
 * reports, licences, datasheets and standards information) into a single
 * filterable grid so B2B buyers can audit compliance without hunting through
 * individual product pages.
 *
 * Sources (single source of truth — never duplicated):
 *  - /data/trust.ts primaryTrustMarks + allTrustMarks (certifications)
 *  - /data/products.ts product.documents (test reports, datasheets, licences)
 *
 * Document-kind filters map directly to the existing DocumentKind union, so
 * the filter chips stay in sync with the data model forever.
 */

import { useMemo, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { DocumentCard } from '@/components/ui/DocumentCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { allTrustMarks, standards } from '@/data/trust';
import { products, type Document, type DocumentKind } from '@/data/products';
import { cn } from '@/lib/utils';
import {
  FileText,
  ShieldCheck,
  FlaskConical,
  Award,
  FileBarChart,
  BookOpen,
  Download,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ────────────────────────────────────────────
   Filter definition
   ──────────────────────────────────────────── */

type FilterKey = 'all' | DocumentKind;

interface FilterDef {
  key: FilterKey;
  label: string;
  icon: LucideIcon;
}

const FILTERS: FilterDef[] = [
  { key: 'all', label: 'All resources', icon: FileText },
  { key: 'test-report', label: 'Test reports', icon: FlaskConical },
  { key: 'certificate', label: 'Certificates', icon: Award },
  { key: 'licence', label: 'Licences', icon: ShieldCheck },
  { key: 'datasheet', label: 'Datasheets', icon: FileBarChart },
  { key: 'standards-information', label: 'Standards info', icon: BookOpen },
];

/* ────────────────────────────────────────────
   Aggregate documents from central sources
   ──────────────────────────────────────────── */

interface AggregateDoc extends Document {
  /** Source product slug if the document came from a product page. */
  productSlug?: string;
  productName?: string;
  /** Trust mark note if the document came from /data/trust.ts. */
  trustNote?: string;
}

function buildDocumentList(): AggregateDoc[] {
  const list: AggregateDoc[] = [];
  const seen = new Set<string>();

  // 1. Product documents FIRST — so the ERDA test report (which has the same
  //    href as the ERDA trust mark in /data/trust.ts) is captured with its
  //    correct kind='test-report' rather than being miscategorised as a
  //    certificate when trust marks are processed.
  for (const product of products) {
    for (const doc of product.documents) {
      const key = doc.href ?? `${product.slug}-${doc.name}`;
      if (seen.has(key)) continue;
      seen.add(key);
      list.push({
        ...doc,
        productSlug: product.slug,
        productName: product.name,
      });
    }
  }

  // 2. Trust marks with genuine PDF files — add any whose href isn't already
  //    captured above. Trust marks without a `document` field (BIS licence,
  //    ISI mark, NTH, MSME, AIRIA) are intentionally skipped: they are
  //    certification logos, not downloadable documents, and are already
  //    represented in the TrustDocuments section above.
  for (const mark of allTrustMarks) {
    if (!mark.document) continue;
    const key = mark.document;
    if (seen.has(key)) continue;
    seen.add(key);
    list.push({
      type: 'Certificate',
      name: mark.label,
      issuer: mark.note,
      available: true,
      href: mark.document,
      thumbnail: '/images/documents/doc-certificate.webp',
      kind: 'certificate',
      trustNote: mark.note,
    });
  }

  return list;
}

const ALL_DOCS = buildDocumentList();

/* ────────────────────────────────────────────
   Standards quick-reference band
   ──────────────────────────────────────────── */

const standardsRow = [
  { code: standards.isMat, scope: 'Insulating mats', note: 'Indian Standard' },
  { code: standards.iec, scope: 'Referenced mat range', note: 'International Standard' },
  { code: standards.isMembrane, scope: 'PVC geomembrane', note: 'Indian Standard' },
  { code: `BIS ${standards.bisLicence}`, scope: 'Insulating-mat licence', note: 'Bureau of Indian Standards' },
];

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

export default function TechnicalResources() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const gridRef = useRef<HTMLDivElement>(null);
  const staggerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return ALL_DOCS;
    return ALL_DOCS.filter((d) => d.kind === filter);
  }, [filter]);

  const counts = useMemo(() => {
    const map: Record<FilterKey, number> = {
      all: ALL_DOCS.length,
      'test-report': 0,
      certificate: 0,
      licence: 0,
      datasheet: 0,
      'standards-information': 0,
    };
    for (const d of ALL_DOCS) map[d.kind] += 1;
    return map;
  }, []);

  // Re-trigger stagger reveal whenever the filter changes so cards animate in.
  useEffect(() => {
    if (!staggerRef.current) return;
    staggerRef.current.classList.remove('revealed');
    const raf = requestAnimationFrame(() => {
      staggerRef.current?.classList.add('revealed');
    });
    return () => cancelAnimationFrame(raf);
  }, [filter]);

  // Move focus to the grid heading when filter changes (screen-reader cue).
  useEffect(() => {
    if (filter === 'all') return;
    gridRef.current?.querySelector('h3')?.focus();
  }, [filter]);

  return (
    <SectionShell
      variant="standard"
      bg="bg-be-cream"
      topRule
      id="technical-resources"
      ariaLabel="Technical resources and compliance documents"
    >
      {/* Header row — left-aligned header + right-aligned CTA on desktop */}
      <div className="reveal-up flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
        <SectionHeader
          eyebrow="TECHNICAL RESOURCES"
          title="Datasheets, certificates & test reports"
          supportingText="A single library for the compliance documents buyers and specifiers need to audit. Filter by document kind, or request a tailored document set for your project."
        />
        <div className="shrink-0">
          <PrimaryButton href="/contact-us?subject=Document%20Set%20Request">
            Request full document set
            <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" focusable="false" />
          </PrimaryButton>
        </div>
      </div>

      {/* Standards quick-reference band */}
      <div className="reveal-up mb-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {standardsRow.map((s) => (
          <div
            key={s.code}
            className="be-tile-lift rounded-lg border border-be-grey-250 bg-be-white p-4 flex flex-col gap-1"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-be-yellow-text" aria-hidden="true" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-be-grey-650">
                {s.note}
              </span>
            </div>
            <p className="text-base font-semibold text-be-charcoal-950 leading-tight">{s.code}</p>
            <p className="text-metadata text-be-grey-650">{s.scope}</p>
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div
        className="reveal-up mb-6 flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter documents by kind"
      >
        {FILTERS.map((f) => {
          const Icon = f.icon;
          const isActive = filter === f.key;
          const count = counts[f.key];
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={isActive}
              className={cn(
                'be-filter-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 focus-visible:ring-offset-2',
                isActive
                  ? 'bg-be-charcoal-950 text-be-white border border-be-charcoal-950 shadow-sm'
                  : 'bg-be-white text-be-charcoal-800 border border-be-grey-250 hover:border-be-yellow-400 hover:bg-be-yellow-50/50'
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span>{f.label}</span>
              <span
                className={cn(
                  'ml-1 inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[0.65rem] font-bold min-w-[1.25rem]',
                  isActive
                    ? 'bg-be-yellow-500 text-be-charcoal-950'
                    : 'bg-be-grey-100 text-be-grey-650'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Document grid */}
      <div ref={gridRef} className="focus:outline-none">
        <h3 className="sr-only" tabIndex={-1}>
          Showing {filtered.length} {filtered.length === 1 ? 'document' : 'documents'}
          {filter !== 'all' ? ` in ${FILTERS.find((f) => f.key === filter)?.label.toLowerCase()}` : ''}
        </h3>

        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-be-grey-250 bg-be-white p-10 text-center">
            <Download className="mx-auto h-8 w-8 text-be-grey-400 mb-3" aria-hidden="true" />
            <p className="text-body-large text-be-grey-650">
              No documents in this category yet.
            </p>
            <p className="text-metadata text-be-grey-650 mt-1">
              Use the button above to request a tailored document set.
            </p>
          </div>
        ) : (
          <div ref={staggerRef} className="stagger-reveal" data-stagger="true">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((doc) => (
                <DocumentCard
                  key={`${doc.productSlug ?? 'trust'}-${doc.name}`}
                  type={doc.type}
                  name={doc.name}
                  issuer={doc.issuer}
                  kind={doc.kind}
                  href={doc.href}
                  thumbnail={doc.thumbnail}
                  productName={doc.productName}
                  className="be-resource-tile"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer microcopy + trust line */}
      <div className="reveal-up mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-be-grey-250">
        <p className="text-metadata text-be-grey-650 max-w-xl">
          Documents are released against specific products, classes and thicknesses.
          Where a document is not yet published, request it via the contact form and the
          team will confirm what can be shared for your project.
        </p>
        <Link
          href="/products"
          className="be-underline-grow inline-flex items-center gap-2 text-sm font-semibold text-be-charcoal-800 hover:text-be-yellow-text-hover transition-colors"
        >
          Browse all products
          <ArrowRight className="h-4 w-4" aria-hidden="true" focusable="false" />
        </Link>
      </div>
    </SectionShell>
  );
}
