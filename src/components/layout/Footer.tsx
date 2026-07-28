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
import { company } from '@/data/company';
import {
  productNavigationItems,
  productCategories,
  ProductCategory,
} from '@/data/products';

/* ────────────────────────────────────────────
   Shared data structures (single source)
   ──────────────────────────────────────────── */

const categoryOrder: ProductCategory[] = [
  'electrical-insulation',
  'waterproofing-civil-protection',
];

const companyLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Contact Us', href: '/contact-us' },
];

const enquiryLinks = [
  { name: 'Request a Quote', href: '/contact-us' },
  { name: 'Ask for Technical Guidance', href: '/contact-us?type=technical-guidance' },
];

/* ────────────────────────────────────────────
   Shared sub-components
   ──────────────────────────────────────────── */

function BrandSection({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <Link href="/" aria-label="Bharat Electrosafe — Home">
        <Image
          src="/images/brand/bharat-electrosafe-logo-full.webp"
          alt="Bharat Electrosafe logo"
          width={160}
          height={60}
          className="object-contain w-[140px] h-auto"
          priority
        />
      </Link>
      <p className="text-sm text-be-grey-650 leading-relaxed max-w-[280px]">
        Certified electrical insulating mats and engineered protection products for control panels, substations, utilities and industry.
      </p>
      <div className="flex items-center gap-3 pt-1">
        <a
          href={`mailto:${company.email}`}
          className="size-11 inline-flex items-center justify-center rounded-md border border-be-grey-250 text-be-charcoal-800 hover:bg-be-yellow-50 hover:text-be-yellow-600 hover:border-be-yellow-400 transition-colors"
          aria-label="Email"
        >
          <Mail className="size-4" />
        </a>
        <a
          href={`tel:${company.phonePrimaryTel}`}
          className="size-11 inline-flex items-center justify-center rounded-md border border-be-grey-250 text-be-charcoal-800 hover:bg-be-yellow-50 hover:text-be-yellow-600 hover:border-be-yellow-400 transition-colors"
          aria-label="Phone"
        >
          <Phone className="size-4" />
        </a>
        <a
          href={company.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="size-11 inline-flex items-center justify-center rounded-md border border-be-grey-250 text-be-charcoal-800 hover:bg-be-yellow-50 hover:text-be-yellow-600 hover:border-be-yellow-400 transition-colors"
          aria-label="WhatsApp"
        >
          <MessageCircle className="size-4" />
        </a>
      </div>
    </div>
  );
}

function ContactSection({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <h3 className="text-sm font-semibold text-be-charcoal-950 uppercase tracking-wide">
        Contact
      </h3>
      <ul className="flex flex-col gap-3">
        <li>
          <a
            href={`mailto:${company.email}`}
            className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors"
          >
            <Mail className="size-4 shrink-0" />
            <span>{company.email}</span>
          </a>
        </li>
        <li>
          <a
            href={`tel:${company.phonePrimaryTel}`}
            className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors"
          >
            <Phone className="size-4 shrink-0" />
            <span>{company.phonePrimary}</span>
          </a>
        </li>
        <li>
          <a
            href={company.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors"
          >
            <MessageCircle className="size-4 shrink-0" />
            <span>{company.whatsapp.label}</span>
          </a>
        </li>
        <li className="flex items-start gap-2 text-base text-be-grey-650">
          <MapPin className="size-4 shrink-0 mt-1" />
          <span>
            {company.address.line1}, {company.address.line2},<br />
            {company.address.city}, {company.address.state} — {company.address.pincode}
          </span>
        </li>
      </ul>
    </div>
  );
}

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
        {/* Desktop: four-column grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {/* Column 1 — Brand */}
          <BrandSection />

          {/* Separator */}
          <div className="hidden lg:block border-l border-be-grey-250/60 mx-1" />

          {/* Column 2 — Company */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-be-charcoal-950 uppercase tracking-wide">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
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
              <li>
                <Link
                  href="/products"
                  className="text-base text-be-yellow-500 font-semibold hover:text-be-yellow-600 transition-colors"
                >
                  View All Products
                </Link>
              </li>
              {categoryOrder.map((catId) => {
                const catInfo = productCategories[catId];
                const items = productNavigationItems.filter((p) => p.category === catId);
                return (
                  <li key={catId}>
                    <span className="text-[0.7rem] font-semibold text-be-grey-400 uppercase tracking-wider">
                      {catInfo.displayName}
                    </span>
                    <ul className="flex flex-col gap-1.5 mt-1">
                      {items.map((product) => (
                        <li key={product.slug}>
                          <Link
                            href={product.href}
                            className="text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors"
                          >
                            {product.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Separator */}
          <div className="hidden lg:block border-l border-be-grey-250/60 mx-1" />

          {/* Column 4 — Enquiry + Contact */}
          <div className="flex flex-col gap-6">
            {/* Enquiry links */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-be-charcoal-950 uppercase tracking-wide">
                Enquiry
              </h3>
              <ul className="flex flex-col gap-2.5">
                {enquiryLinks.map((link) => (
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

            {/* Contact info */}
            <ContactSection />
          </div>
        </div>

        {/* Mobile: stacked groups with accordion */}
        <div className="md:hidden flex flex-col gap-6">
          {/* Brand at top */}
          <BrandSection />

          {/* Accordion sections */}
          <Accordion type="single" collapsible defaultValue="company">
            <AccordionItem value="company">
              <AccordionTrigger className="text-base font-semibold text-be-charcoal-950 py-3 min-h-[44px]">
                Company
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-2.5 pb-2">
                  {companyLinks.map((link) => (
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
                  <li>
                    <Link
                      href="/products"
                      className="text-base text-be-yellow-500 font-semibold hover:text-be-yellow-600 transition-colors py-1 min-h-[44px] inline-flex items-center"
                    >
                      View All Products
                    </Link>
                  </li>
                  {categoryOrder.map((catId) => {
                    const catInfo = productCategories[catId];
                    const items = productNavigationItems.filter((p) => p.category === catId);
                    return (
                      <li key={catId}>
                        <span className="text-[0.7rem] font-semibold text-be-grey-400 uppercase tracking-wider py-1">
                          {catInfo.displayName}
                        </span>
                        <ul className="flex flex-col gap-1.5 mt-1">
                          {items.map((product) => (
                            <li key={product.slug}>
                              <Link
                                href={product.href}
                                className="text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors py-1 min-h-[44px] inline-flex items-center"
                              >
                                {product.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="enquiry">
              <AccordionTrigger className="text-base font-semibold text-be-charcoal-950 py-3 min-h-[44px]">
                Enquiry
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-2.5 pb-2">
                  {enquiryLinks.map((link) => (
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

            <AccordionItem value="contact">
              <AccordionTrigger className="text-base font-semibold text-be-charcoal-950 py-3 min-h-[44px]">
                Contact
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-3 pb-2">
                  <li>
                    <a
                      href={`mailto:${company.email}`}
                      className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors min-h-[44px]"
                    >
                      <Mail className="size-4 shrink-0" />
                      <span>{company.email}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${company.phonePrimaryTel}`}
                      className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors min-h-[44px]"
                    >
                      <Phone className="size-4 shrink-0" />
                      <span>{company.phonePrimary}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={company.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-600 transition-colors min-h-[44px]"
                    >
                      <MessageCircle className="size-4 shrink-0" />
                      <span>{company.whatsapp.label}</span>
                    </a>
                  </li>
                  <li className="flex items-start gap-2 text-base text-be-grey-650 py-2">
                    <MapPin className="size-4 shrink-0 mt-1" />
                    <span>
                      {company.address.line1}, {company.address.line2},<br />
                      {company.address.city}, {company.address.state} — {company.address.pincode}
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
          &copy; {new Date().getFullYear()} {company.name}. All rights reserved. | IS 15652:2006 | CM/L:8800129617
          </p>
          <div className="flex items-center gap-4">
            <span className="text-metadata text-be-grey-650">
              IS 15652:2006 | CM/L:8800129617 | Made in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
