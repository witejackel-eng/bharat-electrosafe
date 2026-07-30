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
      {/* ── Main product hero (12-column grid: 5 text / 7 gallery) ── */}
      <SectionShell variant="productHero" bg="be-page-top-tint" className="product-hero-compact">
        {/* Breadcrumb — first on every breakpoint */}
        <Breadcrumb items={breadcrumbItems} className="mb-3 lg:mb-4" />

        {/*
          Desktop: 12-column CSS grid.
            • lg (1024–1279px): 6/6 split — keeps the text column wide
              enough that a long introduction (EIM, AGRBM) does not push
              the CTA below a 768px-tall laptop viewport.
            • xl (1280px+): 5/7 split — the requested editorial ratio,
              with the gallery given more room to breathe.
          Mobile/tablet (<1024px): single column, source order is the
          visual order: badges → title → intro → quick facts → CTA →
          gallery. (The previous `order-first lg:order-last` on the
          gallery put it above the title on mobile, which broke the
          natural reading order.)
          `items-start` keeps each side top-aligned so a tall gallery
          never drags the text block down, and a long intro never
          stretches the gallery frame.
          `min-w-0` on every grid child is mandatory — CSS Grid tracks
          default to `min-width: auto`, which means a track refuses to
          shrink below its content's intrinsic min-content width. The
          carousel's thumbnail strip and the H1's longest word both
          have large min-content widths; without `min-w-0` the grid
          overflows horizontally at 1024px.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ── Text side ── */}
          <div className="min-w-0 lg:col-span-6 xl:col-span-5 flex flex-col">
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

            {/* CTA buttons — last item in the text column on mobile so the
                gallery follows the CTA, matching the requested mobile order:
                breadcrumb → title → description → specs → CTA → gallery. */}
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

          {/* ── Media side ── */}
          <div className="min-w-0 lg:col-span-6 xl:col-span-7">
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
