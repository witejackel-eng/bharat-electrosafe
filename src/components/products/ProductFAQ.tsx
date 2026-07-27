'use client';

import { FAQ, type FAQItem } from '@/components/ui/FAQ';
import type { ProductData } from '@/data/products';

interface ProductFAQProps {
  product: ProductData;
}

/* ── Product-specific questions keyed by slug ── */

const productSpecificQuestions: Record<string, FAQItem> = {
  'electrical-insulating-mats': {
    question: 'How do I select between Class A, B and C?',
    answer:
      'Class selection is based on the maximum working voltage at the installation. Class A is rated for 650V AC, Class B for 1100V AC and Class C for 3300V AC. Choose the class that meets or exceeds the highest voltage present at the work location. When in doubt, our technical team can recommend the appropriate class based on your substation or panel specifications.',
  },
  'coloured-strip-insulating-mats': {
    question: 'What colour options are available for the strip configuration?',
    answer:
      'Standard colour options include yellow, red, green and blue strips on a black insulating base, following common industrial safety colour conventions. Custom colour combinations can be discussed for project-specific safety demarcation requirements. All variants retain the same IS 15652:2006 insulation performance.',
  },
  'bi-color-insulating-mats': {
    question: 'How does the bi-color construction indicate wear?',
    answer:
      'The mat is manufactured with two contrasting layers — a top working layer and a base indicator layer in a different colour. As the top layer wears down through foot traffic or equipment movement, the contrasting base colour becomes visible, signalling that the mat has reached its minimum safe thickness and should be inspected or replaced.',
  },
  'auto-glow-reflective-band-insulating-mats': {
    question: 'How long does the auto-glow effect last after lights-out?',
    answer:
      'The photoluminescent band is charged by ambient light during normal operation. After lights-out, the visible glow typically remains effective for several hours, supporting emergency wayfinding and exit guidance. Reflective banding also returns light from torches and emergency lamps, providing additional visibility in low-light conditions.',
  },
  'bharat-membrane': {
    question: 'Can BharatMembrane be used in below-grade and underwater applications?',
    answer:
      'Yes. BharatMembrane is engineered for use in below-grade waterproofing including basements, foundations, tunnel linings and other submerged or earth-retained structures. The membrane is available in multiple thickness variants, with thicker grades recommended for higher hydrostatic pressure and continuous water exposure.',
  },
};

/* ── Component ── */

export function ProductFAQ({ product }: ProductFAQProps) {
  // Generic questions tailored to each product
  const genericQuestions: FAQItem[] = [
    {
      question: `What standards does ${product.name} comply with?`,
      answer:
        'Our products comply with IS 15652:2006 and are BIS certified. Test reports from CPRI and ERDA are available on request.',
    },
    {
      question: 'What dimensions are available?',
      answer:
        'Standard and custom dimensions are available. Contact our team with your specific requirements for a tailored solution.',
    },
    {
      question: 'How do I request a quotation?',
      answer:
        'Use our contact form, call our sales team, or send a WhatsApp message with your requirements including product, dimensions, quantity and delivery location.',
    },
    {
      question: 'What is the lead time?',
      answer:
        'Lead time varies based on product and quantity. Standard products ship faster; custom dimensions require additional production time. Timelines are confirmed with each quotation.',
    },
  ];

  // Inject the product-specific question after the first generic one so the
  // list reads naturally and totals 5 questions per product.
  const specific = productSpecificQuestions[product.slug];
  const items: FAQItem[] = specific
    ? [genericQuestions[0], specific, ...genericQuestions.slice(1)]
    : genericQuestions;

  return (
    <section className="section-padding-supporting bg-be-warm-white">
      <div className="container-site page-horizontal-padding">
        <FAQ
          eyebrow="FAQ"
          title={`Questions about ${product.shortName}`}
          items={items}
          className="max-w-3xl"
        />
      </div>
    </section>
  );
}
