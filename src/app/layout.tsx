import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { company } from "@/data/company";
import { siteUrl, allowIndexing } from "@/lib/site-url";
import { HomepageStructuredData } from "@/components/structured-data";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

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
  /* The global keywords meta tag is removed — it is duplicated across
     routes and not an effective SEO strategy. Per-page titles, descriptions,
     canonicals, content, internal links and structured data are the real
     priority. */
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/images/brand/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/brand/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/images/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/images/brand/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/brand/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  /* Root canonical covers only the homepage. Child routes must define
     their own self-referencing canonical — no page may inherit the
     homepage canonical. */
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
    images: [
      {
        url: '/brand/og-bharat-electrosafe.png',
        width: 1200,
        height: 630,
        alt: `${company.name} — Certified electrical insulating mats and engineered protection`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${company.name} — Electrical Insulating Mats & Engineered Membranes`,
    description: company.description,
    images: ['/brand/twitter-card-bharat-electrosafe.png'],
  },
  category: 'manufacturing',
};

export const viewport = {
  themeColor: '#FFC400',
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
        {/* Google Search Console verification — only output when a real
            value exists. Do not commit a real verification token. */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}
        {/* Structured data: Organisation, WebSite, LocalBusiness schemas.
            Uses the centralised structured-data utility with @id, verified
            fields only, and the production domain. No fake sameAs, foundingDate,
            numberOfEmployees, or unverified claims. */}
        <HomepageStructuredData />
      </head>
      <body
        className={`${manrope.variable} antialiased bg-be-warm-white text-be-charcoal-950`}
        style={{ fontFamily: "var(--font-manrope), sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
