'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, Minus, ArrowRight, Trash2, GitCompare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useCompare } from './CompareContext';
import { getProductBySlug, imageFitClass, type ProductData } from '@/data/products';

/**
 * CompareModal — a wide dialog (built on the shared shadcn/ui Dialog, which
 * wraps Radix UI) showing a side-by-side detailed comparison of the selected
 * products (2–3).
 *
 * Rows compared (task spec):
 *   • Product image (thumbnail) + Name (with a "View product" link)
 *   • Description
 *   • Standards (product.badges)
 *   • Material (first "Material Composition" material property, else first)
 *   • Thickness (quickFacts "Thickness" or spec table "Thickness" column)
 *   • Applications (first 3 application names)
 *   • Key features (first 3 key benefit texts, with check marks)
 *   • Working voltage + AC proof voltage (from the spec table)
 *   • A per-column footer with a "View product" link and a "Remove" button.
 *
 * Differences between products are highlighted: in any row where not all
 * rendered values are equal, the differing cells get a subtle yellow tint so
 * the buyer can scan for what sets each product apart.
 *
 * Accessibility:
 *   • Built on Radix Dialog — focus trap, Escape to close, body scroll lock,
 *     and aria-modal are handled by the primitive.
 *   • DialogTitle + DialogDescription (visually hidden) for screen readers.
 *   • Each remove button has an aria-label naming the product.
 *
 * Responsive:
 *   • Desktop: 2–3 column grid with a sticky first column.
 *   • Mobile: horizontal scroll with min-width columns.
 */
export function CompareModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { selected, removeFromCompare } = useCompare();

  const selectedProducts: ProductData[] = selected
    .map((s) => getProductBySlug(s))
    .filter((p): p is ProductData => Boolean(p));

  const cols = Math.max(selectedProducts.length, 1);
  const gridStyle = {
    gridTemplateColumns: `168px repeat(${cols}, minmax(200px, 1fr))`,
  } as React.CSSProperties;

  // Fewer than 2 products: render an "add more" prompt instead of the table.
  const showAddMorePrompt = selectedProducts.length < 2;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="sm:max-w-6xl max-h-[92vh] p-0 gap-0 overflow-hidden flex flex-col"
        aria-describedby="compare-modal-desc"
      >
        {/* Visually-hidden accessible title/description for Radix. */}
        <DialogTitle className="sr-only">Product comparison</DialogTitle>
        <DialogDescription id="compare-modal-desc" className="sr-only">
          Side-by-side comparison of {selectedProducts.length} of 3 selected
          products. Close with the Escape key or the close button.
        </DialogDescription>

        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 sm:px-6 py-4 border-b border-be-grey-250 bg-be-white">
          <span className="grid size-8 place-items-center rounded-md bg-be-navy-900 text-be-brand-yellow">
            <GitCompare className="size-4" aria-hidden="true" focusable="false" />
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-be-charcoal-950">
              Product comparison
            </h2>
            <p className="text-metadata text-be-grey-650">
              {selectedProducts.length} of 3 products · side-by-side detail
            </p>
          </div>
        </div>

        {/* Body — scrollable comparison table OR "add more" prompt */}
        <div className="flex-1 overflow-auto">
          {showAddMorePrompt ? (
            <AddMorePrompt count={selectedProducts.length} />
          ) : (
            <div className="min-w-[640px]">
              {/* Row: product image + name */}
              <CompareRow label="Product" gridStyle={gridStyle}>
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
                        onClick={() => onOpenChange(false)}
                        className="text-sm font-bold text-be-charcoal-950 hover:text-be-yellow-text-hover transition-colors underline-offset-2 hover:underline focus-ring rounded-sm"
                      >
                        {p.name}
                      </Link>
                    </div>
                  </CompareCell>
                ))}
              </CompareRow>

              {/* Row: category */}
              <CompareRow label="Category" gridStyle={gridStyle}>
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
              <CompareRow label="Class" gridStyle={gridStyle}>
                {selectedProducts.map((p) => (
                  <CompareCell key={`cls-${p.slug}`}>
                    <span className="text-sm font-semibold text-be-charcoal-950">
                      {p.classType ? p.classType.toUpperCase() : '—'}
                    </span>
                  </CompareCell>
                ))}
              </CompareRow>

              {/* Row: description */}
              <CompareRow
                label="Description"
                gridStyle={gridStyle}
                differ={valuesDiffer(selectedProducts, (p) => p.description)}
              >
                {selectedProducts.map((p) => (
                  <CompareCell key={`desc-${p.slug}`}>
                    <p className="text-sm text-be-charcoal-800 leading-relaxed">
                      {p.description}
                    </p>
                  </CompareCell>
                ))}
              </CompareRow>

              {/* Section divider */}
              <CompareSectionLabel label="Specifications" gridStyle={gridStyle} cols={cols} />

              {/* Row: standards (badges) */}
              <CompareRow
                label="Standards"
                gridStyle={gridStyle}
                differ={valuesDiffer(selectedProducts, (p) => p.badges.join('|'))}
              >
                {selectedProducts.map((p) => (
                  <CompareCell key={`std-${p.slug}`}>
                    <ul className="flex flex-wrap gap-1">
                      {p.badges.map((b) => (
                        <li
                          key={b}
                          className="inline-block px-2 py-0.5 rounded bg-be-grey-100 text-be-charcoal-800 text-[0.7rem] font-medium"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </CompareCell>
                ))}
              </CompareRow>

              {/* Row: material */}
              <CompareRow
                label="Material"
                gridStyle={gridStyle}
                differ={valuesDiffer(selectedProducts, (p) => materialOf(p) ?? '')}
              >
                {selectedProducts.map((p) => {
                  const material = materialOf(p);
                  return (
                    <CompareCell key={`mat-${p.slug}`}>
                      <span className="text-sm text-be-charcoal-800">
                        {material ?? '—'}
                      </span>
                    </CompareCell>
                  );
                })}
              </CompareRow>

              {/* Row: thickness */}
              <CompareRow
                label="Thickness"
                gridStyle={gridStyle}
                differ={valuesDiffer(selectedProducts, (p) => thicknessOf(p) ?? '')}
              >
                {selectedProducts.map((p) => {
                  const thickness = thicknessOf(p);
                  return (
                    <CompareCell key={`thk-${p.slug}`}>
                      <span className="text-sm font-semibold text-be-charcoal-950 tabular-nums">
                        {thickness ?? '—'}
                      </span>
                    </CompareCell>
                  );
                })}
              </CompareRow>

              {/* Section divider */}
              <CompareSectionLabel label="Performance" gridStyle={gridStyle} cols={cols} />

              {/* Row: working voltage */}
              <CompareRow
                label="Working voltage"
                gridStyle={gridStyle}
                differ={valuesDiffer(selectedProducts, (p) => specValue(p, 'working voltage') ?? '')}
              >
                {selectedProducts.map((p) => {
                  const val = specValue(p, 'working voltage');
                  return (
                    <CompareCell key={`wv-${p.slug}`}>
                      <span className="text-sm font-semibold text-be-charcoal-950 tabular-nums">
                        {val ?? '—'}
                      </span>
                    </CompareCell>
                  );
                })}
              </CompareRow>

              {/* Row: AC proof voltage */}
              <CompareRow
                label="AC proof voltage"
                gridStyle={gridStyle}
                differ={valuesDiffer(selectedProducts, (p) => specValue(p, 'proof voltage') ?? '')}
              >
                {selectedProducts.map((p) => {
                  const val = specValue(p, 'proof voltage');
                  return (
                    <CompareCell key={`pv-${p.slug}`}>
                      <span className="text-sm font-semibold text-be-charcoal-950 tabular-nums">
                        {val ?? '—'}
                      </span>
                    </CompareCell>
                  );
                })}
              </CompareRow>

              {/* Section divider */}
              <CompareSectionLabel label="Applications & features" gridStyle={gridStyle} cols={cols} />

              {/* Row: applications (first 3) */}
              <CompareRow
                label="Applications"
                gridStyle={gridStyle}
                differ={valuesDiffer(selectedProducts, (p) => p.applications.slice(0, 3).map((a) => a.name).join('|'))}
              >
                {selectedProducts.map((p) => (
                  <CompareCell key={`app-${p.slug}`}>
                    <ul className="flex flex-col gap-1">
                      {p.applications.slice(0, 3).map((a) => (
                        <li
                          key={a.name}
                          className="text-sm text-be-charcoal-800 leading-snug"
                        >
                          {a.name}
                        </li>
                      ))}
                      {p.applications.length === 0 && <Dash />}
                    </ul>
                  </CompareCell>
                ))}
              </CompareRow>

              {/* Row: key features (first 3) */}
              <CompareRow
                label="Key features"
                gridStyle={gridStyle}
                differ={valuesDiffer(selectedProducts, (p) => p.keyBenefits.slice(0, 3).map((b) => b.text).join('|'))}
              >
                {selectedProducts.map((p) => (
                  <CompareCell key={`kf-${p.slug}`}>
                    <ul className="flex flex-col gap-1.5">
                      {p.keyBenefits.slice(0, 3).map((b, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-1.5 text-sm text-be-charcoal-800 leading-snug"
                        >
                          <Check
                            className="size-3.5 mt-0.5 shrink-0 text-be-yellow-text"
                            aria-hidden="true"
                            focusable="false"
                          />
                          <span>{b.text}</span>
                        </li>
                      ))}
                    </ul>
                  </CompareCell>
                ))}
              </CompareRow>

              {/* Row: per-column actions — View product + Remove */}
              <CompareRow label="" gridStyle={gridStyle}>
                {selectedProducts.map((p) => (
                  <CompareCell key={`act-${p.slug}`}>
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/products/${p.slug}`}
                        onClick={() => onOpenChange(false)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-md bg-be-charcoal-950 px-3 py-2 text-sm font-semibold text-be-white hover:bg-be-charcoal-800 transition-colors focus-ring"
                      >
                        View product
                        <ArrowRight className="size-4" aria-hidden="true" focusable="false" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCompare(p.slug)}
                        aria-label={`Remove ${p.name} from comparison`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-md border border-be-grey-250 px-3 py-2 text-sm font-medium text-be-grey-650 hover:text-be-charcoal-950 hover:border-be-grey-350 transition-colors focus-ring"
                      >
                        <Trash2 className="size-4" aria-hidden="true" focusable="false" />
                        Remove
                      </button>
                    </div>
                  </CompareCell>
                ))}
              </CompareRow>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-be-grey-250 bg-be-white flex items-center justify-between gap-3">
          <p className="text-metadata text-be-grey-550">
            Final selection should be confirmed with the technical team.
          </p>
          <Link
            href="/contact-us?type=technical-guidance"
            onClick={() => onOpenChange(false)}
            className="text-sm font-semibold text-be-charcoal-950 hover:text-be-yellow-text-hover transition-colors focus-ring rounded-sm"
          >
            Ask our team →
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Data helpers ── */

/** Pull a value out of a product's specification table by header substring. */
function specValue(product: ProductData, headerMatch: string): string | undefined {
  const { headers, rows } = product.specifications;
  const idx = headers.findIndex((h) => h.toLowerCase().includes(headerMatch));
  if (idx < 0) return undefined;
  // Collect all non-empty values across rows (most specs have 3 class rows).
  const values = rows.map((r) => r[idx]).filter(Boolean);
  if (values.length === 0) return undefined;
  return values.length === 1 ? values[0] : values.join(' / ');
}

/** First "Material Composition" property, else the first material property. */
function materialOf(product: ProductData): string | undefined {
  const m =
    product.materialProperties.find((mp) =>
      mp.label.toLowerCase().includes('material'),
    ) ?? product.materialProperties[0];
  return m?.value;
}

/** Thickness from quickFacts, falling back to the spec table. */
function thicknessOf(product: ProductData): string | undefined {
  const fact = product.quickFacts.find((f) =>
    f.label.toLowerCase().includes('thickness'),
  );
  if (fact) return fact.value;
  return specValue(product, 'thickness');
}

/**
 * Returns true if the projected values for each product are NOT all equal.
 * Used to decide whether to highlight a row's cells as "differing".
 */
function valuesDiffer(products: ProductData[], project: (p: ProductData) => string): boolean {
  if (products.length < 2) return false;
  const first = project(products[0]);
  return products.some((p) => project(p) !== first);
}

/* ── Sub-components ── */

function CompareRow({
  label,
  children,
  gridStyle,
  differ = false,
}: {
  label: string;
  children: React.ReactNode;
  gridStyle: React.CSSProperties;
  differ?: boolean;
}) {
  // When `differ` is true we tint the row's label cell so a buyer scanning
  // the table can immediately spot the rows where products diverge.
  return (
    <div className="grid border-b border-be-grey-150" style={gridStyle}>
      <div
        className={[
          'px-3 sm:px-4 py-3 text-metadata font-semibold text-be-grey-650 uppercase tracking-wide sticky left-0 z-10',
          differ ? 'bg-be-yellow-50/70 text-be-charcoal-950' : 'bg-be-cream/60',
        ].join(' ')}
      >
        {label}
        {differ && (
          <span
            className="ml-1.5 inline-block size-1.5 rounded-full bg-be-yellow-500 align-middle"
            aria-hidden="true"
          />
        )}
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

function CompareSectionLabel({
  label,
  gridStyle,
  cols,
}: {
  label: string;
  gridStyle: React.CSSProperties;
  cols: number;
}) {
  return (
    <div
      className="grid bg-be-yellow-50/60 border-b border-be-yellow-500/30"
      style={gridStyle}
    >
      <div className="px-3 sm:px-4 py-2 text-xs font-bold text-be-charcoal-950 uppercase tracking-widest sticky left-0 z-10">
        {label}
      </div>
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="border-l border-be-yellow-500/30" />
      ))}
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

function AddMorePrompt({ count }: { count: number }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-12 sm:py-16 gap-4 min-h-[280px]">
      <span className="grid size-14 place-items-center rounded-full bg-be-yellow-50 text-be-yellow-text">
        <GitCompare className="size-7" aria-hidden="true" focusable="false" />
      </span>
      <div className="max-w-md">
        <h3 className="text-lg font-bold text-be-charcoal-950 mb-1">
          Add {count === 0 ? 'products' : 'one more product'} to compare
        </h3>
        <p className="text-sm text-be-grey-650 leading-relaxed">
          {count === 0
            ? 'Select products from the range using the “Compare” button on any product card to see a side-by-side comparison here.'
            : 'You need at least two products to make a comparison. Add another product from the range to continue.'}
        </p>
      </div>
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 rounded-md bg-be-charcoal-950 px-4 py-2 text-sm font-semibold text-be-white hover:bg-be-charcoal-800 transition-colors focus-ring"
      >
        Browse products
        <ArrowRight className="size-4" aria-hidden="true" focusable="false" />
      </Link>
    </div>
  );
}
