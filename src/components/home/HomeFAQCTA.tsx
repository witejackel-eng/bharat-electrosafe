'use client';

import { company } from '@/data/company';
import { FAQ, type FAQItem } from '@/components/ui/FAQ';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { ShieldCheck, Phone, MessageCircle } from 'lucide-react';

const faqItems: FAQItem[] = [
  {
    question: 'What standards do your insulating mats comply with?',
    answer:
      'Our electrical insulating mats comply with IS 15652:2006, the Indian Standard for electrical insulating mats. Products are BIS certified and tested by ERDA and NTH.',
  },
  {
    question: 'Can you supply custom dimensions?',
    answer:
      'Yes. We provide custom dimensions and configurations to meet specific installation requirements. Share your required dimensions, quantity and delivery location for a tailored quotation.',
  },
  {
    question: 'How do I select the correct mat for my application?',
    answer:
      'Selection depends on your working voltage, installation environment and regulatory requirements. Contact our technical sales team with your operating voltage and application details for guidance.',
  },
  {
    question: 'What is the typical lead time for orders?',
    answer:
      'Lead time varies based on product, quantity and custom requirements. Standard products ship faster, while custom dimensions require additional production time. Our team confirms timelines with each quotation.',
  },
];

export default function HomeFAQCTA() {
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions and contact"
      className="bg-be-warm-white section-padding-supporting"
    >
      <div className="container-site page-horizontal-padding">
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
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-be-yellow-50 border border-be-yellow-400/30 text-be-yellow-600 shadow-sm">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <h2 className="text-section-h2 text-be-charcoal-950">
            Need help selecting the correct product?
          </h2>

          <p className="text-body-large text-be-grey-650">
            Share your operating voltage, dimensions, quantity and delivery
            location.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-2">
            <PrimaryButton href="/contact-us" size="lg">
              Request a Quote
            </PrimaryButton>

            <SecondaryButton href={`tel:${company.phonePrimaryTel}`}>
              <Phone className="h-4 w-4 mr-2" />
              Call Sales
            </SecondaryButton>

            <SecondaryButton href={company.whatsapp.href} className="gap-2">
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
