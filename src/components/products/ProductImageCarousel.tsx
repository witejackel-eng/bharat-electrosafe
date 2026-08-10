'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
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
 * Product image gallery — 1 large image + max 5 thumbnails.
 *
 * Clicking/tapping a thumbnail swaps the large image.
 * Keyboard accessible: arrow keys cycle thumbnails when focus is on the strip.
 * No carousel library — pure React client island.
 *
 * The large image frame uses bg-[#FAFAF7] with rounded-2xl (16px) and a
 * subtle border. Isolated product shots use object-contain with p-6/p-9
 * padding; application photography uses object-cover.
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
    [count]
  );

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const actions: Record<string, () => void> = {
      ArrowLeft: () => show(active - 1),
      ArrowRight: () => show(active + 1),
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
    >
      {/* ── Large image viewport ── */}
      <div
        className="relative aspect-[4/3] min-h-[240px] overflow-hidden rounded-2xl border border-be-grey-200 bg-[#FAFAF7]"
      >
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
      </div>

      {/* ── Thumbnails ── */}
      {count > 1 && (
        <div
          className="mt-3 flex gap-2"
          onKeyDown={handleKeyDown}
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
