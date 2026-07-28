/**
 * Product metadata helper — generates route-specific metadata from the
 * central product registry.
 *
 * Uses the real product name, description and slug. BharatMembrane and
 * Bharat Hydro Seal use their own verified information and do not inherit
 * BIS insulating-mat claims.
 */

import type { Metadata } from 'next';
import { ProductData } from '@/data/products';
import { allowIndexing, buildUrl } from '@/lib/site-url';

/** SEO titles per product slug — specific and factual, not keyword-stuffed. */
const productTitles: Record<string, string> = {
  'electrical-insulating-mats':
    'Electrical Insulating Mats IS 15652:2006 | Bharat Electrosafe',
  'coloured-strip-insulating-mats':
    'Coloured Strip Insulating Mats | Bharat Electrosafe',
  'bi-color-insulating-mats':
    'Bi-Color Electrical Insulating Mats | Bharat Electrosafe',
  'auto-glow-reflective-band-insulating-mats':
    'Auto-Glow Insulating Mats | Bharat Electrosafe',
  'bharat-membrane':
    'PVC Geomembrane Manufacturer India | BharatMembrane',
  'bharat-hydro-seal':
    'PVC Water Stop for Construction Joints | Bharat Hydro Seal',
};

/** OG image paths per product slug — uses product-specific hero where available. */
const productOgImages: Record<string, string> = {
  'electrical-insulating-mats':
    '/media/products/electrical-insulating-mats/product-02.webp',
  'coloured-strip-insulating-mats':
    '/media/products/coloured-strip-insulating-mats/product-04.webp',
  'bi-color-insulating-mats':
    '/media/products/bi-color-insulating-mats/hero.webp',
  'auto-glow-reflective-band-insulating-mats':
    '/media/products/auto-glow-reflective-band-insulating-mats/product-06.webp',
  'bharat-membrane':
    '/media/products/bharat-membrane/product-logo.webp',
  'bharat-hydro-seal':
    '/media/products/bharat-hydro-seal/product-02.webp',
};

/**
 * Generate a full Metadata object for a product page from the central
 * product data. Returns not-found metadata for invalid slugs.
 */
export function generateProductMetadata(product: ProductData): Metadata {
  const slug = product.slug;
  const title = productTitles[slug] ?? product.name;
  const description = product.description;
  const canonicalUrl = buildUrl(`/products/${slug}`);
  const ogImage = productOgImages[slug] ?? '/brand/og-bharat-electrosafe.png';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${product.name} — ${description}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: allowIndexing
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
