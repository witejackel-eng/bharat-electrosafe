'use client';

import { FAQ, type FAQItem } from '@/components/ui/FAQ';
import { SectionShell } from '@/components/ui/SectionShell';
import type { ProductData } from '@/data/products';

interface ProductFAQProps {
  product: ProductData;
}

/* ── Product-specific questions keyed by slug ── */

const productSpecificQuestions: Record<string, FAQItem> = {
  'electrical-insulating-mats': {
    question: 'How do I select between Class A, B and C?',
    answer:
      'Class selection is based on the maximum working voltage at the installation. Class A is rated for a 3.3 kV working voltage, Class B for 11 kV and Class C for 33 kV. Choose the class that meets or exceeds the highest voltage present at the work location. When in doubt, our technical team can recommend the appropriate class based on your substation or panel specifications.',
  },
  'coloured-strip-insulating-mats': {
    question: 'What colour options are available for the strip configuration?',
    answer:
      'The standard strip configuration uses a vivid yellow marking on a black insulating base, providing clear visual cues around electrical panels and machinery. Custom colour combinations can be discussed for project-specific requirements. All variants retain the same IS 15652:2006 insulation performance.',
  },
  'bi-color-insulating-mats': {
    question: 'What is the purpose of the dual-tone design?',
    answer:
      'The dual-tone colour scheme not only enhances visual appeal but also serves as a clear indicator of safety boundaries in the workspace. The contrasting colours make hazard zones and restricted areas immediately visible, supporting safe navigation around electrical installations.',
  },
  'auto-glow-reflective-band-insulating-mats': {
    question: 'How long does the auto-glow effect last after lights-out?',
    answer:
      'The glow-in-the-dark band is charged by normal lighting during operation. After lights-out, the visible glow continues to illuminate pathways and hazard zones, supporting emergency wayfinding and exit guidance. Reflective banding also returns light from torches and emergency lamps, providing additional visibility in low-light conditions.',
  },
  'bharat-membrane': {
    question: 'Can BharatMembrane be used in below-grade and underwater applications?',
    answer:
      'Yes. BharatMembrane is engineered for use in below-grade waterproofing including basements, foundations, tunnel linings and other submerged or earth-retained structures. The membrane is available in multiple thickness variants, with thicker grades recommended for higher hydrostatic pressure and continuous water exposure.',
  },
  'bharat-hydro-seal': {
    question: 'What are PVC water stops and where are they used?',
    answer:
      'PVC water stops are flexible strips embedded in concrete joints to prevent water seepage. They are used in construction joints, expansion joints and contraction joints in basements, water tanks, retaining walls, tunnels and other below-grade structures.',
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
    <SectionShell variant="compact" bg="bg-be-warm-white" topRule>
      <FAQ
          eyebrow="FAQ"
          title={`Questions about ${product.shortName}`}
          items={items}
          className="max-w-3xl"
        />
    </SectionShell>
  );
}
