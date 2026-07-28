import type { Metadata } from 'next';
import { company } from '@/data/company';
import { siteUrl, allowIndexing, buildUrl } from '@/lib/site-url';
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
  return <HomeClient />;
}
