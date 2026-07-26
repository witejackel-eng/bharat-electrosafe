'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { ProductDetailDialog } from '@/components/products/ProductDetailDialog';
import { productSystems, insulationClasses, type ProductSystem } from '@/data/products';

interface ProductDetailContextValue {
  openProduct: (productId: string) => void;
  closeProduct: () => void;
}

const ProductDetailContext = createContext<ProductDetailContextValue | null>(null);

export function ProductDetailProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<ProductSystem | null>(null);

  const openProduct = useCallback((productId: string) => {
    const p = productSystems.find((s) => s.id === productId);
    if (p) {
      setProduct(p);
      setOpen(true);
    }
  }, []);

  const closeProduct = useCallback(() => setOpen(false), []);

  return (
    <ProductDetailContext.Provider value={{ openProduct, closeProduct }}>
      {children}
      <ProductDetailDialog
        product={product}
        open={open}
        onOpenChange={setOpen}
        insulationClasses={insulationClasses}
      />
    </ProductDetailContext.Provider>
  );
}

export function useProductDetail() {
  const ctx = useContext(ProductDetailContext);
  if (!ctx) {
    throw new Error('useProductDetail must be used within ProductDetailProvider');
  }
  return ctx;
}
