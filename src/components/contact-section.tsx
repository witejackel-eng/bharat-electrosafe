'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, MessageCircle, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { company } from '@/data/company';
import { contactProductOptions } from '@/data/products';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  companyName: z.string().optional(),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(6, 'Phone number is required'),
  enquiryType: z.string().min(1, 'Select an enquiry type'),
  product: z.string().optional(),
  message: z.string().min(10, 'Please tell us a bit more (min 10 characters)'),
  voltage: z.string().optional(),
  dimensions: z.string().optional(),
  quantity: z.string().optional(),
  deliveryLocation: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const enquiryTypes = [
  'Product enquiry',
  'Quotation request',
  'Technical specification',
  'Bulk / project order',
  'Partnership / dealership',
  'Other',
];

interface FallbackInfo {
  phone: string;
  phoneTel: string;
  email: string;
  whatsapp: string;
  whatsappLabel: string;
  address: string;
}

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string; fallback?: FallbackInfo };

export function ContactSection() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      enquiryType: '',
      product: '',
    },
  });

  const enquiryType = watch('enquiryType');
  const product = watch('product');

  const onSubmit = async (values: FormValues) => {
    setStatus({ kind: 'submitting' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus({ kind: 'success', message: data.message });
        reset();
      } else {
        setStatus({
          kind: 'error',
          message: data.message || 'Something went wrong. Please try again or contact us directly.',
          fallback: data.fallback,
        });
      }
    } catch {
      setStatus({
        kind: 'error',
        message: 'Network error. Please contact us directly using the details below.',
      });
    }
  };

  return (
    <section id="contact" className="scroll-mt-16 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
            Contact Us
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Talk to our team
          </h2>
          <p className="mt-3 text-muted-foreground">
            Send us your enquiry and we&apos;ll route it to the right product
            specialist. For urgent requirements, call or WhatsApp us directly.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          {/* Contact details */}
          <aside className="lg:col-span-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground">
                Reach us directly
              </h3>
              <ul className="mt-4 flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">Phone</p>
                    <a
                      href={`tel:${company.phonePrimaryTel}`}
                      className="text-muted-foreground hover:text-foreground hover:underline"
                    >
                      {company.phonePrimary}
                    </a>
                    <br />
                    <a
                      href={`tel:${company.phoneSecondaryTel}`}
                      className="text-muted-foreground hover:text-foreground hover:underline"
                    >
                      {company.phoneSecondary}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">Email</p>
                    <a
                      href={`mailto:${company.email}`}
                      className="text-muted-foreground hover:text-foreground hover:underline"
                    >
                      {company.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">WhatsApp</p>
                    <a
                      href={company.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground hover:underline"
                    >
                      {company.whatsapp.label}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground">{company.address.full}</p>
                  </div>
                </li>
              </ul>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="rounded-lg border border-border bg-card p-6"
            >
              {/* Success state */}
              {status.kind === 'success' && (
                <div
                  className="mb-4 flex items-start gap-2 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-800"
                  role="status"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium">Message delivered</p>
                    <p className="mt-0.5">{status.message}</p>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      className="mt-1 h-auto p-0"
                      onClick={() => setStatus({ kind: 'idle' })}
                    >
                      Send another message
                    </Button>
                  </div>
                </div>
              )}

              {/* Error state */}
              {status.kind === 'error' && (
                <div
                  className="mb-4 flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
                  role="alert"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium">We couldn&apos;t deliver your message automatically</p>
                    <p className="mt-0.5">{status.message}</p>
                    {status.fallback && (
                      <ul className="mt-2 flex flex-col gap-1 text-xs">
                        <li>Phone: <a className="underline" href={`tel:${status.fallback.phoneTel}`}>{status.fallback.phone}</a></li>
                        <li>Email: <a className="underline" href={`mailto:${status.fallback.email}`}>{status.fallback.email}</a></li>
                        <li>WhatsApp: <a className="underline" href={status.fallback.whatsapp} target="_blank" rel="noopener noreferrer">{status.fallback.whatsappLabel}</a></li>
                      </ul>
                    )}
                  </div>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="companyName">Company</Label>
                  <Input
                    id="companyName"
                    autoComplete="organization"
                    {...register('companyName')}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone">
                    Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-xs text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="enquiryType">
                    Enquiry type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={enquiryType}
                    onValueChange={(v) => setValue('enquiryType', v, { shouldValidate: true })}
                  >
                    <SelectTrigger
                      id="enquiryType"
                      aria-invalid={!!errors.enquiryType}
                      aria-describedby={errors.enquiryType ? 'enquiryType-error' : undefined}
                    >
                      <SelectValue placeholder="Select enquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      {enquiryTypes.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.enquiryType && (
                    <p id="enquiryType-error" className="text-xs text-destructive">
                      {errors.enquiryType.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="product">Product of interest</Label>
                  <Select
                    value={product}
                    onValueChange={(v) => setValue('product', v)}
                  >
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Select a product (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactProductOptions.map((p) => (
                        <SelectItem key={p.value} value={p.label}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-1.5">
                <Label htmlFor="message">
                  Message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  {...register('message')}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Optional technical details */}
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                  Add technical details (optional)
                </summary>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="voltage">Voltage class / requirement</Label>
                    <Input id="voltage" placeholder="e.g. Class B, 11 KV" {...register('voltage')} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input id="dimensions" placeholder="e.g. 1 m × 10 m roll" {...register('dimensions')} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" placeholder="e.g. 5 rolls" {...register('quantity')} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="deliveryLocation">Delivery location</Label>
                    <Input id="deliveryLocation" placeholder="City / State" {...register('deliveryLocation')} />
                  </div>
                </div>
              </details>

              <div className="mt-6">
                <Button
                  type="submit"
                  disabled={status.kind === 'submitting'}
                  className="w-full sm:w-auto gap-1.5"
                >
                  {status.kind === 'submitting' ? (
                    'Sending…'
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send enquiry
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
