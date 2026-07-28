'use client';

/**
 * InteractiveIndustries — click an industry to see recommended products.
 *
 * Replaces the static "Industries we serve" chip rail in CapabilityIndustries
 * with an interactive panel: each industry chip filters a live product list,
 * so visitors can see exactly which Bharat Electrosafe products map to their
 * sector without leaving the homepage.
 *
 * Mappings are derived from the application notes in /data/products.ts and the
 * sector list in /data/trust.ts industriesServed. They are conservative — when
 * a product does not clearly serve a sector, it is not listed.
 */

import { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { FeatureList } from '@/components/ui/FeatureList';
import { TextLink } from '@/components/ui/TextLink';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';
import {
  ShieldCheck,
  Layers,
  Ruler,
  FileText,
  Zap,
  Building2,
  TrainFront,
  Flame,
  Factory,
  HardHat,
  ArrowRight,
  Check,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ────────────────────────────────────────────
   Industry → product mapping
   ──────────────────────────────────────────── */

interface IndustryDef {
  key: string;
  name: string;
  icon: LucideIcon;
  blurb: string;
  /** Product slugs recommended for this industry. */
  products: string[];
  /** One-line reason for the lead product. */
  leadReason: string;
}

const INDUSTRIES: IndustryDef[] = [
  {
    key: 'power-utilities',
    name: 'Power Utilities',
    icon: Zap,
    blurb: 'Generation, transmission and distribution sites.',
    products: [
      'electrical-insulating-mats',
      'coloured-strip-insulating-mats',
      'bi-color-insulating-mats',
    ],
    leadReason:
      'Class A / B / C mats protect operators at panels and substations across the full LV–MV–HV range.',
  },
  {
    key: 'substations-switchrooms',
    name: 'Substations & Switchrooms',
    icon: Building2,
    blurb: 'High-voltage protection zones indoors and outdoors.',
    products: [
      'electrical-insulating-mats',
      'coloured-strip-insulating-mats',
      'auto-glow-reflective-band-insulating-mats',
    ],
    leadReason:
      'Insulating mats in front of switchgear, with strip demarcation and auto-glow for emergency routes.',
  },
  {
    key: 'railways-metro',
    name: 'Railways & Metro',
    icon: TrainFront,
    blurb: 'Traction substations, depot and platform safety.',
    products: [
      'electrical-insulating-mats',
      'auto-glow-reflective-band-insulating-mats',
      'coloured-strip-insulating-mats',
    ],
    leadReason:
      'Traction-voltage insulation plus auto-glow bands for low-light evacuation corridors.',
  },
  {
    key: 'oil-gas',
    name: 'Oil & Gas',
    icon: Flame,
    blurb: 'Hazardous-area electrical safety compliance.',
    products: [
      'electrical-insulating-mats',
      'bi-color-insulating-mats',
      'coloured-strip-insulating-mats',
    ],
    leadReason:
      'Insulating mats plus bi-color and strip demarcation for hazardous-zone boundaries.',
  },
  {
    key: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    blurb: 'Plant floor and panel-level operator safety.',
    products: [
      'electrical-insulating-mats',
      'coloured-strip-insulating-mats',
      'bi-color-insulating-mats',
    ],
    leadReason:
      'Floor-level insulation at live panels, with strip demarcation for safe walkways.',
  },
  {
    key: 'infrastructure-construction',
    name: 'Infrastructure & Construction',
    icon: HardHat,
    blurb: 'Site electrical safety and civil containment.',
    products: [
      'bharat-membrane',
      'auto-glow-reflective-band-insulating-mats',
      'coloured-strip-insulating-mats',
    ],
    leadReason:
      'PVC geomembrane for civil containment, with auto-glow and strip mats for temporary site safety.',
  },
];

/* ────────────────────────────────────────────
   Proof points (carried over from CapabilityIndustries)
   ──────────────────────────────────────────── */

const proofPoints = [
  { icon: ShieldCheck, text: 'Certified and tested products' },
  { icon: Layers, text: 'Classes A, B and C available' },
  { icon: Ruler, text: 'Custom dimensions and configurations' },
  { icon: FileText, text: 'Technical documentation and enquiry support' },
];

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

export default function InteractiveIndustries() {
  const [activeKey, setActiveKey] = useState<string>(INDUSTRIES[0].key);
  const resultsRef = useRef<HTMLDivElement>(null);

  const active = useMemo(
    () => INDUSTRIES.find((i) => i.key === activeKey) ?? INDUSTRIES[0],
    [activeKey]
  );

  const recommended = useMemo(() => {
    return active.products
      .map((slug) => products.find((p) => p.slug === slug))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
  }, [active]);

  // When the active industry changes, scroll the results into view on mobile.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 1024) return; // desktop keeps the panel side-by-side
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [activeKey]);

  return (
    <SectionShell
      variant="standard"
      bg="bg-be-warm-white"
      topRule
      id="industries"
      ariaLabel="Industries served and recommended products"
    >
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
        {/* Left — sticky intro + image + proof */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-24 reveal-up">
          <SectionHeader
            eyebrow="CAPABILITY"
            title="Built around safety, quality and application support"
          />

          <p className="text-body-large text-be-grey-650 mt-4">
            Bharat Electrosafe manufactures certified electrical insulating mats
            and engineered protection products, serving utilities, substations,
            railways and industrial facilities across India.
          </p>

          <p className="text-metadata text-be-grey-650 font-medium tracking-wider mt-4">
            Est. India — Serving since decades
          </p>

          {/* Feature list with yellow left border */}
          <div className="[&_li]:border-l-2 [&_li]:border-be-yellow-400 [&_li]:pl-3 [&_li]:ml-[-3px] mt-4">
            <FeatureList items={proofPoints} />
          </div>

          {/* Manufacturing image */}
          <div className="mt-6 rounded-lg overflow-hidden border border-be-grey-250">
            <Image
              src="/media/manufacturing/production-line.webp"
              alt="Bharat Electrosafe manufacturing facility — production line"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="mt-6">
            <TextLink
              href="/about-us"
              className="text-lg font-semibold hover-arrow-shift inline-flex items-center gap-2 text-be-charcoal-800 hover:text-be-yellow-text-hover transition-colors duration-200"
            >
              About Us
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </TextLink>
          </div>
        </div>

        {/* Right — interactive industry picker */}
        <div className="w-full lg:w-1/2 flex flex-col gap-5 reveal-up">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-card-title text-be-charcoal-950">
              Select your industry
            </h3>
            <span className="text-metadata text-be-grey-650">
              {INDUSTRIES.length} sectors
            </span>
          </div>

          {/* Industry chips */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-2"
            role="group"
            aria-label="Select an industry"
          >
            {INDUSTRIES.map((industry) => {
              const Icon = industry.icon;
              const isActive = industry.key === activeKey;
              return (
                <button
                  key={industry.key}
                  type="button"
                  onClick={() => setActiveKey(industry.key)}
                  aria-pressed={isActive}
                  className={cn(
                    'group relative flex flex-col items-start gap-2 rounded-lg border p-3 text-left transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 focus-visible:ring-offset-2',
                    isActive
                      ? 'border-be-charcoal-950 bg-be-charcoal-950 text-be-white be-industry-active-glow'
                      : 'border-be-grey-250 bg-be-white text-be-charcoal-800 hover:border-be-yellow-400 hover:bg-be-yellow-50/40 hover:-translate-y-0.5'
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors',
                      isActive
                        ? 'bg-be-yellow-500 text-be-charcoal-950'
                        : 'bg-be-yellow-50 text-be-yellow-text group-hover:bg-be-yellow-100'
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold leading-tight">
                    {industry.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results panel */}
          <div
            ref={resultsRef}
            className="rounded-lg border border-be-grey-250 bg-be-white overflow-hidden"
            aria-live="polite"
          >
            {/* Header band */}
            <div className="bg-gradient-to-r from-be-charcoal-950 to-be-charcoal-800 px-5 py-4 text-be-white">
              <div className="flex items-center gap-2 mb-1">
                {(() => {
                  const Icon = active.icon;
                  return <Icon className="size-4 text-be-yellow-500" aria-hidden="true" />;
                })()}
                <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-be-yellow-400">
                  Recommended for
                </span>
              </div>
              <h4 className="text-lg font-bold leading-tight">{active.name}</h4>
              <p className="text-sm text-be-white/80 mt-0.5">{active.blurb}</p>
            </div>

            {/* Lead reason */}
            <div className="px-5 py-4 border-b border-be-grey-250 bg-be-yellow-50/40">
              <div className="flex items-start gap-2">
                <Check className="size-4 mt-0.5 shrink-0 text-be-yellow-text" aria-hidden="true" />
                <p className="text-sm text-be-charcoal-800 leading-relaxed">
                  {active.leadReason}
                </p>
              </div>
            </div>

            {/* Recommended product cards */}
            <ul className="divide-y divide-be-grey-250">
              {recommended.map((product, idx) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="group flex items-center gap-4 p-4 hover:bg-be-yellow-50/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 focus-visible:ring-inset"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-be-cream border border-be-grey-250">
                      <Image
                        src={product.images.thumbnail.src}
                        alt={product.images.thumbnail.alt}
                        fill
                        className="object-contain p-1"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {idx === 0 && (
                          <span className="inline-flex items-center rounded-full bg-be-yellow-500 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-be-charcoal-950">
                            Lead match
                          </span>
                        )}
                        <h5 className="text-sm font-semibold text-be-charcoal-950 truncate">
                          {product.name}
                        </h5>
                      </div>
                      <p className="text-metadata text-be-grey-650 line-clamp-1 mt-0.5">
                        {product.description}
                      </p>
                    </div>
                    <ArrowRight
                      className="size-4 shrink-0 text-be-grey-400 group-hover:text-be-yellow-text group-hover:translate-x-0.5 transition-all"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Footer CTA */}
            <div className="px-5 py-4 bg-be-cream border-t border-be-grey-250">
              <Link
                href="/contact-us?subject=Industry%20Application%20Enquiry"
                className="be-underline-grow inline-flex items-center gap-2 text-sm font-semibold text-be-charcoal-800 hover:text-be-yellow-text-hover transition-colors"
              >
                Discuss your {active.name.toLowerCase()} application
                <ArrowRight className="h-4 w-4" aria-hidden="true" focusable="false" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
