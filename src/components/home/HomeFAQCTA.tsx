
import { company } from '@/data/company';
import { FAQ, type FAQItem } from '@/components/ui/FAQ';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { SectionShell } from '@/components/ui/SectionShell';
import { ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import { homeFaqs } from '@/data/faqs';

/* The visible homepage FAQ accordion consumes the central `homeFaqs`
   array from src/data/faqs. FAQPage JSON-LD is intentionally not
   emitted (spec section 17). The visible FAQ content is retained. */
const faqItems: FAQItem[] = homeFaqs;

export default function HomeFAQCTA() {
  return (
    <SectionShell
      variant="conversion"
      bg="bg-be-warm-white"
      topRule
      ariaLabel="Frequently asked questions and contact"
    >
      {/* FAQ accordion — wider content band (720–820px) per spec.
          max-w-3xl = 768px sits comfortably inside that range. */}
      <div className="max-w-3xl mx-auto">
        <FAQ
          eyebrow="COMMON QUESTIONS"
          title="Frequently asked questions"
          supportingText="Practical answers about our products, certifications, sizing and enquiry process — all in one place."
          items={faqItems}
        />
      </div>

      {/* CTA section merged below FAQ — tighter spacing per spec.
          Reduced from mt-8 to mt-4 to remove excessive empty space. */}
      <div className="mt-4 flex flex-col items-center text-center gap-4 max-w-2xl mx-auto reveal-up">
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

        <div className="flex flex-wrap items-center justify-center gap-6 mt-1">
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
