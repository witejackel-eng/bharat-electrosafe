'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { productSystems, insulationClasses } from '@/data/products';

interface QuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultProductSystem?: string;
  defaultProductClass?: string;
}

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  productSystem: string;
  productClass: string;
  operatingVoltage: string;
  dimensions: string;
  quantity: string;
  deliveryLocation: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  productSystem: '',
  productClass: '',
  operatingVoltage: '',
  dimensions: '',
  quantity: '',
  deliveryLocation: '',
  message: '',
};

export function QuoteDialog({ open, onOpenChange, defaultProductSystem, defaultProductClass }: QuoteDialogProps) {
  const [form, setForm] = useState<FormState>({
    ...initialState,
    productSystem: defaultProductSystem ?? '',
    productClass: defaultProductClass ?? '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [quoteId, setQuoteId] = useState<string>('');

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const fieldErrors: Record<string, string> = {};
          Object.entries(data.errors).forEach(([field, msgs]) => {
            const arr = msgs as string[];
            fieldErrors[field] = arr[0];
          });
          setErrors(fieldErrors);
        }
        setStatus('error');
        return;
      }

      setQuoteId(data.quoteId);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setStatus('idle');
        setForm({ ...initialState, productSystem: defaultProductSystem ?? '', productClass: defaultProductClass ?? '' });
        setErrors({});
        setQuoteId('');
      }, 200);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-ivory-light">
        {status === 'success' ? (
          <div className="flex flex-col items-center text-center py-8 px-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="size-9 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Quote request received
            </h2>
            <p className="text-sm text-steel mb-1 max-w-md" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Thank you. Our technical sales team will respond within 24 hours.
            </p>
            <div className="mt-4 px-4 py-2 rounded-lg bg-navy/5 border border-navy/10">
              <span className="text-xs text-steel block">Your reference</span>
              <span className="text-sm font-mono font-semibold text-navy" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {quoteId}
              </span>
            </div>
            <Button
              className="mt-6 bg-navy hover:bg-navy-light text-white"
              onClick={() => handleOpenChange(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-navy text-xl" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Request a technical quote
              </DialogTitle>
              <DialogDescription className="text-steel" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Share the product, operating voltage, dimensions, quantity and delivery location. Our team will help identify the appropriate solution.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-navy text-sm">
                    Full name <span className="text-orange">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Your name"
                    className={errors.name ? 'border-red-400' : 'border-border'}
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-navy text-sm">
                    Email <span className="text-orange">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@company.com"
                    className={errors.email ? 'border-red-400' : 'border-border'}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-navy text-sm">
                    Phone <span className="text-orange">*</span>
                  </Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className={errors.phone ? 'border-red-400' : 'border-border'}
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company" className="text-navy text-sm">
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={form.company}
                    onChange={(e) => update('company', e.target.value)}
                    placeholder="Company name"
                    className="border-border"
                  />
                </div>
              </div>

              <div className="pt-2">
                <span className="text-eyebrow">Requirement details</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-navy text-sm">
                    Product system <span className="text-orange">*</span>
                  </Label>
                  <Select value={form.productSystem} onValueChange={(v) => update('productSystem', v)}>
                    <SelectTrigger className={errors.productSystem ? 'border-red-400' : 'border-border'}>
                      <SelectValue placeholder="Select product system" />
                    </SelectTrigger>
                    <SelectContent>
                      {productSystems.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.productSystem && <p className="text-xs text-red-500">{errors.productSystem}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-navy text-sm">
                    Class (insulation mats only)
                  </Label>
                  <Select value={form.productClass} onValueChange={(v) => update('productClass', v)}>
                    <SelectTrigger className="border-border">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {insulationClasses.map((c) => (
                        <SelectItem key={c.className} value={c.className}>
                          Class {c.className} — {c.voltage} {c.voltageUnit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="voltage" className="text-navy text-sm">Operating voltage</Label>
                  <Input
                    id="voltage"
                    value={form.operatingVoltage}
                    onChange={(e) => update('operatingVoltage', e.target.value)}
                    placeholder="e.g. 11 kV"
                    className="border-border"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="dimensions" className="text-navy text-sm">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={form.dimensions}
                    onChange={(e) => update('dimensions', e.target.value)}
                    placeholder="e.g. 1m x 2m"
                    className="border-border"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="quantity" className="text-navy text-sm">Quantity</Label>
                  <Input
                    id="quantity"
                    value={form.quantity}
                    onChange={(e) => update('quantity', e.target.value)}
                    placeholder="e.g. 50 nos"
                    className="border-border"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="location" className="text-navy text-sm">Delivery location</Label>
                <Input
                  id="location"
                  value={form.deliveryLocation}
                  onChange={(e) => update('deliveryLocation', e.target.value)}
                  placeholder="City, State"
                  className="border-border"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-navy text-sm">Additional requirements</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Any other specifications, standards or project context"
                  rows={3}
                  className="border-border resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                  Something went wrong. Please try again or call us directly.
                </div>
              )}

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  className="border-border text-navy hover:bg-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-orange hover:bg-orange-hover text-white font-medium"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="size-4 mr-1 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit request
                      <ArrowRight className="size-4 ml-1" />
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
