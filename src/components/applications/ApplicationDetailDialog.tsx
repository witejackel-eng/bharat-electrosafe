'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { useQuote } from '@/components/quote/QuoteProvider';
import { useProductDetail } from '@/components/products/ProductDetailProvider';
import { productSystems } from '@/data/products';
import type { Application } from '@/data/applications';

interface ApplicationDetailDialogProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const manropeStyle = { fontFamily: "'Manrope', sans-serif" } as const;

export function ApplicationDetailDialog({
  application,
  open,
  onOpenChange,
}: ApplicationDetailDialogProps) {
  const { openQuote } = useQuote();
  const { openProduct } = useProductDetail();

  if (!application) return null;

  const relatedSystemObjects = application.relatedProducts
    .map((id) => productSystems.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const primaryRelatedId = application.relatedProducts[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-ivory-light p-0 gap-0"
        showCloseButton={false}
      >
        {/* Hero image with title overlay + back button */}
        <div className="relative w-full aspect-[16/9] bg-navy overflow-hidden rounded-t-lg shrink-0">
          <Image
            src={application.image}
            alt={application.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/40 to-transparent" />
          {/* Orange safety-line accent */}
          <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-orange rounded-full" />

          {/* Back button (top-left) */}
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Close application details"
              className="absolute top-4 left-4 inline-flex items-center gap-1.5 h-9 pl-2.5 pr-3.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-medium hover:bg-white/25 transition-colors"
              style={manropeStyle}
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
          </DialogClose>

          {/* Close X (top-right) */}
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 inline-flex items-center justify-center size-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white hover:bg-white/25 transition-colors"
            >
              <span aria-hidden className="text-lg leading-none">×</span>
            </button>
          </DialogClose>

          {/* Title overlay (bottom-left) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
            <span
              className="inline-block text-eyebrow text-orange mb-2"
              style={manropeStyle}
            >
              {application.system}
            </span>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight"
              style={manropeStyle}
            >
              {application.name}
            </h2>
          </div>
        </div>

        {/* Header section */}
        <DialogHeader className="px-5 md:px-7 pt-6 pb-2 gap-3">
          <div className="flex items-center gap-3">
            <span className="text-eyebrow" style={manropeStyle}>
              Application
            </span>
            <div className="w-[2px] h-4 bg-orange rounded-full" />
            <span className="text-eyebrow text-steel" style={manropeStyle}>
              {application.systemShort} · {application.relatedProducts.length} related system
              {application.relatedProducts.length === 1 ? '' : 's'}
            </span>
          </div>
          <DialogTitle className="sr-only">{application.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Application overview, use cases, engineering considerations, typical specifications
            and applicable standards for {application.name}.
          </DialogDescription>
          <p
            className="text-sm md:text-[0.95rem] text-steel leading-relaxed max-w-3xl"
            style={manropeStyle}
          >
            {application.overview}
          </p>
        </DialogHeader>

        {/* Two-column body */}
        <div className="px-5 md:px-7 py-5 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* LEFT column */}
          <div className="space-y-7">
            {/* Use cases */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-[3px] h-4 bg-orange rounded-full" />
                <h3
                  className="text-sm font-semibold text-navy uppercase tracking-wider"
                  style={manropeStyle}
                >
                  Use cases
                </h3>
              </div>
              <ul className="space-y-2.5" style={manropeStyle}>
                {application.useCases.map((uc) => (
                  <li key={uc} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className="mt-1.5 size-2 rounded-full bg-orange shrink-0"
                    />
                    <span className="text-sm text-steel leading-relaxed">{uc}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Key engineering considerations */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-[3px] h-4 bg-orange rounded-full" />
                <h3
                  className="text-sm font-semibold text-navy uppercase tracking-wider"
                  style={manropeStyle}
                >
                  Key engineering considerations
                </h3>
              </div>
              <div className="space-y-2.5">
                {application.keyConsiderations.map((c) => (
                  <div
                    key={c.title}
                    className="rounded-xl border border-border bg-white p-3.5 hover:border-orange/30 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="size-4 text-orange shrink-0 mt-0.5" />
                      <div>
                        <h4
                          className="text-sm font-semibold text-navy mb-0.5"
                          style={manropeStyle}
                        >
                          {c.title}
                        </h4>
                        <p
                          className="text-xs md:text-[0.8rem] text-steel leading-relaxed"
                          style={manropeStyle}
                        >
                          {c.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT column */}
          <div className="space-y-7">
            {/* Typical specifications */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-[3px] h-4 bg-orange rounded-full" />
                <h3
                  className="text-sm font-semibold text-navy uppercase tracking-wider"
                  style={manropeStyle}
                >
                  Typical specifications
                </h3>
              </div>
              <div className="rounded-xl border border-border overflow-hidden">
                {application.typicalSpecs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex items-center justify-between gap-3 px-4 py-3 ${
                      i % 2 === 0 ? 'bg-white' : 'bg-ivory-light'
                    } ${i === 0 ? '' : 'border-t border-border'}`}
                    style={manropeStyle}
                  >
                    <span className="text-spec text-steel">{spec.label}</span>
                    <span
                      className="text-sm font-semibold text-navy text-right"
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
              <p
                className="text-xs text-steel-light mt-2 leading-relaxed"
                style={manropeStyle}
              >
                Indicative specifications — final class and thickness are selected by site
                operating voltage and duty.
              </p>
            </section>

            {/* Standards compliance */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-[3px] h-4 bg-orange rounded-full" />
                <h3
                  className="text-sm font-semibold text-navy uppercase tracking-wider"
                  style={manropeStyle}
                >
                  Standards compliance
                </h3>
              </div>
              <div className="space-y-2.5">
                {application.standardsCompliance.map((s) => (
                  <div
                    key={s.standard}
                    className="rounded-xl border border-border bg-white p-3.5 hover:border-orange/30 transition-colors"
                  >
                    <Badge
                      variant="outline"
                      className="border-orange/30 text-navy bg-orange-soft mb-2 font-semibold"
                    >
                      {s.standard}
                    </Badge>
                    <p
                      className="text-xs md:text-[0.8rem] text-steel leading-relaxed"
                      style={manropeStyle}
                    >
                      {s.scope}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="px-5 md:px-7 py-5 border-t border-border bg-ivory-light rounded-b-lg">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                className="bg-orange hover:bg-orange-hover text-white font-medium h-11 px-5"
                style={manropeStyle}
                onClick={() => {
                  onOpenChange(false);
                  setTimeout(
                    () => openQuote({ productSystem: primaryRelatedId }),
                    200,
                  );
                }}
              >
                Request quote for this application
                <ArrowRight className="size-4 ml-1" />
              </Button>
              <Button
                variant="outline"
                className="border-navy text-navy hover:bg-navy hover:text-white font-medium h-11 px-5"
                style={manropeStyle}
                asChild
              >
                <a href="tel:+911234567890">
                  <Phone className="size-4 mr-2" />
                  Talk to technical sales
                </a>
              </Button>
            </div>

            {/* Related product systems */}
            {relatedSystemObjects.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                <span
                  className="text-xs uppercase tracking-wider text-steel-light"
                  style={manropeStyle}
                >
                  Related product system{relatedSystemObjects.length === 1 ? '' : 's'}:
                </span>
                {relatedSystemObjects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      onOpenChange(false);
                      setTimeout(() => openProduct(p.id), 200);
                    }}
                    className="inline-flex items-center gap-1 text-sm font-medium text-orange hover:text-orange-hover transition-colors group"
                    style={manropeStyle}
                  >
                    View {p.name}
                    <ArrowRight className="size-3.5 ml-0.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
