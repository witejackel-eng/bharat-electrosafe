'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProductVisualRole } from '@/data/product-visuals';

interface ProductImageCarouselProps {
  /** Hero image — shown by default as the large image. */
  hero: ProductVisualRole;
  /** Gallery images — shown as thumbnails. Max 5 displayed. */
  gallery: ProductVisualRole[];
  /** Product name — for assistive technology labels. */
  productName: string;
  className?: string;
}

/**
 * Product image carousel — 1 large image + thumbnail strip + arrow navigation.
 *
 * - Previous/Next arrows on left/right of the main image
 * - Thumbnail strip underneath
 * - Keyboard: ArrowLeft/ArrowRight cycle images; Home/End jump
 * - Wrap-around: Last→Next→First, First→Prev→Last
 * - No autoplay, no parallax, no zoom
 * - Desktop arrows: 44×44, mobile: 40×40
 */
export function ProductImageCarousel({
  hero,
  gallery,
  productName,
  className = '',
}: ProductImageCarouselProps) {
  // Combine hero + gallery into a single list; hero is index 0
  const allImages: ProductVisualRole[] = [hero, ...gallery.slice(0, 5)];
  const [active, setActive] = useState(0);
  const count = allImages.length;

  const show = useCallback(
    (next: number) => {
      setActive(((next % count) + count) % count);
    },
    [count],
  );

  const goPrev = useCallback(() => show(active - 1), [active, show]);
  const goNext = useCallback(() => show(active + 1), [active, show]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const actions: Record<string, () => void> = {
      ArrowLeft: goPrev,
      ArrowRight: goNext,
      Home: () => show(0),
      End: () => show(count - 1),
    };
    const action = actions[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  }

  const current = allImages[active];
  const isContain = current.fit === 'contain';

  return (
    <div
      role="group"
      aria-label={`${productName} image gallery`}
      className={`min-w-0 ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* ── Large image viewport with arrows ── */}
      <div className="relative aspect-[4/3] min-h-[240px] overflow-hidden rounded-2xl border border-be-grey-200 bg-[#FAFAF7] group/carousel">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          className={
            isContain
              ? 'object-contain p-6 md:p-9'
              : 'object-cover'
          }
          sizes="(min-width: 1024px) 52vw, 100vw"
          priority={active === 0}
        />

        {/* ── Prev/Next arrows (only when >1 image) ── */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center
                         h-10 w-10 sm:h-11 sm:w-11
                         rounded-full bg-white/90 border border-be-grey-200
                         shadow-sm hover:shadow-md
                         text-be-charcoal-800 hover:text-be-yellow-500
                         transition-all duration-150
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-400 focus-visible:ring-offset-1
                         opacity-0 group-hover/carousel:opacity-100 focus-within:opacity-100
                         md:opacity-60 md:group-hover/carousel:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center
                         h-10 w-10 sm:h-11 sm:w-11
                         rounded-full bg-white/90 border border-be-grey-200
                         shadow-sm hover:shadow-md
                         text-be-charcoal-800 hover:text-be-yellow-500
                         transition-all duration-150
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-400 focus-visible:ring-offset-1
                         opacity-0 group-hover/carousel:opacity-100 focus-within:opacity-100
                         md:opacity-60 md:group-hover/carousel:opacity-100"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </>
        )}
      </div>

      {/* ── Thumbnails ── */}
      {count > 1 && (
        <div
          className="mt-3 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Select product image"
        >
          {allImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => show(index)}
              role="tab"
              aria-selected={index === active}
              aria-label={`View: ${image.alt}`}
              className={`relative h-14 w-[72px] shrink-0 overflow-hidden rounded-lg border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-400 focus-visible:ring-offset-1 sm:h-16 sm:w-20 ${
                index === active
                  ? 'border-be-yellow-500 ring-2 ring-be-yellow-500'
                  : 'border-be-grey-200 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                className={
                  image.fit === 'contain'
                    ? 'object-contain p-1.5'
                    : 'object-cover'
                }
                sizes="96px"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Screen-reader live region */}
      <p aria-live="polite" className="sr-only">
        {`Image ${active + 1} of ${count}: ${current.alt}`}
      </p>
    </div>
  );
}
