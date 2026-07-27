'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { cn } from '@/lib/utils';
import { company } from '@/data/company';

/* ────────────────────────────────────────────
   Product data
   ──────────────────────────────────────────── */

interface ProductNavItem {
  name: string;
  description: string;
  href: string;
  thumbnail: string; // real product image from official website
}

const products: ProductNavItem[] = [
  {
    name: 'Electrical Insulating Mats',
    description: 'Class A, B & C voltage-rated insulation',
    href: '/products/electrical-insulating-mats',
    thumbnail: '/media/products/electrical-insulating-mats/product-02.webp',
  },
  {
    name: 'Coloured Strip Insulating Mats',
    description: 'Boundary marking for hazard zones',
    href: '/products/coloured-strip-insulating-mats',
    thumbnail: '/media/products/coloured-strip-insulating-mats/product-04.webp',
  },
  {
    name: 'Bi-Color Insulating Mats',
    description: 'Dual-tone visual differentiation',
    href: '/products/bi-color-insulating-mats',
    thumbnail: '/media/products/bi-color-insulating-mats/product-01.webp',
  },
  {
    name: 'Auto-Glow / Reflective Band Mats',
    description: 'Low-light emergency guidance',
    href: '/products/auto-glow-reflective-band-insulating-mats',
    thumbnail: '/media/products/auto-glow-reflective-band-insulating-mats/product-06.webp',
  },
  {
    name: 'BharatMembrane',
    description: 'Engineered waterproofing membrane',
    href: '/products/bharat-membrane',
    thumbnail: '/media/products/bharat-membrane/product-01.webp',
  },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Contact Us', href: '/contact-us' },
];

/* ────────────────────────────────────────────
   Header component
   ──────────────────────────────────────────── */

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check if a product link matches current path
  const isProductActive = products.some((p) => pathname.startsWith(p.href));

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setCompact(y > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change (resize)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dropdown hover handlers with delay
  const handleDropdownEnter = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  }, []);

  // Keyboard handler for dropdown (Escape to close)
  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setDropdownOpen(false);
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="relative z-50">
      {/* ── Top Contact Strip (desktop only) ── */}
      <div className="hidden md:block bg-be-warm-white border-b border-be-grey-250">
        <div className="container-site page-horizontal-padding flex items-center justify-between h-8">
          {/* Left: contact info */}
          <div className="flex items-center gap-5 text-metadata text-be-charcoal-800">
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-1.5 hover:text-be-yellow-600 transition-colors"
            >
              <Mail className="size-3.5" />
              <span>{company.email}</span>
            </a>
            <a
              href={company.phonePrimaryTel}
              className="flex items-center gap-1.5 hover:text-be-yellow-600 transition-colors"
            >
              <Phone className="size-3.5" />
              <span>{company.phonePrimary}</span>
            </a>
          </div>

          {/* Right: social / WhatsApp */}
          <div className="flex items-center gap-3">
            <a
              href={company.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-metadata text-be-charcoal-800 hover:text-be-yellow-600 transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="size-3.5" />
              <span>{company.whatsapp.label}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Header Bar ── */}
      <div
        className={cn(
          'sticky top-0 z-50 bg-be-white border-b border-be-grey-250 transition-all duration-300',
          scrolled && 'shadow-sm',
          compact ? 'h-16 md:h-[72px]' : 'h-16 md:h-20'
        )}
      >
        <div
          className={cn(
            'container-site page-horizontal-padding flex items-center justify-between h-full transition-all duration-300',
            compact ? 'gap-3' : 'gap-6'
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0"
            aria-label="Bharat Electrosafe — Home"
          >
            <Image
              src="/images/brand/bharat-electrosafe-logo-full.webp"
              alt="Bharat Electrosafe logo"
              width={160}
              height={60}
              className={cn(
                'object-contain transition-all duration-300 h-auto',
                compact ? 'w-[85px]' : 'w-[110px]'
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            <Link
              href="/"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-be-yellow-50 hover:text-be-yellow-600',
                pathname === '/' ? 'text-be-yellow-600 border-l-[3px] border-be-yellow-500 pl-3' : 'text-be-charcoal-800'
              )}
            >
              Home
            </Link>

            {/* Products with dropdown */}
            <div
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              onKeyDown={handleDropdownKeyDown}
            >
              <button
                type="button"
                className={cn(
                  'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  dropdownOpen || isProductActive
                    ? 'text-be-yellow-600 bg-be-yellow-50'
                    : 'text-be-charcoal-800 hover:text-be-yellow-600 hover:bg-be-yellow-50',
                  isProductActive && 'border-l-[3px] border-be-yellow-500 pl-3'
                )}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                Products
                <ChevronDown
                  className={cn(
                    'size-4 transition-transform duration-200',
                    dropdownOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* Dropdown panel */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[640px] bg-be-yellow-50 border border-be-grey-250 rounded-xl shadow-lg p-5"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                    onKeyDown={handleDropdownKeyDown}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {products.map((product) => (
                        <Link
                          key={product.href}
                          href={product.href}
                          className="flex items-start gap-3 p-3 rounded-lg bg-be-white hover:bg-be-cream transition-colors group"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {/* Thumbnail — real product image */}
                          <Image
                            src={product.thumbnail}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="shrink-0 w-10 h-10 rounded-md object-cover"
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-be-charcoal-950 group-hover:text-be-yellow-600 transition-colors leading-snug">
                              {product.name}
                            </div>
                            <div className="text-metadata text-be-grey-650 mt-0.5 leading-snug">
                              {product.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/about-us"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-be-yellow-50 hover:text-be-yellow-600',
                pathname === '/about-us' ? 'text-be-yellow-600 border-l-[3px] border-be-yellow-500 pl-3' : 'text-be-charcoal-800'
              )}
            >
              About Us
            </Link>

            <Link
              href="/contact-us"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-be-yellow-50 hover:text-be-yellow-600',
                pathname === '/contact-us' ? 'text-be-yellow-600 border-l-[3px] border-be-yellow-500 pl-3' : 'text-be-charcoal-800'
              )}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right side: CTA + Mobile menu */}
          <div className="flex items-center gap-3">
            <PrimaryButton href="/contact-us" className="hidden md:inline-flex text-sm px-5 py-2.5">
              Request a Quote
            </PrimaryButton>

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="md:hidden inline-flex items-center justify-center size-11 rounded-md text-be-charcoal-950 hover:bg-be-grey-150 transition-colors"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-6" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[320px] sm:w-[360px] bg-be-white p-0">
                <SheetHeader className="px-5 pt-5 pb-3 border-b border-be-grey-250">
                  <SheetTitle className="flex items-center">
                    <Link href="/" onClick={() => setMobileOpen(false)}>
                      <Image
                        src="/images/brand/bharat-electrosafe-logo-full.webp"
                        alt="Bharat Electrosafe logo"
                        width={120}
                        height={46}
                        className="object-contain w-[120px] h-auto"
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col py-2" aria-label="Mobile navigation">
                  <Link
                    href="/"
                    className={cn(
                      'px-5 py-3.5 text-base font-medium transition-colors min-h-[44px] flex items-center',
                      pathname === '/'
                        ? 'text-be-yellow-600 bg-be-yellow-50 border-l-[3px] border-be-yellow-500'
                        : 'text-be-charcoal-950 hover:bg-be-yellow-50 hover:text-be-yellow-600'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    Home
                  </Link>

                  {/* Products accordion */}
                  <Accordion type="single" collapsible className="px-0">
                    <AccordionItem value="products" className="border-b-0">
                      <AccordionTrigger className={cn(
                        'px-5 py-3.5 text-base font-medium transition-colors min-h-[44px] hover:no-underline',
                        isProductActive
                          ? 'text-be-yellow-600 bg-be-yellow-50 border-l-[3px] border-be-yellow-500'
                          : 'text-be-charcoal-950 hover:bg-be-yellow-50 hover:text-be-yellow-600'
                      )}>
                        Products
                      </AccordionTrigger>
                      <AccordionContent className="pb-2">
                        <div className="flex flex-col">
                          {products.map((product) => (
                            <Link
                              key={product.href}
                              href={product.href}
                              className={cn(
                                'flex items-center gap-3 px-5 py-3 pl-8 text-sm transition-colors min-h-[44px]',
                                pathname.startsWith(product.href)
                                  ? 'text-be-yellow-600 bg-be-yellow-50'
                                  : 'text-be-charcoal-800 hover:bg-be-yellow-50 hover:text-be-yellow-600'
                              )}
                              onClick={() => setMobileOpen(false)}
                            >
                              <Image
                                src={product.thumbnail}
                                alt={product.name}
                                width={28}
                                height={28}
                                className="shrink-0 w-7 h-7 rounded-md object-cover"
                              />
                              <div className="min-w-0">
                                <div className="font-medium leading-snug">
                                  {product.name}
                                </div>
                                <div className="text-metadata text-be-grey-650 leading-snug">
                                  {product.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Divider between Products accordion and other nav items */}
                  <div className="mx-5 my-1 h-px bg-be-grey-250" />

                  <Link
                    href="/about-us"
                    className={cn(
                      'px-5 py-3.5 text-base font-medium transition-colors min-h-[44px] flex items-center',
                      pathname === '/about-us'
                        ? 'text-be-yellow-600 bg-be-yellow-50 border-l-[3px] border-be-yellow-500'
                        : 'text-be-charcoal-950 hover:bg-be-yellow-50 hover:text-be-yellow-600'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    About Us
                  </Link>

                  <Link
                    href="/contact-us"
                    className={cn(
                      'px-5 py-3.5 text-base font-medium transition-colors min-h-[44px] flex items-center',
                      pathname === '/contact-us'
                        ? 'text-be-yellow-600 bg-be-yellow-50 border-l-[3px] border-be-yellow-500'
                        : 'text-be-charcoal-950 hover:bg-be-yellow-50 hover:text-be-yellow-600'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    Contact Us
                  </Link>
                </nav>

                {/* CTA at bottom of mobile sheet */}
                <div className="mt-auto px-5 pb-6 pt-4 border-t border-be-grey-250">
                  <PrimaryButton
                    href="/contact-us"
                    className="w-full justify-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Request a Quote
                  </PrimaryButton>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
