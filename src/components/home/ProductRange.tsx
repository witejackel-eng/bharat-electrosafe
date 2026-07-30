
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SectionShell } from '@/components/ui/SectionShell';
import { products, imageFitClass, productCategories } from '@/data/products';

function ProductCard({ product, index }: { product: typeof products[number]; index: number }) {
  /* The one approved card image, from central product data — never a
     detail shot or a hero picked locally by this component. */
  const thumbnail = product.images.thumbnail;
  const catInfo = productCategories[product.category];

  return (
    <Link
      href={`/products/${product.slug}`}
      aria-label={`View ${product.name} product page`}
      className="hover-card-lift group relative flex flex-col rounded-lg border border-be-grey-250 bg-be-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 focus-visible:ring-offset-2"
    >
      {/* Yellow accent line — animates wider on hover */}
      <div className="h-1 bg-be-yellow-500 group-hover:h-1.5 transition-all duration-300" aria-hidden="true" />

      {/* Index badge */}
      <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-be-yellow-500/90 text-be-charcoal-950 text-[0.65rem] font-bold tracking-wide shadow-sm" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Category badge */}
      <div className="absolute top-4 right-4 z-10 px-2 py-0.5 rounded-md bg-be-charcoal-950/80 text-be-white text-[0.6rem] font-semibold tracking-wide" aria-hidden="true">
        {catInfo.displayName}
      </div>

      {/* Image area — square images use a squarer ratio on mobile */}
      <div className="relative w-full overflow-hidden bg-be-cream aspect-[4/3] md:aspect-[16/10]">
        <Image
          src={thumbnail.src}
          alt={thumbnail.alt}
          fill
          className={`${imageFitClass(thumbnail, 'p-3 md:p-2')} ${
            thumbnail.fit === 'cover'
              ? 'group-hover:scale-105 transition-transform duration-300'
              : ''
          }`}
          style={thumbnail.position ? { objectPosition: thumbnail.position } : undefined}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-be-charcoal-950/0 group-hover:bg-be-charcoal-950/10 transition-colors duration-300" aria-hidden="true" />
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-card-title text-be-charcoal-950 group-hover:text-be-yellow-text-hover transition-colors">
          {product.name}
        </h3>
        <p className="text-body text-be-grey-650 text-sm leading-relaxed">
          {product.description}
        </p>
        <div className="mt-2">
          <span className="text-sm font-medium text-be-yellow-text group-hover:text-be-yellow-text-hover transition-colors">
            View Product
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProductRange() {
  return (
    <SectionShell variant="standard" bg="bg-be-white" topRule>
      <div className="reveal-up mb-8">
        <SectionHeader
          eyebrow="PRODUCT RANGE"
          title="Products for electrical safety and civil protection"
          supportingText="Six product families covering electrical insulation, visible hazard demarcation, tunnel and containment lining, and construction-joint water stopping."
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
