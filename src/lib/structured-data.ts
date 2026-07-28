/**
 * Structured Data (JSON-LD) — Centralised utility for Bharat Electrosafe.
 *
 * Every schema object is built from central data (company, products) and the
 * canonical site URL helper. No fake prices, ratings, reviews, SKUs, GTINs,
 * MPNs, stock status, shipping data, or offer expiry dates are ever emitted.
 *
 * The site is quotation-led, not fixed-price ecommerce. Offer markup is
 * omitted when no public price exists.
 *
 * Entity IDs use the production domain and stable fragment identifiers so
 * that Google can merge entities across pages.
 *
 * Sections 2–8 of the Phase 5 specification.
 */

import { siteUrl, buildUrl } from '@/lib/site-url';
import { company } from '@/data/company';
import {
  products,
  type ProductData,
  type Document,
} from '@/data/products';

/* ────────────────────────────────────────────
   Stable entity IDs
   ──────────────────────────────────────────── */

export const ORG_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;
export const LOCAL_BUSINESS_ID = `${siteUrl}/#localbusiness`;

export function productId(slug: string): string {
  return `${siteUrl}/products/${slug}#product`;
}

export function breadcrumbId(path: string): string {
  return `${siteUrl}${path}#breadcrumb`;
}

/* ────────────────────────────────────────────
   Organisation schema (Section 3)
   ──────────────────────────────────────────── */

export function organisationSchema() {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: company.name,
    legalName: company.legalName,
    url: siteUrl,
    email: company.email,
    telephone: company.phonePrimary,
    description: company.description,
    logo: `${siteUrl}/images/brand/bharat-electrosafe-logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${company.address.line1}, ${company.address.line2}`,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.pincode,
      addressCountry: company.address.country,
    },
  };

  // Only add sameAs when a genuine social profile URL is verified.
  // The generic LinkedIn homepage is NOT Bharat Electrosafe's company page.
  // When a real profile URL is confirmed, add it here.
  if (company.social.linkedin) {
    schema.sameAs = [company.social.linkedin];
  }

  return schema;
}

/* ────────────────────────────────────────────
   WebSite schema (Section 4)
   ──────────────────────────────────────────── */

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteUrl,
    name: company.name,
    description: company.description,
    publisher: {
      '@id': ORG_ID,
    },
    // No SearchAction — the site has no real internal search UI.
  };
}

/* ────────────────────────────────────────────
   Product schema (Section 5)
   ──────────────────────────────────────────── */

/**
 * Product-specific `additionalProperty` values.
 * Electrical mats use IS 15652:2006 properties.
 * BharatMembrane uses geomembrane properties.
 * BharatMembrane does NOT inherit electrical-insulating-mat properties.
 */
function productAdditionalProperties(product: ProductData) {
  const slug = product.slug;
  const props: Array<{ '@type': string; name: string; value: string }> = [];

  if (
    slug === 'electrical-insulating-mats' ||
    slug === 'coloured-strip-insulating-mats' ||
    slug === 'bi-color-insulating-mats' ||
    slug === 'auto-glow-reflective-band-insulating-mats'
  ) {
    // Electrical insulating mats — verified properties from IS 15652:2006
    props.push(
      { '@type': 'PropertyValue', name: 'Standard', value: 'IS 15652:2006' },
      { '@type': 'PropertyValue', name: 'Class', value: 'A / B / C' },
      { '@type': 'PropertyValue', name: 'Working Voltage', value: 'Up to 33 kV (Class C)' },
      { '@type': 'PropertyValue', name: 'Material', value: 'Elastomer' },
      { '@type': 'PropertyValue', name: 'Surface Pattern', value: 'Anti-skid' },
    );
  } else if (slug === 'bharat-membrane') {
    // BharatMembrane — civil/engineering properties
    props.push(
      { '@type': 'PropertyValue', name: 'Material', value: 'PVC' },
      { '@type': 'PropertyValue', name: 'Standard', value: 'IS 15909:2020' },
      { '@type': 'PropertyValue', name: 'Seam Method', value: 'Wedge welding' },
      { '@type': 'PropertyValue', name: 'Application Type', value: 'Geomembrane' },
    );
  }

  return props;
}

export function productSchema(product: ProductData) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': productId(product.slug),
    name: product.name,
    description: product.description,
    url: buildUrl(`/products/${product.slug}`),
    brand: {
      '@type': 'Brand',
      name: company.name,
    },
    manufacturer: {
      '@type': 'Organization',
      '@id': ORG_ID,
    },
    category: product.category === 'electrical-insulation'
      ? 'Electrical Insulating Mats'
      : 'Construction Materials',
  };

  /* Product images — the approved gallery, in its curated order, so the hero
     is first. The card image is deliberately excluded: it is a small crop of a
     photograph already listed here, and Google asks for the high-resolution
     asset rather than a thumbnail. Deduplicated because `overview` and
     `application` point at gallery members. */
  if (product.images.gallery.length > 0) {
    schema.image = Array.from(
      new Set(product.images.gallery.map((image) => image.src))
    ).map((src) => (src.startsWith('http') ? src : `${siteUrl}${src}`));
  }

  // Additional properties — product-specific, never cross-contaminated
  const additionalProps = productAdditionalProperties(product);
  if (additionalProps.length > 0) {
    schema.additionalProperty = additionalProps;
  }

  // NO aggregateRating, review, SKU, GTIN, MPN, price, offer, or stock
  // The site is quotation-led, not fixed-price ecommerce.

  return schema;
}

/* ────────────────────────────────────────────
   Breadcrumb schema (Section 6)
   ──────────────────────────────────────────── */

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[], path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId(path),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildUrl(item.href),
    })),
  };
}

/* ────────────────────────────────────────────
   FAQ schema (Section 7)
   ──────────────────────────────────────────── */

export interface FAQItem {
  question: string;
  answer: string;
}

export function faqSchema(faqs: FAQItem[], path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteUrl}${path}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/* ────────────────────────────────────────────
   LocalBusiness schema (Section 8)
   ──────────────────────────────────────────── */

export function localBusinessSchema() {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': LOCAL_BUSINESS_ID,
    name: company.name,
    url: siteUrl,
    telephone: company.phonePrimary,
    email: company.email,
    logo: `${siteUrl}/images/brand/bharat-electrosafe-logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${company.address.line1}, ${company.address.line2}`,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.pincode,
      addressCountry: company.address.country,
    },
    // Connect to the Organisation entity via shared @id strategy
    parentOrganization: {
      '@id': ORG_ID,
    },
  };

  // Opening hours: only emit openingHoursSpecification when the client has
  // verified the current operating schedule via company.officeHours.verified.
  // Until then, omit entirely — no fabricated openingHoursSpecification.
  if (company.officeHours.verified && company.officeHours.rows.length > 0) {
    const dayMap: Record<string, string> = {
      'Monday – Friday': 'Mo-Fr',
      'Monday–Friday': 'Mo-Fr',
      Saturday: 'Sa',
      Sunday: 'Su',
    };
    const specs: Array<{
      '@type': string;
      dayOfWeek: string;
      opens?: string;
      closes?: string;
    }> = [];
    for (const row of company.officeHours.rows) {
      const dayOfWeek = dayMap[row.day] ?? row.day;
      if ('closed' in row && row.closed) {
        specs.push({ '@type': 'OpeningHoursSpecification', dayOfWeek });
      } else {
        // Parse "9:00 AM – 6:00 PM" into opens/closes.
        const match = row.hours.match(
          /(\d{1,2}:\d{2}\s*[AP]M)\s*[–-]\s*(\d{1,2}:\d{2}\s*[AP]M)/i,
        );
        if (match) {
          specs.push({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek,
            opens: match[1].toUpperCase().replace(/\s/g, ''),
            closes: match[2].toUpperCase().replace(/\s/g, ''),
          });
        }
      }
    }
    if (specs.length > 0) {
      schema.openingHoursSpecification = specs;
    }
  }

  // Do NOT fabricate: geo coordinates, priceRange, ratings, reviews,
  // service radius, or unverified opening hours.

  return schema;
}

/* ────────────────────────────────────────────
   JSON-LD serialisation helper
   Safely escapes < characters to prevent XSS in script tags.
   ──────────────────────────────────────────── */

export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
