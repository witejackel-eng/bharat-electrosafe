'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import { company, contactWhatsApp } from '@/data/company';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Menu, ChevronDown, Phone, Mail, MessageCircle } from 'lucide-react';

/* ── Product navigation items ── */
const productNavItems = products.map((p) => ({
  name: p.name,
  href: `/products/${p.slug}`,
}));

/* ── Desktop nav items (4 primary) ── */
const desktopNavItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: null, hasDropdown: true },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact Us', href: '/contact-us' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const productsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProductsEnter = useCallback(() => {
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    setProductsOpen(true);
  }, []);

  const handleProductsLeave = useCallback(() => {
    productsTimeoutRef.current = setTimeout(() => setProductsOpen(false), 200);
  }, []);

  return (
    <>
      {/* ── Top Contact Bar ── */}
      <div className="bg-yellow-50/80 border-b border-grey-300/50">
        <div className="container-site flex items-center justify-between py-1.5 text-small-meta text-charcoal-800">
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${company.email}`}
              className="inline-flex items-center gap-1.5 hover:text-charcoal-950 transition-colors min-h-[28px]"
            >
              <Mail className="size-3 text-yellow-500" />
              <span className="hidden sm:inline">{company.email}</span>
            </a>
            <a
              href={`tel:${company.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-1.5 hover:text-charcoal-950 transition-colors min-h-[28px]"
            >
              <Phone className="size-3 text-yellow-500" />
              {company.phone}
            </a>
          </div>
          <a
            href={contactWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-charcoal-950 transition-colors min-h-[28px]"
          >
            <MessageCircle className="size-3 text-yellow-500" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* ── Main Header Bar ── */}
      <header
        className={`sticky top-0 z-50 bg-white border-b transition-shadow duration-200 ${
          scrolled ? 'shadow-sm' : 'shadow-none'
        }`}
      >
        <div className="container-site flex items-center justify-between h-[64px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 min-h-[44px]">
            <div className="relative w-[32px] h-[32px]">
              <Image
                src="/logo-bharat.png"
                alt="Bharat Electrosafe logo"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <span className="font-semibold text-charcoal-950 text-[0.95rem] tracking-tight leading-tight">
              Bharat Electrosafe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {desktopNavItems.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={handleProductsEnter}
                  onMouseLeave={handleProductsLeave}
                >
                  <button
                    type="button"
                    className="relative px-4 py-2 text-[0.875rem] font-medium text-charcoal-800 hover:text-charcoal-950 transition-colors inline-flex items-center gap-1 min-h-[44px]"
                    onFocus={handleProductsEnter}
                    onBlur={handleProductsLeave}
                    aria-expanded={productsOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-3.5 transition-transform duration-200 ${
                        productsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Products Dropdown */}
                  {productsOpen && (
                    <div
                      className="absolute left-0 top-full pt-2 animate-dropdown"
                      onMouseEnter={handleProductsEnter}
                      onMouseLeave={handleProductsLeave}
                    >
                      <div className="bg-white border border-grey-300 rounded-md shadow-sm py-2 w-[280px]">
                        {productNavItems.map((p) => (
                          <Link
                            key={p.href}
                            href={p.href}
                            className="block px-4 py-2.5 text-[0.875rem] text-charcoal-800 hover:bg-yellow-50 hover:text-charcoal-950 transition-colors min-h-[44px]"
                            onClick={() => setProductsOpen(false)}
                          >
                            {p.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="px-4 py-2 text-[0.875rem] font-medium text-charcoal-800 hover:text-charcoal-950 transition-colors min-h-[44px]"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA + Mobile Menu */}
          <div className="flex items-center gap-2">
            <Link
              href="/contact-us"
              className="hidden lg:inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-charcoal-950 font-semibold text-[0.875rem] px-5 py-2 rounded-md transition-colors min-h-[44px]"
            >
              Request a Quote
            </Link>

            {/* Mobile Menu Trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden min-h-[44px] min-w-[44px]"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-5 text-charcoal-950" />
            </Button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-[85vw] max-w-sm bg-warm-white p-0 overflow-y-auto">
          <SheetHeader className="p-5 pb-0">
            <SheetTitle className="text-charcoal-950 font-semibold text-lg">
              Bharat Electrosafe
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col p-5 pt-3 gap-1">
            {/* Home */}
            <Link
              href="/"
              className="py-3 px-2 text-base font-medium text-charcoal-950 hover:text-yellow-600 transition-colors border-b border-grey-300/50 min-h-[44px]"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            {/* Products Accordion */}
            <Accordion type="single" collapsible className="w-full border-b border-grey-300/50">
              <AccordionItem value="products" className="border-b-0">
                <AccordionTrigger className="text-charcoal-950 font-medium text-base py-3 px-2 min-h-[44px]">
                  Products
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 pl-4">
                    {productNavItems.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className="py-2 text-[0.875rem] text-charcoal-800 hover:text-yellow-600 transition-colors min-h-[44px]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* About Us */}
            <Link
              href="/about-us"
              className="py-3 px-2 text-base font-medium text-charcoal-950 hover:text-yellow-600 transition-colors border-b border-grey-300/50 min-h-[44px]"
              onClick={() => setMobileOpen(false)}
            >
              About Us
            </Link>

            {/* Contact Us */}
            <Link
              href="/contact-us"
              className="py-3 px-2 text-base font-medium text-charcoal-950 hover:text-yellow-600 transition-colors border-b border-grey-300/50 min-h-[44px]"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </Link>

            {/* Request a Quote */}
            <Link
              href="/contact-us"
              className="mt-4 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-charcoal-950 font-semibold text-[0.875rem] px-5 py-3 rounded-md transition-colors min-h-[44px]"
              onClick={() => setMobileOpen(false)}
            >
              Request a Quote
            </Link>

            {/* Contact info */}
            <div className="mt-4 pt-4 border-t border-grey-300/50 flex flex-col gap-3">
              <a
                href={`mailto:${company.email}`}
                className="inline-flex items-center gap-2 text-[0.875rem] text-charcoal-800 hover:text-yellow-600 transition-colors min-h-[44px]"
              >
                <Mail className="size-4 text-yellow-500" />
                {company.email}
              </a>
              <a
                href={`tel:${company.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 text-[0.875rem] text-charcoal-800 hover:text-yellow-600 transition-colors min-h-[44px]"
              >
                <Phone className="size-4 text-yellow-500" />
                {company.phone}
              </a>
              <a
                href={contactWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[0.875rem] text-charcoal-800 hover:text-yellow-600 transition-colors min-h-[44px]"
              >
                <MessageCircle className="size-4 text-yellow-500" />
                WhatsApp
              </a>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
