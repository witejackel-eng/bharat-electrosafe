/* ────────────────────────────────────────────────────────────────
   Electrical Insulating Mats — Product Detail Page
   Route: /products/electrical-insulating-mats
   SEO title: "Electrical Insulating Mats – Class A, B and C | Bharat Electrosafe"
   ──────────────────────────────────────────────────────────────── */

import type { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import { ProductPageLayout } from '@/components/products/ProductPageLayout';
import { company } from '@/data/company';

const SEO_TITLE = 'Electrical Insulating Mats – Class A, B and C | Bharat Electrosafe';
const SEO_DESCRIPTION =
  'IS 15652:2006 Class A, B and C rubber insulating mats for electrical panels, substations and switchrooms. Proof-tested dielectric protection at 3.3 kV, 11 kV and 33 kV working voltages.';
const CANONICAL_PATH = '/products/electrical-insulating-mats';

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

export default function ElectricalInsulatingMatsPage() {
  const product = getProductBySlug('electrical-insulating-mats');

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
    category: 'Electrical Insulation',
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
        item: `${company.website}/products/electrical-insulating-mats`,
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
      <ProductPageLayout
        product={product}
        seoTitle={SEO_TITLE}
        seoDescription={SEO_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
      />
    </>
  );
}
