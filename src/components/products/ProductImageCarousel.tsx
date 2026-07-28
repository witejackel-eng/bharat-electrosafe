'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProductGalleryImage } from '@/data/products';
import { imageFitClass } from '@/data/products';

interface ProductImageCarouselProps {
  /** Ordered, already-approved gallery. Index 0 is the hero. */
  images: ProductGalleryImage[];
  /** Product name — used only to name the carousel for assistive technology. */
  productName: string;
  className?: string;
}

/** Horizontal travel, in px, that counts as a swipe rather than a tap. */
const SWIPE_THRESHOLD = 48;

/**
 * Product image carousel.
 *
 * One responsive viewport, not a desktop gallery and a mobile gallery both
 * sitting in the DOM. Slides mount the first time they are shown and stay
 * mounted afterwards, so nothing beyond the hero is fetched on load, the
 * cross-fade always has both frames available, and going back to a slide is
 * instant.
 *
 * Navigation loops. The counter states the absolute position, so wrapping
 * past the last slide cannot leave anyone unsure where they are, and the
 * arrows never need a disabled state.
 */
export function ProductImageCarousel({
  images,
  productName,
  className = '',
}: ProductImageCarouselProps) {
  const [active, setActive] = useState(0);
  /* Which slides have been shown at least once. The hero is mounted up front
     because it is the LCP candidate; every other slide waits to be asked for. */
  const [mounted, setMounted] = useState<number[]>([0]);

  const thumbStripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const count = images.length;

  const show = useCallback(
    (next: number) => {
      const index = ((next % count) + count) % count;
      setActive(index);
      setMounted((prev) => (prev.includes(index) ? prev : [...prev, index]));
    },
    [count]
  );

  /* Keep the active thumbnail in view by scrolling its own strip only.
     scrollIntoView would be shorter but can also scroll the page. */
  useEffect(() => {
    const strip = thumbStripRef.current;
    const thumb = thumbRefs.current[active];
    if (!strip || !thumb) return;

    const left = thumb.offsetLeft;
    const right = left + thumb.offsetWidth;
    if (left < strip.scrollLeft) {
      strip.scrollTo({ left: left - 8 });
    } else if (right > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo({ left: right - strip.clientWidth + 8 });
    }
  }, [active]);

  /* Fires only while focus sits on a control inside the carousel, so page
     scrolling elsewhere is untouched. */
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

  function handlePointerDown(event: React.PointerEvent) {
    pointerStart.current = { x: event.clientX, y: event.clientY };
  }

  function handlePointerUp(event: React.PointerEvent) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    /* Require a decisively horizontal gesture. A short drag is a tap and a
       diagonal one is the page being scrolled. */
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy) * 1.5) return;
    show(dx < 0 ? active + 1 : active - 1);
  }

  if (count === 0) return null;

  const current = images[active];

  return (
    <div
      role="group"
      aria-label={`${productName} image gallery`}
      /* min-w-0 so the scrolling thumbnail strip below can actually be
         narrower than its contents wherever this is dropped into a flex or
         grid parent. */
      className={`min-w-0 ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* ── Main viewport ──
          Fixed aspect ratio, so the slot is the same size before and after the
          image arrives and the carousel contributes nothing to CLS. */}
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-lg bg-be-warm-white touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (pointerStart.current = null)}
      >
        {images.map((image, index) =>
          mounted.includes(index) ? (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              className={`${imageFitClass(image)} transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                index === active ? 'opacity-100' : 'opacity-0'
              }`}
              style={image.position ? { objectPosition: image.position } : undefined}
              sizes="(min-width: 1024px) 54vw, 100vw"
              priority={index === 0}
              /* Only the slide on screen is exposed; the rest are held at
                 opacity 0 purely so the cross-fade has something to fade. */
              aria-hidden={index !== active}
              draggable={false}
            />
          ) : null
        )}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => show(active - 1)}
              aria-label="Previous product image"
              className="absolute left-2 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-be-grey-200 bg-white/90 text-be-charcoal-950 shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus-ring"
            >
              <ChevronLeft className="size-5" aria-hidden="true" focusable="false" />
            </button>
            <button
              type="button"
              onClick={() => show(active + 1)}
              aria-label="Next product image"
              className="absolute right-2 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-be-grey-200 bg-white/90 text-be-charcoal-950 shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus-ring"
            >
              <ChevronRight className="size-5" aria-hidden="true" focusable="false" />
            </button>
          </>
        )}
      </div>

      {/* ── Caption and counter ──
          Fixed minimum height so a one-line caption and a two-line caption do
          not move the thumbnails. Both are hidden from assistive technology
          because the live region below says the same thing once. */}
      <div className="mt-2 flex min-h-10 items-start justify-between gap-4" aria-hidden="true">
        <p className="text-metadata text-be-grey-650">{current.caption ?? ''}</p>
        {count > 1 && (
          <p className="text-metadata shrink-0 tabular-nums text-be-grey-650">
            {active + 1} / {count}
          </p>
        )}
      </div>

      <p aria-live="polite" className="sr-only">
        {`Image ${active + 1} of ${count}${current.caption ? `: ${current.caption}` : ''}`}
      </p>

      {/* ── Thumbnails ──
          Every approved image, in one strip that scrolls horizontally when it
          has to rather than shrinking the thumbnails to fit. */}
      {count > 1 && (
        <div
          ref={thumbStripRef}
          className="mt-1 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2"
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              ref={(node) => {
                thumbRefs.current[index] = node;
              }}
              onClick={() => show(index)}
              aria-current={index === active ? 'true' : undefined}
              aria-label={`View image ${index + 1}: ${image.caption ?? image.alt}`}
              className={`relative h-16 w-20 shrink-0 snap-start overflow-hidden rounded-md border transition-opacity focus-ring sm:h-[72px] sm:w-24 ${
                index === active
                  ? 'border-be-yellow-500 ring-2 ring-be-yellow-500'
                  : 'border-be-grey-200 opacity-75 hover:opacity-100'
              }`}
            >
              <Image
                src={image.src}
                /* The button already carries the description; repeating it here
                   would make every thumbnail announce twice. */
                alt=""
                fill
                className={imageFitClass(image, 'p-1')}
                style={image.position ? { objectPosition: image.position } : undefined}
                sizes="96px"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
