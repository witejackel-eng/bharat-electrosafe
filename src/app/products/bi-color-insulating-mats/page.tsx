'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { ProductHero } from '@/components/products/ProductHero';
import { ProductOverview } from '@/components/products/ProductOverview';
import { ProductApplications } from '@/components/products/ProductApplications';
import { ProductSpecifications } from '@/components/products/ProductSpecifications';
import { ProductMaterialDimensions } from '@/components/products/ProductMaterialDimensions';
import { ProductDocuments } from '@/components/products/ProductDocuments';
import { ProductFAQ } from '@/components/products/ProductFAQ';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import { ProductCTA } from '@/components/products/ProductCTA';
import { getProductBySlug } from '@/data/products';

const product = getProductBySlug('bi-color-insulating-mats')!;

export default function BiColorInsulatingMatsPage() {
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
        {/* 1. Hero + trust indicators */}
        <ProductHero product={product} />
        {/* 2. Overview + applications */}
        <ProductOverview product={product} />
        <ProductApplications product={product} />
        {/* 3. Specifications + material/dimensions */}
        <ProductSpecifications product={product} stickyFirstColumn />
        <ProductMaterialDimensions product={product} />
        {/* 4. Documents + FAQ */}
        <ProductDocuments product={product} />
        <ProductFAQ product={product} />
        {/* 5. Related products + CTA */}
        <RelatedProducts product={product} />
        <ProductCTA product={product} />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
