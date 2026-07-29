/**
 * FAQ data — single source of truth for the entire site.
 *
 * Both the visible FAQ components (HomeFAQCTA, ProductFAQ) and the JSON-LD
 * FAQ structured data (FAQStructuredData, ProductPageStructuredData) consume
 * these exact arrays. There is no second array anywhere in the codebase.
 *
 * Wording rules:
 *   - Electrical insulating products (electrical-insulating-mats,
 *     coloured-strip-insulating-mats, bi-color-insulating-mats,
 *     auto-glow-reflective-band-insulating-mats) may reference
 *     IS 15652:2006, BIS Licence CM/L:8800129617, and ERDA/NTH test reports.
 *   - BharatMembrane must NOT inherit IS 15652, electrical insulation
 *     classes, the BIS insulating-mat licence, or ERDA/NTH electrical-mat
 *     claims. It references IS 15909:2020 conservatively.
 *   - Bharat Hydro Seal must NOT inherit IS 15652, electrical insulation
 *     classes, the BIS insulating-mat licence, or ERDA/NTH electrical-mat
 *     claims. It references IS 15058:2002 conservatively.
 *   - CPRI is NOT referenced anywhere. No CPRI document has been verified.
 *   - No claim is described as "BIS approval" unless a genuine
 *     product-specific approval document has been verified.
 */

import type { ProductData } from './products';

/* ────────────────────────────────────────────
   Public FAQ type
   ──────────────────────────────────────────── */

export interface SiteFAQ {
  question: string;
  answer: string;
}

/* ────────────────────────────────────────────
   Homepage FAQs — practical buyer questions.
   Used by:
     - src/components/home/HomeFAQCTA.tsx (visible accordion)
     - src/app/page.tsx (FAQStructuredData JSON-LD)
   Wording rules:
     - Electrical insulating mats reference IS 15652:2006 and
       BIS Licence CM/L:8800129617 and ERDA/NTH test reports.
     - Lead-time answers never invent exact timelines — they explain
       that timing depends on product, dimensions, quantity and
       delivery location, and should be confirmed during quotation.
     - BharatMembrane and Bharat Hydro Seal are clearly stated to be
       waterproofing/civil-protection products that do NOT inherit
       IS 15652:2006 insulating-mat certification.
   ──────────────────────────────────────────── */

export const homeFaqs: SiteFAQ[] = [
  {
    question: 'Which standard do your electrical insulating mats conform to?',
    answer:
      'Our electrical insulating mats are manufactured to IS 15652:2006 under BIS Licence CM/L:8800129617, with supporting ERDA and NTH test reports available on request. The mats also conform to IEC 61111 for international reference. We can share the current document set for the exact product, class and thickness required for your project approval or audit.',
  },
  {
    question: 'How do I select the correct mat class for my operating voltage?',
    answer:
      'Mat class is selected based on the highest working voltage present at the installation. Class A is rated for a 3.3 kV working voltage, Class B for 11 kV and Class C for 33 kV. Choose the class that meets or exceeds the maximum voltage at the work location. When in doubt, share the substation or panel specifications with our technical team for a guided recommendation.',
  },
  {
    question: 'Are custom sizes, colours and surface patterns available?',
    answer:
      'Yes. Custom lengths, widths, colours and surface patterns — such as coin, hexa and strip configurations — can be quoted subject to the selected product, dimensions, quantity and manufacturing feasibility. Share the complete requirement with the sales team so we can confirm what is achievable and revert with a tailored offer.',
  },
  {
    question: 'Where are electrical insulating mats commonly installed?',
    answer:
      'Insulating mats are commonly installed in front of switchgear, distribution boards, control panels, substation work zones, generator rooms and other electrical installations where personnel may come into contact with live equipment. They are also used in front of HT and LT panels, around transformers and in any area where electrical safety flooring is specified by the project or statutory requirement.',
  },
  {
    question:
      'Are test reports, BIS documentation and technical certificates available?',
    answer:
      'Yes. Test reports from ERDA and NTH, the BIS Licence CM/L:8800129617 under IS 15652:2006, and supporting technical certificates are available on request. We can provide the current document set for the exact product, class and thickness required, along with any specific compliance declarations needed for your project approval or audit.',
  },
  {
    question: 'What information is required to request a quotation?',
    answer:
      'To prepare an accurate quotation, please share: the product name, required class (if applicable), dimensions (length × width × thickness), quantity, surface pattern or colour preference (if any), delivery location and any specific documentation or compliance requirement. The more complete the brief, the faster we can revert with a tailored offer.',
  },
  {
    question: 'What is the expected production or dispatch lead time?',
    answer:
      'Lead time depends on the product, dimensions, quantity, documentation requirements and delivery location. Standard products and dimensions typically dispatch faster, while custom sizes and bulk orders require additional production time. The exact timeline is confirmed with each quotation after the complete requirement has been reviewed.',
  },
  {
    question:
      'Do BharatMembrane and Bharat Hydro Seal follow the same electrical standards as insulating mats?',
    answer:
      'No. BharatMembrane and Bharat Hydro Seal are waterproofing and civil-protection products and do not inherit IS 15652:2006 insulating-mat certification, electrical insulation classes, the BIS insulating-mat licence or ERDA/NTH electrical-mat test reports. BharatMembrane is presented for applications covered by IS 15909:2020 and Bharat Hydro Seal references IS 15058:2002. They must not be specified as electrical safety mats.',
  },
];

/* ────────────────────────────────────────────
   Product-specific FAQs keyed by slug.
   Each array is consumed by both the visible ProductFAQ accordion
   and the ProductPageStructuredData FAQPage JSON-LD on the matching
   product route — so the visible content and the schema are always
   character-for-character identical.
   ──────────────────────────────────────────── */

export const productFaqsBySlug: Record<string, SiteFAQ[]> = {
  /* ── Electrical insulating mats ── */
  'electrical-insulating-mats': [
    {
      question: 'What standards do Electrical Insulating Mats comply with?',
      answer:
        'Our electrical insulating mats are manufactured to IS 15652:2006 under BIS Licence CM/L:8800129617. Available supporting documents include ERDA and NTH test reports. Request the current document set for the exact product and thickness required.',
    },
    {
      question: 'How do I select between Class A, B and C?',
      answer:
        'Class selection is based on the maximum working voltage at the installation. Class A is rated for a 3.3 kV working voltage, Class B for 11 kV and Class C for 33 kV. Choose the class that meets or exceeds the highest voltage present at the work location. When in doubt, our technical team can recommend the appropriate class based on your substation or panel specifications.',
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
  ],

  /* ── Coloured Strip Insulating Mats ── */
  'coloured-strip-insulating-mats': [
    {
      question: 'What standards do Coloured Strip Insulating Mats comply with?',
      answer:
        'Our electrical insulating mats are manufactured to IS 15652:2006 under BIS Licence CM/L:8800129617. Available supporting documents include ERDA and NTH test reports. Request the current document set for the exact product and thickness required.',
    },
    {
      question: 'What colour options are available for the strip configuration?',
      answer:
        'The standard strip configuration uses a vivid yellow marking on a black insulating base, providing clear visual cues around electrical panels and machinery. All variants retain the same IS 15652:2006 insulation performance.',
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
  ],

  /* ── Bi-Color Insulating Mats ── */
  'bi-color-insulating-mats': [
    {
      question: 'What standards do Bi-Color Insulating Mats comply with?',
      answer:
        'Our electrical insulating mats are manufactured to IS 15652:2006 under BIS Licence CM/L:8800129617. Available supporting documents include ERDA and NTH test reports. Request the current document set for the exact product and thickness required.',
    },
    {
      question: 'What is the purpose of the dual-tone design?',
      answer:
        'The dual-tone colour scheme serves as a clear indicator of safety boundaries in the workspace. The contrasting colours make hazard zones and restricted areas immediately visible, supporting safe navigation around electrical installations.',
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
  ],

  /* ── Auto-Glow / Reflective Band Insulating Mats ── */
  'auto-glow-reflective-band-insulating-mats': [
    {
      question: 'What standards do Auto-Glow Insulating Mats comply with?',
      answer:
        'Our electrical insulating mats are manufactured to IS 15652:2006 under BIS Licence CM/L:8800129617. Available supporting documents include ERDA and NTH test reports. Request the current document set for the exact product and thickness required.',
    },
    {
      question: 'How long does the auto-glow effect last after lights-out?',
      answer:
        'The glow-in-the-dark band is charged by normal lighting during operation. After lights-out, the visible glow continues to illuminate pathways and hazard zones, supporting emergency wayfinding and exit guidance. Reflective banding also returns light from torches and emergency lamps.',
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
  ],

  /* ── BharatMembrane (civil — NO IS 15652 / no BIS mat licence) ── */
  'bharat-membrane': [
    {
      question: 'What standard does BharatMembrane comply with?',
      answer:
        'BharatMembrane is presented for applications covered by IS 15909:2020. Request the current product documentation for the exact membrane grade and project approval requirements.',
    },
    {
      question: 'Can BharatMembrane be used in below-grade and underwater applications?',
      answer:
        'BharatMembrane is used in below-grade waterproofing including basements, foundations, tunnel linings and other submerged or earth-retained structures. Thicker grades are recommended for higher hydrostatic pressure and continuous water exposure. Confirm the appropriate grade with the technical team for the specific project conditions.',
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
  ],

  /* ── Bharat Hydro Seal (civil — NO IS 15652 / no BIS mat licence) ── */
  'bharat-hydro-seal': [
    {
      question: 'What are PVC water stops and where are they used?',
      answer:
        'Bharat Hydro Seal is a PVC water-stop product for concrete construction and expansion joints. The product information references IS 15058:2002. Request the current product and compliance documents required for your project.',
    },
    {
      question: 'What profiles are available for Bharat Hydro Seal?',
      answer:
        'Profiles are available in centre-bulb, dumbbell and ribbed configurations to suit different joint types and movement requirements. Profile selection depends on the joint type, expected movement, water pressure and project specification. Intersections and terminations require an appropriate joining method to form a continuous system.',
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
  ],
};

/* ────────────────────────────────────────────
   Lookup helper — used by product page routes
   (for JSON-LD) and by ProductFAQ (for the
   visible accordion). Both callers receive the
   same array reference, so the visible content
   and the schema cannot drift apart.
   ──────────────────────────────────────────── */

export function getProductFaqs(product: ProductData): SiteFAQ[] {
  return productFaqsBySlug[product.slug] ?? [];
}
