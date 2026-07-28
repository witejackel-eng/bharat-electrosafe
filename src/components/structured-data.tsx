/**
 * Structured data (JSON-LD) for Bharat Electrosafe products.
 *
 * Server component — no 'use client'.
 * Generates Product and WebSite schemas without fake prices, ratings,
 * reviews, SKUs or GTINs (B2B components, section 23 compliance).
 *
 * Uses the central site URL helper so that all URLs resolve against
 * the official production domain, not a Vercel preview URL.
 */

import { siteUrl } from '@/lib/site-url';
import { company } from '@/data/company';
import { products } from '@/data/products';

/** Product schema for each product family. */
function ProductSchema() {
  return (
    <>
      {products.map((product) => (
        <script
          key={product.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: product.name,
              description: product.description,
              url: `${siteUrl}/products/${product.slug}`,
              brand: {
                '@type': 'Brand',
                name: company.name,
              },
              manufacturer: {
                '@type': 'Organization',
                name: company.name,
                url: siteUrl,
              },
            }),
          }}
        />
      ))}
    </>
  );
}

/** WebSite schema (no search action — site has no search UI). */
function WebSiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: company.name,
          url: siteUrl,
          description: company.description,
        }),
      }}
    />
  );
}

export function StructuredData() {
  return (
    <>
      <WebSiteSchema />
      <ProductSchema />
    </>
  );
}
