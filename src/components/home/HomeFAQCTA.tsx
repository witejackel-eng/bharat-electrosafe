
import { company } from '@/data/company';
import { FAQ, type FAQItem } from '@/components/ui/FAQ';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { SectionShell } from '@/components/ui/SectionShell';
import { ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import { homeFaqs } from '@/data/faqs';

/* Single source of truth: the visible homepage FAQ accordion consumes the
   same `homeFaqs` array that the homepage FAQStructuredData JSON-LD
   consumes in src/app/page.tsx. The two can never drift apart. */
const faqItems: FAQItem[] = homeFaqs;

export default function HomeFAQCTA() {
  return (
    <SectionShell
      variant="conversion"
      bg="bg-be-warm-white"
      topRule
      ariaLabel="Frequently asked questions and contact"
    >
      <div className="max-w-3xl mx-auto">
        <FAQ
          eyebrow="COMMON QUESTIONS"
          title="Frequently asked questions"
          supportingText="Quick answers to common questions about our products, certifications and enquiry process."
          items={faqItems}
        />
      </div>

      {/* CTA section merged below FAQ */}
      <div className="mt-8 flex flex-col items-center text-center gap-5 max-w-2xl mx-auto reveal-up">
        {/* Decorative shield icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-be-yellow-50 border border-be-yellow-400/30 text-be-yellow-text shadow-sm" aria-hidden="true">
          <ShieldCheck className="h-7 w-7" focusable="false" />
        </div>

        <h2 className="text-section-h2 text-be-charcoal-950">
          Need help selecting the correct product?
        </h2>

        <p className="text-body-large text-be-grey-650">
          Share your operating voltage, dimensions, quantity and delivery
          location.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-2">
          <PrimaryButton href="/contact-us?type=technical-guidance" size="lg">
            Request Technical Guidance
          </PrimaryButton>

          <SecondaryButton href={`tel:${company.phonePrimaryTel}`}>
            <Phone className="h-4 w-4 mr-2" aria-hidden="true" focusable="false" />
            Call Sales
          </SecondaryButton>

          <SecondaryButton href={company.whatsapp.href} className="gap-2">
            <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" focusable="false" />
            WhatsApp
          </SecondaryButton>
        </div>
      </div>
    </SectionShell>
  );
}
