import { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import { generateProductMetadata } from '@/lib/product-metadata';
import BiColorClient from './BiColorClient';

const product = getProductBySlug('bi-color-insulating-mats');

if (!product) {
  throw new Error('Product "bi-color-insulating-mats" not found in registry');
}

export const metadata: Metadata = generateProductMetadata(product!);

export default function BiColorInsulatingMatsPage() {
  return <BiColorClient product={product!} />;
}
