'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductHero } from '@/components/products/ProductHero';
import { ProductOverview } from '@/components/products/ProductOverview';
import { ProductSpecifications } from '@/components/products/ProductSpecifications';
import { ProductMaterialDimensions } from '@/components/products/ProductMaterialDimensions';
import { ProductApplications } from '@/components/products/ProductApplications';
import { ProductDocuments } from '@/components/products/ProductDocuments';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import { ProductCTA } from '@/components/products/ProductCTA';
import { getProductBySlug } from '@/data/products';

const product = getProductBySlug('coloured-strip-insulating-mats')!;

export default function ColouredStripInsulatingMatsPage() {
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

  return (
    <div className="min-h-screen flex flex-col bg-be-warm-white">
      <Header />
      <main className="flex-1">
        <ProductHero product={product} />
        <ProductOverview product={product} />
        <ProductSpecifications product={product} stickyFirstColumn />
        <ProductMaterialDimensions product={product} />
        <ProductApplications product={product} />
        <ProductDocuments product={product} />
        <RelatedProducts product={product} />
        <ProductCTA product={product} />
      </main>
      <Footer />
    </div>
  );
}
