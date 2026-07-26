import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LanguageInitScript } from "@/components/i18n/LanguageInitScript";

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

// Inline script to prevent theme flash (FOUC) — sets the .dark class before paint.
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

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
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <LanguageInitScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
