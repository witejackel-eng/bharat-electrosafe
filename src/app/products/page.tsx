import type { Metadata } from 'next';
import { allowIndexing, buildUrl } from '@/lib/site-url';
import { ProductsPageStructuredData } from '@/components/structured-data';
import ProductsClient from './ProductsClient';

/* Title convention: the normal Metadata.title does NOT include the
   "| Bharat Electrosafe" suffix because the root layout template appends
   it automatically. Open Graph and Twitter receive the final full branded
   title. */
const PAGE_TITLE = 'Products — Electrical Insulation and Engineered Protection';
const FULL_TITLE = `${PAGE_TITLE} | Bharat Electrosafe`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    'Explore six product families for electrical insulation, hazard visibility and waterproofing. Compare features and find the right product for your application.',
  alternates: {
    canonical: buildUrl('/products'),
  },
  openGraph: {
    title: FULL_TITLE,
    description:
      'Explore six product families for electrical insulation, hazard visibility and waterproofing.',
    url: buildUrl('/products'),
    type: 'website',
    images: [
      {
        url: '/brand/og-bharat-electrosafe.png',
        width: 1200,
        height: 630,
        alt: 'Bharat Electrosafe — Product range overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: FULL_TITLE,
    description:
      'Explore six product families for electrical insulation, hazard visibility and waterproofing.',
    images: ['/brand/og-bharat-electrosafe.png'],
  },
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function ProductsPage() {
  return (
    <>
      <ProductsPageStructuredData />
      <ProductsClient />
    </>
  );
}
