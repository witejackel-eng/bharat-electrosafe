import type { Metadata } from 'next';
import { allowIndexing, buildUrl } from '@/lib/site-url';
import { AboutPageStructuredData } from '@/components/structured-data';
import AboutUsClient from './AboutUsClient';

/* Title convention: the normal Metadata.title does NOT include the
   "| Bharat Electrosafe" suffix because the root layout template appends
   it automatically. Open Graph and Twitter receive the final full branded
   title. */
const PAGE_TITLE = 'About — Electrical Safety Manufacturer';
const FULL_TITLE = `${PAGE_TITLE} | Bharat Electrosafe`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    'Bharat Electrosafe manufactures electrical insulating mats and engineered PVC membranes in Noida, India. ISO 9001, ISO 14001 and ISO 45001 certified, with BIS-licensed production under IS 15652:2006.',
  alternates: {
    canonical: buildUrl('/about-us'),
  },
  openGraph: {
    title: FULL_TITLE,
    description:
      'Bharat Electrosafe manufactures electrical insulating mats and engineered PVC membranes in Noida, India. ISO-certified with BIS-licensed production under IS 15652:2006.',
    url: buildUrl('/about-us'),
    type: 'website',
    images: [
      {
        url: '/brand/og-bharat-electrosafe.png',
        width: 1200,
        height: 630,
        alt: 'About Bharat Electrosafe — electrical insulating mat and membrane manufacturer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: FULL_TITLE,
    description:
      'Bharat Electrosafe manufactures electrical insulating mats and engineered PVC membranes in Noida, India. ISO-certified with BIS-licensed production.',
    images: ['/brand/twitter-card-bharat-electrosafe.png'],
  },
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function AboutUsPage() {
  return (
    <>
      <AboutPageStructuredData />
      <AboutUsClient />
    </>
  );
}
