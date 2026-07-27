'use client';

import { useMemo } from 'react';
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
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TechnicalBadge } from '@/components/ui/TechnicalBadge';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { ImageFrame } from '@/components/ui/ImageFrame';
import type { ProductData } from '@/data/products';
import { cn } from '@/lib/utils';

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
    <section className="section-padding-major bg-be-warm-white">
      <div className="container-site page-horizontal-padding">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* Desktop: 46/54 split */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
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
            <ImageFrame
              slotId={product.heroSlotId}
              alt={`${product.name} — hero image`}
              aspectRatio="landscape"
            />

            {/* Supporting thumbnails */}
            <div className="flex flex-row gap-4">
              <ImageFrame
                slotId={`${product.heroSlotId}-THUMB-1`}
                alt={`${product.name} — detail view 1`}
                aspectRatio="landscape"
                className="w-1/2"
              />
              <ImageFrame
                slotId={`${product.heroSlotId}-THUMB-2`}
                alt={`${product.name} — detail view 2`}
                aspectRatio="landscape"
                className="w-1/2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
