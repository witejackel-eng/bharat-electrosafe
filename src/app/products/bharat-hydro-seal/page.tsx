import { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import { generateProductMetadata } from '@/lib/product-metadata';
import { ProductPageStructuredData } from '@/components/structured-data';
import { getProductFaqs } from '@/data/faqs';
import BHSClient from './BHSClient';

const product = getProductBySlug('bharat-hydro-seal');

if (!product) {
  throw new Error('Product "bharat-hydro-seal" not found in registry');
}

export const metadata: Metadata = generateProductMetadata(product!);

export default function BharatHydroSealPage() {
  const faqs = getProductFaqs(product!);

  return (
    <>
      <ProductPageStructuredData
        productSlug="bharat-hydro-seal"
        faqs={faqs}
      />
      <BHSClient product={product!} />
    </>
  );
}
