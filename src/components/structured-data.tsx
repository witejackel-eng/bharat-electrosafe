/**
 * Structured data (JSON-LD) for Bharat Electrosafe.
 *
 * Server component — no 'use client'.
 * Uses the centralised structured-data utility (src/lib/structured-data.ts)
 * so that all schemas use consistent entity IDs, the production domain,
 * and verified data from central sources.
 *
 * No fake prices, ratings, reviews, SKUs, GTINs, MPNs, stock status,
 * shipping data, or offer expiry dates are ever emitted.
 *
 * Sections 2–8 of the Phase 5 specification.
 */

import {
  websiteSchema,
  organisationSchema,
  localBusinessSchema,
  productSchema,
  breadcrumbSchema,
  faqSchema,
  serializeJsonLd,
  type BreadcrumbItem,
  type FAQItem,
} from '@/lib/structured-data';
import { products } from '@/data/products';

/* ────────────────────────────────────────────
   Homepage: Organisation + WebSite + LocalBusiness
   ──────────────────────────────────────────── */

export function HomepageStructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(organisationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(websiteSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(localBusinessSchema()),
        }}
      />
    </>
  );
}

/* ────────────────────────────────────────────
   Product page: Product + Breadcrumb schema
   ──────────────────────────────────────────── */

interface ProductPageStructuredDataProps {
  productSlug: string;
  faqs?: FAQItem[];
}

export function ProductPageStructuredData({ productSlug, faqs }: ProductPageStructuredDataProps) {
  const product = products.find((p) => p.slug === productSlug);
  if (!product) return null;

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: product.name, href: `/products/${product.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(productSchema(product)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbSchema(breadcrumbItems, `/products/${product.slug}`)),
        }}
      />
      {faqs && faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(faqSchema(faqs, `/products/${product.slug}`)),
          }}
        />
      )}
    </>
  );
}

/* ────────────────────────────────────────────
   Products index: Breadcrumb schema
   ──────────────────────────────────────────── */

export function ProductsPageStructuredData() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(breadcrumbSchema(breadcrumbItems, '/products')),
      }}
    />
  );
}

/* ────────────────────────────────────────────
   About Us: Breadcrumb schema
   ──────────────────────────────────────────── */

export function AboutPageStructuredData() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(breadcrumbSchema(breadcrumbItems, '/about-us')),
      }}
    />
  );
}

/* ────────────────────────────────────────────
   Contact Us: Breadcrumb schema
   ──────────────────────────────────────────── */

export function ContactPageStructuredData() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(breadcrumbSchema(breadcrumbItems, '/contact-us')),
      }}
    />
  );
}

/* ────────────────────────────────────────────
   FAQ page: standalone FAQ schema
   ──────────────────────────────────────────── */

interface FAQStructuredDataProps {
  faqs: FAQItem[];
  path: string;
}

export function FAQStructuredData({ faqs, path }: FAQStructuredDataProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(faqSchema(faqs, path)),
      }}
    />
  );
}
