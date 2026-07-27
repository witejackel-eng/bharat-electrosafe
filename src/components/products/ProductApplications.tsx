'use client';

import Image from 'next/image';
import {
  PanelTop,
  Factory,
  DoorOpen,
  Plug,
  HardHat,
  TriangleAlert,
  Footprints,
  Box,
  Route,
  ShieldCheck,
  Hammer,
  ShieldAlert,
  ClipboardCheck,
  Moon,
  Mountain,
  TrainFront,
  Cloud,
  Layers,
  Building2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { ProductData, Application } from '@/data/products';

/* ── Icon mapping ── */

const iconMap: Record<string, LucideIcon> = {
  'panel-top': PanelTop,
  factory: Factory,
  'door-open': DoorOpen,
  plug: Plug,
  'hard-hat': HardHat,
  'triangle-alert': TriangleAlert,
  footprints: Footprints,
  box: Box,
  route: Route,
  'shield-check': ShieldCheck,
  hammer: Hammer,
  'shield-alert': ShieldAlert,
  'clipboard-check': ClipboardCheck,
  moon: Moon,
  mountain: Mountain,
  'train-front': TrainFront,
  cloud: Cloud,
  layers: Layers,
  'building-2': Building2,
};

/* ── Component ── */

interface ProductApplicationsProps {
  product: ProductData;
}

export function ProductApplications({ product }: ProductApplicationsProps) {
  return (
    <section className="section-padding-supporting bg-be-warm-white">
      <div className="container-site page-horizontal-padding">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: installed-use image */}
          <div className="lg:w-[45%]">
            {product.images.application ? (
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg border border-be-grey-250">
                <Image
                  src={product.images.application}
                  alt={`${product.name} — installed application`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            ) : product.images.details.length > 0 ? (
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg border border-be-grey-250">
                <Image
                  src={product.images.details[0]}
                  alt={`${product.name} — application`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            ) : null}
          </div>

          {/* Right: applications list */}
          <div className="lg:w-[55%] flex flex-col gap-6">
            <SectionHeader
              eyebrow="Applications"
              title="Where It's Used"
              supportingText={`${product.name} is designed for the following installed environments and use cases.`}
            />

            <div className="flex flex-col gap-4">
              {product.applications.map((app: Application) => {
                const Icon = iconMap[app.icon] ?? Factory;
                return (
                  <div key={app.name} className="flex items-start gap-4">
                    <span className="shrink-0 flex items-center justify-center size-9 rounded-md bg-be-yellow-50">
                      <Icon className="size-4 text-be-yellow-600" />
                    </span>
                    <div>
                      <div className="text-body font-semibold text-be-charcoal-950">{app.name}</div>
                      <div className="text-body text-be-grey-650">{app.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pale-yellow supporting field */}
            <div className="rounded-lg bg-be-yellow-50 p-5 border border-be-yellow-100">
              <p className="text-body-large text-be-charcoal-800 font-medium">
                Need a custom configuration for your specific environment?
              </p>
              <p className="text-body text-be-grey-650 mt-1">
                Contact our engineering team to discuss tailored solutions for your installation requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
