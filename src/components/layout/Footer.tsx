import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
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
import { officeMapsDirectionsUrl } from '@/components/contact/ContactIntro';

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

/* Footer product labels — shortened where needed to avoid awkward
   multi-line wrapping. The full official names remain on the product
   pages themselves. */
const footerProductLabels: Record<string, string> = {
  'electrical-insulating-mats': 'Electrical Insulating Mats',
  'coloured-strip-insulating-mats': 'Coloured Strip Mats',
  'bi-color-insulating-mats': 'Bi-Color Insulating Mats',
  'auto-glow-reflective-band-insulating-mats': 'Auto-Glow / Reflective Mats',
  'bharat-membrane': 'BharatMembrane',
  'bharat-hydro-seal': 'Bharat Hydro Seal',
};

/* Shortened footer address used in column 4 + mobile Contact accordion.
   Linked to the exact Google Maps destination. The full address remains
   on the Contact page itself. */
const shortAddressLines = [
  company.name,
  company.address.line1,
  `Sector 62, ${company.address.city} — ${company.address.pincode}`,
];

/* ────────────────────────────────────────────
   Icon button — shared by brand column
   ──────────────────────────────────────────── */

function IconButton({
  href,
  label,
  children,
  external,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="size-11 inline-flex items-center justify-center rounded-md border border-be-grey-250 text-be-charcoal-800 hover:bg-be-yellow-50 hover:text-be-yellow-text-hover hover:border-be-yellow-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-400 focus-visible:ring-offset-2"
    >
      {children}
    </a>
  );
}

/* ────────────────────────────────────────────
   Brand column
   ──────────────────────────────────────────── */

function BrandColumn() {
  return (
    <div className="flex flex-col gap-3.5">
      <Link href="/" aria-label="Bharat Electrosafe — home">
        <Image
          src="/images/brand/bharat-electrosafe-logo-full.webp"
          alt="Bharat Electrosafe logo"
          width={1492}
          height={1021}
          sizes="(max-width: 1023px) 100px, 115px"
          className="object-contain w-[100px] lg:w-[115px] h-auto"
          priority
        />
      </Link>
      <p className="text-sm text-be-grey-650 leading-relaxed max-w-[280px]">
        Certified electrical insulating mats and engineered protection products for substations, switchrooms, utilities and industry.
      </p>
      <div className="flex items-center gap-3 pt-0.5">
        <IconButton href={`mailto:${company.email}`} label="Email Bharat Electrosafe">
          <Mail className="size-4" aria-hidden="true" focusable="false" />
        </IconButton>
        <IconButton href={`tel:${company.phonePrimaryTel}`} label={`Call ${company.phonePrimary}`}>
          <Phone className="size-4" aria-hidden="true" focusable="false" />
        </IconButton>
        <IconButton
          href={company.whatsapp.href}
          label="Chat on WhatsApp (opens in a new tab)"
          external
        >
          <MessageCircle className="size-4" aria-hidden="true" focusable="false" />
        </IconButton>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Company column
   ──────────────────────────────────────────── */

function CompanyColumn() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-be-charcoal-950 uppercase tracking-wide">
        Company
      </h2>
      <ul className="flex flex-col gap-2">
        {companyLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-base text-be-grey-650 hover:text-be-yellow-text-hover transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ────────────────────────────────────────────
   Products column — all six families
   ──────────────────────────────────────────── */

function ProductsColumn() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-be-charcoal-950 uppercase tracking-wide">
        Products
      </h2>
      <Link
        href="/products"
        className="text-base text-be-yellow-text font-semibold hover:text-be-yellow-text-hover transition-colors"
      >
        View All Products
      </Link>
      <div className="flex flex-col gap-2.5">
        {categoryOrder.map((catId) => {
          const catInfo = productCategories[catId];
          const items = productNavigationItems.filter((p) => p.category === catId);
          return (
            <div key={catId}>
              <p className="text-[0.7rem] font-semibold text-be-grey-650 uppercase tracking-wider">
                {catInfo.displayName}
              </p>
              <ul className="flex flex-col gap-1.5 mt-1">
                {items.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={product.href}
                      className="text-base text-be-grey-650 hover:text-be-yellow-text-hover transition-colors"
                    >
                      {footerProductLabels[product.slug] ?? product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Contact and Enquiries column
   Yellow quote CTA at top, compact rows below.
   ──────────────────────────────────────────── */

function ContactEnquiriesColumn() {
  return (
    <div className="flex flex-col gap-3.5">
      <Link
        href="/contact-us?type=quote"
        className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-lg bg-be-yellow-500 text-be-charcoal-950 font-semibold shadow-sm hover:bg-be-yellow-600 hover:-translate-y-0.5 transition-all px-5 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-400 focus-visible:ring-offset-2 w-fit"
      >
        Request a Quote
        <ArrowRight className="size-4" aria-hidden="true" focusable="false" />
      </Link>

      <Link
        href="/contact-us?type=technical-guidance"
        className="text-base text-be-grey-650 hover:text-be-yellow-text-hover transition-colors"
      >
        Ask for Technical Guidance
      </Link>

      <ul className="flex flex-col">
        <li>
          <a
            href={`mailto:${company.email}`}
            className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-text-hover transition-colors py-1.5 min-h-[44px] border-t border-be-grey-150"
          >
            <Mail className="size-4 shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
            <span className="break-words">{company.email}</span>
          </a>
        </li>
        <li>
          <a
            href={`tel:${company.phonePrimaryTel}`}
            className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-text-hover transition-colors py-1.5 min-h-[44px] border-t border-be-grey-150"
          >
            <Phone className="size-4 shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
            <span>{company.phonePrimary}</span>
          </a>
        </li>
        <li>
          <a
            href={company.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-text-hover transition-colors py-1.5 min-h-[44px] border-t border-be-grey-150"
          >
            <MessageCircle className="size-4 shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
            <span>WhatsApp</span>
          </a>
        </li>
        <li>
          <a
            href={officeMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 text-base text-be-grey-650 hover:text-be-yellow-text-hover transition-colors py-1.5 min-h-[44px] border-t border-b border-be-grey-150"
          >
            <MapPin className="size-4 shrink-0 mt-1 text-be-yellow-text" aria-hidden="true" focusable="false" />
            <span>
              {shortAddressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}

/* ────────────────────────────────────────────
   Footer component
   ──────────────────────────────────────────── */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-be-warm-white">
      {/* ── Yellow accent top border ── */}
      <div className="h-[3px] bg-be-yellow-500" />

      {/* ── Main footer content ── */}
      <div className="container-site page-horizontal-padding pt-11 pb-9 lg:pt-12 lg:pb-10">
        {/* ────────── Desktop / tablet layout ──────────
            - md (768–1024px): deliberate 2-column grid
              Row 1: Brand | Contact and Enquiries
              Row 2: Company | Products
            - lg (≥1024px): single-row 4-column grid with
              explicit proportions and border separators
              applied to columns 2/3/4 (not as grid children).
            Exactly four direct grid children at lg, no separator divs. */}
        <nav aria-label="Footer company navigation" className="hidden md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-[1.1fr_0.65fr_1.2fr_1.1fr] lg:gap-x-12 lg:gap-y-0">
          {/* Row 1, Col 1 — Brand (lg: col 1) */}
          <div className="lg:pr-8">
            <BrandColumn />
          </div>

          {/* Row 1, Col 2 — Contact and Enquiries (lg: col 4)
              On md, this occupies row 1 col 2; on lg, it moves to col 4.
              Border-left applied directly to the column (not a separator div). */}
          <div className="md:pl-4 lg:pl-8 lg:order-4 lg:border-l lg:border-be-grey-250/60">
            <ContactEnquiriesColumn />
          </div>

          {/* Row 2, Col 1 — Company (lg: col 2) */}
          <div className="lg:pl-8 lg:order-2 lg:border-l lg:border-be-grey-250/60">
            <CompanyColumn />
          </div>

          {/* Row 2, Col 2 — Products (lg: col 3) */}
          <div className="md:pl-4 lg:pl-8 lg:order-3 lg:border-l lg:border-be-grey-250/60">
            <ProductsColumn />
          </div>
        </nav>

        {/* ────────── Mobile layout (<768px) ──────────
            1. Brand
            2. Description (inside BrandColumn)
            3. Email / phone / WhatsApp icons (inside BrandColumn)
            4. Request a Quote button
            5. Accordions: Company, Products, Contact
            6. Legal bottom bar */}
        <nav aria-label="Footer company navigation" className="md:hidden flex flex-col gap-5">
          <BrandColumn />

          <Link
            href="/contact-us?type=quote"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-lg bg-be-yellow-500 text-be-charcoal-950 font-semibold shadow-sm hover:bg-be-yellow-600 transition-all px-5 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-400 focus-visible:ring-offset-2"
          >
            Request a Quote
            <ArrowRight className="size-4" aria-hidden="true" focusable="false" />
          </Link>

          <Accordion type="single" collapsible defaultValue="company">
            <AccordionItem value="company">
              <AccordionTrigger className="text-base font-semibold text-be-charcoal-950 py-3 min-h-[44px]">
                Company
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-1 pb-2">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-base text-be-grey-650 hover:text-be-yellow-text-hover transition-colors py-2 min-h-[44px] inline-flex items-center"
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
                <div className="flex flex-col gap-2.5 pb-2">
                  <Link
                    href="/products"
                    className="text-base text-be-yellow-text font-semibold hover:text-be-yellow-text-hover transition-colors py-2 min-h-[44px] inline-flex items-center"
                  >
                    View All Products
                  </Link>
                  {categoryOrder.map((catId) => {
                    const catInfo = productCategories[catId];
                    const items = productNavigationItems.filter((p) => p.category === catId);
                    return (
                      <div key={catId}>
                        <p className="text-[0.7rem] font-semibold text-be-grey-650 uppercase tracking-wider py-1">
                          {catInfo.displayName}
                        </p>
                        <ul className="flex flex-col gap-1 mt-0.5">
                          {items.map((product) => (
                            <li key={product.slug}>
                              <Link
                                href={product.href}
                                className="text-base text-be-grey-650 hover:text-be-yellow-text-hover transition-colors py-2 min-h-[44px] inline-flex items-center"
                              >
                                {footerProductLabels[product.slug] ?? product.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact">
              <AccordionTrigger className="text-base font-semibold text-be-charcoal-950 py-3 min-h-[44px]">
                Contact
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col pb-2">
                  <li>
                    <a
                      href={`mailto:${company.email}`}
                      className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-text-hover transition-colors py-2 min-h-[44px] border-t border-be-grey-150"
                    >
                      <Mail className="size-4 shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
                      <span className="break-words">{company.email}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${company.phonePrimaryTel}`}
                      className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-text-hover transition-colors py-2 min-h-[44px] border-t border-be-grey-150"
                    >
                      <Phone className="size-4 shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
                      <span>{company.phonePrimary}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={company.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-base text-be-grey-650 hover:text-be-yellow-text-hover transition-colors py-2 min-h-[44px] border-t border-be-grey-150"
                    >
                      <MessageCircle className="size-4 shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
                      <span>WhatsApp</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={officeMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 text-base text-be-grey-650 hover:text-be-yellow-text-hover transition-colors py-2 min-h-[44px] border-t border-b border-be-grey-150"
                    >
                      <MapPin className="size-4 shrink-0 mt-1 text-be-yellow-text" aria-hidden="true" focusable="false" />
                      <span>
                        {shortAddressLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                    </a>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
      </div>

      {/* ── Bottom bar — no duplicated certification info ── */}
      <div className="border-t border-be-grey-250 bg-be-yellow-50/50">
        <div className="container-site page-horizontal-padding py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-metadata text-be-grey-650 text-center sm:text-left">
            &copy; {currentYear} {company.name}. All rights reserved.
          </p>
          <p className="text-metadata text-be-grey-650 text-center sm:text-right">
            IS 15652:2006 · BIS Licence CM/L:8800129617 · Made in India
          </p>
        </div>
      </div>
    </footer>
  );
}
