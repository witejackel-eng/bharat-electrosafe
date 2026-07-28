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
  homepageItemListSchema,
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
   Homepage ItemList: homepage-only catalogue schema
   Rendered only on the homepage route — not sitewide.
   ──────────────────────────────────────────── */

export function HomepageItemListStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(homepageItemListSchema()),
      }}
    />
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

/* ────────────────────────────────────────────
   Product Finder Wizard: HowTo schema
   Surfaces the wizard's guided questions as a HowTo so search engines
   can understand the "find the right product" process. No fabricated
   data — the steps mirror the actual wizard questions and the result
   links to real product pages.
   ──────────────────────────────────────────── */

export function ProductFinderHowToStructuredData() {
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to choose the right electrical insulating mat',
    description:
      'A guided process for selecting the correct Bharat Electrosafe product family based on your primary safety requirement, operating voltage and environment.',
    totalTime: 'PT3M',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Identify your primary need',
        text: 'Determine whether your requirement is operator protection near live electrical equipment, hazard zone demarcation, low-light or emergency visibility, or waterproofing and containment.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Determine your working voltage',
        text: 'For electrical safety mats, identify the operating voltage: low voltage up to 3.3 kV (Class A), medium voltage up to 11 kV (Class B), or high voltage up to 33 kV (Class C). This determines the insulation class required.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Consider your environment',
        text: 'Confirm the installation environment — indoor substation or switchroom, outdoor or exposed area, emergency exit routes, or construction, tunnel and civil sites — to validate the product suitability.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Confirm against project specification',
        text: 'Verify the recommended product against your project specification, applicable standards (IS 15652:2006, IEC 61111) and any site-specific acceptance criteria before procurement.',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(howTo) }}
    />
  );
}
