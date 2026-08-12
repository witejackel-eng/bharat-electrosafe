'use client';

import { ProductDetailTemplate } from '@/components/products/ProductDetailTemplate';
import { hvVisuals } from '@/data/product-visuals';
import type { ProductData } from '@/data/products';

export default function EIMClient({
  product,
  breadcrumbItems,
}: {
  product: ProductData;
  breadcrumbItems?: { label: string; href?: string }[];
}) {
  return (
    <ProductDetailTemplate
      product={product}
      visuals={hvVisuals}
      breadcrumbItems={breadcrumbItems}
    />
  );
}
