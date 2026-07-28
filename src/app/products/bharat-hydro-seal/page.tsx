import { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import { generateProductMetadata } from '@/lib/product-metadata';
import BHSClient from './BHSClient';

const product = getProductBySlug('bharat-hydro-seal');

if (!product) {
  throw new Error('Product "bharat-hydro-seal" not found in registry');
}

export const metadata: Metadata = generateProductMetadata(product!);

export default function BharatHydroSealPage() {
  return <BHSClient product={product!} />;
}
