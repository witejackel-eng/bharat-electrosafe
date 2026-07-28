'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { company } from '@/data/company';
import { Phone, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/* ────────────────────────────────────────────
   Zod schema
   ──────────────────────────────────────────── */

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  enquiryType: z.enum(['general', 'product-info', 'quote', 'support', 'datasheet'], {
    message: 'Please select an enquiry type',
  }),
  productInterest: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  operatingVoltage: z.string().optional(),
  requiredDimensions: z.string().optional(),
  quantity: z.string().optional(),
  deliveryLocation: z.string().optional(),
  _honeypot: z.string().max(0).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ────────────────────────────────────────────
   Enquiry types
   ──────────────────────────────────────────── */
const enquiryTypes = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'product-info', label: 'Product Information' },
  { value: 'quote', label: 'Request Quote' },
  { value: 'support', label: 'Technical Support' },
  { value: 'datasheet', label: 'Product Datasheet Request' },
];

const productInterests = [
  { value: 'eim', label: 'Electrical Insulating Mats' },
  { value: 'csim', label: 'Coloured Strip Mats' },
  { value: 'bcim', label: 'Bi-Color Mats' },
  { value: 'agrim', label: 'Auto-Glow/Reflective Mats' },
  { value: 'bm', label: 'BharatMembrane' },
];

/* ────────────────────────────────────────────
   URL prefill helper
   Reads query params set by "Request datasheet" / "Request document" links.
   ──────────────────────────────────────────── */
function readPrefillFromUrl(): {
  enquiryType: ContactFormData['enquiryType'] | undefined;
  message: string;
  productInterest: string | undefined;
} {
  try {
    const params = new URLSearchParams(window.location.search);
    const subject = params.get('subject');
    const product = params.get('product');
    const message = params.get('message');

    let enquiryType: ContactFormData['enquiryType'] | undefined = undefined;
    if (subject === 'Product Datasheet Request') {
      enquiryType = 'datasheet';
    }

    let productInterest: string | undefined;
    if (product) {
      const known = productInterests.find(
        (p) => p.label.toLowerCase() === product.toLowerCase()
      );
      if (known) productInterest = known.value;
    }

    return {
      enquiryType,
      message: message ?? '',
      productInterest,
    };
  } catch {
    return { enquiryType: undefined, message: '', productInterest: undefined };
  }
}

/* ────────────────────────────────────────────
   EnquiryQuoteLayout component
   ──────────────────────────────────────────── */

export default function EnquiryQuoteLayout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  /* Read query params on first client render so the form starts with the
     prefilled values. This avoids effect-timing issues with the controlled
     Radix Select, which needs the value present on the initial render. */
  const prefilled = typeof window !== 'undefined'
    ? readPrefillFromUrl()
    : { enquiryType: undefined, message: '', productInterest: undefined };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      enquiryType: prefilled.enquiryType,
      productInterest: prefilled.productInterest,
      message: prefilled.message,
      operatingVoltage: '',
      requiredDimensions: '',
      quantity: '',
      deliveryLocation: '',
      _honeypot: '',
    },
  });

  const enquiryType = watch('enquiryType');
  const isQuoteRequest = enquiryType === 'quote';

  /* If the prefilled message was loaded, keep it in sync in case the user
     navigates again. The enquiry type + product are already set via
     defaultValues above. */
  useEffect(() => {
    if (prefilled.message) {
      setValue('message', prefilled.message, { shouldValidate: true });
    }
  }, [prefilled.message, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state: replace form with confirmation
  if (submitted) {
    return (
      <section className="section-padding-major page-horizontal-padding bg-be-white">
        <div className="container-site">
          <div className="max-w-xl mx-auto text-center py-12">
            <div className="flex items-center justify-center mb-6">
              <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="size-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-section-h2 text-be-charcoal-950 mb-3">
              Thank you!
            </h2>
            <p className="text-body-large text-be-grey-650 mb-2">
              Your enquiry has been submitted successfully.
            </p>
            <p className="text-body text-be-grey-650 mb-8">
              Our team will respond within 24 business hours. If urgent, feel free to call us directly.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <PrimaryButton onClick={() => setSubmitted(false)}>
                Submit Another Enquiry
              </PrimaryButton>
              <SecondaryButton href={`tel:${company.phonePrimaryTel}`}>
                <Phone className="size-4 mr-1.5" />
                Call Us Now
              </SecondaryButton>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding-major page-horizontal-padding bg-be-white">
      <div className="container-site">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left — Contact Form (7/12) */}
          <div className="reveal-up lg:w-7/12">
            <h2 className="text-section-h2 text-be-charcoal-950 mb-2">
              Send Us an Enquiry
            </h2>
            <p className="text-body-large text-be-grey-650 mb-8">
              Fill in the form below and our team will respond within 24 business hours.
            </p>

            {/* Inline error message */}
            {submitError && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
                <p className="font-semibold">Something went wrong. Please try again or contact us directly.</p>
                <p className="text-body mt-1">
                  You can reach us at {company.email} or call {company.phonePrimary}.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
              {/* Honeypot field (hidden from users) */}
              <div className="sr-only" aria-hidden="true">
                <input type="text" {...register('_honeypot')} tabIndex={-1} autoComplete="off" />
              </div>

              {/* Row 1: Name | Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-be-charcoal-800">
                    Name <span className="text-be-yellow-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    disabled={isSubmitting}
                    className={cn(
                      'h-11 rounded-lg border bg-be-white px-4 text-base outline-none transition-colors',
                      'border-be-grey-250 focus:border-be-yellow-500 focus:ring-2 focus:ring-be-yellow-500/20',
                      errors.name && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
                      isSubmitting && 'opacity-60 cursor-not-allowed'
                    )}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <span className="text-sm text-red-600">{errors.name.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-sm font-medium text-be-charcoal-800">
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    {...register('company')}
                    disabled={isSubmitting}
                    className={cn(
                      'h-11 rounded-lg border border-be-grey-250 bg-be-white px-4 text-base outline-none transition-colors focus:border-be-yellow-500 focus:ring-2 focus:ring-be-yellow-500/20',
                      isSubmitting && 'opacity-60 cursor-not-allowed'
                    )}
                    placeholder="Company name"
                  />
                </div>
              </div>

              {/* Row 2: Email | Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-be-charcoal-800">
                    Email <span className="text-be-yellow-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    disabled={isSubmitting}
                    className={cn(
                      'h-11 rounded-lg border bg-be-white px-4 text-base outline-none transition-colors',
                      'border-be-grey-250 focus:border-be-yellow-500 focus:ring-2 focus:ring-be-yellow-500/20',
                      errors.email && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
                      isSubmitting && 'opacity-60 cursor-not-allowed'
                    )}
                    placeholder="you@yourcompany.in"
                  />
                  {errors.email && (
                    <span className="text-sm text-red-600">{errors.email.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-medium text-be-charcoal-800">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    disabled={isSubmitting}
                    className={cn(
                      'h-11 rounded-lg border border-be-grey-250 bg-be-white px-4 text-base outline-none transition-colors focus:border-be-yellow-500 focus:ring-2 focus:ring-be-yellow-500/20',
                      isSubmitting && 'opacity-60 cursor-not-allowed'
                    )}
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              {/* Row 3: Enquiry type | Product interest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="enquiryType" className="text-sm font-medium text-be-charcoal-800">
                    Enquiry Type <span className="text-be-yellow-500">*</span>
                  </label>
                  <Select
                    value={enquiryType}
                    onValueChange={(val) => setValue('enquiryType', val as ContactFormData['enquiryType'], { shouldValidate: true })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger
                      className={cn(
                        'h-11 rounded-lg border bg-be-white text-base',
                        'border-be-grey-250 focus:border-be-yellow-500',
                        errors.enquiryType && 'border-red-400',
                        isSubmitting && 'opacity-60 cursor-not-allowed'
                      )}
                    >
                      <SelectValue placeholder="Select enquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      {enquiryTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.enquiryType && (
                    <span className="text-sm text-red-600">{errors.enquiryType.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="productInterest" className="text-sm font-medium text-be-charcoal-800">
                    Product Interest
                  </label>
                  <Select
                    value={watch('productInterest')}
                    onValueChange={(val) => setValue('productInterest', val)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className={cn(
                      'h-11 rounded-lg border border-be-grey-250 bg-be-white text-base focus:border-be-yellow-500',
                      isSubmitting && 'opacity-60 cursor-not-allowed'
                    )}
                    >
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {productInterests.map((product) => (
                        <SelectItem key={product.value} value={product.value}>
                          {product.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 4: Message (full width) */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-be-charcoal-800">
                  Message <span className="text-be-yellow-500">*</span>
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={4}
                  disabled={isSubmitting}
                  className={cn(
                    'rounded-lg border bg-be-white px-4 py-3 text-base outline-none transition-colors min-h-[120px] resize-y',
                    'border-be-grey-250 focus:border-be-yellow-500 focus:ring-2 focus:ring-be-yellow-500/20',
                    errors.message && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
                    isSubmitting && 'opacity-60 cursor-not-allowed'
                  )}
                  placeholder="Describe your requirement in detail…"
                />
                {errors.message && (
                  <span className="text-sm text-red-600">{errors.message.message}</span>
                )}
              </div>

              {/* Conditional fields for Quote Request */}
              {isQuoteRequest && (
                <div className="flex flex-col gap-4 p-4 rounded-lg bg-be-yellow-50 border border-be-grey-250">
                  <p className="text-sm font-semibold text-be-charcoal-950">
                    Additional details for quotation
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="operatingVoltage" className="text-sm font-medium text-be-charcoal-800">
                        Operating Voltage
                      </label>
                      <input
                        id="operatingVoltage"
                        type="text"
                        {...register('operatingVoltage')}
                        disabled={isSubmitting}
                        className={cn(
                          'h-11 rounded-lg border border-be-grey-250 bg-be-white px-4 text-base outline-none transition-colors focus:border-be-yellow-500 focus:ring-2 focus:ring-be-yellow-500/20',
                          isSubmitting && 'opacity-60 cursor-not-allowed'
                        )}
                        placeholder="e.g. 11 kV"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="requiredDimensions" className="text-sm font-medium text-be-charcoal-800">
                        Required Dimensions
                      </label>
                      <input
                        id="requiredDimensions"
                        type="text"
                        {...register('requiredDimensions')}
                        disabled={isSubmitting}
                        className={cn(
                          'h-11 rounded-lg border border-be-grey-250 bg-be-white px-4 text-base outline-none transition-colors focus:border-be-yellow-500 focus:ring-2 focus:ring-be-yellow-500/20',
                          isSubmitting && 'opacity-60 cursor-not-allowed'
                        )}
                        placeholder="e.g. 1000mm × 2000mm"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="quantity" className="text-sm font-medium text-be-charcoal-800">
                        Quantity
                      </label>
                      <input
                        id="quantity"
                        type="text"
                        {...register('quantity')}
                        disabled={isSubmitting}
                        className={cn(
                          'h-11 rounded-lg border border-be-grey-250 bg-be-white px-4 text-base outline-none transition-colors focus:border-be-yellow-500 focus:ring-2 focus:ring-be-yellow-500/20',
                          isSubmitting && 'opacity-60 cursor-not-allowed'
                        )}
                        placeholder="e.g. 25 mats"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="deliveryLocation" className="text-sm font-medium text-be-charcoal-800">
                        Delivery Location
                      </label>
                      <input
                        id="deliveryLocation"
                        type="text"
                        {...register('deliveryLocation')}
                        disabled={isSubmitting}
                        className={cn(
                          'h-11 rounded-lg border border-be-grey-250 bg-be-white px-4 text-base outline-none transition-colors focus:border-be-yellow-500 focus:ring-2 focus:ring-be-yellow-500/20',
                          isSubmitting && 'opacity-60 cursor-not-allowed'
                        )}
                        placeholder="City / Pin code"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit */}
              <div className="mt-2">
                <PrimaryButton
                  type="submit"
                  className={cn('w-full sm:w-auto', isSubmitting && 'opacity-70 pointer-events-none')}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      Sending…
                    </span>
                  ) : 'Send Enquiry'}
                </PrimaryButton>
              </div>
            </form>
          </div>

          {/* Right — Contact assistance (5/12) */}
          <div className="reveal-up lg:w-5/12 flex flex-col gap-6">
            <div className="p-5 rounded-lg border border-be-grey-250 bg-be-cream flex flex-col gap-4">
              <p className="text-body-large font-semibold text-be-charcoal-950">
                Need immediate assistance?
              </p>
              <p className="text-body text-be-grey-650">
                Call our sales team directly for product selection guidance and quotation support.
              </p>
              <div className="flex flex-wrap gap-3">
                <SecondaryButton href={`tel:${company.phonePrimaryTel}`}>
                  <Phone className="size-4 mr-1.5" />
                  Call Sales
                </SecondaryButton>
                <SecondaryButton href={company.whatsapp.href} onClick={() => {}}>
                  <MessageCircle className="size-4 mr-1.5" />
                  WhatsApp
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
