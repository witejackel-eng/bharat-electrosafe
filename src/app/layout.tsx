import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { company } from '@/data/company';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';
const siteUrl = company.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — Electrical Insulating Mats & Engineered Membranes`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  keywords: [
    'electrical insulating mats',
    'IS 15652:2006',
    'insulating mats manufacturer India',
    'electrical safety mats',
    'PVC geo-membrane',
    'BharatMembrane',
    'BharatHydro Seal',
    'water stop solutions',
    'Noida',
  ],
  alternates: {
    canonical: '/',
  },
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: 'website',
    siteName: company.name,
    title: `${company.name} — Electrical Insulating Mats & Engineered Membranes`,
    description: company.description,
    url: siteUrl,
  },
  twitter: {
    card: 'summary',
    title: company.name,
    description: company.description,
  },
  category: 'manufacturing',
};

export const viewport = {
  themeColor: '#1c1917',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Organization structured data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: company.name,
              description: company.description,
              url: siteUrl,
              email: company.email,
              telephone: company.phonePrimaryTel,
              address: {
                '@type': 'PostalAddress',
                streetAddress: `${company.address.line1}, ${company.address.line2}`,
                addressLocality: company.address.city,
                addressRegion: company.address.state,
                postalCode: company.address.pincode,
                addressCountry: company.address.country,
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
