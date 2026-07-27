/**
 * JSON-LD structured data for Bharat Electrosafe.
 *
 * Renders one `<script type="application/ld+json">` tag per product family as
 * a schema.org `Product`, plus a single `WebSite` entry. The component is a
 * server component (no `'use client'`) so the JSON-LD is rendered into the
 * initial HTML for crawlers.
 *
 * Critical compliance (section 23 of the corrective engineering master prompt):
 *  - NO prices, offers, availability, ratings, reviews, SKUs or GTINs are
 *    emitted for these products (B2B engineering components with no public
 *    list price).
 *  - No invented technical values: schema mirrors the visible copy in
 *    `src/data/products.ts` exactly.
 */

import { company } from '@/data/company';
import { products, type ProductFamily } from '@/data/products';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface ProductSchema {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  brand: {
    '@type': 'Brand';
    name: string;
  };
  manufacturer: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  category: string;
  url: string;
}

interface WebsiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  publisher: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/**
 * Build the visible, on-page description for the schema. This MUST match the
 * summary the user reads on the page, so we use the same source literal.
 *
 * For the engineered-membrane products we explicitly mention the standard and
 * product family in the description to satisfy section 23 ("visible copy and
 * schema must match") of the master prompt.
 */
function buildProductDescription(product: ProductFamily): string {
  const stdPhrase = `Compliant with ${product.standard}.`;

  // BharatMembrane — explicitly mention "PVC Geo-Membrane" and "IS 15909:2020".
  if (product.slug === 'bharat-membrane') {
    return (
      `${product.summary} ${stdPhrase} ` +
      `PVC Geo-Membrane manufactured to IS 15909:2020 for tunnel waterproofing, ` +
      `containment lining and barrier protection.`
    );
  }

  // BharatHydro Seal — explicitly mention "Water Stop Solutions" and "IS 15058-2002".
  if (product.slug === 'bharat-hydro-seal') {
    return (
      `${product.summary} ${stdPhrase} ` +
      `Water Stop Solutions manufactured to IS 15058-2002 for construction and ` +
      `expansion joint sealing.`
    );
  }

  return `${product.summary} ${stdPhrase}`;
}

function buildProductSchema(product: ProductFamily): ProductSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: buildProductDescription(product),
    brand: {
      '@type': 'Brand',
      name: company.name,
    },
    manufacturer: {
      '@type': 'Organization',
      name: company.name,
      url: company.siteUrl,
    },
    category: product.category,
    url: `${company.siteUrl}/#${product.slug}`,
  };
}

function buildWebsiteSchema(): WebsiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: company.name,
    url: company.siteUrl,
    publisher: {
      '@type': 'Organization',
      name: company.name,
      url: company.siteUrl,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

/**
 * Renders all JSON-LD structured data for the page:
 *  - one `Product` entry per product family (6 total)
 *  - one `WebSite` entry (no search action — the site has no search UI).
 *
 * Rendered as a single `<div>` containing one `<script>` tag per schema,
 * which keeps the React tree shallow and easy to inspect in view-source.
 *
 * NOTE: deliberately NOT marked `'use client'` — must be server-rendered so
 * the JSON-LD reaches crawlers without executing JS.
 */
export function ProductStructuredData() {
  const schemas: Array<ProductSchema | WebsiteSchema> = [
    ...products.map(buildProductSchema),
    buildWebsiteSchema(),
  ];

  return (
    <div aria-hidden="true" className="sr-only">
      {schemas.map((schema, index) => (
        <script
          // The type+slug combination is stable per render order.
          key={`${schema['@type']}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </div>
  );
}

export default ProductStructuredData;
