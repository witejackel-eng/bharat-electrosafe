'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { ProductHero } from '@/components/products/ProductHero';
import { ProductTrustIndicators } from '@/components/products/ProductTrustIndicators';
import { ProductOverview } from '@/components/products/ProductOverview';
import { ProductSpecifications } from '@/components/products/ProductSpecifications';
import { ProductMaterialDimensions } from '@/components/products/ProductMaterialDimensions';
import { ProductApplications } from '@/components/products/ProductApplications';
import { ProductDocuments } from '@/components/products/ProductDocuments';
import { ProductFAQ } from '@/components/products/ProductFAQ';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import { ProductCTA } from '@/components/products/ProductCTA';
import { getProductBySlug } from '@/data/products';

const product = getProductBySlug('bharat-hydro-seal')!;

export default function BharatHydroSealPage() {
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
        {/* 1. Hero */}
        <ProductHero product={product} />

        {/* 2. Trust indicators strip */}
        <ProductTrustIndicators />

        {/* 3. Overview */}
        <ProductOverview product={product} />

        {/* 4. Specifications */}
        <ProductSpecifications product={product} />

        {/* 5. Material & Dimensions */}
        <ProductMaterialDimensions product={product} />

        {/* 6. Applications */}
        <ProductApplications product={product} />

        {/* 7. Documents */}
        <ProductDocuments product={product} />

        {/* 8. FAQ */}
        <ProductFAQ product={product} />

        {/* 9. Related Products */}
        <RelatedProducts product={product} />

        {/* 10. Project Enquiry CTA */}
        <ProductCTA product={product} headingPrefix="Project enquiry for" />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
