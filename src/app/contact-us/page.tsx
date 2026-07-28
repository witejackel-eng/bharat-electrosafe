import type { Metadata } from 'next';
import { siteUrl, allowIndexing, buildUrl } from '@/lib/site-url';
import ContactUsClient from './ContactUsClient';

export const metadata: Metadata = {
  title: 'Contact Bharat Electrosafe | Request a Product Quotation',
  description:
    'Request a quotation for electrical insulating mats, PVC geomembrane or water stop seals. Contact Bharat Electrosafe in Noida, India for product enquiries and technical support.',
  alternates: {
    canonical: buildUrl('/contact-us'),
  },
  openGraph: {
    title: 'Contact Bharat Electrosafe | Request a Product Quotation',
    description:
      'Request a quotation for electrical insulating mats, PVC geomembrane or water stop seals. Contact Bharat Electrosafe in Noida, India.',
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
    title: 'Contact Bharat Electrosafe | Request a Product Quotation',
    description:
      'Request a quotation for electrical insulating mats, PVC geomembrane or water stop seals. Contact Bharat Electrosafe in Noida, India.',
    images: ['/brand/twitter-card-bharat-electrosafe.png'],
  },
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function ContactUsPage() {
  return <ContactUsClient />;
}
