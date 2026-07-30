import type { Metadata } from 'next';
import { allowIndexing, buildUrl } from '@/lib/site-url';
import { siteOgImage, siteTwitterImage } from '@/lib/social-image';
import { FAQStructuredData } from '@/components/structured-data';
import { homeFaqs } from '@/data/faqs';
import HomeClient from './HomeClient';

/**
 * Homepage metadata.
 *
 * Title: brand-last, hand-tuned for SEO (preserved per spec — "preserve
 * unique titles and descriptions already implemented on individual
 * pages").
 *
 * Description: mentions Bharat Hydro Seal explicitly, per spec —
 * "Do not remove Bharat Hydro Seal from the metadata."
 *
 * Open Graph image and Twitter image are NOT declared here. They are
 * auto-wired by Next.js App Router file conventions from
 * `src/app/opengraph-image.png` and `src/app/twitter-image.png`, with
 * alt text from the sibling `.alt.txt` files. Declaring `images`
 * here would override the file convention and lose the alt-text
 * companion.
 *
 * Title and description overrides remain so social platforms see the
 * hand-tuned SEO title and the Bharat-Hydro-Seal-inclusive description
 * rather than the more generic root default.
 */
export const metadata: Metadata = {
  /* Absolute title — the SEO title already includes the brand, so we
     bypass the root template to avoid "… | Bharat Electrosafe | Bharat
     Electrosafe" duplication. Open Graph and Twitter receive the same
     final branded title. */
  title: {
    absolute: 'Electrical Insulating Mats Manufacturer India | Bharat Electrosafe',
  },
  description:
    'Manufacturer of electrical insulating mats, visible-safety mats, BharatMembrane and Bharat Hydro Seal solutions for industrial electrical and civil-protection applications.',
  alternates: {
    canonical: buildUrl('/'),
  },
  openGraph: {
    title: 'Electrical Insulating Mats Manufacturer India | Bharat Electrosafe',
    description:
      'Manufacturer of electrical insulating mats, visible-safety mats, BharatMembrane and Bharat Hydro Seal solutions for industrial electrical and civil-protection applications.',
    url: buildUrl('/'),
    type: 'website',
    images: [siteOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electrical Insulating Mats Manufacturer India | Bharat Electrosafe',
    description:
      'Manufacturer of electrical insulating mats, visible-safety mats, BharatMembrane and Bharat Hydro Seal solutions for industrial electrical and civil-protection applications.',
    images: [siteTwitterImage],
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
