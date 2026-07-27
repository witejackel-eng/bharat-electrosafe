'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { TextLink } from '@/components/ui/TextLink';
import {
  products,
  productFamilyCount,
  getImageAlt,
  getImageFit,
} from '@/data/products';
import type { ProductData } from '@/data/products';

/* Cards read straight from the product registry, so a card cannot advertise a
   family the site does not have a page for. */

function ProductCard({ product, index }: { product: ProductData; index: number }) {
  const src = product.images.thumbnail;

  return (
    <div className="hover-card-lift group relative flex flex-col rounded-lg border border-be-grey-250 bg-be-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Yellow accent line — animates wider on hover */}
      <div className="h-1 bg-be-yellow-500 group-hover:h-1.5 transition-all duration-300" />

      {/* Index badge */}
      <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-be-yellow-500/90 text-be-charcoal-950 text-[0.65rem] font-bold tracking-wide shadow-sm">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Image area — 58-65% of card height */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <ImageFrame
          src={src}
          alt={getImageAlt(product, src)}
          aspectRatio="landscape"
          fit={getImageFit(product, src)}
          className="w-full h-full"
          sizes="(max-width: 768px) 100vw, 380px"
        />
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-be-charcoal-950/0 group-hover:bg-be-charcoal-950/10 transition-colors duration-300 pointer-events-none" />
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
            supportingText={`${productFamilyCount} product families, each designed around a specific protection requirement.`}
          />
        </div>

        {/* Grid adapts to however many families the registry holds. */}
        <div className="stagger-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-stagger="true">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
