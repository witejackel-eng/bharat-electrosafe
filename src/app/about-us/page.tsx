import type { Metadata } from 'next';
import { allowIndexing, buildUrl } from '@/lib/site-url';
import { siteOgImage, siteTwitterImage } from '@/lib/social-image';
import { AboutPageStructuredData } from '@/components/structured-data';
import AboutUsShell from './AboutUsShell';

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
    images: [siteOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: FULL_TITLE,
    description:
      'Bharat Electrosafe manufactures electrical insulating mats and engineered PVC membranes in Noida, India. ISO-certified with BIS-licensed production.',
    images: [siteTwitterImage],
  },
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function AboutUsPage() {
  return (
    <>
      <AboutPageStructuredData />
      <AboutUsShell />
    </>
  );
}
