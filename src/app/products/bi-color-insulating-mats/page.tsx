import { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import { generateProductMetadata } from '@/lib/product-metadata';
import { ProductPageStructuredData } from '@/components/structured-data';
import BiColorClient from './BiColorClient';

const product = getProductBySlug('bi-color-insulating-mats');

if (!product) {
  throw new Error('Product "bi-color-insulating-mats" not found in registry');
}

export const metadata: Metadata = generateProductMetadata(product!);

export default function BiColorInsulatingMatsPage() {
  return (
    <>
      <ProductPageStructuredData
        productSlug="bi-color-insulating-mats"
        faqs={[
          {
            question: 'What is the purpose of the dual-tone design?',
            answer: 'The dual-tone colour scheme serves as a clear indicator of safety boundaries in the workspace. The contrasting colours make hazard zones and restricted areas immediately visible, supporting safe navigation around electrical installations.',
          },
          {
            question: 'What standards do Bi-Color Insulating Mats comply with?',
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
      <BiColorClient product={product!} />
    </>
  );
}
