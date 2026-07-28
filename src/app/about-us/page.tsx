import type { Metadata } from 'next';
import { siteUrl, allowIndexing, buildUrl } from '@/lib/site-url';
import AboutUsClient from './AboutUsClient';

export const metadata: Metadata = {
  title: 'About Bharat Electrosafe | Electrical Safety Manufacturer',
  description:
    'Bharat Electrosafe manufactures electrical insulating mats and engineered PVC membranes in Noida, India. ISO 9001, ISO 14001 and ISO 45001 certified, with BIS-licensed production under IS 15652:2006.',
  alternates: {
    canonical: buildUrl('/about-us'),
  },
  openGraph: {
    title: 'About Bharat Electrosafe | Electrical Safety Manufacturer',
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
    title: 'About Bharat Electrosafe | Electrical Safety Manufacturer',
    description:
      'Bharat Electrosafe manufactures electrical insulating mats and engineered PVC membranes in Noida, India. ISO-certified with BIS-licensed production.',
    images: ['/brand/twitter-card-bharat-electrosafe.png'],
  },
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
