import type { Metadata } from 'next';
import { company } from '@/data/company';
import { siteUrl, allowIndexing, buildUrl } from '@/lib/site-url';
import { FAQStructuredData } from '@/components/structured-data';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Electrical Insulating Mats Manufacturer India | Bharat Electrosafe',
  description:
    'Manufacturer of electrical insulating mats to IS 15652:2006, coloured strip and bi-color mats, auto-glow reflective band mats, PVC geomembrane and water stop seals for industrial and civil safety applications in India.',
  alternates: {
    canonical: buildUrl('/'),
  },
  openGraph: {
    title: 'Electrical Insulating Mats Manufacturer India | Bharat Electrosafe',
    description:
      'Manufacturer of electrical insulating mats to IS 15652:2006 and engineered PVC membranes for industrial and civil safety applications in India.',
    url: buildUrl('/'),
    type: 'website',
    images: [
      {
        url: '/brand/og-bharat-electrosafe.png',
        width: 1200,
        height: 630,
        alt: 'Bharat Electrosafe — Certified electrical insulating mats and engineered protection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electrical Insulating Mats Manufacturer India | Bharat Electrosafe',
    description:
      'Manufacturer of electrical insulating mats to IS 15652:2006 and engineered PVC membranes for industrial and civil safety applications in India.',
    images: ['/brand/twitter-card-bharat-electrosafe.png'],
  },
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function Home() {
  return (
    <>
      <FAQStructuredData
        path="/"
        faqs={[
          {
            question: 'What standards do your insulating mats comply with?',
            answer: 'Our electrical insulating mats comply with IS 15652:2006, the Indian Standard for electrical insulating mats. Products are BIS certified and tested by CPRI and ERDA.',
          },
          {
            question: 'What voltage classes are available?',
            answer: 'We manufacture mats in three voltage classes — Class A (3.3 kV working voltage), Class B (11 kV) and Class C (33 kV) — in 2.0 mm, 2.5 mm and 3.0 mm thicknesses respectively.',
          },
          {
            question: 'Can you supply custom dimensions?',
            answer: 'Yes. We provide custom dimensions and configurations to meet specific installation requirements. Share your required dimensions, quantity and delivery location for a tailored quotation.',
          },
          {
            question: 'How do I select the correct mat for my application?',
            answer: 'Selection depends on your working voltage, installation environment and regulatory requirements. Contact our technical sales team with your operating voltage and application details for guidance.',
          },
          {
            question: 'What is the typical lead time for orders?',
            answer: 'Lead time varies based on product, quantity and custom requirements. Standard products ship faster, while custom dimensions require additional production time. Our team confirms timelines with each quotation.',
          },
          {
            question: 'Do you provide test certificates with orders?',
            answer: 'Yes. Test certificates and relevant documentation are provided with all orders. Type test reports from CPRI/ERDA and BIS certification details are available on request.',
          },
        ]}
      />
      <HomeClient />
    </>
  );
}
