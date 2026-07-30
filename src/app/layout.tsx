import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { company } from "@/data/company";
import { siteUrl, allowIndexing } from "@/lib/site-url";
import { siteOgImage, siteTwitterImage } from "@/lib/social-image";
import { HomepageStructuredData } from "@/components/structured-data";

// Variable-font configuration — a single Manrope variable font file replaces
// the previous five static weights (400/500/600/700/800). This reduces font
// transfer size and the number of font requests on the critical path while
// preserving every weight the design system uses.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

/**
 * Root metadata — Bharat Electrosafe.
 *
 * Canonical domain: https://bharatelectrosafe.com
 * metadataBase is environment-aware: it falls back to the permanent
 * production domain when NEXT_PUBLIC_SITE_URL is unset, so metadata
 * never identifies a Vercel preview URL as the canonical origin.
 *
 * Brand assets (favicons, apple icon, OG image, Twitter image) are wired
 * via Next.js App Router file conventions — no manual `icons` or
 * `openGraph.images` config is needed. The following files in `src/app/`
 * are auto-detected by Next.js and emitted as `<link>` / `<meta>` tags:
 *   • icon.svg               → <link rel="icon" type="image/svg+xml">
 *   • favicon.ico            → <link rel="icon" sizes="any">
 *   • apple-icon.png         → <link rel="apple-touch-icon">
 *   • opengraph-image.png    → <meta property="og:image">
 *   • twitter-image.png      → <meta name="twitter:image">
 *   • manifest.ts            → <link rel="manifest">
 * The PWA icons inside the manifest are referenced explicitly via
 * `public/icons/icon-{192,512}{,-maskable}.png`.
 *
 * Per-page metadata: child routes override `title` and `description` via
 * their own `generateMetadata` exports. The root canonical covers only
 * the homepage — child routes declare their own self-referencing
 * canonical so no page inherits the homepage canonical.
 *
 * Bharat Hydro Seal remains accurately represented in the description
 * (the product is named explicitly) and continues to have its own route
 * at /products/bharat-hydro-seal with dedicated metadata.
 */
const siteDescription =
  'Manufacturer of electrical insulating mats, visible-safety mats, BharatMembrane and Bharat Hydro Seal solutions for industrial electrical and civil-protection applications.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Electrical Insulating Mats Manufacturer India`,
    template: `%s | ${company.name}`,
  },
  description: siteDescription,
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  /* The global keywords meta tag is removed — it is duplicated across
     routes and not an effective SEO strategy. Per-page titles, descriptions,
     canonicals, content, internal links and structured data are the real
     priority. */
  /* Icons are intentionally NOT declared here — App Router file
     conventions in `src/app/` (icon.svg, favicon.ico, apple-icon.png)
     automatically emit the correct <link> tags. Declaring them here
     would create duplicate <link> entries. */
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
    locale: 'en_IN',
    siteName: company.name,
    title: `${company.name} | Electrical Insulating Mats Manufacturer India`,
    description: siteDescription,
    url: siteUrl,
    images: [siteOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${company.name} | Electrical Insulating Mats Manufacturer India`,
    description: siteDescription,
    images: [siteTwitterImage],
  },
  category: 'manufacturing',
};

export const viewport = {
  themeColor: '#00275B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
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
        {/* Toaster removed from root layout — useToast() is never called
            anywhere in the application. The contact form uses inline
            success/error messages, not toasts. Mounting <Toaster /> globally
            shipped @radix-ui/react-toast and related code on every route for
            no benefit. If toast notifications are needed in future, mount
            <Toaster /> only on the route that triggers them. */}
      </body>
    </html>
  );
}
