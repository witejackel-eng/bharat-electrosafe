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
  index: string;
}

const products: Product[] = [
  {
    name: 'Electrical Insulating Mats',
    description: 'Class A, B and C voltage-rated insulating mats for electrical safety.',
    href: '/products/electrical-insulating-mats',
    slotId: 'HOME-PRODUCT-EIM-01',
    imageAlt: 'Electrical insulating mat roll',
    index: '01',
  },
  {
    name: 'Coloured Strip Insulating Mats',
    description: 'Colour-coded boundary marking for hazard zone identification.',
    href: '/products/coloured-strip-insulating-mats',
    slotId: 'HOME-PRODUCT-CS-01',
    imageAlt: 'Coloured strip insulating mat',
    index: '02',
  },
  {
    name: 'Bi-Color Insulating Mats',
    description: 'Contrasting dual-layer mats for visible wear detection.',
    href: '/products/bi-color-insulating-mats',
    slotId: 'HOME-PRODUCT-BC-01',
    imageAlt: 'Bi-color insulating mat',
    index: '03',
  },
  {
    name: 'Auto-Glow / Reflective Band Mats',
    description: 'Self-illuminating and reflective mats for low-light emergency guidance.',
    href: '/products/auto-glow-reflective-band-insulating-mats',
    slotId: 'HOME-PRODUCT-AG-01',
    imageAlt: 'Auto-glow reflective band mat',
    index: '04',
  },
  {
    name: 'BharatMembrane',
    description: 'Engineered waterproofing membrane for infrastructure protection.',
    href: '/products/bharat-membrane',
    slotId: 'HOME-PRODUCT-BM-01',
    imageAlt: 'BharatMembrane waterproofing product',
    index: '05',
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="hover-card-lift group relative flex flex-col rounded-lg border border-be-grey-250 bg-be-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Yellow accent line — animates wider on hover */}
      <div className="h-1 bg-be-yellow-500 group-hover:h-1.5 transition-all duration-300" />

      {/* Index badge */}
      <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-be-yellow-500/90 text-be-charcoal-950 text-[0.65rem] font-bold tracking-wide shadow-sm">
        {product.index}
      </div>

      {/* Image area — 58-65% of card height */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <ImageFrame
          alt={product.imageAlt}
          slotId={product.slotId}
          aspectRatio="landscape"
          className="w-full h-full"
        />
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-be-charcoal-950/0 group-hover:bg-be-charcoal-950/10 transition-colors duration-300" />
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
          <TextLink
            href={product.href}
            className="text-be-grey-650 group-hover:text-be-yellow-600 transition-colors duration-200"
          >
            View Product
          </TextLink>
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

        {/* Desktop: 3+2 layout with stagger animation */}
        <div className="stagger-reveal" data-stagger="true">
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
