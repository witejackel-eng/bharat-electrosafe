
import { company } from '@/data/company';
import { FAQ, type FAQItem } from '@/components/ui/FAQ';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { SectionShell } from '@/components/ui/SectionShell';
import { ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import { homeFaqs } from '@/data/faqs';

/* The visible homepage FAQ accordion consumes the central `homeFaqs`
   array from src/data/faqs. FAQPage JSON-LD is intentionally not
   emitted (spec section 17: Google removed FAQ rich-result display
   in 2026). The visible FAQ content is retained for users. */
const faqItems: FAQItem[] = homeFaqs;

/**
 * HomeFAQCTA — final content section before the footer.
 *
 * Editorial two-column layout (per final homepage production pass):
 *   - Left column  (~30–34%): eyebrow + H2 + short supporting paragraph.
 *   - Right column (~66–70%): accessible accordion.
 *
 * Tablet may stack; mobile remains left aligned. A compact conversion CTA
 * sits below the FAQ grid within the same section so FAQ remains the final
 * content section.
 */
export default function HomeFAQCTA() {
  return (
    <SectionShell
      variant="conversion"
      bg="bg-be-warm-white"
      topRule
      ariaLabel="Frequently asked questions and contact"
    >
      {/* Editorial two-column FAQ: intro left, accordion right. */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.1fr] gap-8 lg:gap-12 reveal-up">
        {/* Left — intro (~32%) */}
        <div className="max-w-xl">
          <SectionHeader
            eyebrow="COMMON QUESTIONS"
            title="Frequently Asked Questions"
            supportingText="Practical answers about our products, certifications, sizing and enquiry process — all in one place."
          />
        </div>

        {/* Right — accordion (~68%) */}
        <div>
          <FAQ items={faqItems} />
        </div>
      </div>

      {/* CTA — compact conversion block below the FAQ grid. */}
      <div className="mt-10 lg:mt-12 flex flex-col items-center text-center gap-4 max-w-2xl mx-auto reveal-up">
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
