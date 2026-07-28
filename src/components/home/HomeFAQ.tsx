'use client';

import { FAQ, type FAQItem } from '@/components/ui/FAQ';
import { homeFaqs } from '@/data/faqs';

/* Single source of truth: the visible homepage FAQ accordion consumes the
   same `homeFaqs` array that the homepage FAQStructuredData JSON-LD
   consumes in src/app/page.tsx. The two can never drift apart. */
const faqItems: FAQItem[] = homeFaqs;

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
