'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProductGalleryImage } from '@/data/products';

interface ProductGalleryProps {
  images: ProductGalleryImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) return null;

  const currentImage = images[selectedIndex];

  return (
    <section aria-labelledby="gallery-heading" className="animate-fade-up">
      <h2 id="gallery-heading" className="text-section-h2 mb-6">
        Product Gallery
      </h2>

      {/* Main image */}
      <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-muted mb-4">
        <button
          type="button"
          aria-label={`View larger: ${currentImage.alt}`}
          onClick={() => setLightboxOpen(true)}
          className="group relative block w-full h-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
            priority
          />
          {/* Zoom hint overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-charcoal-950/20 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none"
            aria-hidden="true"
          >
            <span className="px-3 py-1.5 rounded-full bg-white/90 text-sm font-medium text-charcoal-950 shadow-lg">
              Click to enlarge
            </span>
          </div>
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2" role="listbox" aria-label="Select gallery image">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              role="option"
              aria-selected={i === selectedIndex}
              aria-label={`Select image: ${img.alt}`}
              onClick={() => setSelectedIndex(i)}
              className={`relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-md overflow-hidden transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 ${
                i === selectedIndex
                  ? 'ring-2 ring-yellow-500 ring-offset-2'
                  : 'ring-1 ring-grey-300 hover:ring-yellow-400'
              }`}
            >
              <Image
                src={img.src}
                alt={`${productName} — thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged view: ${currentImage.alt}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950/90 backdrop-blur-sm p-4 animate-fade-up"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-[16/10] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
          <button
            type="button"
            aria-label="Close lightbox"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 text-charcoal-950 flex items-center justify-center hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
            onClick={() => setLightboxOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80 bg-charcoal-950/60 px-4 py-2 rounded-lg text-center max-w-md">
            {currentImage.alt}
          </p>
        </div>
      )}
    </section>
  );
}
