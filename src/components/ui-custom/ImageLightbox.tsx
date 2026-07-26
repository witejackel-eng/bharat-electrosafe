'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageLightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  alt: string;
  caption?: string;
  spec?: string;
}

/**
 * Subscribe to the user's prefers-reduced-motion setting.
 * Uses useSyncExternalStore so the value updates live when the
 * OS-level setting changes (avoids the React lint rule that
 * forbids calling setState synchronously inside an effect).
 */
function subscribeToReducedMotion(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot() {
  return false;
}

const MANROPE_STYLE = { fontFamily: "'Manrope', sans-serif" } as const;

/**
 * ImageLightbox — a reusable full-bleed modal that shows a larger
 * version of a product image with an optional caption + spec badge.
 *
 * Built on Radix UI Dialog primitives (not the shadcn `DialogContent`
 * wrapper) so we have full control over the full-screen layout,
 * dark backdrop, and click-to-close behaviour.
 *
 * - Click on backdrop OR image closes the lightbox.
 * - Escape closes (handled by Radix).
 * - Focus trap handled by Radix.
 * - SSR-safe (Radix Dialog portals only on the client).
 * - Respects prefers-reduced-motion.
 */
export function ImageLightbox({
  open,
  onOpenChange,
  src,
  alt,
  caption,
  spec,
}: ImageLightboxProps) {
  const [showHint, setShowHint] = React.useState(false);
  const prefersReducedMotion = React.useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot,
  );

  // Show the "Click image to close" hint briefly (first 2s) after opening.
  React.useEffect(() => {
    if (!open) {
      setShowHint(false);
      return;
    }
    setShowHint(true);
    const timer = window.setTimeout(() => setShowHint(false), 2000);
    return () => window.clearTimeout(timer);
  }, [open]);

  const animationClass = prefersReducedMotion
    ? 'data-[state=open]:animate-none data-[state=closed]:animate-none'
    : 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 duration-200';

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-[100] bg-navy-dark/95 backdrop-blur-sm',
            prefersReducedMotion
              ? 'data-[state=open]:animate-none data-[state=closed]:animate-none'
              : 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 duration-200',
          )}
        />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          onClick={() => onOpenChange(false)}
          className={cn(
            'fixed inset-0 z-[101] flex items-center justify-center p-4 bg-transparent outline-none',
            animationClass,
          )}
        >
          {/* Accessible title (Radix requires a Title inside Content). */}
          <DialogPrimitive.Title className="sr-only" style={MANROPE_STYLE}>
            Enlarged image: {alt}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only" style={MANROPE_STYLE}>
            Press Escape or click anywhere to close this image preview.
          </DialogPrimitive.Description>

          {/* Top-right close button — white circle that fades on hover. */}
          <DialogPrimitive.Close
            aria-label="Close image lightbox"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'absolute top-4 right-4 z-10',
              'flex items-center justify-center',
              'w-10 h-10 rounded-full',
              'bg-white text-navy',
              'hover:bg-white/10 hover:text-white',
              'transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark',
            )}
          >
            <X className="size-5" aria-hidden="true" />
          </DialogPrimitive.Close>

          {/* "Click image to close" hint — shown briefly after open. */}
          {showHint && (
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                'px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm',
                'text-white/60 text-xs uppercase tracking-wider',
                prefersReducedMotion
                  ? 'opacity-100'
                  : 'animate-in fade-in-0 duration-300',
              )}
              style={MANROPE_STYLE}
            >
              Click image to close
            </div>
          )}

          {/* Image (click to close) */}
          <button
            type="button"
            aria-label={`Close lightbox: ${alt}`}
            onClick={(e) => {
              e.stopPropagation();
              onOpenChange(false);
            }}
            className={cn(
              'group relative block cursor-zoom-in',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark rounded-lg',
            )}
          >
            {/* Plain <img> is intentional here — the lightbox image is
                already optimised in the product data and we need raw
                max-h/max-w control that next/image doesn't expose cleanly. */}
            <img
              src={src}
              alt={alt}
              className="block max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              draggable={false}
            />
          </button>

          {/* Bottom-left caption block */}
          {(caption || spec) && (
            <div
              className="absolute bottom-4 left-4 max-w-[80%] space-y-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              {spec && (
                <span
                  className="inline-block bg-orange text-white uppercase text-[0.65rem] font-semibold tracking-wider px-2 py-0.5 rounded"
                  style={MANROPE_STYLE}
                >
                  {spec}
                </span>
              )}
              {caption && (
                <p
                  className="text-white text-sm font-medium leading-snug"
                  style={MANROPE_STYLE}
                >
                  {caption}
                </p>
              )}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default ImageLightbox;
