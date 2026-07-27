import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFEFA",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bharatelectrosafe.com"),
  title: "Bharat Electrosafe | Electrical Insulating Mats Manufacturer",
  description:
    "Manufacturer of electrical insulating mats to IS 15652:2006 — coloured strip, bi-color and auto-glow / reflective band variants — and BharatMembrane PVC geo-membranes to IS 15909:2020.",
  keywords: [
    "Bharat Electrosafe",
    "electrical insulating mats",
    "IS 15652",
    "Class A B C",
    "3.3kV 11kV 33kV",
    "coloured strip mat",
    "bi-colour mat",
    "auto-glow mat",
    "reflective mat",
    "BharatMembrane",
    "geo-membrane",
    "PVC geo-membrane",
    "IS 15909",
  ],
  authors: [{ name: "Bharat Electrosafe" }],
  creator: "Bharat Electrosafe",
  publisher: "Bharat Electrosafe",
  robots: {
    index: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
    follow: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
    googleBot: {
      index: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
      follow: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
    },
  },
  alternates: {
    canonical: "https://bharatelectrosafe.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Bharat Electrosafe | Electrical Insulating Mats Manufacturer",
    description:
      "Manufacturer of electrical insulating mats, visible-safety variants, and BharatMembrane PVC geo-membranes for industrial, utility and infrastructure projects.",
    type: "website",
    siteName: "Bharat Electrosafe",
    url: "https://bharatelectrosafe.com",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Electrosafe | Electrical Insulating Mats Manufacturer",
    description:
      "Electrical insulating mats to IS 15652:2006 and BharatMembrane PVC geo-membranes to IS 15909:2020.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional robots meta tag for noindex when not allowed */}
        {!allowIndexing && (
          <meta name="robots" content="noindex, nofollow" />
        )}
        {/* Schema.org LocalBusiness structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Bharat Electrosafe",
              description:
                "Manufacturer of electrical insulating mats, visible-safety variants, and BharatMembrane PVC geo-membranes.",
              url: "https://bharatelectrosafe.com",
              email: "info@bharatelectrosafe.com",
              telephone: "+91-7617494968",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "704, 7th Floor, I-thum, Tower A, Plot No. A-40, Sector-62",
                addressLocality: "Noida",
                addressRegion: "Uttar Pradesh",
                postalCode: "201309",
                addressCountry: "IN",
              },
            }),
          }}
        />
      </head>
      <body className={`${manrope.variable} font-sans antialiased`}>
        {/* Accessibility: skip-to-content link */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
