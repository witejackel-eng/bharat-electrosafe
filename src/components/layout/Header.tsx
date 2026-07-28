'use client';

import { useState, useEffect, useRef, useCallback, startTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
/* Framer Motion removed — the mega-menu now uses CSS transitions for
   show/hide. This eliminates the framer-motion runtime from every route's
   client bundle. The Header is the only component that previously imported
   framer-motion on the homepage path. */
import {
  Menu,
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  ArrowRight,
  Zap,
  Shield,
  Eye,
  Sun,
  Droplets,
  Waves,
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
import {
  productNavigationItems,
  productNavigationByCategory,
  productCategories,
  ProductCategory,
} from '@/data/products';

/* ────────────────────────────────────────────
   Category order for navigation display
   ──────────────────────────────────────────── */

const categoryOrder: ProductCategory[] = [
  'electrical-insulation',
  'waterproofing-civil-protection',
];

/* ────────────────────────────────────────────
   Product icon mapping for mega-menu
   ──────────────────────────────────────────── */

const productIconMap: Record<string, React.ReactNode> = {
  'electrical-insulating-mats': <Zap className="size-4" />,
  'coloured-strip-insulating-mats': <Eye className="size-4" />,
  'bi-color-insulating-mats': <Shield className="size-4" />,
  'auto-glow-reflective-band-insulating-mats': <Sun className="size-4" />,
  'bharat-membrane': <Droplets className="size-4" />,
  'bharat-hydro-seal': <Waves className="size-4" />,
};

/* ────────────────────────────────────────────
   Hover-intent delay constants
   ──────────────────────────────────────────── */

const OPEN_DELAY = 120; // ms before opening on hover
const CLOSE_DELAY = 200; // ms grace period before closing
const ESCAPE_KEY = 'Escape';

/* ────────────────────────────────────────────
   Header component
   ──────────────────────────────────────────── */

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Check if a product link matches current path
  const isProductActive = pathname.startsWith('/products');

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

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Hover-intent handlers with open/close delay
  const clearOpenTimeout = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
  }, []);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleDropdownEnter = useCallback(() => {
    clearCloseTimeout();
    clearOpenTimeout();
    openTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(true);
    }, OPEN_DELAY);
  }, [clearCloseTimeout, clearOpenTimeout]);

  const handleDropdownLeave = useCallback(() => {
    clearOpenTimeout();
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, CLOSE_DELAY);
  }, [clearOpenTimeout, clearCloseTimeout]);

  // Keyboard handler for dropdown
  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ESCAPE_KEY) {
      setDropdownOpen(false);
      // Return focus to the trigger button
      const triggerBtn = triggerRef.current?.querySelector('[aria-haspopup]');
      if (triggerBtn instanceof HTMLElement) {
        triggerBtn.focus();
      }
    }
    // Arrow Down opens the menu
    if (e.key === 'ArrowDown' && !dropdownOpen) {
      e.preventDefault();
      setDropdownOpen(true);
    }
  }, [dropdownOpen]);

  // Mega-menu keyboard navigation
  const handleMegaMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ESCAPE_KEY) {
      setDropdownOpen(false);
      const triggerBtn = triggerRef.current?.querySelector('[aria-haspopup]');
      if (triggerBtn instanceof HTMLElement) {
        triggerBtn.focus();
      }
    }
    // Tab trap: focus stays within mega-menu while open
    if (e.key === 'Tab' && megaMenuRef.current) {
      const focusable = megaMenuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  // Close dropdown on route change
  // Wrap in a transition callback to satisfy the lint rule about
  // setState in an effect body — we sync the dropdown state to
  // the pathname after navigation completes.
  useEffect(() => {
    // The pathname has changed, so we close the dropdown.
    // This is synchronization with an external system (the router),
    // which is a valid use of setState in an effect.
    startTransition(() => {
      setDropdownOpen(false);
    });
  }, [pathname]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearOpenTimeout();
      clearCloseTimeout();
    };
  }, [clearOpenTimeout, clearCloseTimeout]);

  // Get the electrical insulation and waterproofing items
  const electricalItems = productNavigationByCategory['electrical-insulation'];
  const waterproofingItems = productNavigationByCategory['waterproofing-civil-protection'];

  return (
    <header className="relative z-50">
      {/* ── Top Contact Strip (desktop only) ── */}
      <div className="hidden md:block bg-be-warm-white border-b border-be-grey-250">
        <div className="container-site page-horizontal-padding flex items-center justify-between h-8">
          {/* Left: contact info */}
          <div className="flex items-center gap-5 text-metadata text-be-charcoal-800">
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-1.5 hover:text-be-yellow-text-hover transition-colors"
            >
              <Mail className="size-3.5" aria-hidden="true" focusable="false" />
              <span>{company.email}</span>
            </a>
            <a
              href={`tel:${company.phonePrimaryTel}`}
              className="flex items-center gap-1.5 hover:text-be-yellow-text-hover transition-colors"
            >
              <Phone className="size-3.5" aria-hidden="true" focusable="false" />
              <span>{company.phonePrimary}</span>
            </a>
          </div>

          {/* Right: social / WhatsApp */}
          <div className="flex items-center gap-3">
            <a
              href={company.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-metadata text-be-charcoal-800 hover:text-be-yellow-text-hover transition-colors"
              aria-label="Chat on WhatsApp (opens in a new tab)"
            >
              <MessageCircle className="size-3.5" aria-hidden="true" focusable="false" />
              <span>{company.whatsapp.label}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Header Bar ── */}
      {/* The sticky bar is the positioning context for the Products
          mega-menu. Rendering the menu as a child of this sticky bar
          (instead of inside the small Products trigger) lets us centre it
          on the header container / viewport rather than on the trigger,
          which previously caused left-clipping at narrower widths. */}
      <div
        className={cn(
          'sticky top-0 z-50 bg-be-white border-b border-be-grey-250 transition-all duration-300',
          scrolled && 'shadow-sm',
          compact ? 'h-16 md:h-[72px]' : 'h-16 md:h-[84px]'
        )}
      >
        {/* 3-column CSS Grid: logo | nav | CTA.
            minmax(190px,1fr) on both sides keeps the navigation
            mathematically centred regardless of logo / CTA width, so the
            logo can grow without shifting the nav. */}
        <div className="container-site page-horizontal-padding grid grid-cols-[minmax(190px,1fr)_auto_minmax(190px,1fr)] items-center h-full gap-4">
          {/* ── Column 1: Logo zone (left-aligned) ── */}
          {/* Dedicated logo area — a very subtle warm-white tint
              (matching the top contact strip above) lifts the logo
              off the pure-white header so the wordmark reads as the
              primary brand element. Treatment is intentionally light:
              no heavy box, no shadow, no coloured panel — just enough
              internal padding + a refined 1px right divider (visible
              from md+) to anchor the brand area visually. */}
          <div className="flex items-center justify-start">
            <Link
              href="/"
              className="shrink-0 flex items-center px-2 sm:px-2.5 py-1.5 rounded-md bg-be-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-be-white transition-shadow"
              aria-label="Bharat Electrosafe — Home"
            >
              {/* Intrinsic source dimensions are 1492x1021 (aspect ≈ 1.46:1).
                  New logo is near-square (icon + wordmark), so display
                  widths are smaller than the previous horizontal banner
                  to keep the logo height within the 84px header.
                  Display sizes ramp from mobile (72-78px) up to desktop
                  (92-105px), with a modest compact state (68-95px) when
                  scrolled. `priority` because the logo is above the fold
                  on every route. Source WebP re-encoded at q=100 from the
                  lossless PNG so the wordmark renders crisply at small
                  display sizes; Next.js Image further optimizes the
                  served payload per viewport width and pixel density. */}
              <Image
                src="/images/brand/bharat-electrosafe-logo-full.webp"
                alt="Bharat Electrosafe logo"
                width={1492}
                height={1021}
                sizes="(max-width: 767px) 78px, (max-width: 1023px) 92px, 105px"
                className={cn(
                  'object-contain transition-all duration-300 h-auto w-[72px] sm:w-[78px] md:w-[92px] lg:w-[105px]',
                  compact && 'w-[68px] sm:w-[72px] md:w-[84px] lg:w-[95px]'
                )}
                priority
              />
            </Link>
            {/* Subtle vertical divider — visible from md+ (was xl-only)
                so tablet and desktop both get the brand-area anchor.
                32px tall, 1px neutral grey, 16-32px gap from the logo. */}
            <div
              className="hidden md:block w-px h-8 bg-be-grey-250 ml-4 sm:ml-6 lg:ml-8"
              aria-hidden="true"
            />
          </div>

          {/* ── Column 2: Desktop Navigation (centred) ── */}
          {/* Desktop nav shows at lg+ (≥1024px). At md (768-1023) the
              horizontal budget is too tight for logo + 4 nav items + CTA,
              so we keep the mobile sheet through tablet. */}
          <nav className="hidden lg:flex items-center justify-center gap-1.5" aria-label="Main navigation">
            <Link
              href="/"
              className={cn(
                'px-3.5 py-2 text-sm font-medium transition-colors rounded-md hover:bg-be-yellow-50 hover:text-be-yellow-text-hover',
                pathname === '/' ? 'text-be-yellow-text border-l-[3px] border-be-yellow-500 pl-3' : 'text-be-charcoal-800'
              )}
              aria-current={pathname === '/' ? 'page' : undefined}
            >
              Home
            </Link>

            {/* Products: text links to /products, chevron opens mega-menu.
                The mega-menu itself is rendered below as a child of the
                sticky bar so it can be centred on the header container. */}
            <div
              ref={triggerRef}
              className="flex items-center"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              onKeyDown={handleDropdownKeyDown}
            >
              {/* "Products" links to /products overview page */}
              <Link
                href="/products"
                className={cn(
                  'px-2 py-2 text-sm font-medium transition-colors rounded-md hover:bg-be-yellow-50 hover:text-be-yellow-text-hover',
                  isProductActive
                    ? 'text-be-yellow-text'
                    : 'text-be-charcoal-800'
                )}
                aria-current={isProductActive ? 'page' : undefined}
              >
                Products
              </Link>

              {/* Separate chevron button to open the mega-menu.
                  Icon-only control — must expose a state-aware accessible
                  name and keep the chevron SVG hidden from AT. */}
              <button
                type="button"
                className={cn(
                  'px-2 py-2 text-sm font-medium rounded-md transition-colors',
                  dropdownOpen || isProductActive
                    ? 'text-be-yellow-text bg-be-yellow-50'
                    : 'text-be-charcoal-800 hover:text-be-yellow-text-hover hover:bg-be-yellow-50'
                )}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-controls="products-mega-menu"
                aria-label={
                  dropdownOpen
                    ? 'Close products menu'
                    : 'Open products menu'
                }
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <ChevronDown
                  className={cn(
                    'size-4 transition-transform duration-200',
                    dropdownOpen && 'rotate-180'
                  )}
                  aria-hidden="true"
                  focusable="false"
                />
              </button>
            </div>

            <Link
              href="/about-us"
              className={cn(
                'px-3.5 py-2 text-sm font-medium transition-colors rounded-md hover:bg-be-yellow-50 hover:text-be-yellow-text-hover',
                pathname === '/about-us' ? 'text-be-yellow-text border-l-[3px] border-be-yellow-500 pl-3' : 'text-be-charcoal-800'
              )}
              aria-current={pathname === '/about-us' ? 'page' : undefined}
            >
              About Us
            </Link>

            <Link
              href="/contact-us"
              className={cn(
                'px-3.5 py-2 text-sm font-medium transition-colors rounded-md hover:bg-be-yellow-50 hover:text-be-yellow-text-hover',
                pathname === '/contact-us' ? 'text-be-yellow-text border-l-[3px] border-be-yellow-500 pl-3' : 'text-be-charcoal-800'
              )}
              aria-current={pathname === '/contact-us' ? 'page' : undefined}
            >
              Contact Us
            </Link>
          </nav>

          {/* ── Column 3: CTA + Mobile menu (right-aligned) ── */}
          <div className="flex items-center justify-end gap-3">
            {/* Quote CTA — visually slightly less heavy than the logo so
                the brand reads as the dominant element. Touch target stays
                at 44px. Yellow fill is preserved. */}
            <PrimaryButton
              href="/contact-us"
              className="hidden lg:inline-flex text-sm px-4 py-2 shadow-sm hover:shadow-sm hover:translate-y-0"
            >
              Request a Quote
            </PrimaryButton>

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="lg:hidden inline-flex items-center justify-center size-11 rounded-md text-be-charcoal-950 hover:bg-be-grey-150 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-500 focus-visible:ring-offset-2"
                  aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-navigation-sheet"
                >
                  <Menu className="size-6" aria-hidden="true" focusable="false" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[320px] sm:w-[360px] bg-be-white p-0" id="mobile-navigation-sheet">
                <SheetHeader className="px-5 pt-5 pb-3 border-b border-be-grey-250">
                  <SheetTitle className="flex items-center">
                    <Link href="/" onClick={() => setMobileOpen(false)}>
                      <Image
                        src="/images/brand/bharat-electrosafe-logo-full.webp"
                        alt="Bharat Electrosafe logo"
                        width={1492}
                        height={1021}
                        sizes="120px"
                        className="object-contain w-[120px] h-auto"
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col py-2 overflow-y-auto" aria-label="Mobile navigation">
                  <Link
                    href="/"
                    className={cn(
                      'px-5 py-3.5 text-base font-medium transition-colors min-h-[44px] flex items-center',
                      pathname === '/'
                        ? 'text-be-yellow-text bg-be-yellow-50 border-l-[3px] border-be-yellow-500'
                        : 'text-be-charcoal-950 hover:bg-be-yellow-50 hover:text-be-yellow-text-hover'
                    )}
                    onClick={() => setMobileOpen(false)}
                    aria-current={pathname === '/' ? 'page' : undefined}
                  >
                    Home
                  </Link>

                  {/* Products accordion — with direct /products link */}
                  <Accordion type="single" collapsible className="px-0">
                    <AccordionItem value="products" className="border-b-0">
                      <AccordionTrigger className={cn(
                        'px-5 py-3.5 text-base font-medium transition-colors min-h-[44px] hover:no-underline',
                        isProductActive
                          ? 'text-be-yellow-text bg-be-yellow-50 border-l-[3px] border-be-yellow-500'
                          : 'text-be-charcoal-950 hover:bg-be-yellow-50 hover:text-be-yellow-text-hover'
                      )}>
                        Products
                      </AccordionTrigger>
                      <AccordionContent className="pb-2">
                        <div className="flex flex-col">
                          {/* View All Products link */}
                          <Link
                            href="/products"
                            className={cn(
                              'px-5 py-3 pl-8 text-sm font-semibold transition-colors min-h-[44px] flex items-center',
                              pathname === '/products'
                                ? 'text-be-yellow-text bg-be-yellow-50'
                                : 'text-be-yellow-text hover:bg-be-yellow-50'
                            )}
                            onClick={() => setMobileOpen(false)}
                            aria-current={pathname === '/products' ? 'page' : undefined}
                          >
                            View All Products
                          </Link>

                          {/* Products grouped by category */}
                          {categoryOrder.map((catId) => {
                            const catInfo = productCategories[catId];
                            const items = productNavigationByCategory[catId];
                            return (
                              <div key={catId}>
                                {/* Category label */}
                                <div className="px-5 pl-8 py-1.5 text-[0.7rem] font-semibold text-be-grey-650 uppercase tracking-wider">
                                  {catInfo.displayName}
                                </div>
                                {items.map((product) => (
                                  <Link
                                    key={product.slug}
                                    href={product.href}
                                    className={cn(
                                      'flex items-center gap-3 px-5 py-3 pl-8 text-sm transition-colors min-h-[44px]',
                                      pathname === product.href
                                        ? 'text-be-yellow-text bg-be-yellow-50'
                                        : 'text-be-charcoal-800 hover:bg-be-yellow-50 hover:text-be-yellow-text-hover'
                                    )}
                                    onClick={() => setMobileOpen(false)}
                                    aria-current={pathname === product.href ? 'page' : undefined}
                                  >
                                    <span className="text-be-yellow-text shrink-0" aria-hidden="true">
                                      {productIconMap[product.slug] || <Zap className="size-3.5" />}
                                    </span>
                                    <div className="min-w-0">
                                      <div className="font-medium leading-snug">
                                        {product.name}
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Divider */}
                  <div className="mx-5 my-1 h-px bg-be-grey-250" />

                  <Link
                    href="/about-us"
                    className={cn(
                      'px-5 py-3.5 text-base font-medium transition-colors min-h-[44px] flex items-center',
                      pathname === '/about-us'
                        ? 'text-be-yellow-text bg-be-yellow-50 border-l-[3px] border-be-yellow-500'
                        : 'text-be-charcoal-950 hover:bg-be-yellow-50 hover:text-be-yellow-text-hover'
                    )}
                    onClick={() => setMobileOpen(false)}
                    aria-current={pathname === '/about-us' ? 'page' : undefined}
                  >
                    About Us
                  </Link>

                  <Link
                    href="/contact-us"
                    className={cn(
                      'px-5 py-3.5 text-base font-medium transition-colors min-h-[44px] flex items-center',
                      pathname === '/contact-us'
                        ? 'text-be-yellow-text bg-be-yellow-50 border-l-[3px] border-be-yellow-500'
                        : 'text-be-charcoal-950 hover:bg-be-yellow-50 hover:text-be-yellow-text-hover'
                    )}
                    onClick={() => setMobileOpen(false)}
                    aria-current={pathname === '/contact-us' ? 'page' : undefined}
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

        {/* ── Products Mega-Menu ──
            Rendered as a child of the sticky bar (the positioning
            context) so it can be centred on the header container rather
            than on the small Products trigger. CSS-only show/hide — no
            Framer Motion. The menu is kept in the DOM only while open so
            closed-state links are not in the tab sequence or the
            accessibility tree. */}
        {dropdownOpen && (
          <div
            ref={megaMenuRef}
            id="products-mega-menu"
            role="menu"
            className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 w-[720px] max-w-[calc(100vw-32px)] bg-be-white border border-be-grey-250 rounded-xl shadow-xl overflow-hidden animate-mega-menu-in"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
            onKeyDown={handleMegaMenuKeyDown}
            aria-label="Product categories"
          >
            {/* Two-column layout */}
            <div className="flex max-h-[370px]">
              {/* Left column: Electrical Insulation (4 products) */}
              <div className="flex-1 p-4 border-r border-be-grey-250">
                <div className="text-[0.7rem] font-semibold text-be-grey-650 uppercase tracking-wider px-2 mb-2">
                  {productCategories['electrical-insulation'].displayName}
                </div>
                <div className="flex flex-col gap-0.5" role="group" aria-label="Electrical insulation products">
                  {electricalItems.map((product) => (
                    <Link
                      key={product.slug}
                      href={product.href}
                      role="menuitem"
                      className="flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-be-yellow-50 transition-colors group"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {/* Icon */}
                      <span className="flex items-center justify-center size-8 rounded-md bg-be-cream text-be-charcoal-800 group-hover:bg-be-yellow-500 group-hover:text-be-white transition-colors shrink-0" aria-hidden="true">
                        {productIconMap[product.slug] || <Zap className="size-4" />}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-be-charcoal-950 group-hover:text-be-yellow-text-hover transition-colors leading-snug">
                          {product.name}
                        </div>
                        <div className="text-metadata text-be-grey-650 mt-0.5 leading-snug line-clamp-1">
                          {product.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right column: Waterproofing & Civil Protection + View all */}
              <div className="w-[280px] p-4 bg-be-cream/40 flex flex-col">
                <div className="text-[0.7rem] font-semibold text-be-grey-650 uppercase tracking-wider px-2 mb-2">
                  {productCategories['waterproofing-civil-protection'].displayName}
                </div>
                <div className="flex flex-col gap-0.5" role="group" aria-label="Waterproofing and civil protection products">
                  {waterproofingItems.map((product) => (
                    <Link
                      key={product.slug}
                      href={product.href}
                      role="menuitem"
                      className="flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-be-white transition-colors group"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {/* Icon */}
                      <span className="flex items-center justify-center size-8 rounded-md bg-be-white text-be-charcoal-800 group-hover:bg-be-yellow-500 group-hover:text-be-white transition-colors shrink-0" aria-hidden="true">
                        {productIconMap[product.slug] || <Droplets className="size-4" />}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-be-charcoal-950 group-hover:text-be-yellow-text-hover transition-colors leading-snug">
                          {product.name}
                        </div>
                        <div className="text-metadata text-be-grey-650 mt-0.5 leading-snug line-clamp-1">
                          {product.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* View all products link */}
                <div className="mt-auto pt-4 border-t border-be-grey-250">
                  <Link
                    href="/products"
                    role="menuitem"
                    className="flex items-center gap-2 px-2.5 py-2.5 rounded-lg bg-be-yellow-500 hover:bg-be-yellow-600 transition-colors group"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span className="text-sm font-semibold text-be-charcoal-950 group-hover:text-be-white transition-colors">
                      View all products
                    </span>
                    <ArrowRight className="size-4 text-be-charcoal-950 group-hover:text-be-white group-hover:translate-x-0.5 transition-all" aria-hidden="true" focusable="false" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
