'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { SectionShell } from '@/components/ui/SectionShell';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { productVisuals, type ProductVisualRole } from '@/data/product-visuals';
import { getProductBySlug } from '@/data/products';
import { ArrowRight, Trash2, Package } from 'lucide-react';

/* ────────────────────────────────────────────
   Display metadata for slugs without a ProductData entry
   ────────────────────────────────────────────
   The three standalone product pages (IEC 61111, PVC Flooring, Other
   Products) are not part of the `products` array in src/data/products.ts.
   We supply their display name + description here so the Recently Viewed
   cards can render them without inventing ProductData objects. */

interface ProductDisplayMeta {
  name: string;
  description: string;
}

const standaloneProductMeta: Record<string, ProductDisplayMeta> = {
  'international-iec-61111': {
    name: 'Insulating Mats to IEC 61111:2009',
    description:
      'IEC 61111:2009 insulating mats for live working up to 36 000 V — available in HV, Auto Glow and Bi-Colour variants across Classes 0 through 4.',
  },
  'pvc-flooring-solutions': {
    name: 'PVC Flooring Solutions',
    description:
      'Bharat Smart Floor PVC flooring for industrial, electrical and commercial applications — manufactured as per IS 3462:1986.',
  },
  'other-products': {
    name: 'Other Products',
    description:
      'Rubber sheets, hose pipes, ESD mats and conveyor belts for industrial rubber and safety applications.',
  },
};

function getDisplayMeta(slug: string): ProductDisplayMeta {
  const product = getProductBySlug(slug);
  if (product) {
    return { name: product.name, description: product.description };
  }
  return standaloneProductMeta[slug] ?? { name: slug, description: '' };
}

interface RecentlyViewedCard {
  slug: string;
  name: string;
  description: string;
  visual: ProductVisualRole;
}

/* ────────────────────────────────────────────
   Component
   ────────────────────────────────────────────
   Renders null until at least one product has been viewed, so the
   homepage layout never reserves empty space for this section. */

export default function RecentlyViewed() {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  const items: RecentlyViewedCard[] = useMemo(() => {
    return recentlyViewed
      .map((slug): RecentlyViewedCard | null => {
        const visuals = productVisuals[slug as keyof typeof productVisuals];
        if (!visuals) return null;
        const meta = getDisplayMeta(slug);
        return {
          slug,
          name: meta.name,
          description: meta.description,
          visual: visuals.card,
        };
      })
      .filter((item): item is RecentlyViewedCard => item !== null);
  }, [recentlyViewed]);

  // useSyncExternalStore returns [] during SSR and the first client render,
  // so this null return also matches the server-rendered HTML — no flash.
  if (items.length === 0) return null;

  return (
    <SectionShell
      variant="compact"
      bg="bg-be-cream"
      topRule
      ariaLabel="Recently viewed products"
    >
      <div className="reveal-up flex flex-col gap-6">
        {/* Header row with clear action */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <SectionHeader
            eyebrow="PICK UP WHERE YOU LEFT OFF"
            title="Recently Viewed"
            supportingText="Jump back to the product pages you have been browsing."
          />
          <button
            type="button"
            onClick={clearRecentlyViewed}
            className="inline-flex items-center gap-2 rounded-md border border-be-grey-250 bg-be-white px-3.5 py-2 text-metadata font-semibold text-be-charcoal-800 hover:border-be-yellow-300 hover:text-be-charcoal-950 hover:bg-be-yellow-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-400 focus-visible:ring-offset-2"
            aria-label="Clear recently viewed products"
          >
            <Trash2 className="size-4 text-be-grey-650" aria-hidden="true" />
            Clear
          </button>
        </div>

        {/* Cards grid — 1 col mobile, 2 col tablet, 4 col desktop */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/products/${item.slug}`}
                aria-label={`View ${item.name} product page`}
                className="hover-card-lift group relative flex h-full flex-col rounded-xl border border-be-grey-250 bg-be-white overflow-hidden shadow-sm hover:shadow-lg hover:border-be-yellow-300 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 focus-visible:ring-offset-2"
              >
                {/* Yellow accent line — grows on hover */}
                <div
                  className="h-[3px] bg-gradient-to-r from-be-yellow-500 via-be-brand-yellow to-be-yellow-500 group-hover:h-[5px] transition-all duration-300"
                  aria-hidden="true"
                />

                {/* Image area */}
                <div className="relative w-full overflow-hidden bg-be-cream aspect-[4/3]">
                  <Image
                    src={item.visual.src}
                    alt={item.visual.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div
                    className="absolute inset-0 bg-be-charcoal-950/0 group-hover:bg-be-charcoal-950/5 transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Text content */}
                <div className="flex flex-col gap-1.5 p-4 flex-1">
                  <h3 className="text-base font-semibold text-be-charcoal-950 group-hover:text-be-yellow-text-hover transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-be-grey-650 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-2 flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-be-yellow-text group-hover:text-be-yellow-text-hover transition-colors duration-200">
                      View
                    </span>
                    <span
                      className="inline-flex items-center justify-center size-5 rounded-full bg-be-yellow-50 group-hover:bg-be-yellow-100 transition-colors duration-200"
                      aria-hidden="true"
                    >
                      <ArrowRight className="size-3 text-be-yellow-text group-hover:text-be-yellow-text-hover transition-colors" />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* View all products link */}
        <div className="flex items-center justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-body font-semibold text-be-charcoal-800 hover:text-be-yellow-text-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-400 focus-visible:ring-offset-2"
          >
            <Package className="size-4 text-be-yellow-text" aria-hidden="true" />
            View All Products
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
