'use client';

import { useState, useCallback } from 'react';
import { products } from '@/data/products';

/* ── Product dropdown items (exactly 5 approved products) ── */
const productOptions = products.map((p) => ({
  value: p.slug,
  label: p.name,
}));

/* ── Enquiry types ── */
const enquiryTypes = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'quotation', label: 'Product Quotation' },
];

/* ── Product class options ── */
const classOptions = [
  { value: 'class-a', label: 'Class A' },
  { value: 'class-b', label: 'Class B' },
  { value: 'class-c', label: 'Class C' },
  { value: 'not-applicable', label: 'Not applicable' },
];

/* ── Form state type ── */
interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  enquiryType: string;
  product: string;
  message: string;
  // Quotation-specific fields
  productClass: string;
  operatingVoltage: string;
  thickness: string;
  width: string;
  length: string;
  quantity: string;
  requiredColourOrStrip: string;
  deliveryLocation: string;
  installationRequirement: string;
  // Privacy consent
  privacyConsent: boolean;
}

const initialFormData: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  enquiryType: '',
  product: '',
  message: '',
  productClass: '',
  operatingVoltage: '',
  thickness: '',
  width: '',
  length: '',
  quantity: '',
  requiredColourOrStrip: '',
  deliveryLocation: '',
  installationRequirement: '',
  privacyConsent: false,
};

/* ── Validation errors type ── */
interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  enquiryType?: string;
  product?: string;
  message?: string;
  privacyConsent?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isQuotation = formData.enquiryType === 'quotation';

  /* ── Handle input changes ── */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
      // Clear error for this field when user edits it
      setErrors((prev) => {
        if (prev[name as keyof FormErrors]) {
          const updated = { ...prev };
          delete updated[name as keyof FormErrors];
          return updated;
        }
        return prev;
      });
    },
    []
  );

  /* ── Handle checkbox change ── */
  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      setErrors((prev) => {
        if (prev[name as keyof FormErrors]) {
          const updated = { ...prev };
          delete updated[name as keyof FormErrors];
          return updated;
        }
        return prev;
      });
    },
    []
  );

  /* ── Validate form ── */
  const validate = useCallback((): FormErrors => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.company.trim()) errs.company = 'Company is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = 'Enter a valid email address';
    if (!formData.phone.trim()) errs.phone = 'Phone is required';
    if (!formData.enquiryType) errs.enquiryType = 'Select an enquiry type';
    if (!formData.product) errs.product = 'Select a product';
    if (!formData.message.trim()) errs.message = 'Message is required';
    if (!formData.privacyConsent) errs.privacyConsent = 'You must accept the privacy policy';
    return errs;
  }, [formData]);

  /* ── Handle submission ── */
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitError(null);

      const errs = validate();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }

      setSubmitting(true);

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({ error: 'Submission failed' }));
          setSubmitError(data.error || 'Submission failed. Please try again.');
          return;
        }

        setSubmitted(true);
      } catch {
        setSubmitError('Network error. Please check your connection and try again.');
      } finally {
        setSubmitting(false);
      }
    },
    [formData, validate]
  );

  /* ── Success state ── */
  if (submitted) {
    return (
      <div className="p-6 border border-yellow-500/40 rounded-md bg-yellow-50/50 text-center">
        <div className="w-12 h-12 rounded-full bg-yellow-500 mx-auto mb-4 flex items-center justify-center">
          <svg className="size-6 text-charcoal-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-[1.0625rem] font-semibold text-charcoal-950 mb-2">
          Enquiry submitted successfully
        </h3>
        <p className="text-body text-grey-600">
          Thank you for your enquiry. Our team will review your message and respond within
          as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* ── Honeypot field (hidden from humans, bots will fill) ── */}
      <div className="absolute opacity-0 h-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website_url">Website URL</label>
        <input
          type="text"
          id="website_url"
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* ── Name ── */}
      <div>
        <label htmlFor="name" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
          Name <span className="text-yellow-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
          className={`w-full px-4 py-3 text-[1rem] border rounded-md bg-white transition-colors min-h-[44px] ${
            errors.name ? 'border-destructive focus:border-destructive' : 'border-grey-300 focus:border-yellow-500'
          } focus:ring-2 focus:ring-yellow-500/20 outline-none`}
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="text-[0.8125rem] text-destructive mt-1">{errors.name}</p>
        )}
      </div>

      {/* ── Company ── */}
      <div>
        <label htmlFor="company" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
          Company <span className="text-yellow-500">*</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          autoComplete="organization"
          className={`w-full px-4 py-3 text-[1rem] border rounded-md bg-white transition-colors min-h-[44px] ${
            errors.company ? 'border-destructive focus:border-destructive' : 'border-grey-300 focus:border-yellow-500'
          } focus:ring-2 focus:ring-yellow-500/20 outline-none`}
          placeholder="Your company or organisation"
        />
        {errors.company && (
          <p className="text-[0.8125rem] text-destructive mt-1">{errors.company}</p>
        )}
      </div>

      {/* ── Email ── */}
      <div>
        <label htmlFor="email" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
          Email <span className="text-yellow-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          className={`w-full px-4 py-3 text-[1rem] border rounded-md bg-white transition-colors min-h-[44px] ${
            errors.email ? 'border-destructive focus:border-destructive' : 'border-grey-300 focus:border-yellow-500'
          } focus:ring-2 focus:ring-yellow-500/20 outline-none`}
          placeholder="your.email@company.com"
        />
        {errors.email && (
          <p className="text-[0.8125rem] text-destructive mt-1">{errors.email}</p>
        )}
      </div>

      {/* ── Phone ── */}
      <div>
        <label htmlFor="phone" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
          Phone <span className="text-yellow-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          autoComplete="tel"
          className={`w-full px-4 py-3 text-[1rem] border rounded-md bg-white transition-colors min-h-[44px] ${
            errors.phone ? 'border-destructive focus:border-destructive' : 'border-grey-300 focus:border-yellow-500'
          } focus:ring-2 focus:ring-yellow-500/20 outline-none`}
          placeholder="+91 XXXXX XXXXX"
        />
        {errors.phone && (
          <p className="text-[0.8125rem] text-destructive mt-1">{errors.phone}</p>
        )}
      </div>

      {/* ── Enquiry Type ── */}
      <div>
        <label htmlFor="enquiryType" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
          Enquiry type <span className="text-yellow-500">*</span>
        </label>
        <select
          id="enquiryType"
          name="enquiryType"
          value={formData.enquiryType}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 text-[1rem] border rounded-md bg-white transition-colors min-h-[44px] ${
            errors.enquiryType ? 'border-destructive focus:border-destructive' : 'border-grey-300 focus:border-yellow-500'
          } focus:ring-2 focus:ring-yellow-500/20 outline-none appearance-none`}
        >
          <option value="">Select enquiry type</option>
          {enquiryTypes.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        {errors.enquiryType && (
          <p className="text-[0.8125rem] text-destructive mt-1">{errors.enquiryType}</p>
        )}
      </div>

      {/* ── Product ── */}
      <div>
        <label htmlFor="product" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
          Product <span className="text-yellow-500">*</span>
        </label>
        <select
          id="product"
          name="product"
          value={formData.product}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 text-[1rem] border rounded-md bg-white transition-colors min-h-[44px] ${
            errors.product ? 'border-destructive focus:border-destructive' : 'border-grey-300 focus:border-yellow-500'
          } focus:ring-2 focus:ring-yellow-500/20 outline-none appearance-none`}
        >
          <option value="">Select a product</option>
          {productOptions.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
        {errors.product && (
          <p className="text-[0.8125rem] text-destructive mt-1">{errors.product}</p>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════
          Conditional Quotation Fields
         ════════════════════════════════════════════════════════════ */}
      {isQuotation && (
        <div className="border border-yellow-500/30 rounded-md bg-yellow-50/30 p-5 flex flex-col gap-5">
          <h3 className="text-[1rem] font-semibold text-charcoal-950">
            Quotation details
          </h3>
          <p className="text-small-meta text-grey-600">
            Provide specifications for your product quotation request.
          </p>

          {/* ── Product Class ── */}
          <div>
            <label htmlFor="productClass" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
              Product class
            </label>
            <select
              id="productClass"
              name="productClass"
              value={formData.productClass}
              onChange={handleChange}
              className="w-full px-4 py-3 text-[1rem] border border-grey-300 rounded-md bg-white transition-colors min-h-[44px] focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none appearance-none"
            >
              <option value="">Select class</option>
              {classOptions.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* ── Operating Voltage ── */}
          <div>
            <label htmlFor="operatingVoltage" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
              Operating voltage
            </label>
            <input
              type="text"
              id="operatingVoltage"
              name="operatingVoltage"
              value={formData.operatingVoltage}
              onChange={handleChange}
              className="w-full px-4 py-3 text-[1rem] border border-grey-300 rounded-md bg-white transition-colors min-h-[44px] focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none"
              placeholder="e.g. 3.3 kV, 11 kV, 33 kV"
            />
          </div>

          {/* ── Thickness ── */}
          <div>
            <label htmlFor="thickness" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
              Thickness
            </label>
            <input
              type="text"
              id="thickness"
              name="thickness"
              value={formData.thickness}
              onChange={handleChange}
              className="w-full px-4 py-3 text-[1rem] border border-grey-300 rounded-md bg-white transition-colors min-h-[44px] focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none"
              placeholder="e.g. 2.0 mm, 2.5 mm, 3.0 mm"
            />
          </div>

          {/* ── Width ── */}
          <div>
            <label htmlFor="width" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
              Width
            </label>
            <input
              type="text"
              id="width"
              name="width"
              value={formData.width}
              onChange={handleChange}
              className="w-full px-4 py-3 text-[1rem] border border-grey-300 rounded-md bg-white transition-colors min-h-[44px] focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none"
              placeholder="e.g. 1000 mm"
            />
          </div>

          {/* ── Length ── */}
          <div>
            <label htmlFor="length" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
              Length
            </label>
            <input
              type="text"
              id="length"
              name="length"
              value={formData.length}
              onChange={handleChange}
              className="w-full px-4 py-3 text-[1rem] border border-grey-300 rounded-md bg-white transition-colors min-h-[44px] focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none"
              placeholder="e.g. 10 m"
            />
          </div>

          {/* ── Quantity ── */}
          <div>
            <label htmlFor="quantity" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min={1}
              className="w-full px-4 py-3 text-[1rem] border border-grey-300 rounded-md bg-white transition-colors min-h-[44px] focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none"
              placeholder="Number of mats or rolls"
            />
          </div>

          {/* ── Required Colour or Strip ── */}
          <div>
            <label htmlFor="requiredColourOrStrip" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
              Required colour or strip
            </label>
            <input
              type="text"
              id="requiredColourOrStrip"
              name="requiredColourOrStrip"
              value={formData.requiredColourOrStrip}
              onChange={handleChange}
              className="w-full px-4 py-3 text-[1rem] border border-grey-300 rounded-md bg-white transition-colors min-h-[44px] focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none"
              placeholder="e.g. Yellow strip, Bi-colour red/black, No strip"
            />
          </div>

          {/* ── Delivery Location ── */}
          <div>
            <label htmlFor="deliveryLocation" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
              Delivery location
            </label>
            <input
              type="text"
              id="deliveryLocation"
              name="deliveryLocation"
              value={formData.deliveryLocation}
              onChange={handleChange}
              className="w-full px-4 py-3 text-[1rem] border border-grey-300 rounded-md bg-white transition-colors min-h-[44px] focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none"
              placeholder="City, state or site address"
            />
          </div>

          {/* ── Installation Requirement ── */}
          <div>
            <label htmlFor="installationRequirement" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
              Installation requirement
            </label>
            <input
              type="text"
              id="installationRequirement"
              name="installationRequirement"
              value={formData.installationRequirement}
              onChange={handleChange}
              className="w-full px-4 py-3 text-[1rem] border border-grey-300 rounded-md bg-white transition-colors min-h-[44px] focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none"
              placeholder="e.g. Loose-laid, adhesive-fixed, cut-to-size"
            />
          </div>
        </div>
      )}

      {/* ── Message ── */}
      <div>
        <label htmlFor="message" className="block text-[1rem] font-medium text-charcoal-950 mb-1.5">
          Message <span className="text-yellow-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className={`w-full px-4 py-3 text-[1rem] border rounded-md bg-white transition-colors min-h-[120px] resize-y ${
            errors.message ? 'border-destructive focus:border-destructive' : 'border-grey-300 focus:border-yellow-500'
          } focus:ring-2 focus:ring-yellow-500/20 outline-none`}
          placeholder={isQuotation ? 'Any additional requirements or questions about the quotation' : 'Your enquiry or question'}
        />
        {errors.message && (
          <p className="text-[0.8125rem] text-destructive mt-1">{errors.message}</p>
        )}
      </div>

      {/* ── Privacy Consent Checkbox ── */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacyConsent"
          name="privacyConsent"
          checked={formData.privacyConsent}
          onChange={handleCheckboxChange}
          className="mt-1 size-[20px] rounded border-grey-300 text-yellow-500 focus:ring-yellow-500/20 cursor-pointer accent-[#FFC400]"
        />
        <label htmlFor="privacyConsent" className="text-[0.9375rem] text-charcoal-800 leading-relaxed cursor-pointer">
          I consent to Bharat Electrosafe processing my personal data in accordance with the{' '}
          <a href="/privacy-policy" className="text-yellow-600 hover:text-yellow-500 underline underline-offset-2">
            Privacy Policy
          </a>
          . <span className="text-yellow-500">*</span>
        </label>
      </div>
      {errors.privacyConsent && (
        <p className="text-[0.8125rem] text-destructive">{errors.privacyConsent}</p>
      )}

      {/* ── Submit Error ── */}
      {submitError && (
        <div className="p-4 border border-destructive/40 rounded-md bg-destructive/5 text-[0.9375rem] text-destructive">
          {submitError}
        </div>
      )}

      {/* ── Submit Button ── */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-charcoal-950 font-semibold text-[1rem] px-6 py-3 rounded-md transition-colors min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting...' : isQuotation ? 'Submit quotation request' : 'Submit enquiry'}
      </button>
    </form>
  );
}
