'use client';

import { productSystems } from '@/data/products';
import { useProductDetail } from '@/components/products/ProductDetailProvider';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';

export function ProductSystemPanel() {
  const { openProduct } = useProductDetail();

  return (
    <div className="absolute left-0 top-full pt-3 w-screen" style={{ maxWidth: '100vw' }}>
      <div
        className="mx-auto border border-border bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
        style={{ maxWidth: '1080px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {productSystems.map((system) => (
            <button
              key={system.id}
              type="button"
              onClick={() => openProduct(system.id)}
              className="group flex flex-col p-5 hover:bg-ivory-light/60 transition-colors duration-200 text-left"
            >
              <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden mb-4 bg-muted">
                <Image
                  src={system.image}
                  alt={system.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-eyebrow">{system.index}</span>
                <div className="w-[2px] h-3 bg-orange rounded-full" />
                <span className="text-eyebrow">{system.name}</span>
              </div>
              <h3 className="text-base font-semibold text-navy mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
                {system.shortName}
              </h3>
              <p className="text-sm text-steel mb-3">{system.description}</p>
              <span className="text-sm font-medium text-orange inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore {system.shortName.toLowerCase()}
                <ArrowRight className="size-3" />
              </span>
            </button>
          ))}
        </div>

        {/* Footer link to certificates */}
        <div className="border-t border-border bg-ivory-light/40 px-5 py-3">
          <Link
            href="#proof"
            className="inline-flex items-center gap-2 text-sm text-steel hover:text-orange transition-colors"
          >
            <FileText className="size-4" />
            View certificates and test reports
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
