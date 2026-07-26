import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bharat Electrosafe — Electrical & Infrastructure Protection",
  description: "Electrical insulating mats, visible-safety variants, geomembranes and water-stop solutions for industrial, utility and infrastructure projects.",
  keywords: ["Bharat Electrosafe", "electrical insulating mats", "Class A B C", "3.3kV 11kV 33kV", "geomembrane", "water stop", "BharatMembrane", "BharatHydro", "visible safety", "coloured strip", "reflective mat"],
  authors: [{ name: "Bharat Electrosafe" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Bharat Electrosafe — Protection systems for environments that cannot afford failure.",
    description: "Electrical insulating mats, visible-safety variants, geomembranes and water-stop solutions for industrial, utility and infrastructure projects.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Electrosafe — Electrical & Infrastructure Protection",
    description: "Protection systems for environments that cannot afford failure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
