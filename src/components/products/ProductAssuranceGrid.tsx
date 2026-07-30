'use client';

import {
  Award,
  BadgeCheck,
  FlaskConical,
  Layers,
  Hammer,
  Shapes,
  GitMerge,
  FileText,
  Truck,
  Headphones,
  ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { AssuranceId, ProductData } from '@/data/products';
import { getProductAssuranceItems } from '@/data/products';

/**
 * ProductAssuranceGrid — the single shared assurance strip rendered beneath
 * every product hero.
 *
 * ### Why this component exists
 *
 * The previous implementation had two competing trust strips:
 *   1. An inline `<ul>` inside `ProductHero` that concatenated
 *      `product.trustPoints` with a hard-coded `staticTrustIndicators`
 *      array — both rendered uppercased — which is how BharatMembrane ended
 *      up displaying both "Technical documentation available" and
 *      "Technical documentation available on request" at the same time.
 *   2. An orphaned `ProductTrustIndicators` component that did the same
 *      thing a different way and was never actually imported.
 *
 * This component replaces both. It pulls items exclusively through
 * `getProductAssuranceItems()`, which merges product-specific items with
 * shared defaults and deduplicates by stable semantic ID — so no product
 * can ever render two items in the same category, and the documentation
 * item can never appear twice.
 *
 * ### Layout
 *
 * Desktop: 3-column grid inside `container-site`, compact pale-cream band
 *          with thin top/bottom borders, ~24–30px vertical padding.
 * Tablet:  2-column grid (collapses long-label rows gracefully).
 * Mobile:  1-column list with icon + label aligned horizontally.
 */
const assuranceIconMap: Record<AssuranceId, LucideIcon> = {
  standard: Award,
  'bis-licence': BadgeCheck,
  testing: FlaskConical,
  material: Layers,
  construction: Hammer,
  profile: Shapes,
  joining: GitMerge,
  documentation: FileText,
  delivery: Truck,
  'technical-support': Headphones,
};

interface ProductAssuranceGridProps {
  product: ProductData;
}

export function ProductAssuranceGrid({ product }: ProductAssuranceGridProps) {
  const items = getProductAssuranceItems(product);

  return (
    <section
      aria-labelledby="product-assurance-heading"
      className="be-assurance-strip border-y border-be-yellow-100 bg-be-yellow-50"
    >
      <div className="container-site page-horizontal-padding py-6 md:py-7">
        <h2 id="product-assurance-heading" className="sr-only">
          Product assurance
        </h2>
        <ul className="be-assurance-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          {items.map((item) => {
            const Icon = assuranceIconMap[item.id] ?? ShieldCheck;
            return (
              <li
                key={item.id}
                className="be-assurance-item flex items-center gap-3"
                data-assurance-id={item.id}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-be-white border border-be-yellow-100"
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4 text-be-yellow-text" />
                </span>
                <span className="text-[14px] leading-snug font-medium text-be-charcoal-950">
                  {item.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
