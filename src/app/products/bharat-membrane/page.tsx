/* ────────────────────────────────────────────────────────────────
   BharatMembrane — Product Detail Page
   Route: /products/bharat-membrane
   SEO title: "BharatMembrane PVC Geo-Membrane | Bharat Electrosafe"

   IMPORTANT: This page uses MembranePageLayout — a DIFFERENT template
   from the insulating-mat products. NO Class A/B/C table, NO working
   voltage, NO proof voltage, NO dielectric strength, NO electrical
   insulation material table.
   ──────────────────────────────────────────────────────────────── */

import type { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import { MembranePageLayout } from '@/components/products/MembranePageLayout';
import { company } from '@/data/company';

const SEO_TITLE = 'BharatMembrane PVC Geo-Membrane | Bharat Electrosafe';
const SEO_DESCRIPTION =
  'BharatMembrane HDPE geomembrane for containment, waterproofing and civil infrastructure protection. Manufactured to IS 15909:2020. Available in 1 mm to 5 mm thicknesses for tunnel, basement, landfill and canal applications.';
const CANONICAL_PATH = '/products/bharat-membrane';

export function generateMetadata(): Metadata {
  return {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    alternates: {
      canonical: CANONICAL_PATH,
    },
    openGraph: {
      title: SEO_TITLE,
      description: SEO_DESCRIPTION,
      type: 'website',
      url: `${company.website}${CANONICAL_PATH}`,
      siteName: company.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: SEO_TITLE,
      description: SEO_DESCRIPTION,
    },
  };
}

export default function BharatMembranePage() {
  const product = getProductBySlug('bharatmembrane');

  if (!product) {
    return (
      <main id="main-content" className="min-h-screen bg-background">
        <div className="container-site pt-28 pb-12 text-center">
          <h1 className="text-product-h1 mb-4">Product Not Found</h1>
          <p className="text-body text-grey-600">The requested product could not be found.</p>
        </div>
      </main>
    );
  }

  // Product structured data for SEO
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.detailCopy,
    brand: { '@type': 'Brand', name: company.name },
    manufacturer: { '@type': 'Organization', name: company.name },
    category: 'Civil Protection',
    standard: product.standards,
    url: `${company.website}${CANONICAL_PATH}`,
  };

  // BreadcrumbList structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: company.website,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: `${company.website}/products/bharat-membrane`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `${company.website}${CANONICAL_PATH}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <MembranePageLayout
        product={product}
        seoTitle={SEO_TITLE}
        seoDescription={SEO_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
      />
    </>
  );
}
