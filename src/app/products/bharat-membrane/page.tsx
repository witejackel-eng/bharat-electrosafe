import { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import { generateProductMetadata } from '@/lib/product-metadata';
import { ProductPageStructuredData } from '@/components/structured-data';
import BMClient from './BMClient';

const product = getProductBySlug('bharat-membrane');

if (!product) {
  throw new Error('Product "bharat-membrane" not found in registry');
}

export const metadata: Metadata = generateProductMetadata(product!);

export default function BharatMembranePage() {
  return (
    <>
      <ProductPageStructuredData
        productSlug="bharat-membrane"
        faqs={[
          {
            question: 'Can BharatMembrane be used in below-grade and underwater applications?',
            answer: 'Yes. BharatMembrane is engineered for use in below-grade waterproofing including basements, foundations, tunnel linings and other submerged or earth-retained structures. Thicker grades are recommended for higher hydrostatic pressure and continuous water exposure.',
          },
          {
            question: 'What standard does BharatMembrane comply with?',
            answer: 'BharatMembrane is manufactured to IS 15909:2020, the Indian Standard for PVC geomembranes. It is a PVC-based geomembrane, not an electrical insulating mat, and does not carry IS 15652:2006 classification.',
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
      <BMClient product={product!} />
    </>
  );
}
