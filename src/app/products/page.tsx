import type { Metadata } from 'next';
import { siteUrl, allowIndexing, buildUrl } from '@/lib/site-url';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Products — Electrical Insulation and Engineered Protection | Bharat Electrosafe',
  description:
    'Explore six product families for electrical insulation, hazard visibility, waterproofing and construction-joint protection. Compare features and find the right product for your application.',
  alternates: {
    canonical: buildUrl('/products'),
  },
  openGraph: {
    title: 'Products — Electrical Insulation and Engineered Protection | Bharat Electrosafe',
    description:
      'Explore six product families for electrical insulation, hazard visibility, waterproofing and construction-joint protection.',
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
    title: 'Products — Electrical Insulation and Engineered Protection | Bharat Electrosafe',
    description:
      'Explore six product families for electrical insulation, hazard visibility, waterproofing and construction-joint protection.',
    images: ['/brand/og-bharat-electrosafe.png'],
  },
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
