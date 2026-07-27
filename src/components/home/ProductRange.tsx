'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { TextLink } from '@/components/ui/TextLink';

interface Product {
  name: string;
  description: string;
  href: string;
  slotId: string;
  imageAlt: string;
}

const products: Product[] = [
  {
    name: 'Electrical Insulating Mats',
    description: 'Class A, B and C voltage-rated insulating mats for electrical safety.',
    href: '/products/electrical-insulating-mats',
    slotId: 'HOME-PRODUCT-EIM-01',
    imageAlt: 'Electrical insulating mat roll',
  },
  {
    name: 'Coloured Strip Insulating Mats',
    description: 'Colour-coded boundary marking for hazard zone identification.',
    href: '/products/coloured-strip-insulating-mats',
    slotId: 'HOME-PRODUCT-CS-01',
    imageAlt: 'Coloured strip insulating mat',
  },
  {
    name: 'Bi-Color Insulating Mats',
    description: 'Contrasting dual-layer mats for visible wear detection.',
    href: '/products/bi-color-insulating-mats',
    slotId: 'HOME-PRODUCT-BC-01',
    imageAlt: 'Bi-color insulating mat',
  },
  {
    name: 'Auto-Glow / Reflective Band Mats',
    description: 'Self-illuminating and reflective mats for low-light emergency guidance.',
    href: '/products/auto-glow-reflective-band-insulating-mats',
    slotId: 'HOME-PRODUCT-AG-01',
    imageAlt: 'Auto-glow reflective band mat',
  },
  {
    name: 'BharatMembrane',
    description: 'Engineered waterproofing membrane for infrastructure protection.',
    href: '/products/bharat-membrane',
    slotId: 'HOME-PRODUCT-BM-01',
    imageAlt: 'BharatMembrane waterproofing product',
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="hover-card-lift group flex flex-col rounded-lg border border-be-grey-250 bg-be-white overflow-hidden">
      {/* Yellow accent line */}
      <div className="h-1 bg-be-yellow-500" />

      {/* Image area — 58-65% of card height */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <ImageFrame
          alt={product.imageAlt}
          slotId={product.slotId}
          aspectRatio="landscape"
          className="w-full h-full"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-2 p-5">
        <h3 className="text-card-title text-be-charcoal-950">
          {product.name}
        </h3>
        <p className="text-body text-be-grey-650 text-sm leading-relaxed">
          {product.description}
        </p>
        <div className="mt-2">
          <TextLink href={product.href}>View Product</TextLink>
        </div>
      </div>
    </div>
  );
}

export default function ProductRange() {
  return (
    <section id="products" className="bg-be-white section-padding-major">
      <div className="container-site page-horizontal-padding">
        <div className="reveal-up mb-12">
          <SectionHeader
            eyebrow="PRODUCT RANGE"
            title="Our product range"
            supportingText="Five product families, each designed around a specific protection requirement."
          />
        </div>

        {/* Desktop: 3+2 layout */}
        <div className="reveal-up">
          {/* First row: 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>

          {/* Second row: 2 wider cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.slice(3, 5).map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
