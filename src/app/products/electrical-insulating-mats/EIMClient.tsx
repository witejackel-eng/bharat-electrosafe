'use client';

import { ProductDetailTemplate } from '@/components/products/ProductDetailTemplate';
import { hvVisuals } from '@/data/product-visuals';
import type { ProductData } from '@/data/products';

export default function EIMClient({ product }: { product: ProductData }) {

  return <ProductDetailTemplate product={product} visuals={hvVisuals} />;
}
