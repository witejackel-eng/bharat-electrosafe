'use client';

import { useSyncExternalStore } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import {
  Zap,
  Train,
  Building2,
  Waves,
  Factory,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * ProjectGallery — "Installation Photos" section.
 *
 * A masonry-style grid of stylized gradient cards (we don't have real
 * installation photos yet) that showcase the breadth of real-world product
 * deployments: substations, metros, plants, tunnels, power stations and
 * railway workshops.
 *
 * Layout: `grid-cols-2 md:grid-cols-3` with `auto-rows-[200px]` and varying
 * row/col spans so card 1 (large hero) and card 5 (tall) break the rhythm.
 *
 * Each card is a gradient panel with a diagonal sheen, a watermark icon, a
 * centred icon badge and a bottom caption strip with a black-to-transparent
 * overlay. Hover lifts the card (scale + brightness + shadow); keyboard users
 * get a focus-visible orange outline.
 */

interface GalleryItem {
  id: string;
  title: string;
  /** Location · year */
  subtitle: string;
  Icon: LucideIcon;
  /** Tailwind `from-*` class for the gradient */
  from: string;
  /** Tailwind `to-*` class for the gradient */
  to: string;
  /** Grid span classes (col-span / row-span) */
  span: string;
  /** Minimum height utility */
  minHeight: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-substation',
    title: '33 kV Substation Matting',
    subtitle: 'Western Region Transmission · 2024',
    Icon: Zap,
    from: 'from-navy',
    to: 'to-orange',
    span: 'col-span-2 row-span-2',
    minHeight: 'min-h-[400px]',
  },
  {
    id: 'gallery-platform',
    title: 'Platform Edge Safety',
    subtitle: 'South Indian Metro · 2024',
    Icon: Train,
    from: 'from-orange',
    to: 'to-steel',
    span: '',
    minHeight: 'min-h-[200px]',
  },
  {
    id: 'gallery-control-room',
    title: 'Control Room Flooring',
    subtitle: 'BHEL Bhopal Plant · 2023',
    Icon: Building2,
    from: 'from-steel',
    to: 'to-navy',
    span: '',
    minHeight: 'min-h-[200px]',
  },
  {
    id: 'gallery-tunnel',
    title: 'Tunnel Lining Project',
    subtitle: 'Mumbai Coastal Project · 2023',
    Icon: Waves,
    from: 'from-navy-dark',
    to: 'to-navy-light',
    span: '',
    minHeight: 'min-h-[200px]',
  },
  {
    id: 'gallery-power-plant',
    title: 'Power Plant Installation',
    subtitle: 'NTPC Korba · 2024',
    Icon: Factory,
    from: 'from-orange-light',
    to: 'to-orange',
    span: 'row-span-2',
    minHeight: 'min-h-[400px]',
  },
  {
    id: 'gallery-railway-workshop',
    title: 'Railway Workshop Mats',
    subtitle: 'Indian Railways Jhansi · 2023',
    Icon: Wrench,
    from: 'from-navy',
    to: 'to-steel',
    span: '',
    minHeight: 'min-h-[200px]',
  },
];

/* ---------- prefers-reduced-motion external store (SSR-safe) ---------- */
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}
function getReducedMotionClient() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function getReducedMotionServer() {
  return false;
}

export function ProjectGallery() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionClient,
    getReducedMotionServer
  );

  return (
    <section
      id="gallery"
      className="bg-background py-20 md:py-28 scroll-mt-32 relative overflow-hidden grain-overlay"
    >
      {/* Floating decorative shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="floating-shape absolute top-[10%] left-[60%] w-56 h-56 rounded-full bg-orange/[0.06] blur-3xl" />
        <div className="floating-shape absolute bottom-[15%] right-[8%] w-40 h-40 bg-navy/[0.04] blur-3xl" style={{ transform: 'rotate(45deg)' }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-10 md:mb-14">
          <Reveal delay={0}>
            <span
              className="text-eyebrow gradient-text"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Project Gallery
            </span>
            <div className="accent-bar animate-underline-reveal" />
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="text-3xl md:text-4xl font-bold text-navy mt-3 gradient-text"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              From our production floor to your substation.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p
              className="text-base md:text-lg text-steel mt-4 max-w-2xl leading-relaxed"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              A look at where our mats, linings and water-stop systems end up
              working — across utilities, metros, heavy manufacturing and
              infrastructure projects across India.
            </p>
          </Reveal>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {galleryItems.map((item, i) => {
            const Icon = item.Icon;
            return (
              <Reveal
                key={item.id}
                delay={150 + i * 80}
                translateY={16}
                className={cn('h-full', item.span)}
              >
                <article
                  tabIndex={0}
                  aria-labelledby={`${item.id}-title`}
                  className={cn(
                    'group relative cursor-pointer overflow-hidden rounded-2xl h-full w-full',
                    'bg-gradient-to-br',
                    item.from,
                    item.to,
                    item.minHeight,
                    'focus:outline-none focus-visible:outline-2 focus-visible:outline-orange focus-visible:outline-offset-2',
                    'card-tilt border-glow',
                    reducedMotion
                      ? ''
                      : 'transition-all duration-300 hover:scale-105 hover:brightness-110 hover:shadow-2xl'
                  )}
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {/* Diagonal sheen overlay */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 10px)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Watermark icon (bottom-right) */}
                  <Icon
                    className="absolute -bottom-3 -right-3 size-24 text-white/10 pointer-events-none"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />

                  {/* Center icon badge */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    aria-hidden="true"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20">
                      <Icon className="size-8 text-white" strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Bottom caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                    <div className="relative">
                      <h3
                        id={`${item.id}-title`}
                        className="text-white font-semibold text-sm leading-snug"
                      >
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-xs mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProjectGallery;
