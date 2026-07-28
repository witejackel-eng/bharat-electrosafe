import type { Metadata } from 'next';
import { allowIndexing, buildUrl } from '@/lib/site-url';
import { ContactPageStructuredData } from '@/components/structured-data';
import ContactUsClient from './ContactUsClient';

/* Title convention: the normal Metadata.title does NOT include the
   "| Bharat Electrosafe" suffix because the root layout template appends
   it automatically. Open Graph and Twitter receive the final full branded
   title. */
const PAGE_TITLE = 'Contact & Request a Product Quotation';
const FULL_TITLE = `${PAGE_TITLE} | Bharat Electrosafe`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    'Request a quotation for electrical insulating mats or PVC geomembrane. Contact Bharat Electrosafe in Noida, India for product enquiries and technical support.',
  alternates: {
    canonical: buildUrl('/contact-us'),
  },
  openGraph: {
    title: FULL_TITLE,
    description:
      'Request a quotation for electrical insulating mats or PVC geomembrane. Contact Bharat Electrosafe in Noida, India.',
    url: buildUrl('/contact-us'),
    type: 'website',
    images: [
      {
        url: '/brand/og-bharat-electrosafe.png',
        width: 1200,
        height: 630,
        alt: 'Contact Bharat Electrosafe — request a product quotation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: FULL_TITLE,
    description:
      'Request a quotation for electrical insulating mats or PVC geomembrane. Contact Bharat Electrosafe in Noida, India.',
    images: ['/brand/twitter-card-bharat-electrosafe.png'],
  },
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function ContactUsPage() {
  return (
    <>
      <ContactPageStructuredData />
      <ContactUsClient />
    </>
  );
}
