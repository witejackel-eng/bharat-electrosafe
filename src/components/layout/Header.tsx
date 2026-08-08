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
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { cn } from '@/lib/utils';
import {
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
      setCompact(y > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  // Use lg breakpoint (1024px) to match when the hamburger hides and
  // desktop navigation appears.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Body scroll lock when mobile menu is open.
  // Radix Dialog (SheetContent) already handles overflow: hidden on <body>,
  // but we also set padding-right equal to the scrollbar width to prevent
  // the header from jumping horizontally when the scrollbar disappears.
  useEffect(() => {
    if (mobileOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
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
    /* `display: contents` lets the <header> element provide semantics without
       generating a box. This is essential: the inner sticky bar (next sibling)
       can only stick within the height of its containing block. If the header
       generated a box, its height would equal just the bar (~72px), and the
       sticky bar would scroll off after ~0px. With `contents`, the sticky
       bar's containing block becomes the page flex column (min-h-screen,
       tall), so it sticks correctly for the full page. The <header> element
       remains in the accessibility tree. */
    <header className="contents z-50">
      {/* ── Main Header Bar ──
          A single restrained navy band. The previous desktop-only contact
          strip was removed per spec ("If the utility strip is visually
          unnecessary, remove it and place essential contact details
          elsewhere without breaking functionality") — email, phone and
          WhatsApp remain available on /contact-us and in the footer.

          The sticky bar is the positioning context for the Products
          mega-menu. Rendering the menu as a child of this sticky bar
          (instead of inside the small Products trigger) lets us centre it
          on the header container / viewport rather than on the trigger,
          which previously caused left-clipping at narrower widths. */}
      <div
        className={cn(
          'sticky top-0 z-50 be-header-navy transition-all duration-300',
          compact && 'be-header-navy-compact',
          // Header heights are tuned to the header logo's aspect ratio
          // (3412×1257 ≈ 2.71:1) so the visible artwork is optically
          // centred with equal clear space above and below.
          //   Desktop (lg+): 82px bar, logo 180px wide → 66.4px tall →
          //     (82−66.4)/2 ≈ 7.8px clear above AND below the wordmark,
          //     so it never touches the 2px yellow bottom rule.
          //   Mobile/tablet (<lg): 64px bar, logo 140px wide → 51.6px
          //     tall → ~6.2px clear, enough to clear the yellow rule at
          //     360px.
          //   Compact (scrolled) shrinks both proportionally.
          compact ? 'h-[60px] lg:h-[68px]' : 'h-[64px] lg:h-[82px]'
        )}
      >
        {/* Responsive CSS Grid:
            Mobile (<lg): 2-column layout — logo (flex) | hamburger (auto).
            Desktop (lg+):  3-column layout — logo | nav | CTA.
            minmax(190px,1fr) on both sides keeps the navigation
            mathematically centred regardless of logo / CTA width. */}
        <div className="container-site page-horizontal-padding grid grid-cols-[minmax(0,1fr)_auto] items-center h-full gap-3 lg:grid-cols-[minmax(190px,1fr)_auto_minmax(190px,1fr)] lg:gap-4">
          {/* ── Column 1: Logo zone (left-aligned) ──
              A transparent high-resolution header logo sits directly on
              the solid navy band (#002659 — the exact colour eyedropped
              from the official logo band). Because the artwork is
              transparent and the band is one solid colour, the image
              boundary disappears: no visible square, no mismatched navy
              rectangle, no seam. The asset is tightly cropped (4px
              symmetric transparent padding) so `align-items: center` +
              `object-contain` centres the *visible artwork*, not just the
              canvas — giving equal clear space above and below the
              wordmark. Focus ring is yellow on navy. */}
          <div className="flex items-center justify-start min-w-0">
            <Link
              href="/"
              className="shrink-0 flex items-center px-1.5 sm:px-2 py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-be-navy-800 transition-shadow"
              aria-label="Bharat Electrosafe — Home"
            >
              {/* Header logo — 3412×1257 (aspect ≈ 2.71:1), lossless
                  WebP (~967KB) cropped tightly (12px symmetric margin)
                  from the official Bharat Electrosafe high-resolution
                  source (3920×2384). Navy background stripped to
                  transparency so the artwork blends seamlessly with
                  the #002659 header band. Display widths ramp from
                  mobile (140px) to desktop (180px); compact state when
                  scrolled. `priority` because the logo is above the
                  fold on every route. `object-contain` + `h-auto`
                  preserves aspect ratio. The wrapper `items-center` +
                  `py-1` keeps the artwork optically centred with
                  ≥6px clear of the yellow rule. */}
              <Image
                src="/brand/bharat-electrosafe-header-logo.webp"
                alt="Bharat Electrosafe logo"
                width={720}
                height={202}
                sizes="(max-width: 359px) 124px, (max-width: 1023px) 140px, 180px"
                className={cn(
                  'object-contain object-left transition-all duration-300 h-auto w-[140px] lg:w-[180px]',
                  compact && 'w-[128px] lg:w-[160px]'
                )}
                priority
              />
            </Link>
          </div>

          {/* ── Column 2: Desktop Navigation (centred) ── */}
          {/* Desktop nav shows at lg+ (≥1024px). At md (768-1023) the
              horizontal budget is too tight for logo + 4 nav items + CTA,
              so we keep the mobile sheet through tablet. */}
          <nav className="hidden lg:flex items-center justify-center gap-1.5" aria-label="Main navigation">
            <Link
              href="/"
              className={cn(
                'relative px-3.5 py-2 text-sm font-medium rounded-md be-nav-link',
                pathname === '/' && 'be-nav-link-active'
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
                  'relative px-2 py-2 text-sm font-medium rounded-md be-nav-link',
                  isProductActive && 'be-nav-link-active'
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
                    ? 'text-be-brand-yellow'
                    : 'be-nav-link'
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
                'relative px-3.5 py-2 text-sm font-medium rounded-md be-nav-link',
                pathname === '/about-us' && 'be-nav-link-active'
              )}
              aria-current={pathname === '/about-us' ? 'page' : undefined}
            >
              About Us
            </Link>

            <Link
              href="/contact-us"
              className={cn(
                'relative px-3.5 py-2 text-sm font-medium rounded-md be-nav-link',
                pathname === '/contact-us' && 'be-nav-link-active'
              )}
              aria-current={pathname === '/contact-us' ? 'page' : undefined}
            >
              Contact Us
            </Link>
          </nav>

          {/* ── Column 3: CTA + Mobile menu (right-aligned) ── */}
          {/* shrink-0 on mobile prevents this column from being squeezed
              by the logo. justify-self-end right-aligns the hamburger
              on mobile. On lg+, the 3-column grid handles alignment. */}
          <div className="flex items-center justify-end gap-3 shrink-0 lg:shrink">
            {/* Quote CTA — compact yellow fill with deep navy text.
                44px tall, moderate radius, no hover translation.
                Stays vertically aligned with the navigation. */}
            <PrimaryButton
              href="/contact-us"
              className="hidden lg:inline-flex text-sm px-4 py-2 shadow-sm hover:shadow-sm hover:translate-y-0 min-h-[44px]"
            >
              Request a Quote
            </PrimaryButton>

            {/* Mobile hamburger — white icon on navy */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="lg:hidden inline-flex items-center justify-center size-11 rounded-md text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-be-navy-800"
                  aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-navigation-sheet"
                >
                  <Menu className="size-6" aria-hidden="true" focusable="false" />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[320px] sm:w-[360px] bg-be-navy-900 p-0 border-l border-white/10" id="mobile-navigation-sheet">
                <SheetHeader className="px-5 pt-5 pb-3 border-b border-white/10">
                  <SheetTitle className="flex items-center">
                    <Link href="/" onClick={() => setMobileOpen(false)}>
                      <Image
                        src="/brand/bharat-electrosafe-header-logo.webp"
                        alt="Bharat Electrosafe logo"
                        width={720}
                        height={202}
                        sizes="168px"
                        className="object-contain w-[168px] h-auto"
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
                        ? 'text-be-brand-yellow bg-white/8 border-l-[3px] border-be-brand-yellow'
                        : 'text-white/90 hover:bg-white/6 hover:text-be-brand-yellow'
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
                          ? 'text-be-brand-yellow bg-white/8 border-l-[3px] border-be-brand-yellow'
                          : 'text-white/90 hover:bg-white/6 hover:text-be-brand-yellow'
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
                                ? 'text-be-brand-yellow bg-white/8'
                                : 'text-be-brand-yellow-soft hover:bg-white/6'
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
                                <div className="px-5 pl-8 py-1.5 text-[0.7rem] font-semibold text-white/50 uppercase tracking-wider">
                                  {catInfo.displayName}
                                </div>
                                {items.map((product) => (
                                  <Link
                                    key={product.slug}
                                    href={product.href}
                                    className={cn(
                                      'flex items-center gap-3 px-5 py-3 pl-8 text-sm transition-colors min-h-[44px]',
                                      pathname === product.href
                                        ? 'text-be-brand-yellow bg-white/8'
                                        : 'text-white/80 hover:bg-white/6 hover:text-be-brand-yellow'
                                    )}
                                    onClick={() => setMobileOpen(false)}
                                    aria-current={pathname === product.href ? 'page' : undefined}
                                  >
                                    <span className="text-be-brand-yellow shrink-0" aria-hidden="true">
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
                  <div className="mx-5 my-1 h-px bg-white/10" />

                  <Link
                    href="/about-us"
                    className={cn(
                      'px-5 py-3.5 text-base font-medium transition-colors min-h-[44px] flex items-center',
                      pathname === '/about-us'
                        ? 'text-be-brand-yellow bg-white/8 border-l-[3px] border-be-brand-yellow'
                        : 'text-white/90 hover:bg-white/6 hover:text-be-brand-yellow'
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
                        ? 'text-be-brand-yellow bg-white/8 border-l-[3px] border-be-brand-yellow'
                        : 'text-white/90 hover:bg-white/6 hover:text-be-brand-yellow'
                    )}
                    onClick={() => setMobileOpen(false)}
                    aria-current={pathname === '/contact-us' ? 'page' : undefined}
                  >
                    Contact Us
                  </Link>
                </nav>

                {/* CTA at bottom of mobile sheet */}
                <div className="mt-auto px-5 pb-6 pt-4 border-t border-white/10">
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
        {/* Reading-progress bar — sits on the header's bottom edge. A thin
            yellow gradient that fills as the user scrolls through the page.
            Pointer-events none so it never intercepts clicks. */}
        <ScrollProgress />
      </div>
    </header>
  );
}
