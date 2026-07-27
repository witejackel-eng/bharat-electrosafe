'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Zap,
  Palette,
  SplitSquareHorizontal,
  Sun,
  Droplets,
  Waves,
  ArrowRight,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  products,
  insulationClasses,
  matProperties,
  membraneThicknesses,
  type ProductFamily,
} from '@/data/products';

const categoryIcons: Record<string, typeof Layers> = {
  'electrical-insulating-mats': Zap,
  'coloured-strip-insulating-mats': Palette,
  'bi-color-insulating-mats': SplitSquareHorizontal,
  'auto-glow-reflective-band-insulating-mat': Sun,
  'bharat-membrane': Layers,
  'bharat-hydro-seal': Waves,
};

function ProductCard({ product, onOpen }: { product: ProductFamily; onOpen: () => void }) {
  const Icon = categoryIcons[product.slug] ?? Layers;
  return (
    <article
      id={product.slug}
      className="scroll-mt-20 group flex flex-col rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-stone-100 text-stone-700 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-snug text-foreground">
            {product.shortName}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{product.tagline}</p>
        </div>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {product.summary}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <Badge variant="secondary" className="text-[10px]">
          {product.standard}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpen}
          className="h-8 gap-1 px-2 text-xs"
        >
          Details
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
}

function ProductDetail({ product }: { product: ProductFamily }) {
  const Icon = categoryIcons[product.slug] ?? Layers;
  const isInsulatingMat = product.category === 'Insulating Mats';
  const isMembrane = product.slug === 'bharat-membrane';

  return (
    <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto custom-scrollbar">
      <DialogHeader>
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-amber-100 text-amber-700">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 pr-8">
            <DialogTitle className="text-xl leading-tight">
              {product.name}
            </DialogTitle>
            <DialogDescription className="mt-1">
              {product.tagline}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      {/* Asset placeholder */}
      <div
        className="aspect-[16/9] w-full rounded-lg border-2 border-dashed border-stone-300 bg-stone-100/60 flex items-center justify-center"
        data-asset-slot={product.assetSlots.hero}
        aria-label={`${product.shortName} image placeholder`}
      >
        <Icon className="h-10 w-10 text-stone-400" aria-hidden="true" />
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{product.summary}</p>

      {/* Insulation class table (shared for all insulating mats) */}
      {isInsulatingMat && (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-foreground">
            Insulation Classes — IS 15652:2006
          </h4>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <caption className="sr-only">
                Electrical specifications by insulation class
              </caption>
              <thead className="bg-muted">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left font-semibold">
                    Property
                  </th>
                  {insulationClasses.map((c) => (
                    <th key={c.class} scope="col" className="px-3 py-2 text-center font-semibold">
                      Class {c.class}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <th scope="row" className="px-3 py-2 text-left font-medium">
                    Product code
                  </th>
                  {insulationClasses.map((c) => (
                    <td key={c.class} className="px-3 py-2 text-center font-mono text-xs">
                      {c.productCode}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="px-3 py-2 text-left font-medium">
                    Thickness
                  </th>
                  {insulationClasses.map((c) => (
                    <td key={c.class} className="px-3 py-2 text-center">
                      {c.thickness}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="px-3 py-2 text-left font-medium">
                    Working voltage
                  </th>
                  {insulationClasses.map((c) => (
                    <td key={c.class} className="px-3 py-2 text-center">
                      {c.workingVoltage}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="px-3 py-2 text-left font-medium">
                    AC proof voltage
                  </th>
                  {insulationClasses.map((c) => (
                    <td key={c.class} className="px-3 py-2 text-center">
                      {c.acProofVoltage}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="px-3 py-2 text-left font-medium">
                    Di-electric strength
                  </th>
                  {insulationClasses.map((c) => (
                    <td key={c.class} className="px-3 py-2 text-center">
                      {c.dielectricStrength}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mat properties (shared) */}
      {isInsulatingMat && (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-foreground">
            Technical Properties
          </h4>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {matProperties.map((prop) => (
              <div key={prop.label} className="flex justify-between gap-2 text-sm">
                <dt className="text-muted-foreground">{prop.label}</dt>
                <dd className="font-medium text-foreground">{prop.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Membrane thicknesses */}
      {isMembrane && (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-foreground">
            Available Thicknesses
          </h4>
          <div className="flex flex-wrap gap-2">
            {membraneThicknesses.map((t) => (
              <Badge key={t} variant="outline">{t}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      <div>
        <h4 className="mb-2 text-sm font-semibold text-foreground">Features</h4>
        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Applications */}
      <div>
        <h4 className="mb-2 text-sm font-semibold text-foreground">Applications</h4>
        <ul className="flex flex-wrap gap-2">
          {product.applications.map((a) => (
            <li key={a}>
              <Badge variant="secondary" className="text-xs">{a}</Badge>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 pt-2">
        <Button asChild size="sm">
          <Link href="#contact">Enquire about this product</Link>
        </Button>
        <DialogClose asChild>
          <Button variant="outline" size="sm">Close</Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
}

export function ProductsSection() {
  const [selected, setSelected] = useState<ProductFamily | null>(null);

  return (
    <section id="products" className="scroll-mt-16 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
            Our Products
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Six product families
          </h2>
          <p className="mt-3 text-muted-foreground">
            Electrical insulating mats certified to IS 15652:2006 and engineered
            PVC membranes for civil and environmental applications.
          </p>
        </div>

        {/* Insulating Mats (3) */}
        <div className="mt-10">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Zap className="h-4 w-4 text-amber-600" aria-hidden="true" />
            Insulating Mats
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((p) => p.category === 'Insulating Mats')
              .map((p) => (
                <ProductCard key={p.slug} product={p} onOpen={() => setSelected(p)} />
              ))}
          </div>
        </div>

        {/* Engineered Membranes (3) */}
        <div className="mt-10">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Droplets className="h-4 w-4 text-amber-600" aria-hidden="true" />
            Engineered Membranes
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((p) => p.category === 'Engineered Membranes')
              .map((p) => (
                <ProductCard key={p.slug} product={p} onOpen={() => setSelected(p)} />
              ))}
          </div>
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={(o) => !o && setSelected(null)}>
        {selected && <ProductDetail product={selected} />}
      </Dialog>
    </section>
  );
}
