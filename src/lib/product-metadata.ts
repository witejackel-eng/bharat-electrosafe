/**
 * Product metadata helper — generates route-specific metadata from the
 * central product registry.
 *
 * Uses the real product name, description and slug. BharatMembrane and
 * Bharat Hydro Seal use their own verified information and do not inherit
 * BIS insulating-mat claims.
 *
 * Title convention:
 *   - The normal Metadata.title does NOT include the "| Bharat Electrosafe"
 *     suffix because the root layout template (`%s | Bharat Electrosafe`)
 *     appends it automatically. Otherwise we would get
 *     "Electrical Insulating Mats IS 15652:2006 | Bharat Electrosafe | Bharat Electrosafe".
 *   - Open Graph and Twitter receive the final full branded title
 *     (`socialTitle`), because social platforms read the absolute title
 *     and do not apply the root template.
 *   - Product brands such as "BharatMembrane" and "Bharat Hydro Seal" may
 *     remain in product-specific titles because those are product names,
 *     not accidental repetition of the website suffix.
 */

import type { Metadata } from 'next';
import { ProductData } from '@/data/products';
import { allowIndexing, buildUrl } from '@/lib/site-url';

/**
 * SEO titles per product slug — specific and factual, not keyword-stuffed.
 * `pageTitle` is the value passed to Metadata.title (the root template will
 * append " | Bharat Electrosafe"). `socialTitle` is the final full branded
 * title used by Open Graph and Twitter.
 */
interface ProductTitleSet {
  pageTitle: string;
  socialTitle: string;
}

const productTitles: Record<string, ProductTitleSet> = {
  'electrical-insulating-mats': {
    pageTitle: 'Electrical Insulating Mats to IS 15652:2006',
    socialTitle: 'Electrical Insulating Mats to IS 15652:2006 | Bharat Electrosafe',
  },
  'coloured-strip-insulating-mats': {
    pageTitle: 'Coloured Strip Insulating Mats',
    socialTitle: 'Coloured Strip Insulating Mats | Bharat Electrosafe',
  },
  'bi-color-insulating-mats': {
    pageTitle: 'Bi-Color Electrical Insulating Mats',
    socialTitle: 'Bi-Color Electrical Insulating Mats | Bharat Electrosafe',
  },
  'auto-glow-reflective-band-insulating-mats': {
    pageTitle: 'Auto-Glow Insulating Mats',
    socialTitle: 'Auto-Glow Insulating Mats | Bharat Electrosafe',
  },
  /* BharatMembrane is a product brand name — keeping it in the title is
     intentional, not accidental site-name repetition. */
  'bharat-membrane': {
    pageTitle: 'PVC Geomembrane Manufacturer India | BharatMembrane',
    socialTitle: 'PVC Geomembrane Manufacturer India | BharatMembrane',
  },
  /* Bharat Hydro Seal is a product brand name — keeping it in the title is
     intentional, not accidental site-name repetition. */
  'bharat-hydro-seal': {
    pageTitle: 'PVC Water Stop for Construction Joints | Bharat Hydro Seal',
    socialTitle: 'PVC Water Stop for Construction Joints | Bharat Hydro Seal',
  },
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
  const titleSet = productTitles[slug] ?? {
    pageTitle: product.name,
    socialTitle: `${product.name} | Bharat Electrosafe`,
  };
  const description = product.description;
  const canonicalUrl = buildUrl(`/products/${slug}`);
  const ogImage = productOgImages[slug] ?? '/brand/og-bharat-electrosafe.png';

  return {
    title: titleSet.pageTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: titleSet.socialTitle,
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
      title: titleSet.socialTitle,
      description,
      images: [ogImage],
    },
    robots: allowIndexing
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
