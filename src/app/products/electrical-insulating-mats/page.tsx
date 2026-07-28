import { Metadata } from 'next';
import { getProductBySlug } from '@/data/products';
import { generateProductMetadata } from '@/lib/product-metadata';
import { ProductPageStructuredData } from '@/components/structured-data';
import EIMClient from './EIMClient';

const product = getProductBySlug('electrical-insulating-mats');

if (!product) {
  throw new Error('Product "electrical-insulating-mats" not found in registry');
}

export const metadata: Metadata = generateProductMetadata(product!);

export default function ElectricalInsulatingMatsPage() {
  return (
    <>
      <ProductPageStructuredData
        productSlug="electrical-insulating-mats"
        faqs={[
          {
            question: 'How do I select between Class A, B and C?',
            answer: 'Class selection is based on the maximum working voltage at the installation. Class A is rated for a 3.3 kV working voltage, Class B for 11 kV and Class C for 33 kV. Choose the class that meets or exceeds the highest voltage present at the work location.',
          },
          {
            question: 'What standards do Electrical Insulating Mats comply with?',
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
      <EIMClient product={product!} />
    </>
  );
}
