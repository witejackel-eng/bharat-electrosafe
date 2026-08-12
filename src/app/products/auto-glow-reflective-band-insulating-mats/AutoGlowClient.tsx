'use client';

import { useEffect } from 'react';
import { ProductDetailTemplate } from '@/components/products/ProductDetailTemplate';
import { autoGlowVisuals } from '@/data/product-visuals';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import type { ProductData } from '@/data/products';

export default function AutoGlowClient({ product }: { product: ProductData }) {
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    addToRecentlyViewed('auto-glow-reflective-band-insulating-mats');
  }, [addToRecentlyViewed]);

  return <ProductDetailTemplate product={product} visuals={autoGlowVisuals} />;
}
