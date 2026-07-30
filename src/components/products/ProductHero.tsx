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
import { SectionShell } from '@/components/ui/SectionShell';
import { ProductImageCarousel } from '@/components/products/ProductImageCarousel';
import { ProductAssuranceGrid } from '@/components/products/ProductAssuranceGrid';
import type { ProductData } from '@/data/products';

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
      { label: 'Products', href: '/products' },
      { label: product.name },
    ],
    [product.name]
  );

  return (
    <>
      {/* ── Main product hero (compact) ── */}
      <SectionShell variant="productHero" bg="be-page-top-tint" className="product-hero-compact">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-3 lg:mb-4" />

        {/* Desktop: 48/52 split */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* ── Content side (48%) ── */}
          <div className="lg:w-[48%] flex flex-col">
            {/* Technical badges */}
            <div className="flex flex-wrap gap-2 mb-2.5 lg:mb-3">
              {product.badges.map((badge) => (
                <TechnicalBadge key={badge} label={badge} />
              ))}
            </div>

            {/* H1 */}
            <h1 className="product-hero-h1 text-product-h1 text-be-charcoal-950 mb-3 lg:mb-4">
              {product.name}
            </h1>

            {/* Introduction */}
            <p className="product-hero-intro text-body-large text-be-grey-650 leading-relaxed mb-4 lg:mb-5">
              {product.introduction}
            </p>

            {/* Quick facts */}
            <div className="product-hero-facts flex flex-col sm:flex-row gap-3 sm:gap-5 mb-5 lg:mb-6">
              {product.quickFacts.map((fact) => {
                const Icon = iconMap[fact.icon] ?? Shield;
                return (
                  <div key={fact.label} className="flex items-center gap-3">
                    <span className="flex items-center justify-center size-8 rounded-md bg-be-yellow-50 shrink-0" aria-hidden="true">
                      <Icon className="size-4 text-be-yellow-text" />
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

          {/* ── Media side (52%) ── */}
          <div className="w-full min-w-0 lg:w-[52%] order-first lg:order-last">
            <ProductImageCarousel
              images={product.images.gallery}
              productName={product.name}
              className="product-hero-carousel"
            />
          </div>
        </div>
      </SectionShell>

      {/* ── Shared product assurance strip ── */}
      <ProductAssuranceGrid product={product} />
    </>
  );
}
