'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Zap,
  Ruler,
  Award,
  Palette,
  Route,
  Eye,
  Clock,
  Sun,
  Scan,
  Droplets,
  Building,
  Shield,
  Download,
  FileText,
  Truck,
  Headphones,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TechnicalBadge } from '@/components/ui/TechnicalBadge';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { SectionShell } from '@/components/ui/SectionShell';
import type { ProductData } from '@/data/products';
import { getImageAlt, getImageFit } from '@/data/products';

/* ── Icon mapping ── */

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  ruler: Ruler,
  award: Award,
  palette: Palette,
  road: Route,
  eye: Eye,
  clock: Clock,
  sun: Sun,
  mirror: Scan,
  droplets: Droplets,
  building: Building,
  shield: Shield,
};

const staticTrustIndicators = [
  { icon: FileText, label: 'Full documentation provided' },
  { icon: Truck, label: 'Pan-India delivery' },
  { icon: Headphones, label: 'Technical support available' },
];

/* ── Component ── */

interface ProductHeroProps {
  product: ProductData;
}

export function ProductHero({ product }: ProductHeroProps) {
  /* ── Gallery state ── */
  // Build the list of gallery images: hero always first, then up to 2 details
  const galleryImages = useMemo(() => {
    const images = [product.images.hero];
    product.images.details.slice(0, 2).forEach((src) => {
      if (!images.includes(src)) images.push(src);
    });
    return images;
  }, [product.images.hero, product.images.details]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeSrc = galleryImages[activeIndex];
  const thumbnails = galleryImages.slice(1); // detail images as thumbnails

  const breadcrumbItems = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: product.name },
    ],
    [product.name]
  );

  const activeFit = getImageFit(product, activeSrc);

  return (
    <SectionShell variant="hero" bg="bg-be-warm-white">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} className="mb-5 lg:mb-6" />

      {/* Desktop: 46/54 split */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        {/* ── Content side (46%) ── */}
        <div className="lg:w-[46%] flex flex-col">
          {/* Technical badges */}
          <div className="flex flex-wrap gap-2 mb-4 lg:mb-5">
            {product.badges.map((badge) => (
              <TechnicalBadge key={badge} label={badge} />
            ))}
          </div>

          {/* H1 */}
          <h1 className="text-product-h1 text-be-charcoal-950 mb-4 lg:mb-5">
            {product.name}
          </h1>

          {/* Introduction */}
          <p className="text-body-large text-be-grey-650 leading-relaxed mb-5 lg:mb-6">
            {product.introduction}
          </p>

          {/* Quick facts */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 lg:mb-7">
            {product.quickFacts.map((fact) => {
              const Icon = iconMap[fact.icon] ?? Shield;
              return (
                <div key={fact.label} className="flex items-center gap-3">
                  <span className="flex items-center justify-center size-9 rounded-md bg-be-yellow-50 shrink-0">
                    <Icon className="size-4 text-be-yellow-600" />
                  </span>
                  <div>
                    <div className="text-metadata text-be-grey-650 font-medium">{fact.label}</div>
                    <div className="text-body font-semibold text-be-charcoal-950">{fact.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href="/contact-us" size="lg">
              Request a Quote
            </PrimaryButton>
            {product.hasDatasheet && (
              <SecondaryButton href="#documents">
                <Download className="size-4 mr-1.5" />
                Download Datasheet
              </SecondaryButton>
            )}
          </div>
        </div>

        {/* ── Media side (54%) ── */}
        <div className="lg:w-[54%] order-first lg:order-last">
          {/* ── Desktop gallery: main + vertical thumbnail rail ── */}
          {thumbnails.length > 0 ? (
            <div className="hidden lg:grid grid-cols-[minmax(0,3fr)_minmax(110px,1fr)] gap-3 rounded-lg">
              {/* Main image */}
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <Image
                  src={activeSrc}
                  alt={getImageAlt(product, activeSrc)}
                  fill
                  className={activeFit === 'contain' ? 'object-contain p-3' : 'object-cover'}
                  sizes="(max-width: 768px) 100vw, 54vw"
                  priority
                />
              </div>

              {/* Vertical thumbnail rail */}
              <div className="grid grid-rows-2 gap-3">
                {thumbnails.map((thumbSrc, idx) => {
                  const thumbFit = getImageFit(product, thumbSrc);
                  const thumbAlt = getImageAlt(product, thumbSrc);
                  const isActive = activeIndex === idx + 1;
                  return (
                    <button
                      key={thumbSrc}
                      type="button"
                      onClick={() => setActiveIndex(idx + 1)}
                      aria-label={`View: ${thumbAlt}`}
                      className={`
                        relative overflow-hidden rounded-lg aspect-auto focus-ring
                        transition-opacity duration-200 ease-out
                        ${isActive
                          ? 'ring-2 ring-be-yellow-500 ring-offset-2 ring-offset-be-warm-white'
                          : 'opacity-80 hover:opacity-100'
                        }
                      `}
                    >
                      <Image
                        src={thumbSrc}
                        alt={thumbAlt}
                        fill
                        className={thumbFit === 'contain' ? 'object-contain p-2' : 'object-cover'}
                        sizes="110px"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* No thumbnails — single full-width hero image (desktop) */
            <div className="hidden lg:block relative overflow-hidden rounded-lg aspect-[4/3]">
              <Image
                src={product.images.hero}
                alt={getImageAlt(product, product.images.hero)}
                fill
                className={getImageFit(product, product.images.hero) === 'contain' ? 'object-contain p-3' : 'object-cover'}
                sizes="(max-width: 768px) 100vw, 54vw"
                priority
              />
            </div>
          )}

          {/* ── Mobile: primary image + compact thumbnail row ── */}
          <div className="lg:hidden">
            {/* Primary image */}
            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
              <Image
                src={activeSrc}
                alt={getImageAlt(product, activeSrc)}
                fill
                className={activeFit === 'contain' ? 'object-contain p-3' : 'object-cover'}
                sizes="100vw"
                priority
              />
            </div>

            {/* Compact thumbnail row */}
            {thumbnails.length > 0 && (
              <div className="flex gap-2 mt-2">
                {thumbnails.map((thumbSrc, idx) => {
                  const thumbFit = getImageFit(product, thumbSrc);
                  const thumbAlt = getImageAlt(product, thumbSrc);
                  const isActive = activeIndex === idx + 1;
                  return (
                    <button
                      key={thumbSrc}
                      type="button"
                      onClick={() => setActiveIndex(idx + 1)}
                      aria-label={`View: ${thumbAlt}`}
                      className={`
                        relative overflow-hidden rounded-md h-[72px] w-[96px] focus-ring
                        transition-opacity duration-200 ease-out
                        ${isActive
                          ? 'ring-2 ring-be-yellow-500 ring-offset-1 ring-offset-be-warm-white'
                          : 'opacity-80 hover:opacity-100'
                        }
                      `}
                    >
                      <Image
                        src={thumbSrc}
                        alt={thumbAlt}
                        fill
                        className={thumbFit === 'contain' ? 'object-contain p-1' : 'object-cover'}
                        sizes="96px"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Trust strip — inside the same SectionShell ── */}
      <ul className="flex flex-wrap gap-x-6 gap-y-3 rounded-lg border border-be-yellow-100 bg-be-yellow-50 px-5 py-4 mt-8 lg:mt-8">
        {product.trustPoints.map((point) => (
          <li key={point} className="flex items-center gap-2">
            <Shield className="size-4 shrink-0 text-be-yellow-600" />
            <span className="text-metadata font-semibold uppercase tracking-wide text-be-charcoal-950">
              {point}
            </span>
          </li>
        ))}
        {staticTrustIndicators.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label} className="flex items-center gap-2">
              <Icon className="size-4 shrink-0 text-be-yellow-600" />
              <span className="text-metadata font-semibold uppercase tracking-wide text-be-charcoal-950">
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
