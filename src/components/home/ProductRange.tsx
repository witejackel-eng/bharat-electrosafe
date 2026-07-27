'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TextLink } from '@/components/ui/TextLink';
import { products } from '@/data/products';

function ProductCard({ product, index }: { product: typeof products[number]; index: number }) {
  return (
    <div className="hover-card-lift group relative flex flex-col rounded-lg border border-be-grey-250 bg-be-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Yellow accent line — animates wider on hover */}
      <div className="h-1 bg-be-yellow-500 group-hover:h-1.5 transition-all duration-300" />

      {/* Index badge */}
      <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-be-yellow-500/90 text-be-charcoal-950 text-[0.65rem] font-bold tracking-wide shadow-sm">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Image area — real product image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-be-cream">
        <Image
          src={product.images.thumbnail}
          alt={`${product.name} — product image`}
          fill
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            href={`/products/${product.slug}`}
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
            {products.slice(0, 3).map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>

          {/* Second row: 2 centered cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[calc(66.666%+1.5rem)] lg:max-w-[calc(66.666%+1.5rem)] mx-auto justify-center">
            {products.slice(3, 5).map((product, i) => (
              <ProductCard key={product.slug} product={product} index={3 + i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
