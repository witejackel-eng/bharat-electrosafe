'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowRight, Check, FileText, Phone } from 'lucide-react';
import { useQuote } from '@/components/quote/QuoteProvider';
import type { ProductSystem, InsulationClass } from '@/data/products';

interface ProductDetailDialogProps {
  product: ProductSystem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  insulationClasses?: InsulationClass[];
}

export function ProductDetailDialog({
  product,
  open,
  onOpenChange,
  insulationClasses = [],
}: ProductDetailDialogProps) {
  const { openQuote } = useQuote();

  if (!product) return null;

  const isInsulation = product.id === 'electrical-insulation';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-ivory-light">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-eyebrow">{product.index}</span>
            <div className="w-[2px] h-5 bg-orange rounded-full" />
            <span className="text-eyebrow">{product.name}</span>
          </div>
          <DialogTitle className="text-navy text-2xl" style={{ fontFamily: "'Manrope', sans-serif" }}>
            {product.description}
          </DialogTitle>
          <DialogDescription className="text-steel" style={{ fontFamily: "'Manrope', sans-serif" }}>
            {product.detailCopy}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Image */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-muted">
            <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-orange rounded-full" />
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          {/* Variants */}
          <div>
            <h3 className="text-sm font-semibold text-navy mb-3 uppercase tracking-wider" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Available variants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {product.variants.map((v) => (
                <div
                  key={v}
                  className="p-3 rounded-xl border border-border bg-white hover:border-orange/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange" />
                    <span className="text-sm font-medium text-navy" style={{ fontFamily: "'Manrope', sans-serif" }}>{v}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Class table for insulation */}
          {isInsulation && insulationClasses.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-navy mb-3 uppercase tracking-wider" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Class specifications
              </h3>
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="grid grid-cols-4 bg-navy text-white text-xs uppercase tracking-wider" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  <div className="p-3">Class</div>
                  <div className="p-3">Voltage</div>
                  <div className="p-3">Thickness</div>
                  <div className="p-3">Application</div>
                </div>
                {insulationClasses.map((cls, i) => (
                  <div
                    key={cls.className}
                    className={`grid grid-cols-4 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-ivory-light'}`}
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    <div className="p-3 font-semibold text-navy" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      Class {cls.className}
                    </div>
                    <div className="p-3 text-steel" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {cls.voltage} {cls.voltageUnit}
                    </div>
                    <div className="p-3 text-steel" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {cls.thickness} {cls.thicknessUnit}
                    </div>
                    <div className="p-3 text-steel text-xs">{cls.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key features */}
          <div>
            <h3 className="text-sm font-semibold text-navy mb-3 uppercase tracking-wider" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Key features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {product.features.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-soft flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3 text-orange" />
                  </div>
                  <span className="text-sm text-steel" style={{ fontFamily: "'Manrope', sans-serif" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Standards */}
          <div>
            <h3 className="text-sm font-semibold text-navy mb-3 uppercase tracking-wider" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Applicable standards
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.standards.map((s) => (
                <Badge key={s} variant="outline" className="border-orange/30 text-navy bg-white">
                  <FileText className="size-3 mr-1 text-orange" />
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border">
            <Button
              className="bg-orange hover:bg-orange-hover text-white font-medium"
              onClick={() => {
                onOpenChange(false);
                setTimeout(() => openQuote({ productSystem: product.id }), 200);
              }}
            >
              Request a quote for this product
              <ArrowRight className="size-4 ml-1" />
            </Button>
            <Button
              variant="outline"
              className="border-navy text-navy hover:bg-navy hover:text-white"
              asChild
            >
              <a href="tel:+911234567890">
                <Phone className="size-4 mr-2" />
                Talk to technical sales
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
