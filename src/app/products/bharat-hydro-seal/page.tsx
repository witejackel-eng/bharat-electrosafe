/* ────────────────────────────────────────────────────────────────
   BharatHydro Seal — Product Detail Page
   Route: /products/bharat-hydro-seal

   Content is transcribed from the client's published
   BharatHydro-Seal.php page. That page states no profile dimensions,
   tensile figures or pressure ratings, and the asset archive contains
   no BharatHydro datasheet or photography — so none are invented here.
   Outstanding items are listed in docs/CLIENT_VERIFICATION_REQUIRED.md.

   Uses EngineeredProductLayout: no Class A/B/C table, no working or
   proof voltage, no dielectric strength. This is a waterproofing
   product and carries no electrical rating.
   ──────────────────────────────────────────────────────────────── */

import type { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import { EngineeredProductLayout } from '@/components/products/EngineeredProductLayout';
import { company } from '@/data/company';

const SEO_TITLE = 'BharatHydro Water Stop Seal | Bharat Electrosafe';
const SEO_DESCRIPTION =
  'BharatHydro Seal PVC and rubber water stops to IS 15058-2002, preventing water passage through construction and expansion joints in water tanks, reservoirs, dams, canals, treatment plants, basements, pools and tunnels.';
const CANONICAL_PATH = '/products/bharat-hydro-seal';

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

export default function BharatHydroSealPage() {
  const product = getProductBySlug('bharat-hydro-seal');

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
        item: `${company.website}/#products`,
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
      <EngineeredProductLayout
        product={product}
        seoTitle={SEO_TITLE}
        seoDescription={SEO_DESCRIPTION}
        canonicalPath={CANONICAL_PATH}
      />
    </>
  );
}
