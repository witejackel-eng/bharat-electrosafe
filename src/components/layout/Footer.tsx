'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────
   Product data (shared with Header)
   ──────────────────────────────────────────── */

interface ProductNavItem {
  name: string;
  href: string;
}

const products: ProductNavItem[] = [
  {
    name: 'Electrical Insulating Mats',
    href: '/products/electrical-insulating-mats',
  },
  {
    name: 'Coloured Strip Insulating Mats',
    href: '/products/coloured-strip-insulating-mats',
  },
  {
    name: 'Bi-Color Insulating Mats',
    href: '/products/bi-color-insulating-mats',
  },
  {
    name: 'Auto-Glow / Reflective Band Mats',
    href: '/products/auto-glow-reflective-band-insulating-mats',
  },
  {
    name: 'BharatMembrane',
    href: '/products/bharat-membrane',
  },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Contact Us', href: '/contact-us' },
  { name: 'Request a Quote', href: '/contact-us' },
];

/* ────────────────────────────────────────────
   Footer component
   ──────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="bg-be-warm-white">
      {/* ── Yellow accent top border ── */}
      <div className="h-[3px] bg-be-yellow-500" />

      {/* ── Main footer content ── */}
      <div className="container-site page-horizontal-padding section-padding-supporting">
        {/* Desktop: four-column grid with separators */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Bharat Electrosafe — Home">
              <Image
                src="/logo.svg"
                alt="Bharat Electrosafe logo"
                width={32}
                height={32}
                priority
              />
              <span className="font-bold text-be-charcoal-950 text-lg">
                Bharat Electrosafe
              </span>
            </Link>
            <p className="text-sm text-be-grey-650 leading-relaxed max-w-[280px]">
              Certified electrical insulating mats and engineered protection products for control panels, substations, utilities and industry.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="mailto:info@bharatelectrosafe.com"
                className="size-11 inline-flex items-center justify-center rounded-md border border-be-grey-250 text-be-charcoal-800 hover:bg-be-yellow-50 hover:text-be-yellow-600 hover:border-be-yellow-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="size-4" />
              </a>
              <a
                href="tel:+91XXXXXXXXXX"
                className="size-11 inline-flex items-center justify-center rounded-md border border-be-grey-250 text-be-charcoal-800 hover:bg-be-yellow-50 hover:text-be-yellow-600 hover:border-be-yellow-400 transition-colors"
                aria-label="Phone"
              >
                <Phone className="size-4" />
              </a>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="size-11 inline-flex items-center justify-center rounded-md border border-be-grey-250 text-be-charcoal-800 hover:bg-be-yellow-50 hover:text-be-yellow-600 hover:border-be-yellow-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="size-4" />
              </a>
            </div>
          </div>

          {/* Separator */}
          <div className="hidden lg:block border-l border-be-grey-250/60 mx-1" />

          {/* Column 2 — Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-be-charcoal-950 uppercase tracking-wide">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Separator */}
          <div className="hidden lg:block border-l border-be-grey-250/60 mx-1" />

          {/* Column 3 — Products */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-be-charcoal-950 uppercase tracking-wide">
              Products
            </h3>
            <ul className="flex flex-col gap-2.5">
              {products.map((product) => (
                <li key={product.href}>
                  <Link
                    href={product.href}
                    className="text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Separator */}
          <div className="hidden lg:block border-l border-be-grey-250/60 mx-1" />

          {/* Column 4 — Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-be-charcoal-950 uppercase tracking-wide">
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:info@bharatelectrosafe.com"
                  className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors"
                >
                  <Mail className="size-4 shrink-0" />
                  <span>info@bharatelectrosafe.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors"
                >
                  <Phone className="size-4 shrink-0" />
                  <span>+91-XXXX-XXXXXX</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors"
                >
                  <MessageCircle className="size-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-base text-be-grey-650">
                <MapPin className="size-4 shrink-0 mt-1" />
                <span>
                  Industrial Area, Sector XX,<br />
                  City, State — XXXXXX
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile: stacked groups with accordion */}
        <div className="md:hidden flex flex-col gap-6">
          {/* Brand at top */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Bharat Electrosafe — Home">
              <Image
                src="/logo.svg"
                alt="Bharat Electrosafe logo"
                width={32}
                height={32}
                priority
              />
              <span className="font-bold text-be-charcoal-950 text-lg">
                Bharat Electrosafe
              </span>
            </Link>
            <p className="text-base text-be-grey-650 leading-relaxed">
              Certified electrical insulating mats and engineered protection products for control panels, substations, utilities and industry.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="mailto:info@bharatelectrosafe.com"
                className="size-10 inline-flex items-center justify-center rounded-md border border-be-grey-250 text-be-charcoal-800 hover:bg-be-yellow-50 hover:text-be-yellow-600 hover:border-be-yellow-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="size-4" />
              </a>
              <a
                href="tel:+91XXXXXXXXXX"
                className="size-10 inline-flex items-center justify-center rounded-md border border-be-grey-250 text-be-charcoal-800 hover:bg-be-yellow-50 hover:text-be-yellow-600 hover:border-be-yellow-400 transition-colors"
                aria-label="Phone"
              >
                <Phone className="size-4" />
              </a>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 inline-flex items-center justify-center rounded-md border border-be-grey-250 text-be-charcoal-800 hover:bg-be-yellow-50 hover:text-be-yellow-600 hover:border-be-yellow-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="size-4" />
              </a>
            </div>
          </div>

          {/* Accordion sections */}
          <Accordion type="single" collapsible defaultValue="navigation">
            <AccordionItem value="navigation">
              <AccordionTrigger className="text-base font-semibold text-be-charcoal-950 py-3 min-h-[44px]">
                Navigation
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-2.5 pb-2">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors py-1 min-h-[44px] inline-flex items-center"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="products">
              <AccordionTrigger className="text-base font-semibold text-be-charcoal-950 py-3 min-h-[44px]">
                Products
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-2.5 pb-2">
                  {products.map((product) => (
                    <li key={product.href}>
                      <Link
                        href={product.href}
                        className="text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors py-1 min-h-[44px] inline-flex items-center"
                      >
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact">
              <AccordionTrigger className="text-base font-semibold text-be-charcoal-950 py-3 min-h-[44px]">
                Contact
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-3 pb-2">
                  <li>
                    <a
                      href="mailto:info@bharatelectrosafe.com"
                      className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors min-h-[44px]"
                    >
                      <Mail className="size-4 shrink-0" />
                      <span>info@bharatelectrosafe.com</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+91XXXXXXXXXX"
                      className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors min-h-[44px]"
                    >
                      <Phone className="size-4 shrink-0" />
                      <span>+91-XXXX-XXXXXX</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/91XXXXXXXXXX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors min-h-[44px]"
                    >
                      <MessageCircle className="size-4 shrink-0" />
                      <span>WhatsApp</span>
                    </a>
                  </li>
                  <li className="flex items-start gap-2 text-base text-be-grey-650 py-2">
                    <MapPin className="size-4 shrink-0 mt-1" />
                    <span>
                      Industrial Area, Sector XX,<br />
                      City, State — XXXXXX
                    </span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* ── Bottom bar with yellow tint ── */}
      <div className="border-t border-be-grey-250 bg-be-yellow-50/50">
        <div className="container-site page-horizontal-padding py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-metadata text-be-grey-650 text-center sm:text-left">
            &copy; 2025 Bharat Electrosafe. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="text-metadata text-be-grey-650 hover:text-be-yellow-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-metadata text-be-grey-650 hover:text-be-yellow-600 transition-colors"
            >
              Terms
            </Link>
            <span className="text-metadata text-be-grey-650 hidden sm:inline">
              Made in India 🇮🇳
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
