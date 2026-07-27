'use client';

import { FAQ, type FAQItem } from '@/components/ui/FAQ';

const faqItems: FAQItem[] = [
  {
    question: 'What standards do your insulating mats comply with?',
    answer:
      'Our electrical insulating mats comply with IS 15652:2006, the Indian Standard for electrical insulating mats. Products are BIS certified and tested by CPRI and ERDA.',
  },
  {
    question: 'What voltage classes are available?',
    answer:
      'We manufacture mats in three voltage classes — Class A (up to 650V), Class B (up to 1100V), and Class C (up to 3300V) — suitable for low, medium and high voltage applications.',
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
  {
    question: 'Do you provide test certificates with orders?',
    answer:
      'Yes. Test certificates and relevant documentation are provided with all orders. Type test reports from CPRI/ERDA and BIS certification details are available on request.',
  },
];

export default function HomeFAQ() {
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
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
      </div>
    </section>
  );
}
