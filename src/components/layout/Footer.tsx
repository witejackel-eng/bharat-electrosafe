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
  productNavGroups,
  ProductNavGroup,
  ProductNavSubGroup,
  ProductNavLeaf,
} from '@/data/product-navigation';
import { officeMapsDirectionsUrl } from '@/components/contact/ContactIntro';

/* ────────────────────────────────────────────
   Shared data structures (single source)
   ──────────────────────────────────────────── */

const companyLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Contact Us', href: '/contact-us' },
];

const shortAddressLines = [
  company.address.line1,
  `Sector 62, ${company.address.city} — ${company.address.pincode}`,
];

/* ────────────────────────────────────────────
   Shared footer link styles
   ──────────────────────────────────────────── */

const footerLinkBase = 'text-be-charcoal-800 hover:text-be-yellow-text-hover hover:underline decoration-be-yellow-text-hover/30 underline-offset-4 transition-colors';

/* ────────────────────────────────────────────
   Footer component — compact redesign
   ────────────────────────────────────────────
   Structure:
     - 3-column desktop grid: Brand + contact | Products | Company + locations
     - Mobile: accordion
     - Bottom bar: copyright + BIS licence

   Key changes from previous version:
     - Removed 4th column, integrated contact into brand column
     - Locations inline with company, not a separate block
     - Product links simplified: group names only + View All
     - Shorter vertical height overall
*/

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-be-warm-white">
      {/* Yellow accent top border */}
      <div className="h-[3px] bg-be-yellow-500" />

      {/* Main footer content — tighter vertical spacing */}
      <div className="container-site page-horizontal-padding pt-8 pb-6 lg:pt-9 lg:pb-7">
        {/* ────────── Desktop layout ────────── */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-x-10 lg:gap-x-14">
          {/* Column 1 — Brand + contact */}
          <div className="flex flex-col gap-2.5">
            <Link href="/" aria-label="Bharat Electrosafe — home">
              <Image
                src="/brand/bharat-electrosafe-logo-final.png"
                alt="Bharat Electrosafe® logo"
                width={1520}
                height={1024}
                className="object-contain w-[175px] lg:w-[200px] h-auto"
                priority
              />
            </Link>
            <p className="text-sm text-be-grey-700 leading-relaxed max-w-[320px]">
              India&apos;s trusted name in precision-engineered electrical safety, industrial safety, infrastructure protection, PVC flooring and waterproofing solutions.
            </p>
            {/* Contact rows — compact */}
            <ul className="flex flex-col gap-1.5 mt-0.5">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className={cn('flex items-center gap-2 text-sm text-be-charcoal-800', footerLinkBase)}
                >
                  <Mail className="size-3.5 shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
                  {company.email}
                </a>
              </li>
              {phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className={cn('flex items-center gap-2 text-sm text-be-charcoal-800', footerLinkBase)}
                  >
                    <Phone className="size-3.5 shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={company.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn('flex items-center gap-2 text-sm text-be-charcoal-800', footerLinkBase)}
                >
                  <MessageCircle className="size-3.5 shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={officeMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn('flex items-start gap-2 text-sm text-be-charcoal-800', footerLinkBase)}
                >
                  <MapPin className="size-3.5 shrink-0 mt-0.5 text-be-yellow-text" aria-hidden="true" focusable="false" />
                  <span>
                    {shortAddressLines.map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                  </span>
                </a>
              </li>
            </ul>
            {/* CTA */}
            <Link
              href="/contact-us?type=quote"
              className="mt-1.5 inline-flex items-center justify-center gap-1.5 min-h-[40px] rounded-lg bg-be-yellow-500 text-be-charcoal-950 font-semibold shadow-sm hover:bg-be-yellow-600 hover:-translate-y-0.5 transition-all px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-400 focus-visible:ring-offset-2 w-fit"
            >
              Request a Quote
              <ArrowRight className="size-3.5" aria-hidden="true" focusable="false" />
            </Link>
          </div>

          {/* Column 2 — Products */}
          <div className="flex flex-col gap-2.5 lg:pl-6 lg:border-l lg:border-be-grey-250/60">
            <h2 className="text-[0.8125rem] font-semibold text-be-charcoal-950 uppercase tracking-[0.06em]">
              Products
            </h2>
            <Link
              href="/products"
              className="text-sm text-be-yellow-text font-semibold hover:text-be-yellow-text-hover transition-colors"
            >
              View All Products
            </Link>
            <div className="flex flex-col gap-2.5">
              {productNavGroups.map((group) => (
                <div key={group.id}>
                  <p className="text-[0.75rem] font-semibold text-be-charcoal-800 uppercase tracking-[0.07em] mb-0.5">
                    {group.name}
                  </p>
                  {group.hasSubGroups ? (
                    <div className="flex flex-col gap-1">
                      {(group.children as ProductNavSubGroup[]).map((sub) => (
                        <div key={sub.name}>
                          <p className="text-[0.6875rem] text-be-grey-600 uppercase tracking-[0.05em] mb-0.5">{sub.name}</p>
                          <ul className="flex flex-col gap-0.5">
                            {sub.items.map((item) => (
                              <li key={item.href}>
                                <Link href={item.href} className={cn('text-[0.8125rem] font-medium leading-normal', footerLinkBase)}>
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="flex flex-col gap-0.5">
                      {(group.children as ProductNavLeaf[]).map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className={cn('text-[0.8125rem] font-medium leading-normal', footerLinkBase)}>
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 — Company + Locations */}
          <div className="flex flex-col gap-2.5 lg:pl-6 lg:border-l lg:border-be-grey-250/60">
            <h2 className="text-[0.8125rem] font-semibold text-be-charcoal-950 uppercase tracking-[0.06em]">
              Company
            </h2>
            <ul className="flex flex-col gap-1">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={cn('text-sm font-medium leading-normal', footerLinkBase)}>
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact-us?type=technical-guidance"
                  className={cn('text-sm font-medium', footerLinkBase)}
                >
                  Technical Guidance
                </Link>
              </li>
            </ul>

            {/* Locations — compact inline */}
            <div className="mt-2 pt-2 border-t border-be-grey-250/60">
              <p className="text-[0.75rem] font-semibold text-be-charcoal-800 uppercase tracking-[0.07em] mb-1.5">
                Locations
              </p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                {locations.map((loc) => (
                  <span key={loc} className="text-[0.75rem] text-be-charcoal-800 leading-snug">
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ────────── Mobile layout (<768px) ────────── */}
        <div className="md:hidden flex flex-col gap-4">
          <Link href="/" aria-label="Bharat Electrosafe — home">
            <Image
              src="/brand/bharat-electrosafe-logo-final.png"
              alt="Bharat Electrosafe® logo"
              width={1520}
              height={1024}
              className="object-contain w-[165px] h-auto"
              priority
            />
          </Link>

          <Link
            href="/contact-us?type=quote"
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-lg bg-be-yellow-500 text-be-charcoal-950 font-semibold shadow-sm hover:bg-be-yellow-600 transition-all px-5 py-2.5 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-400 focus-visible:ring-offset-2"
          >
            Request a Quote
            <ArrowRight className="size-4" aria-hidden="true" focusable="false" />
          </Link>

          <Accordion type="single" collapsible defaultValue="products">
            <AccordionItem value="products">
              <AccordionTrigger className="text-base font-semibold text-be-charcoal-950 py-3 min-h-[44px]">
                Products
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2 pb-2">
                  <Link
                    href="/products"
                    className="text-sm text-be-yellow-text font-semibold hover:text-be-yellow-text-hover transition-colors py-1 min-h-[44px] inline-flex items-center"
                  >
                    View All Products
                  </Link>
                  {productNavGroups.map((group) => (
                    <MobileProductGroup key={group.id} group={group} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

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
                        className={cn('text-base font-medium py-2 min-h-[44px] inline-flex items-center', footerLinkBase)}
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
                <ul className="flex flex-col pb-2">
                  <li>
                    <a
                      href={`mailto:${company.email}`}
                      className={cn('flex items-center gap-2.5 text-sm text-be-charcoal-800 py-2 min-h-[44px] border-t border-be-grey-250', footerLinkBase)}
                    >
                      <Mail className="size-4 shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
                      <span className="break-words">{company.email}</span>
                    </a>
                  </li>
                  {phones.map((phone) => (
                    <li key={phone.tel}>
                      <a
                        href={`tel:${phone.tel}`}
                        className={cn('flex items-center gap-2.5 text-sm text-be-charcoal-800 py-2 min-h-[44px] border-t border-be-grey-250', footerLinkBase)}
                      >
                        <Phone className="size-4 shrink-0 text-be-yellow-text" aria-hidden="true" focusable="false" />
                        <span>{phone.display}</span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={company.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn('flex items-center gap-2.5 text-sm text-be-charcoal-800 py-2 min-h-[44px] border-t border-be-grey-250', footerLinkBase)}
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
                      className={cn('flex items-start gap-2.5 text-sm text-be-charcoal-800 py-2 min-h-[44px] border-t border-b border-be-grey-250', footerLinkBase)}
                    >
                      <MapPin className="size-4 shrink-0 mt-1 text-be-yellow-text" aria-hidden="true" focusable="false" />
                      <span>
                        {shortAddressLines.map((line) => (
                          <span key={line} className="block">{line}</span>
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
                    <span key={loc} className="text-[0.8125rem] text-be-charcoal-800 leading-snug py-0.5">
                      {loc}
                    </span>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-be-grey-250 bg-be-yellow-50/50">
        <div className="container-site page-horizontal-padding py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[0.8125rem] text-be-charcoal-800 leading-relaxed text-center sm:text-left">
            &copy; {currentYear} {company.name}. All rights reserved.
          </p>
          <p className="text-[0.8125rem] text-be-charcoal-800 leading-relaxed text-center sm:text-right">
            IS 15652:2006 · BIS Licence CM/L:8800129617 · India
          </p>
        </div>
        <div className="container-site page-horizontal-padding pb-2.5 pt-0.5 text-center">
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

/** Renders a product group inside the mobile Products accordion */
function MobileProductGroup({ group }: { group: ProductNavGroup }) {
  return (
    <div>
      <p className="text-[0.78125rem] font-semibold text-be-charcoal-800 uppercase tracking-[0.08em] py-1">
        {group.name}
      </p>
      {group.hasSubGroups ? (
        <div className="flex flex-col gap-1.5 ml-2">
          {(group.children as ProductNavSubGroup[]).map((sub) => (
            <div key={sub.name}>
              <p className="text-[0.6875rem] font-medium text-be-grey-600 uppercase tracking-[0.06em] py-0.5">
                {sub.name}
              </p>
              <ul className="flex flex-col gap-0.5 ml-2">
                {sub.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn('text-[0.8125rem] font-medium py-1.5 min-h-[44px] inline-flex items-center', footerLinkBase)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="flex flex-col gap-0.5 ml-2">
          {(group.children as ProductNavLeaf[]).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn('text-[0.8125rem] font-medium py-1.5 min-h-[44px] inline-flex items-center', footerLinkBase)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
