'use client';

import { useEffect } from 'react';
import { ProductDetailTemplate } from '@/components/products/ProductDetailTemplate';
import { membraneVisuals } from '@/data/product-visuals';
import { SectionShell } from '@/components/ui/SectionShell';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DataTable } from '@/components/ui/DataTable';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import type { ProductData } from '@/data/products';

/**
 * BharatMembrane client page.
 *
 * Uses the shared ProductDetailTemplate with an extra "Variant Comparison"
 * section specific to the membrane product (three thickness variants).
 */
export default function BMClient({ product }: { product: ProductData }) {
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    addToRecentlyViewed('bharat-membrane');
  }, [addToRecentlyViewed]);

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

  const variantComparison = (
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
  );

  return (
    <ProductDetailTemplate
      product={product}
      visuals={membraneVisuals}
      ctaHeadingPrefix="Project enquiry for"
      extraContent={variantComparison}
    />
  );
}
