import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export function ProductRange() {
  return (
    <section id="product-range" className="bg-white py-16 md:py-20">
      <div className="container-site">
        {/* Heading */}
        <h2 className="text-section-h2 text-charcoal-950 mb-4">
          Our product range
        </h2>
        <p className="text-body text-grey-600 mb-10">
          Five product families — each engineered for a specific protection requirement.
        </p>

        {/* ── Product Cards Grid ── */}
        {/* Desktop: 3+2, Tablet: 2+2+1, Mobile: 1 column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group flex flex-col border border-grey-300/50 rounded-md overflow-hidden hover:border-yellow-500/60 transition-colors"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] bg-yellow-50 overflow-hidden">
                <Image
                  src={product.image}
                  alt={`${product.name} — ${product.description}`}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Fallback background if image not available */}
                <div className="absolute inset-0 -z-10 bg-yellow-50" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-[1rem] font-semibold text-charcoal-950 group-hover:text-yellow-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-[0.875rem] text-grey-600 leading-relaxed">
                  {product.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-yellow-600 group-hover:gap-2.5 transition-all">
                  View Product
                  <ArrowRight className="size-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
