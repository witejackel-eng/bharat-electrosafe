import type { Metadata } from 'next';
import { allowIndexing, buildUrl } from '@/lib/site-url';
import { FAQStructuredData } from '@/components/structured-data';
import { homeFaqs } from '@/data/faqs';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  /* Absolute title — the SEO title already includes the brand, so we
     bypass the root template to avoid "… | Bharat Electrosafe | Bharat
     Electrosafe" duplication. Open Graph and Twitter receive the same
     final branded title. */
  title: {
    absolute: 'Electrical Insulating Mats Manufacturer India | Bharat Electrosafe',
  },
  description:
    'Manufacturer of electrical insulating mats to IS 15652:2006, coloured strip and bi-color mats, auto-glow reflective band mats and PVC geomembrane for industrial and civil safety applications in India.',
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
      <FAQStructuredData path="/" faqs={homeFaqs} />
      <HomeClient />
    </>
  );
}
