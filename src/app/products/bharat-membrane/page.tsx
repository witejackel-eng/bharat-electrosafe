'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { ProductHero } from '@/components/products/ProductHero';
import { ProductTrustIndicators } from '@/components/products/ProductTrustIndicators';
import { ProductOverview } from '@/components/products/ProductOverview';
import { ProductMaterialDimensions } from '@/components/products/ProductMaterialDimensions';
import { ProductApplications } from '@/components/products/ProductApplications';
import { ProductDocuments } from '@/components/products/ProductDocuments';
import { ProductFAQ } from '@/components/products/ProductFAQ';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import { ProductCTA } from '@/components/products/ProductCTA';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DataTable } from '@/components/ui/DataTable';
import { getProductBySlug } from '@/data/products';

const product = getProductBySlug('bharat-membrane')!;

export default function BharatMembranePage() {
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

        {/* 4. Material & Thickness (primary content — no electrical specs) */}
        <ProductMaterialDimensions product={product} />

        {/* 5. Applications */}
        <ProductApplications product={product} />

        {/* 6. Membrane Properties — custom section (not electrical specs table) */}
        <section className="section-padding-supporting bg-be-white">
          <div className="container-site page-horizontal-padding">
            <div className="flex flex-col gap-6">
              <SectionHeader
                eyebrow="Membrane Properties"
                title="Variant Comparison"
                supportingText="BharatMembrane is available in three thickness variants. Each variant is optimised for different exposure levels and project requirements."
              />

              <DataTable
                headers={product.specifications.headers}
                rows={product.specifications.rows}
                stickyFirstColumn
              />
            </div>
          </div>
        </section>

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
