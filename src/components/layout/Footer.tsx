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
import { company, phones, locations } from '@/data/company';
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
   Shared footer link styles
   ────────────────────────────────────────────
   Default: charcoal-800 for strong readability on warm-white.
   Hover:   dark amber text + underline offset for clear interaction.
   Focus:   yellow ring (inherited from global focus-ring utilities). */

const footerLinkBase = 'text-be-charcoal-800 hover:text-be-yellow-text-hover hover:underline decoration-be-yellow-text-hover/30 underline-offset-4 transition-colors';

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
          src="/brand/bharat-electrosafe-footer-logo.webp"
          alt="Bharat Electrosafe logo"
          width={400}
          height={104}
          className="object-contain w-[150px] lg:w-[165px] h-auto"
          priority
        />
      </Link>
      {/* Brand description — 15px, medium-dark grey, comfortable reading. */}
      <p className="text-[0.9375rem] text-be-grey-700 leading-[1.65] max-w-[300px]">
        Bharat Electrosafe manufactures electrical insulating mats and engineered PVC products for electrical-safety and civil-protection applications.
      </p>
      <div className="flex items-center gap-3 pt-0.5">
        <IconButton href={`mailto:${company.email}`} label="Email Bharat Electrosafe">
          <Mail className="size-[18px]" aria-hidden="true" focusable="false" />
        </IconButton>
        <IconButton href={`tel:${company.phonePrimaryTel}`} label={`Call ${company.phonePrimary}`}>
          <Phone className="size-[18px]" aria-hidden="true" focusable="false" />
        </IconButton>
        <IconButton
          href={company.whatsapp.href}
          label="Chat on WhatsApp (opens in a new tab)"
          external
        >
          <MessageCircle className="size-[18px]" aria-hidden="true" focusable="false" />
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
      {/* Column heading — 14px, semibold, charcoal-950, moderate tracking. */}
      <h2 className="text-[0.875rem] font-semibold text-be-charcoal-950 uppercase tracking-[0.06em]">
        Company
      </h2>
      {/* Links — 16px, charcoal-800, readable. */}
      <ul className="flex flex-col gap-2.5">
        {companyLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={cn('text-base font-medium leading-normal', footerLinkBase)}
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
      {/* Column heading — 14px, semibold, charcoal-950. */}
      <h2 className="text-[0.875rem] font-semibold text-be-charcoal-950 uppercase tracking-[0.06em]">
        Products
      </h2>
      <Link
        href="/products"
        className="text-base text-be-yellow-text font-semibold hover:text-be-yellow-text-hover transition-colors"
      >
        View All Products
      </Link>
      <div className="flex flex-col gap-4">
        {categoryOrder.map((catId) => {
          const catInfo = productCategories[catId];
          const items = productNavigationItems.filter((p) => p.category === catId);
          return (
            <div key={catId}>
              {/* Category label — 12.5px, semibold, charcoal-800. */}
              <p className="text-[0.78125rem] font-semibold text-be-charcoal-800 uppercase tracking-[0.08em] mb-1.5">
                {catInfo.displayName}
              </p>
              <ul className="flex flex-col gap-2">
                {items.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={product.href}
                      className={cn('text-base font-medium leading-normal', footerLinkBase)}
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
        className={cn('text-base font-medium', footerLinkBase)}
      >
        Ask for Technical Guidance
      </Link>

      {/* Contact rows — 16px text, 18px icons, charcoal-800, 44px touch targets. */}
      <ul className="flex flex-col">
        <li>
          <a
            href={`mailto:${company.email}`}
            className={cn(
              'flex items-center gap-2.5 text-base text-be-charcoal-800 py-1.5 min-h-[44px] border-t border-be-grey-250',
              footerLinkBase
            )}
          >
            <Mail className="size-[18px] shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
            <span className="break-words">{company.email}</span>
          </a>
        </li>
        {/* All phone numbers from the central data source */}
        {phones.map((phone, idx) => (
          <li key={phone.tel}>
            <a
              href={`tel:${phone.tel}`}
              className={cn(
                'flex items-center gap-2.5 text-base text-be-charcoal-800 py-1.5 min-h-[44px] border-t border-be-grey-250',
                footerLinkBase
              )}
            >
              <Phone className="size-[18px] shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
              <span>{phone.display}</span>
            </a>
          </li>
        ))}
        <li>
          <a
            href={company.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-2.5 text-base text-be-charcoal-800 py-1.5 min-h-[44px] border-t border-be-grey-250',
              footerLinkBase
            )}
          >
            <MessageCircle className="size-[18px] shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
            <span>WhatsApp</span>
          </a>
        </li>
        <li>
          <a
            href={officeMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-start gap-2.5 text-base text-be-charcoal-800 py-1.5 min-h-[44px] border-t border-b border-be-grey-250',
              footerLinkBase
            )}
          >
            <MapPin className="size-[18px] shrink-0 mt-1 text-be-yellow-text" aria-hidden="true" focusable="false" />
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
   Locations column — compact multi-column list
   ────────────────────────────────────────────
   Client-confirmed location list. Uses neutral "Locations" heading —
   we do NOT assert each one is an "Office", "Branch", "Factory" or
   "Dealer" unless explicitly confirmed. */

function LocationsBlock() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[0.875rem] font-semibold text-be-charcoal-950 uppercase tracking-[0.06em]">
        Locations
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-1.5">
        {locations.map((loc) => (
          <span
            key={loc}
            className="text-[0.8125rem] text-be-charcoal-800 leading-snug"
          >
            {loc}
          </span>
        ))}
      </div>
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
        {/* ────────── Desktop / tablet layout ────────── */}
        <nav aria-label="Footer company navigation" className="hidden md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-[1.1fr_0.65fr_1.2fr_1.1fr] lg:gap-x-12 lg:gap-y-0">
          {/* Row 1, Col 1 — Brand (lg: col 1) */}
          <div className="lg:pr-8">
            <BrandColumn />
          </div>

          {/* Row 1, Col 2 — Contact and Enquiries (lg: col 4) */}
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

        {/* ────────── Mobile layout (<768px) ────────── */}
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
                        className={cn(
                          'text-base font-medium py-2 min-h-[44px] inline-flex items-center',
                          footerLinkBase
                        )}
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
                <div className="flex flex-col gap-3 pb-2">
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
                        <p className="text-[0.78125rem] font-semibold text-be-charcoal-800 uppercase tracking-[0.08em] py-1">
                          {catInfo.displayName}
                        </p>
                        <ul className="flex flex-col gap-1 mt-0.5">
                          {items.map((product) => (
                            <li key={product.slug}>
                              <Link
                                href={product.href}
                                className={cn(
                                  'text-base font-medium py-2 min-h-[44px] inline-flex items-center',
                                  footerLinkBase
                                )}
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
                      className={cn(
                        'flex items-center gap-2.5 text-base text-be-charcoal-800 py-2 min-h-[44px] border-t border-be-grey-250',
                        footerLinkBase
                      )}
                    >
                      <Mail className="size-[18px] shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
                      <span className="break-words">{company.email}</span>
                    </a>
                  </li>
                  {phones.map((phone) => (
                    <li key={phone.tel}>
                      <a
                        href={`tel:${phone.tel}`}
                        className={cn(
                          'flex items-center gap-2.5 text-base text-be-charcoal-800 py-2 min-h-[44px] border-t border-be-grey-250',
                          footerLinkBase
                        )}
                      >
                        <Phone className="size-[18px] shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
                        <span>{phone.display}</span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={company.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'flex items-center gap-2.5 text-base text-be-charcoal-800 py-2 min-h-[44px] border-t border-be-grey-250',
                        footerLinkBase
                      )}
                    >
                      <MessageCircle className="size-[18px] shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
                      <span>WhatsApp</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={officeMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'flex items-start gap-2.5 text-base text-be-charcoal-800 py-2 min-h-[44px] border-t border-b border-be-grey-250',
                        footerLinkBase
                      )}
                    >
                      <MapPin className="size-[18px] shrink-0 mt-1 text-be-yellow-text" aria-hidden="true" focusable="false" />
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

            <AccordionItem value="locations">
              <AccordionTrigger className="text-base font-semibold text-be-charcoal-950 py-3 min-h-[44px]">
                Locations
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 pb-2">
                  {locations.map((loc) => (
                    <span
                      key={loc}
                      className="text-[0.8125rem] text-be-charcoal-800 leading-snug py-1"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>

        {/* ── Locations strip (desktop/tablet only, below main grid) ── */}
        <div className="hidden md:block mt-10 pt-6 border-t border-be-grey-250/60">
          <LocationsBlock />
        </div>
      </div>

      {/* ── Bottom bar — 13.5px text, charcoal-800, higher contrast ── */}
      <div className="border-t border-be-grey-250 bg-be-yellow-50/50">
        <div className="container-site page-horizontal-padding py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="text-[0.84375rem] text-be-charcoal-800 leading-relaxed text-center sm:text-left">
            &copy; {currentYear} {company.name}. All rights reserved.
          </p>
          <p className="text-[0.84375rem] text-be-charcoal-800 leading-relaxed text-center sm:text-right">
            IS 15652:2006 · BIS Licence CM/L:8800129617 · India
          </p>
        </div>
        {/* Developer credit — subtle, muted, ~12px */}
        <div className="container-site page-horizontal-padding pb-3 pt-1 text-center">
          <a
            href="https://dev-aditya.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.75rem] text-be-grey-400 hover:text-be-grey-600 transition-colors leading-relaxed"
          >
            Website by Aditya ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
