import { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import { generateProductMetadata } from '@/lib/product-metadata';
import { ProductPageStructuredData } from '@/components/structured-data';
import { buildUrl } from '@/lib/site-url';
import EIMClient from '../EIMClient';

const product = getProductBySlug('electrical-insulating-mats');

if (!product) {
  throw new Error('Product "electrical-insulating-mats" not found in registry');
}

/* The detailed domestic product experience previously lived at
   /products/electrical-insulating-mats. It now lives at
   /products/electrical-insulating-mats/domestic so the parent route can
   serve as the Electrical Insulating Mats family hub. The canonical is
   overridden to the new route to avoid a duplicate-canonical clash with
   the hub page. */
export const metadata: Metadata = {
  ...generateProductMetadata(product!),
  alternates: {
    canonical: buildUrl('/products/electrical-insulating-mats/domestic'),
  },
  openGraph: {
    ...generateProductMetadata(product!).openGraph,
    url: buildUrl('/products/electrical-insulating-mats/domestic'),
  },
};

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electrical Insulating Mats', href: '/products/electrical-insulating-mats' },
  { label: 'Domestic' },
];

export default function DomesticEIMPage() {
  return (
    <>
      <ProductPageStructuredData productSlug="electrical-insulating-mats" />
      <EIMClient product={product!} breadcrumbItems={breadcrumbItems} />
    </>
  );
}
