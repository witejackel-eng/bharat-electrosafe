import Link from 'next/link';
import { ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { company } from '@/data/company';

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-background to-background"
      aria-label="Introduction"
    >
      {/* Decorative safety stripes */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1.5 bg-repeating-linear-gradient(45deg, oklch(0.82 0.16 75), oklch(0.82 0.16 75) 12px, oklch(0.22 0.008 60) 12px, oklch(0.22 0.008 60) 24px)"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Copy */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-50 px-3 py-1 w-fit">
              <ShieldCheck className="h-4 w-4 text-amber-600" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                {company.certifications.isiStandard} Certified · {company.certifications.cmL}
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Electrical safety,{' '}
              <span className="text-amber-600">engineered right.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              {company.name} manufactures electrical insulating mats and
              engineered PVC membranes for industrial, civil and environmental
              safety. Six product families, three insulation classes, certified
              to {company.certifications.isiStandard} and conforming to{' '}
              {company.certifications.iec}.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="#contact" className="gap-1.5">
                  Request a Quote
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#products">View Products</Link>
              </Button>
            </div>

            {/* Inline trust badges */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                ERDA / NTH Tested
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                Conforming to {company.certifications.iec}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                {company.certifications.cmL}
              </li>
            </ul>
          </div>

          {/* Visual placeholder — asset slot */}
          <div className="relative">
            <div
              className="aspect-[4/3] w-full rounded-xl border-2 border-dashed border-stone-300 bg-stone-100/60 flex flex-col items-center justify-center gap-3 p-8"
              data-asset-slot="asset-slot-hero-image"
              aria-label="Product image placeholder"
            >
              <Zap className="h-12 w-12 text-stone-400" aria-hidden="true" />
              <span className="text-sm font-medium text-stone-500">
                Insulating mat imagery
              </span>
              <span className="text-xs text-stone-400">
                Final asset to be placed by production team
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsBar() {
  return (
    <section
      className="border-y border-border bg-primary text-primary-foreground"
      aria-label="Key facts"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {company.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
                {stat.label}
              </dt>
              <dd className="mt-1 text-2xl font-bold sm:text-3xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
