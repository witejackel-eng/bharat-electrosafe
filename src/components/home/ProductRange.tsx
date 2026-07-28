'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TextLink } from '@/components/ui/TextLink';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SectionShell } from '@/components/ui/SectionShell';
import { products, productFamilyCount, getImageAlt, getImageFit, productCategories } from '@/data/products';

function ProductCard({ product, index }: { product: typeof products[number]; index: number }) {
  const src = product.images.thumbnail;
  const catInfo = productCategories[product.category];

  return (
    <div className="hover-card-lift group relative flex flex-col rounded-lg border border-be-grey-250 bg-be-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Yellow accent line — animates wider on hover */}
      <div className="h-1 bg-be-yellow-500 group-hover:h-1.5 transition-all duration-300" />

      {/* Index badge */}
      <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-be-yellow-500/90 text-be-charcoal-950 text-[0.65rem] font-bold tracking-wide shadow-sm">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Category badge */}
      <div className="absolute top-4 right-4 z-10 px-2 py-0.5 rounded-md bg-be-charcoal-950/80 text-be-white text-[0.6rem] font-semibold tracking-wide">
        {catInfo.displayName}
      </div>

      {/* Image area — square images use a squarer ratio on mobile */}
      <div className="relative w-full overflow-hidden bg-be-cream aspect-[4/3] md:aspect-[16/10]">
        <Image
          src={src}
          alt={getImageAlt(product, src)}
          fill
          className={getImageFit(product, src) === 'contain' ? 'object-contain p-3 md:p-2' : 'object-cover group-hover:scale-105 transition-transform duration-300'}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-be-charcoal-950/0 group-hover:bg-be-charcoal-950/10 transition-colors duration-300" />
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-2 p-4">
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
    <SectionShell variant="standard" bg="bg-be-white" topRule>
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="PRODUCT RANGE"
          title="Our product range"
          supportingText={`${productFamilyCount} product families designed for electrical insulation, hazard visibility, waterproofing and civil protection.`}
        />
      </div>

      {/* Desktop: 3+3 layout with stagger animation */}
      <div className="stagger-reveal" data-stagger="true">
        {/* First row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {products.slice(0, 3).map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>

        {/* Second row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.slice(3).map((product, i) => (
            <ProductCard key={product.slug} product={product} index={3 + i} />
          ))}
        </div>
      </div>

      {/* View all products CTA */}
      <div className="mt-8 flex justify-center reveal-up">
        <PrimaryButton href="/products">
          View All Products
        </PrimaryButton>
      </div>
    </SectionShell>
  );
}
