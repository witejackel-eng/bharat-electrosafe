import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bharat Electrosafe — Electrical Insulation & Industrial Protection",
  description: "Certified electrical insulating mats and engineered protection products for control panels, substations, utilities, industry and infrastructure. IS 15652:2006 compliant.",
  keywords: ["Bharat Electrosafe", "electrical insulating mats", "IS 15652", "Class A B C mats", "insulation protection", "substation mats", "industrial safety"],
  authors: [{ name: "Bharat Electrosafe" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Bharat Electrosafe — Certified Electrical Insulation & Protection",
    description: "Electrical insulating mats and engineered protection products for critical electrical environments.",
    siteName: "Bharat Electrosafe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Electrosafe — Certified Electrical Insulation & Protection",
    description: "Electrical insulating mats and engineered protection products for critical electrical environments.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
