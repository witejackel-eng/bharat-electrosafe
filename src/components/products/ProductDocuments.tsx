'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { DocumentCard } from '@/components/ui/DocumentCard';
import type { ProductData } from '@/data/products';

interface ProductDocumentsProps {
  product: ProductData;
}

export function ProductDocuments({ product }: ProductDocumentsProps) {
  const docs = product.documents;

  if (docs.length === 0) {
    return null;
  }

  return (
    <section id="documents" className="section-padding-supporting bg-be-white">
      <div className="container-site page-horizontal-padding">
        <div className="flex flex-col gap-8">
          <SectionHeader
            eyebrow="Documents & Certifications"
            title="Documentation"
            supportingText="Product datasheets, certificates, test reports, and installation guides."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {docs.map((doc) => (
              <DocumentCard
                key={doc.name}
                type={doc.type}
                name={doc.name}
                issuer={doc.issuer}
                kind={doc.kind}
                href={doc.href}
                thumbnail={doc.thumbnail}
                productName={product.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
