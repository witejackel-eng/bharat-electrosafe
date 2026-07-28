import { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import { generateProductMetadata } from '@/lib/product-metadata';
import EIMClient from './EIMClient';

const product = getProductBySlug('electrical-insulating-mats');

if (!product) {
  throw new Error('Product "electrical-insulating-mats" not found in registry');
}

export const metadata: Metadata = generateProductMetadata(product!);

export default function ElectricalInsulatingMatsPage() {
  return <EIMClient product={product!} />;
}
