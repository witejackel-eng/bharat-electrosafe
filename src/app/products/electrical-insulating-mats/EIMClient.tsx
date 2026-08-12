'use client';

import { useEffect } from 'react';
import { ProductDetailTemplate } from '@/components/products/ProductDetailTemplate';
import { hvVisuals } from '@/data/product-visuals';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import type { ProductData } from '@/data/products';

export default function EIMClient({ product }: { product: ProductData }) {
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    addToRecentlyViewed('electrical-insulating-mats');
  }, [addToRecentlyViewed]);

  return <ProductDetailTemplate product={product} visuals={hvVisuals} />;
}
