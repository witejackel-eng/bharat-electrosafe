import { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import { generateProductMetadata } from '@/lib/product-metadata';
import { ProductPageStructuredData } from '@/components/structured-data';
import BHSClient from './BHSClient';

const product = getProductBySlug('bharat-hydro-seal');

if (!product) {
  throw new Error('Product "bharat-hydro-seal" not found in registry');
}

export const metadata: Metadata = generateProductMetadata(product!);

export default function BharatHydroSealPage() {
  return (
    <>
      <ProductPageStructuredData
        productSlug="bharat-hydro-seal"
        faqs={[
          {
            question: 'What are PVC water stops and where are they used?',
            answer: 'PVC water stops are flexible strips embedded in concrete joints to prevent water seepage. They are used in construction joints, expansion joints and contraction joints in basements, water tanks, retaining walls, tunnels and other below-grade structures.',
          },
          {
            question: 'What standard does Bharat Hydro Seal comply with?',
            answer: 'Bharat Hydro Seal is a PVC water stop for construction-joint sealing. It is a civil engineering product, not an electrical insulating mat, and does not carry IS 15652:2006 classification.',
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
      <BHSClient product={product!} />
    </>
  );
}
