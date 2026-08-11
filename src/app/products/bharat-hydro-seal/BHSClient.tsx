'use client';

import { useEffect } from 'react';
import { ProductDetailTemplate } from '@/components/products/ProductDetailTemplate';
import { hydroSealVisuals } from '@/data/product-visuals';
import { SectionShell } from '@/components/ui/SectionShell';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DataTable } from '@/components/ui/DataTable';
import type { ProductData } from '@/data/products';

/**
 * Bharat Hydro Seal client page.
 *
 * Uses the shared ProductDetailTemplate with an extra "Product Specifications"
 * section specific to the water stop product.
 *
 * IMPORTANT: WHITE ONLY imagery — no black water stop images.
 * hydroSealVisuals from product-visuals.ts is already curated for white-only.
 */
export default function BHSClient({ product }: { product: ProductData }) {
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

  const specSection = (
    <SectionShell variant="technical" bg="bg-be-cream" topRule>
      <div className="flex flex-col gap-6">
        <SectionHeader
          eyebrow="Water Stop Properties"
          title="Product Specifications"
          supportingText="Bharat Hydro Seal water stops reference IS 15058:2002 and are available in multiple profile configurations for construction and expansion joints in concrete structures."
        />
        <DataTable
          headers={product.specifications.headers}
          rows={product.specifications.rows}
          stickyFirstColumn
        />
      </div>
    </SectionShell>
  );

  return (
    <ProductDetailTemplate
      product={product}
      visuals={hydroSealVisuals}
      ctaHeadingPrefix="Project enquiry for"
      extraContent={specSection}
    />
  );
}
