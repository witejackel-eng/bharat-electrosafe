import { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import { generateProductMetadata } from '@/lib/product-metadata';
import { ProductPageStructuredData } from '@/components/structured-data';
import CSIMClient from './CSIMClient';

const product = getProductBySlug('coloured-strip-insulating-mats');

if (!product) {
  throw new Error('Product "coloured-strip-insulating-mats" not found in registry');
}

export const metadata: Metadata = generateProductMetadata(product!);

export default function ColouredStripInsulatingMatsPage() {
  return (
    <>
      <ProductPageStructuredData
        productSlug="coloured-strip-insulating-mats"
        faqs={[
          {
            question: 'What colour options are available for the strip configuration?',
            answer: 'The standard strip configuration uses a vivid yellow marking on a black insulating base, providing clear visual cues around electrical panels and machinery. All variants retain the same IS 15652:2006 insulation performance.',
          },
          {
            question: 'What standards do Coloured Strip Insulating Mats comply with?',
            answer: 'Our electrical insulating mats comply with IS 15652:2006, the Indian Standard for electrical insulating mats. Products are BIS certified and tested by CPRI and ERDA.',
          },
          {
            question: 'What dimensions are available?',
            answer: 'Standard and custom dimensions are available. Contact our team with your specific requirements for a tailored solution.',
          },
          {
            question: 'How do I request a quotation?',
            answer: 'Use our contact form, call our sales team, or send a WhatsApp message with your requirements including product, dimensions, quantity and delivery location.',
          },
          {
            question: 'What is the lead time?',
            answer: 'Lead time varies based on product and quantity. Standard products ship faster; custom dimensions require additional production time. Timelines are confirmed with each quotation.',
          },
        ]}
      />
      <CSIMClient product={product!} />
    </>
  );
}
