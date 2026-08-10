'use client';

import { useEffect } from 'react';
import { ProductDetailTemplate } from '@/components/products/ProductDetailTemplate';
import { hvVisuals } from '@/data/product-visuals';
import type { ProductData } from '@/data/products';

export default function EIMClient({ product }: { product: ProductData }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const revealElements = entry.target.querySelectorAll('.reveal-up');
            revealElements.forEach((el) => {
              el.classList.add('revealed');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-40px' }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return <ProductDetailTemplate product={product} visuals={hvVisuals} />;
}
