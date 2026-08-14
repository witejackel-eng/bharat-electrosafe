'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Droplets, Layers, Package, ChevronRight, Sheet, Cable, ShieldCheck, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { MobileStickyCTA } from '@/components/ui/MobileStickyCTA';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import {
  productComparisonData,
  ProductComparisonRow,
  getProductBySlug,
} from '@/data/products';
import {
  hvVisuals,
  autoGlowVisuals,
  biColourVisuals,
  coloredStripVisuals,
  membraneVisuals,
  hydroSealVisuals,
  pvcFlooringVisuals,
  otherProductsVisuals,
  productVisuals,
} from '@/data/product-visuals';
import { getCanonicalProductPath } from '@/data/product-routes';

/* ────────────────────────────────────────────
   Extended comparison data — includes IEC, PVC, Other
   ──────────────────────────────────────────── */

const extendedComparisonData: ProductComparisonRow[] = [
  ...productComparisonData,
  {
    name: 'International Insulating Mats',
    slug: 'international-iec-61111',
    primaryPurpose: 'Operator insulation for IEC markets',
    distinguishingFeature: 'IEC 61111:2009 Class 0–4 classification',
    typicalApplication: 'Export markets requiring IEC compliance',
    applicableStandard: 'IEC 61111:2009',
  },
  {
    name: 'PVC Flooring Solutions',
    slug: 'pvc-flooring-solutions',
    primaryPurpose: 'Residential and commercial interior flooring',
    distinguishingFeature: 'BharatSmart Floor™ — PVC flooring system',
    typicalApplication: 'Homes, offices, reception areas and commercial interiors',
    applicableStandard: 'IS 3462:1986',
  },
  {
    name: 'Other Products',
    slug: 'other-products',
    primaryPurpose: 'Industrial rubber and ESD products',
    distinguishingFeature: 'Rubber Sheet, Hose Pipe, ESD Mat, Conveyor Belt',
    typicalApplication: 'General industrial and electrostatic-safe environments',
    applicableStandard: 'On request',
  },
];

/* ────────────────────────────────────────────
   Category nav items for sticky navigator
   ──────────────────────────────────────────── */

const CATEGORY_NAV_ITEMS = [
  { id: 'electrical-insulating-mats', label: 'Electrical Insulating Mats' },
  { id: 'waterproofing', label: 'Waterproofing' },
  { id: 'pvc-other', label: 'PVC Flooring' },
  { id: 'other-products-section', label: 'Other Products' },
  { id: 'compare-products', label: 'Compare' },
] as const;

/* ────────────────────────────────────────────
   Domestic product card data
   ──────────────────────────────────────────── */

interface DomesticProduct {
  name: string;
  href: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  objectFit: 'contain' | 'cover';
}

const DOMESTIC_PRODUCTS: DomesticProduct[] = [
  {
    name: 'HV Insulating Mats',
    href: '/products/electrical-insulating-mats/high-voltage-electrical-insulation-mats',
    description: 'Standard high-voltage insulating mats for operator protection near live equipment.',
    imageSrc: hvVisuals.card.src,
    imageAlt: hvVisuals.card.alt,
    objectFit: hvVisuals.card.fit,
  },
  {
    name: 'Auto Glow',
    href: '/products/auto-glow-reflective-band-insulating-mats',
    description: 'Insulating mats with reflective/glow visibility band for low-light and emergency conditions.',
    imageSrc: autoGlowVisuals.card.src,
    imageAlt: autoGlowVisuals.card.alt,
    objectFit: autoGlowVisuals.card.fit,
  },
  {
    name: 'Bi-Colour',
    href: '/products/bi-color-insulating-mats',
    description: 'Dual-colour insulating mats with visible layer differentiation for safety compliance.',
    imageSrc: biColourVisuals.card.src,
    imageAlt: biColourVisuals.card.alt,
    objectFit: biColourVisuals.card.fit,
  },
  {
    name: 'Colored Strip',
    href: '/products/coloured-strip-insulating-mats',
    description: 'Insulating mats with high-visibility coloured boundary strip for safe pathways.',
    imageSrc: coloredStripVisuals.card.src,
    imageAlt: coloredStripVisuals.card.alt,
    objectFit: coloredStripVisuals.card.fit,
  },
];

/* ────────────────────────────────────────────
   Other products items
   ──────────────────────────────────────────── */

const OTHER_PRODUCTS_ITEMS = [
  { name: 'Rubber Sheet', href: '/products/other-products#rubber-sheet', Icon: Sheet },
  { name: 'Rubber Hose Pipe', href: '/products/other-products#rubber-hose-pipe', Icon: Cable },
  { name: 'ESD Mat', href: '/products/other-products#esd-mat', Icon: ShieldCheck },
  { name: 'Conveyor Belt', href: '/products/other-products#conveyor-belt', Icon: Package },
] as const;

/* ────────────────────────────────────────────
   Hero visual collage images
   ──────────────────────────────────────────── */

const HERO_COLLAGE = [
  {
    src: hvVisuals.homePreview.src,
    alt: hvVisuals.homePreview.alt,
    fit: hvVisuals.homePreview.fit,
  },
  {
    src: membraneVisuals.homePreview.src,
    alt: membraneVisuals.homePreview.alt,
    fit: membraneVisuals.homePreview.fit,
  },
  {
    src: pvcFlooringVisuals.homePreview.src,
    alt: pvcFlooringVisuals.homePreview.alt,
    fit: pvcFlooringVisuals.homePreview.fit,
  },
  {
    src: otherProductsVisuals.homePreview.src,
    alt: otherProductsVisuals.homePreview.alt,
    fit: otherProductsVisuals.homePreview.fit,
  },
] as const;

/* ────────────────────────────────────────────
   Section 1: Product Range Hero (Split Layout)
   ──────────────────────────────────────────── */

function ProductsHero() {
  return (
    <section className="bg-be-page-top-tint">
      <div className="container-site page-horizontal-padding py-10 md:py-12 lg:py-14">
        <div className="flex flex-col lg:flex-row lg:gap-12 gap-8 items-center">
          {/* Left — text (~55%) */}
          <div className="w-full lg:w-[55%]">
            <div className="mb-4">
              <Eyebrow>PRODUCT RANGE</Eyebrow>
              <div className="mt-2 h-0.5 bg-be-yellow-500 rounded animate-slide-in" style={{ width: '80px' }} />
            </div>
            <h1 className="text-products-hero-h1 text-be-charcoal-950 mb-4">
              Electrical safety, waterproofing, PVC flooring and industrial products
            </h1>
            <p className="text-body-large text-be-grey-650 mb-6 max-w-xl">
              Four product groups — from domestic insulating mats to waterproofing
              membranes, PVC flooring and industrial rubber products — each built
              around a specific protection or performance requirement.
            </p>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton href="#electrical-insulating-mats" size="lg">
                Explore Products
              </PrimaryButton>
              <SecondaryButton href="/contact-us?type=technical-guidance">
                Ask for Technical Guidance
              </SecondaryButton>
            </div>
          </div>

          {/* Right — visual collage (~45%) */}
          <div className="w-full lg:w-[45%]">
            <div className="grid grid-cols-2 gap-2.5 rounded-xl overflow-hidden">
              {HERO_COLLAGE.map((img, i) => (
                <div key={i} className="relative aspect-[4/3] bg-[#f8f8f6] overflow-hidden rounded-lg">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className={img.fit === 'contain' ? 'object-contain' : 'object-cover'}
                    sizes="(max-width: 1024px) 50vw, 22vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Section 2: Sticky Product Category Navigator
   ──────────────────────────────────────────── */

function CategoryNavigator({ activeId }: { activeId: string }) {
  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <nav
      aria-label="Product categories"
      className="bg-be-white border-b border-be-grey-150"
    >
      <div className="container-site page-horizontal-padding">
        <div className="flex items-center gap-1 h-[52px] overflow-x-auto scrollbar-none -mx-1 px-1">
          {CATEGORY_NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`
                  shrink-0 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500
                  ${isActive
                    ? 'bg-be-yellow-500 text-be-charcoal-950'
                    : 'text-be-navy-800 hover:text-be-charcoal-950 hover:bg-be-grey-150'
                  }
                `}
                aria-current={isActive ? 'true' : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

/* ────────────────────────────────────────────
   Section 3: Domestic Mats Feature Card
   ──────────────────────────────────────────── */

function DomesticFeatureCard({ product }: { product: DomesticProduct }) {
  // Derive the slug from the href (e.g. "/products/electrical-insulating-mats")
  // and only render the compare toggle for real products in the registry.
  const slug = product.href.replace('/products/', '');
  const productData = getProductBySlug(slug);

  return (
    <Link
      href={product.href}
      className="group relative flex flex-col rounded-2xl border border-be-grey-250 bg-be-white overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500"
    >
      {/* Image area — 16:10 */}
      <div className="relative w-full overflow-hidden bg-[#f8f8f6] aspect-[16/10]">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          className={`${product.objectFit === 'contain' ? 'object-contain p-5' : 'object-cover'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-be-charcoal-950/0 group-hover:bg-be-charcoal-950/5 transition-colors duration-300" />
      </div>
      {/* Text content */}
      <div className="flex flex-col gap-1.5 p-5 flex-1">
        <h3 className="text-xl font-semibold text-be-charcoal-950 group-hover:text-be-yellow-text-hover transition-colors">
          {product.name}
        </h3>
        <p className="text-[0.9375rem] text-be-grey-650 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="mt-auto pt-3 text-sm font-medium text-be-yellow-text group-hover:text-be-yellow-text-hover transition-colors inline-flex items-center gap-1">
          View Product <ChevronRight className="size-3.5" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}

/* ────────────────────────────────────────────
   Section 3: Electrical Insulating Mats
   ──────────────────────────────────────────── */

function ElectricalInsulatingMatsSection() {
  return (
    <section id="electrical-insulating-mats" className="bg-be-white scroll-mt-24">
      <div className="container-site page-horizontal-padding py-16 lg:py-20">
        {/* Section heading */}
        <div className="mb-10 lg:mb-12">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-4xl font-bold text-be-yellow-500/60 tabular-nums">01</span>
            <Eyebrow>ELECTRICAL INSULATING MATS</Eyebrow>
          </div>
          <p className="text-be-grey-650 text-base max-w-2xl mt-3">
            Operator protection near live electrical equipment — domestic IS 15652:2006 and international IEC 61111:2009 compliant insulating mats.
          </p>
        </div>

        {/* Domestic Mats */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-0.5 w-6 bg-be-yellow-500 rounded" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-be-charcoal-950 uppercase tracking-wider">
              Domestic Mats
            </h3>
            <span className="text-xs font-medium text-be-grey-650 bg-be-grey-150 px-2.5 py-0.5 rounded-full">
              IS 15652:2006
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {DOMESTIC_PRODUCTS.map((product) => (
              <DomesticFeatureCard key={product.href} product={product} />
            ))}
          </div>
        </div>

        {/* International / Global — ONE premium feature panel */}
        <div className="rounded-2xl border border-be-brand-blue/10 bg-[#f0f6fc] overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left — text */}
            <div className="flex-1 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-0.5 w-6 bg-be-brand-blue rounded" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-be-navy-800 uppercase tracking-wider">
                  International / Global
                </h3>
                <span className="text-xs font-medium text-be-navy-700 bg-be-brand-blue/10 px-2.5 py-0.5 rounded-full">
                  IEC 61111:2009
                </span>
              </div>
              <p className="text-be-grey-650 text-base mb-5 max-w-md">
                IEC 61111:2009 compliant insulating mats for export and international projects — Class 0 through Class 4.
              </p>
              <div className="flex flex-col gap-2 mb-6">
                <span className="text-sm font-medium text-be-charcoal-950">Products available:</span>
                <ul className="flex flex-col gap-1.5 text-sm text-be-grey-650">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-be-brand-blue" aria-hidden="true" /> HV Insulating Mats</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-be-brand-blue" aria-hidden="true" /> Auto Glow</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-be-brand-blue" aria-hidden="true" /> Bi-Colour</li>
                </ul>
              </div>
              <Link
                href="/products/international-iec-61111"
                className="inline-flex items-center gap-2 text-sm font-semibold text-be-navy-800 hover:text-be-brand-blue transition-colors group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 rounded"
              >
                Explore IEC Range
                <ChevronRight className="size-4 group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true" />
              </Link>
            </div>
            {/* Right — IEC visual */}
            <div className="lg:w-[45%] relative min-h-[200px] lg:min-h-0">
              <div className="relative w-full h-full min-h-[200px] lg:min-h-[280px] bg-[#e8f0fa]">
                <Image
                  src="/media/products/international-iec/iec-61111.webp"
                  alt="IEC 61111:2009 compliant insulating mat with international markings"
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Section 4: Waterproofing Solutions
   ──────────────────────────────────────────── */

function WaterproofingSection() {
  return (
    <section id="waterproofing" className="bg-[#faf8f2] scroll-mt-24">
      <div className="container-site page-horizontal-padding py-16 lg:py-20">
        {/* Section heading */}
        <div className="mb-10 lg:mb-12">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-4xl font-bold text-be-yellow-500/60 tabular-nums">02</span>
            <Eyebrow>WATER PROOFING SOLUTIONS</Eyebrow>
          </div>
          <p className="text-be-grey-650 text-base max-w-2xl mt-3">
            Waterproofing, containment and construction-joint sealing for civil infrastructure and environmental projects.
          </p>
        </div>

        {/* Two large feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {/* Geo Membrane */}
          <Link
            href="/products/geo-membrane-lining"
            className="group relative flex flex-col rounded-2xl border border-be-grey-250 bg-be-white overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500"
          >
            <div className="relative w-full overflow-hidden bg-[#f8f8f6] aspect-[16/10]">
              <Image
                src={membraneVisuals.card.src}
                alt={membraneVisuals.card.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-be-charcoal-950/0 group-hover:bg-be-charcoal-950/5 transition-colors duration-300" />
            </div>
            <div className="flex flex-col gap-1.5 p-5 flex-1">
              <span className="text-xs font-medium text-be-grey-650">Geo Membrane Lining</span>
              <h3 className="text-xl font-semibold text-be-charcoal-950 group-hover:text-be-yellow-text-hover transition-colors">
                Geo Membrane Lining
              </h3>
              <p className="text-[0.9375rem] text-be-grey-650 leading-relaxed line-clamp-2">
                Engineered PVC geo-membrane for waterproofing, lining and containment in tunnels, civil works and environmental projects.
              </p>
              <div className="mt-auto pt-3 text-sm font-medium text-be-yellow-text group-hover:text-be-yellow-text-hover transition-colors inline-flex items-center gap-1">
                View Product <ChevronRight className="size-3.5" aria-hidden="true" />
              </div>
            </div>
          </Link>

          {/* Water Stop Seal */}
          <Link
            href="/products/water-stop-seal"
            className="group relative flex flex-col rounded-2xl border border-be-grey-250 bg-be-white overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500"
          >
            <div className="relative w-full overflow-hidden bg-[#f8f8f6] aspect-[16/10]">
              <Image
                src={hydroSealVisuals.card.src}
                alt={hydroSealVisuals.card.alt}
                fill
                className="object-contain p-6"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-be-charcoal-950/0 group-hover:bg-be-charcoal-950/5 transition-colors duration-300" />
            </div>
            <div className="flex flex-col gap-1.5 p-5 flex-1">
              <span className="text-xs font-medium text-be-grey-650">Water Stop Seal</span>
              <h3 className="text-xl font-semibold text-be-charcoal-950 group-hover:text-be-yellow-text-hover transition-colors">
                Water Stop Seal
              </h3>
              <p className="text-[0.9375rem] text-be-grey-650 leading-relaxed line-clamp-2">
                PVC water-stop profile for construction joints in concrete water-retaining structures.
              </p>
              <div className="mt-auto pt-3 text-sm font-medium text-be-yellow-text group-hover:text-be-yellow-text-hover transition-colors inline-flex items-center gap-1">
                View Product <ChevronRight className="size-3.5" aria-hidden="true" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Section 5: PVC Flooring + Other Products (Combined)
   ──────────────────────────────────────────── */

function PvcAndOtherSection() {
  return (
    <section id="pvc-other" className="bg-be-white scroll-mt-24">
      <div className="container-site page-horizontal-padding py-16 lg:py-20">
        {/* Section heading */}
        <div className="mb-10 lg:mb-12">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-4xl font-bold text-be-yellow-500/60 tabular-nums">03</span>
            <Eyebrow>INDUSTRIAL &amp; FLOORING SOLUTIONS</Eyebrow>
          </div>
        </div>

        {/* Two panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {/* PVC Flooring Panel */}
          <div className="rounded-2xl border border-be-grey-250 bg-be-white overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
            {/* Visual area */}
            <div className="relative w-full aspect-[16/9] bg-[#f8f8f6] overflow-hidden">
              <Image
                src={pvcFlooringVisuals.homePreview.src}
                alt={pvcFlooringVisuals.homePreview.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-be-charcoal-950 mb-1.5">
                PVC Flooring Solutions
              </h3>
              <p className="text-[0.9375rem] text-be-grey-650 leading-relaxed mb-1">
                BharatSmart Floor™ — PVC flooring for homes, offices and commercial interiors.
              </p>
              <span className="text-xs font-medium text-be-grey-650 bg-be-grey-150 px-2.5 py-0.5 rounded-full inline-block mb-4">
                IS 3462:1986
              </span>
              <div>
                <Link
                  href="/products/pvc-flooring-solutions"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-be-yellow-text hover:text-be-yellow-text-hover transition-colors group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 rounded"
                >
                  Explore Flooring
                  <ChevronRight className="size-4 group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Other Products Panel */}
          <div className="rounded-2xl border border-be-grey-250 bg-be-white overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.05)] flex flex-col">
            <div className="p-5 flex-1 flex flex-col">
              {/* Top accent */}
              <div className="h-1 w-full bg-gradient-to-r from-be-yellow-500 via-be-yellow-400 to-be-yellow-500 rounded-t mb-5 -mt-5 -mx-5 w-[calc(100%+40px)]" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-be-charcoal-950 mb-1.5">
                Other Products
              </h3>
              <p className="text-[0.9375rem] text-be-grey-650 leading-relaxed mb-5">
                Industrial rubber and electrostatic-discharge products for general and specialist environments.
              </p>
              {/* Icon list */}
              <div className="flex flex-col gap-3 mb-6 flex-1">
                {OTHER_PRODUCTS_ITEMS.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 text-sm font-medium text-be-charcoal-800 hover:text-be-yellow-text-hover transition-colors group/item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 rounded"
                  >
                    <span className="flex items-center justify-center size-8 rounded-lg bg-be-grey-150 text-be-grey-650 group-hover/item:bg-be-yellow-50 group-hover/item:text-be-yellow-text transition-colors">
                      <item.Icon className="size-4" aria-hidden="true" />
                    </span>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div>
                <Link
                  href="/products/other-products"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-be-yellow-text hover:text-be-yellow-text-hover transition-colors group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 rounded"
                >
                  Explore Products
                  <ChevronRight className="size-4 group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Section 6: Product Comparison (Redesigned)
   ──────────────────────────────────────────── */

function ComparisonSection() {
  const [filter, setFilter] = useState<string>('all');

  const filteredData = useMemo(() => {
    if (filter === 'all') return extendedComparisonData;
    if (filter === 'electrical') return extendedComparisonData.filter((r) =>
      r.slug.includes('insulating') || r.slug === 'international-iec-61111'
    );
    if (filter === 'waterproofing') return extendedComparisonData.filter((r) =>
      r.slug === 'bharat-membrane' || r.slug === 'bharat-hydro-seal'
    );
    if (filter === 'pvc') return extendedComparisonData.filter((r) =>
      r.slug === 'pvc-flooring-solutions'
    );
    if (filter === 'other') return extendedComparisonData.filter((r) =>
      r.slug === 'other-products'
    );
    return extendedComparisonData;
  }, [filter]);

  const filterItems = [
    { key: 'all', label: 'All' },
    { key: 'electrical', label: 'Electrical Mats' },
    { key: 'waterproofing', label: 'Waterproofing' },
    { key: 'pvc', label: 'PVC' },
    { key: 'other', label: 'Other' },
  ] as const;

  return (
    <section id="compare-products" className="bg-[#f5f6f8] scroll-mt-24">
      <div className="container-site page-horizontal-padding py-16 lg:py-20">
        {/* Section heading */}
        <div className="mb-8">
          <Eyebrow>COMPARE PRODUCTS</Eyebrow>
          <h2 className="text-section-h2 text-be-charcoal-950 mt-2 mb-2">
            Find the right product for your application.
          </h2>
          <p className="text-be-grey-650 text-base max-w-2xl">
            Compare features and applications across all product groups.
          </p>
        </div>

        {/* Category filter controls */}
        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter comparison by category">
          {filterItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`
                px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500
                ${filter === item.key
                  ? 'bg-be-navy-800 text-be-white'
                  : 'bg-be-white text-be-charcoal-800 hover:bg-be-grey-150 border border-be-grey-250'
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop: accessible semantic table */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-be-grey-250">
          <table className="w-full border-collapse text-[0.9375rem]">
            <caption className="sr-only">
              Comparison of product families across primary purpose,
              distinguishing feature, typical application and applicable
              standard.
            </caption>
            <thead>
              <tr className="bg-be-navy-800">
                <th scope="col" className="text-left px-5 py-3.5 font-semibold text-be-white">
                  Product
                </th>
                <th scope="col" className="text-left px-5 py-3.5 font-semibold text-be-white">
                  Primary Purpose
                </th>
                <th scope="col" className="text-left px-5 py-3.5 font-semibold text-be-white">
                  Distinguishing Feature
                </th>
                <th scope="col" className="text-left px-5 py-3.5 font-semibold text-be-white">
                  Typical Application
                </th>
                <th scope="col" className="text-left px-5 py-3.5 font-semibold text-be-white">
                  Standard
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr
                  key={row.slug}
                  className={`${i % 2 === 0 ? 'bg-be-white' : 'bg-[#f9fafb]'} hover:bg-be-yellow-50/50 transition-colors`}
                >
                  <th scope="row" className="text-left px-5 py-3.5 font-semibold text-be-charcoal-950 border-r border-be-grey-150">
                    <Link
                      href={getCanonicalProductPath(row.slug)}
                      className="hover:text-be-yellow-text-hover transition-colors underline-offset-2 hover:underline"
                    >
                      {row.name}
                    </Link>
                  </th>
                  <td className="px-5 py-3.5 text-be-charcoal-800">
                    {row.primaryPurpose}
                  </td>
                  <td className="px-5 py-3.5 text-be-charcoal-800">
                    {row.distinguishingFeature}
                  </td>
                  <td className="px-5 py-3.5 text-be-charcoal-800">
                    {row.typicalApplication}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-block text-xs font-medium bg-be-grey-150 text-be-charcoal-800 px-2.5 py-1 rounded-md">
                      {row.applicableStandard}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked comparison cards */}
        <div className="md:hidden flex flex-col gap-4">
          {filteredData.map((row) => (
            <Link
              key={row.slug}
              href={getCanonicalProductPath(row.slug)}
              className="block rounded-xl border border-be-grey-250 bg-be-white p-5 hover:bg-be-yellow-50 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500"
            >
              <h3 className="text-lg font-semibold text-be-charcoal-950 group-hover:text-be-yellow-text-hover transition-colors mb-3">
                {row.name}
              </h3>
              <div className="flex flex-col gap-2.5 text-[0.9375rem]">
                <div className="flex gap-2">
                  <span className="text-be-grey-650 font-medium min-w-[100px]">Purpose:</span>
                  <span className="text-be-charcoal-800">{row.primaryPurpose}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-be-grey-650 font-medium min-w-[100px]">Feature:</span>
                  <span className="text-be-charcoal-800">{row.distinguishingFeature}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-be-grey-650 font-medium min-w-[100px]">Application:</span>
                  <span className="text-be-charcoal-800">{row.typicalApplication}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-be-grey-650 font-medium min-w-[100px]">Standard:</span>
                  <span className="inline-block text-xs font-medium bg-be-grey-150 text-be-charcoal-800 px-2.5 py-1 rounded-md">
                    {row.applicableStandard}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Section 7: Selection Guide (2×2 Decision Grid)
   ──────────────────────────────────────────── */

function SelectionGuideSection() {
  const cards = [
    {
      number: '01',
      eyebrow: 'ELECTRICAL SAFETY',
      heading: 'Electrical Insulating Mats',
      lines: [
        <>Domestic requirements: <strong className="text-be-charcoal-950">IS 15652:2006</strong></>,
        <>International/export: <strong className="text-be-charcoal-950">IEC 61111:2009</strong></>,
      ],
      Icon: Zap,
    },
    {
      number: '02',
      eyebrow: 'WATERPROOFING',
      heading: 'Water Proofing Solutions',
      lines: [
        <>Geo Membrane: lining / containment applications</>,
        <>Water Stop: construction-joint water stopping</>,
      ],
      Icon: Droplets,
    },
    {
      number: '03',
      eyebrow: 'PVC FLOORING',
      heading: 'PVC Flooring Solutions',
      lines: [
        <>Residential / office / commercial interior flooring</>,
      ],
      Icon: Layers,
    },
    {
      number: '04',
      eyebrow: 'OTHER PRODUCTS',
      heading: 'Other Products',
      lines: [
        <>Rubber Sheet, Rubber Hose Pipe, ESD Mat, Conveyor Belt</>,
      ],
      Icon: Package,
    },
  ] as const;

  return (
    <section className="bg-be-warm-white">
      <div className="container-site page-horizontal-padding py-16 lg:py-20">
        {/* Section heading */}
        <div className="mb-8">
          <Eyebrow>HOW TO CHOOSE</Eyebrow>
          <h2 className="text-section-h2 text-be-charcoal-950 mt-2 mb-2">
            Which product do I need?
          </h2>
        </div>

        {/* 2×2 Decision grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {cards.map((card) => (
            <div
              key={card.number}
              className="rounded-2xl border border-be-grey-250 bg-be-white p-5 lg:p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl font-bold text-be-yellow-500/60 tabular-nums">{card.number}</span>
                <span className="text-[0.75rem] uppercase tracking-wider text-be-grey-650 font-semibold">
                  {card.eyebrow}
                </span>
              </div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="flex items-center justify-center size-7 rounded-lg bg-be-grey-150 text-be-grey-650">
                  <card.Icon className="size-4" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-be-charcoal-950">{card.heading}</h3>
              </div>
              <ul className="flex flex-col gap-1.5 text-[0.9375rem] text-be-grey-650">
                {card.lines.map((line, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-be-yellow-text mt-1.5" aria-hidden="true">•</span>
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-be-grey-650 text-base mb-3">Still unsure?</p>
          <Link
            href="/contact-us?type=technical-guidance"
            className="inline-flex items-center gap-2 text-sm font-semibold text-be-yellow-text hover:text-be-yellow-text-hover transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 rounded"
          >
            Ask our technical team
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Section 8: Technical Guidance CTA (Compact)
   ──────────────────────────────────────────── */

function TechnicalGuidanceCTA() {
  return (
    <section className="bg-be-navy-800">
      <div className="container-site page-horizontal-padding py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-xl lg:text-2xl font-semibold text-be-white mb-2">
              Not sure which product or standard applies?
            </h2>
            <p className="text-[0.9375rem] text-be-white/80 leading-relaxed">
              Our technical team can help identify the appropriate product, standard and configuration for your application.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <PrimaryButton href="/contact-us?type=technical-guidance" size="lg">
              Request Technical Guidance
            </PrimaryButton>
            <SecondaryButton
              href="/contact-us"
              className="px-8 py-4 text-lg text-white border-white/70 hover:bg-white hover:text-be-navy-900 hover:border-white"
            >
              Request a Quote
            </SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Main ProductsClient component
   ──────────────────────────────────────────── */

export default function ProductsClient() {
  const [activeSection, setActiveSection] = useState('electrical-insulating-mats');

  useEffect(() => {
    // IntersectionObserver for active section tracking in sticky nav
    const sectionIds = CATEGORY_NAV_ITEMS.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.2, rootMargin: '-140px 0px -60% 0px' },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-be-warm-white">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container-site page-horizontal-padding pt-5">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products' },
            ]}
          />
        </div>

        {/* 1. Hero (split layout) */}
        <ProductsHero />
        {/* 2. Sticky category navigator */}
        <CategoryNavigator activeId={activeSection} />
        {/* 3. Electrical Insulating Mats */}
        <ElectricalInsulatingMatsSection />
        {/* 4. Waterproofing */}
        <WaterproofingSection />
        {/* 5. PVC + Other Products */}
        <PvcAndOtherSection />
        {/* 6. Product Comparison */}
        <ComparisonSection />
        {/* 7. Selection Guide */}
        <SelectionGuideSection />
        {/* 8. Technical Guidance CTA */}
        <TechnicalGuidanceCTA />
      </main>
      <Footer />
      <BackToTop />
      <MobileStickyCTA />
    </div>
  );
}
