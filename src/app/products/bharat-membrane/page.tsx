import { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import { generateProductMetadata } from '@/lib/product-metadata';
import { ProductPageStructuredData } from '@/components/structured-data';
import { getProductFaqs } from '@/data/faqs';
import BMClient from './BMClient';

const product = getProductBySlug('bharat-membrane');

if (!product) {
  throw new Error('Product "bharat-membrane" not found in registry');
}

export const metadata: Metadata = generateProductMetadata(product!);

export default function BharatMembranePage() {
  const faqs = getProductFaqs(product!);

  return (
    <>
      <ProductPageStructuredData
        productSlug="bharat-membrane"
        faqs={faqs}
      />
      <BMClient product={product!} />
    </>
  );
}
