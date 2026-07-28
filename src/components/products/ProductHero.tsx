'use client';

import { useMemo } from 'react';
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
  ShieldCheck,
  FileText,
  Truck,
  Headphones,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TechnicalBadge } from '@/components/ui/TechnicalBadge';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
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
  const breadcrumbItems = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products/electrical-insulating-mats' },
      { label: product.name },
    ],
    [product.name]
  );

  return (
    <>
      <section className="hero-padding bg-be-warm-white">
        <div className="container-site page-horizontal-padding">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} className="mb-6" />

          {/* Desktop: 46/54 split */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            {/* ── Content side (46%) ── */}
            <div className="lg:w-[46%] flex flex-col gap-6">
              {/* Technical badges */}
              <div className="flex flex-wrap gap-2">
                {product.badges.map((badge) => (
                  <TechnicalBadge key={badge} label={badge} />
                ))}
              </div>

              {/* H1 */}
              <h1 className="text-product-h1 text-be-charcoal-950">{product.name}</h1>

              {/* Introduction */}
              <p className="text-body-large text-be-grey-650 leading-relaxed">
                {product.introduction}
              </p>

              {/* Quick facts */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
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
              <div className="flex flex-wrap gap-3 pt-2">
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
            <div className="lg:w-[54%] flex flex-col gap-4 order-first lg:order-last">
              {/* Main hero image */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg">
                <Image
                  src={product.images.hero}
                  alt={getImageAlt(product, product.images.hero)}
                  fill
                  className={getImageFit(product, product.images.hero) === 'contain' ? 'object-contain p-3' : 'object-cover'}
                  sizes="(max-width: 768px) 100vw, 54vw"
                  priority
                />
              </div>

              {/* Supporting detail views */}
              {product.images.details.length > 0 && (
                <div className="flex flex-row gap-4">
                  {product.images.details.slice(0, 2).map((detailSrc) => (
                    <div key={detailSrc} className="relative w-1/2 aspect-[16/10] overflow-hidden rounded-lg">
                      <Image
                        src={detailSrc}
                        alt={getImageAlt(product, detailSrc)}
                        fill
                        className={getImageFit(product, detailSrc) === 'contain' ? 'object-contain p-2' : 'object-cover'}
                        sizes="(max-width: 768px) 50vw, 27vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product-specific trust strip — mat claims never appear on the membrane. */}
      <div className="container-site page-horizontal-padding mt-8">
        <ul className="flex flex-wrap gap-x-6 gap-y-3 rounded-lg border border-be-yellow-100 bg-be-yellow-50 px-5 py-4">
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
      </div>
    </>
  );
}
