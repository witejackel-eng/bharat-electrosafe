import { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import { generateProductMetadata } from '@/lib/product-metadata';
import { ProductPageStructuredData } from '@/components/structured-data';
import AutoGlowClient from './AutoGlowClient';

const product = getProductBySlug('auto-glow-reflective-band-insulating-mats');

if (!product) {
  throw new Error('Product "auto-glow-reflective-band-insulating-mats" not found in registry');
}

export const metadata: Metadata = generateProductMetadata(product!);

export default function AutoGlowReflectiveBandMatsPage() {
  return (
    <>
      <ProductPageStructuredData
        productSlug="auto-glow-reflective-band-insulating-mats"
        faqs={[
          {
            question: 'How long does the auto-glow effect last after lights-out?',
            answer: 'The glow-in-the-dark band is charged by normal lighting during operation. After lights-out, the visible glow continues to illuminate pathways and hazard zones, supporting emergency wayfinding and exit guidance. Reflective banding also returns light from torches and emergency lamps.',
          },
          {
            question: 'What standards do Auto-Glow Insulating Mats comply with?',
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
      <AutoGlowClient product={product!} />
    </>
  );
}
