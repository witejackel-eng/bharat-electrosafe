'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Check, Minus, ArrowRight } from 'lucide-react';
import { useCompare } from './CompareContext';
import { getProductBySlug, imageFitClass } from '@/data/products';

/**
 * CompareModal — full-screen dialog showing a side-by-side detailed
 * comparison of the selected products (2–3).
 *
 * Rows compared:
 *   • Image (thumbnail)
 *   • Category
 *   • Class type
 *   • Primary use (description)
 *   • Quick facts (label/value pairs — merged across products)
 *   • Key benefits (first 3, with check/dash for presence)
 *   • Working voltage & proof voltage (from specifications row[0])
 *   • Applications (first 3)
 *   • Link to each product's detail page
 *
 * Accessibility:
 *   • role="dialog" aria-modal="true"
 *   • Focus trap: focus moves into the dialog on open, restored on close
 *   • Escape closes
 *   • Body scroll lock while open
 *   • Close button has aria-label
 *
 * Responsive:
 *   • Desktop: 2–3 column table with sticky first column
 *   • Mobile: horizontal scroll with min-width columns
 */
export function CompareModal({
  open,
  onClose,
  selectedNames,
}: {
  open: boolean;
  onClose: () => void;
  selectedNames: Record<string, string>;
}) {
  const { selected } = useCompare();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Focus trap + body scroll lock + escape
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    // Focus the close button after a tick so the dialog is painted
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 30);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'Tab' && dialogRef.current) {
        // Simple focus trap: keep tab within dialog
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey, true);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey, true);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const selectedProducts = selected
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (selectedProducts.length === 0) return null;

  // Build the union of all quick-fact labels so we can render a consistent
  // row set even if products have different facts.
  const allFactLabels = Array.from(
    new Set(selectedProducts.flatMap((p) => p.quickFacts.map((f) => f.label))),
  );
  // Union of benefit texts (for presence check)
  const allBenefitTexts = Array.from(
    new Set(
      selectedProducts.flatMap((p) => p.keyBenefits.map((b) => b.text)),
    ),
  ).slice(0, 6); // cap at 6 to keep the modal scannable

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch justify-center bg-be-charcoal-950/60 backdrop-blur-sm animate-[fade-in_0.15s_ease-out] motion-reduce:animate-none"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Comparing ${selectedProducts.length} products`}
        className="relative w-full max-w-6xl m-2 sm:m-4 md:m-6 bg-be-warm-white rounded-xl shadow-2xl flex flex-col overflow-hidden animate-[slide-in-right_0.2s_ease-out] motion-reduce:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-be-grey-250 bg-be-white">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-be-charcoal-950">
              Product comparison
            </h2>
            <p className="text-metadata text-be-grey-650">
              {selectedProducts.length} of 3 products · side-by-side detail
            </p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close comparison"
            className="grid size-10 place-items-center rounded-full text-be-grey-650 hover:bg-be-grey-100 hover:text-be-charcoal-950 transition-colors focus-ring"
          >
            <X className="size-5" aria-hidden="true" focusable="false" />
          </button>
        </div>

        {/* Body — scrollable comparison table */}
        <div className="flex-1 overflow-auto">
          <div
            className="min-w-[640px]"
            style={{ ['--cols' as string]: String(selectedProducts.length) }}
          >
            {/* Row: product image + name */}
            <CompareRow label="Product">
              {selectedProducts.map((p) => (
                <CompareCell key={`img-${p.slug}`}>
                  <div className="flex flex-col gap-2">
                    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-be-cream">
                      <Image
                        src={p.images.gallery[0]?.src ?? p.images.thumbnail.src}
                        alt={p.images.gallery[0]?.alt ?? p.images.thumbnail.alt}
                        fill
                        className={imageFitClass(p.images.gallery[0] ?? p.images.thumbnail)}
                        sizes="300px"
                      />
                    </div>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={onClose}
                      className="text-sm font-bold text-be-charcoal-950 hover:text-be-yellow-text-hover transition-colors underline-offset-2 hover:underline focus-ring rounded-sm"
                    >
                      {p.name}
                    </Link>
                  </div>
                </CompareCell>
              ))}
            </CompareRow>

            {/* Row: category */}
            <CompareRow label="Category">
              {selectedProducts.map((p) => (
                <CompareCell key={`cat-${p.slug}`}>
                  <span className="inline-block px-2 py-0.5 rounded-md bg-be-yellow-50 text-be-charcoal-950 text-xs font-semibold">
                    {p.category === 'electrical-insulation'
                      ? 'Electrical Insulating Mats'
                      : 'Waterproofing Solutions'}
                  </span>
                </CompareCell>
              ))}
            </CompareRow>

            {/* Row: class type */}
            <CompareRow label="Class">
              {selectedProducts.map((p) => (
                <CompareCell key={`cls-${p.slug}`}>
                  <span className="text-sm font-semibold text-be-charcoal-950">
                    {p.classType ? p.classType.toUpperCase() : '—'}
                  </span>
                </CompareCell>
              ))}
            </CompareRow>

            {/* Row: description */}
            <CompareRow label="Primary use">
              {selectedProducts.map((p) => (
                <CompareCell key={`desc-${p.slug}`}>
                  <p className="text-sm text-be-charcoal-800 leading-relaxed">
                    {p.description}
                  </p>
                </CompareCell>
              ))}
            </CompareRow>

            {/* Section divider */}
            <CompareSectionLabel label="Quick facts" />

            {/* Rows: quick facts (union of labels) */}
            {allFactLabels.map((label) => (
              <CompareRow key={`fact-${label}`} label={label}>
                {selectedProducts.map((p) => {
                  const fact = p.quickFacts.find((f) => f.label === label);
                  return (
                    <CompareCell key={`fact-${p.slug}-${label}`}>
                      {fact ? (
                        <span className="text-sm text-be-charcoal-800">{fact.value}</span>
                      ) : (
                        <Dash />
                      )}
                    </CompareCell>
                  );
                })}
              </CompareRow>
            ))}

            {/* Section divider */}
            <CompareSectionLabel label="Key benefits" />

            {/* Rows: benefits presence */}
            {allBenefitTexts.map((text) => (
              <CompareRow key={`ben-${text}`} label={text}>
                {selectedProducts.map((p) => {
                  const has = p.keyBenefits.some((b) => b.text === text);
                  return (
                    <CompareCell key={`ben-${p.slug}-${text}`}>
                      {has ? (
                        <span className="inline-flex items-center gap-1 text-sm text-be-charcoal-800">
                          <Check className="size-4 text-be-yellow-text" aria-hidden="true" focusable="false" />
                          <span className="sr-only">Yes</span>
                        </span>
                      ) : (
                        <Dash />
                      )}
                    </CompareCell>
                  );
                })}
              </CompareRow>
            ))}

            {/* Section divider */}
            <CompareSectionLabel label="Electrical rating" />

            {/* Row: working voltage + proof voltage (from spec row[0]) */}
            <CompareRow label="Working voltage">
              {selectedProducts.map((p) => {
                const headers = p.specifications.headers;
                const rows = p.specifications.rows;
                const idx = headers.findIndex((h) =>
                  h.toLowerCase().includes('working voltage'),
                );
                const val = idx >= 0 ? rows[0]?.[idx] : undefined;
                return (
                  <CompareCell key={`wv-${p.slug}`}>
                    <span className="text-sm font-semibold text-be-charcoal-950 tabular-nums">
                      {val ?? '—'}
                    </span>
                  </CompareCell>
                );
              })}
            </CompareRow>

            <CompareRow label="AC proof voltage">
              {selectedProducts.map((p) => {
                const headers = p.specifications.headers;
                const rows = p.specifications.rows;
                const idx = headers.findIndex((h) =>
                  h.toLowerCase().includes('proof voltage'),
                );
                const val = idx >= 0 ? rows[0]?.[idx] : undefined;
                return (
                  <CompareCell key={`pv-${p.slug}`}>
                    <span className="text-sm font-semibold text-be-charcoal-950 tabular-nums">
                      {val ?? '—'}
                    </span>
                  </CompareCell>
                );
              })}
            </CompareRow>

            {/* Row: CTA */}
            <CompareRow label="">
              {selectedProducts.map((p) => (
                <CompareCell key={`cta-${p.slug}`}>
                  <Link
                    href={`/products/${p.slug}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 rounded-md bg-be-charcoal-950 px-4 py-2 text-sm font-semibold text-be-white hover:bg-be-charcoal-800 transition-colors focus-ring"
                  >
                    View product
                    <ArrowRight className="size-4" aria-hidden="true" focusable="false" />
                  </Link>
                </CompareCell>
              ))}
            </CompareRow>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-be-grey-250 bg-be-white flex items-center justify-between gap-3">
          <p className="text-metadata text-be-grey-550">
            Final selection should be confirmed with the technical team.
          </p>
          <Link
            href="/contact-us?type=technical-guidance"
            onClick={onClose}
            className="text-sm font-semibold text-be-charcoal-950 hover:text-be-yellow-text-hover transition-colors focus-ring rounded-sm"
          >
            Ask our team →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function CompareRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid border-b border-be-grey-150" style={{ gridTemplateColumns: '180px repeat(var(--cols), minmax(200px, 1fr))' }}>
      <div className="px-3 sm:px-4 py-3 bg-be-cream/60 text-metadata font-semibold text-be-grey-650 uppercase tracking-wide sticky left-0 z-10">
        {label}
      </div>
      {children}
    </div>
  );
}

function CompareCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 sm:px-4 py-3 border-l border-be-grey-150">
      {children}
    </div>
  );
}

function CompareSectionLabel({ label }: { label: string }) {
  return (
    <div
      className="grid bg-be-yellow-50/60 border-b border-be-yellow-500/30"
      style={{ gridTemplateColumns: '180px repeat(var(--cols), minmax(200px, 1fr))' }}
    >
      <div className="px-3 sm:px-4 py-2 text-xs font-bold text-be-charcoal-950 uppercase tracking-widest sticky left-0 z-10">
        {label}
      </div>
      <div className="border-l border-be-yellow-500/30" />
    </div>
  );
}

function Dash() {
  return (
    <span className="inline-flex items-center text-be-grey-350" aria-label="Not applicable">
      <Minus className="size-4" aria-hidden="true" focusable="false" />
      <span className="sr-only">Not applicable</span>
    </span>
  );
}
