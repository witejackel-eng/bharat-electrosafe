'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { DataTable } from '@/components/ui/DataTable';
import type { ProductData } from '@/data/products';

interface ProductSpecificationsProps {
  product: ProductData;
  stickyFirstColumn?: boolean;
}

export function ProductSpecifications({ product, stickyFirstColumn = true }: ProductSpecificationsProps) {
  return (
    <section className="section-padding-supporting bg-be-warm-white">
      <div className="container-site page-horizontal-padding">
        <div className="flex flex-col gap-6">
          <SectionHeader
            eyebrow="Technical Specifications"
            title="Specifications"
            supportingText="Detailed technical specifications for each class and variant. All values tested per IS 15652:2006 standards."
          />

          <DataTable
            headers={product.specifications.headers}
            rows={product.specifications.rows}
            stickyFirstColumn={stickyFirstColumn}
          />
        </div>
      </div>
    </section>
  );
}
