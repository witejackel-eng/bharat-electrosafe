'use client';

import { productSystems } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';

export function ProductSystemPanel() {
  return (
    <div className="absolute left-0 top-full pt-2 w-screen" style={{ maxWidth: '100vw' }}>
      <div className="mx-auto border border-border bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden" style={{ maxWidth: '1080px' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {productSystems.map((system) => (
            <Link
              key={system.id}
              href={system.exploreLink}
              className="group flex flex-col p-5 hover:bg-ivory-light/60 transition-colors duration-200"
            >
              <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden mb-4 bg-muted">
                <Image
                  src={system.image}
                  alt={system.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <span className="text-eyebrow mb-1">{system.index}</span>
              <h3 className="text-base font-semibold text-navy mb-1">{system.name}</h3>
              <p className="text-sm text-steel mb-3">{system.description}</p>
              <span className="text-sm font-medium text-orange group-hover:underline">
                Explore {system.shortName.toLowerCase()} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
