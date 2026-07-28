'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA';
import { ProductHero } from '@/components/products/ProductHero';
import { ProductOverview } from '@/components/products/ProductOverview';
import { ProductMaterialDimensions } from '@/components/products/ProductMaterialDimensions';
import { ProductApplications } from '@/components/products/ProductApplications';
import { ProductDocuments } from '@/components/products/ProductDocuments';
import { ProductFAQ } from '@/components/products/ProductFAQ';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import { ProductCTA } from '@/components/products/ProductCTA';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DataTable } from '@/components/ui/DataTable';
import { SectionShell } from '@/components/ui/SectionShell';
import { ProductData } from '@/data/products';

export default function BMClient({ product }: { product: ProductData }) {
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

        {/* 3. Material & dimensions + variant comparison */}
        <ProductMaterialDimensions product={product} />
        <SectionShell variant="technical" bg="bg-be-cream" topRule>
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
        </SectionShell>

        {/* 4. Documents + FAQ */}
        <ProductDocuments product={product} />
        <ProductFAQ product={product} />

        {/* 5. Related products + CTA */}
        <RelatedProducts product={product} />
        <ProductCTA product={product} headingPrefix="Project enquiry for" />
      </main>
      <Footer />
      <BackToTop />
      <MobileStickyCTA />
    </div>
  );
}
