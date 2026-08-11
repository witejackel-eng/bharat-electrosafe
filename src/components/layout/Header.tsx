'use client';

import { useState, useEffect, useRef, useCallback, startTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  ChevronDown,
  ChevronRight,
  ArrowRight,
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
  productNavGroups,
  type ProductNavSubGroup,
  type ProductNavLeaf,
} from '@/data/product-navigation';
import {
  hvVisuals,
  autoGlowVisuals,
  biColourVisuals,
  coloredStripVisuals,
  iecVisuals,
  membraneVisuals,
  hydroSealVisuals,
  pvcFlooringVisuals,
  otherProductsVisuals,
  type ProductVisualRole,
} from '@/data/product-visuals';

/* ────────────────────────────────────────────
   Hover-intent delay constants
   ──────────────────────────────────────────── */

const OPEN_DELAY = 100; // ms before opening on hover
const CLOSE_DELAY = 250; // ms grace period before closing
const ESCAPE_KEY = 'Escape';

/* ────────────────────────────────────────────
   Logo asset constants
   ────────────────────────────────────────────
   Transparent PNG — 1520×1024, final approved logo.
   High-resolution source for Retina/HiDPI sharpness.
   Even visual padding (top/bottom/left/right) so the logo
   artwork centres naturally when flexbox-centred in the
   navy header. PNG chosen over WebP for sharper lettering /
   thin circuit lines / ® mark. */

const LOGO_SRC = '/brand/bharat-electrosafe-logo-header.png';
const LOGO_WIDTH = 823;
const LOGO_HEIGHT = 447;

/* ────────────────────────────────────────────
   Preview image mapping for mega-menu
   ────────────────────────────────────────────
   Maps each product link href to its preview visual.
   Used when hovering or focusing a link to show the
   corresponding product image in the right panel. */

const previewMap: Record<string, ProductVisualRole> = {
  '/products/electrical-insulating-mats': hvVisuals.menuPreview,
  '/products/auto-glow-reflective-band-insulating-mats': autoGlowVisuals.menuPreview,
  '/products/bi-color-insulating-mats': biColourVisuals.card,
  '/products/coloured-strip-insulating-mats': coloredStripVisuals.card,
  '/products/international-iec-61111': iecVisuals.menuPreview,
  '/products/international-iec-61111#hv-insulating-mats': iecVisuals.menuPreview,
  '/products/international-iec-61111#auto-glow': iecVisuals.menuPreview,
  '/products/international-iec-61111#bi-colour': iecVisuals.menuPreview,
  '/products/bharat-membrane': membraneVisuals.menuPreview,
  '/products/bharat-hydro-seal': hydroSealVisuals.menuPreview,
  '/products/pvc-flooring-solutions': pvcFlooringVisuals.menuPreview,
  '/products/other-products': otherProductsVisuals.menuPreview,
  '/products/other-products#rubber-sheet': otherProductsVisuals.menuPreview,
  '/products/other-products#rubber-hose-pipe': otherProductsVisuals.menuPreview,
  '/products/other-products#esd-mat': otherProductsVisuals.menuPreview,
  '/products/other-products#conveyor-belt': otherProductsVisuals.menuPreview,
};

/** Default preview (HV mat) shown when menu opens with no item hovered. */
const DEFAULT_PREVIEW = hvVisuals.menuPreview;

/* ────────────────────────────────────────────
   Header component
   ──────────────────────────────────────────── */

export function Header() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileGroups, setExpandedMobileGroups] = useState<Set<string>>(new Set());
  const [previewVisual, setPreviewVisual] = useState<ProductVisualRole>(DEFAULT_PREVIEW);
  const [previewKey, setPreviewKey] = useState(0); // for crossfade animation
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const isProductActive = pathname.startsWith('/products');

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => { document.body.style.overflow = ''; document.body.style.paddingRight = ''; };
  }, [mobileOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Hover-intent handlers
  const clearOpenTimeout = useCallback(() => { if (openTimeoutRef.current) { clearTimeout(openTimeoutRef.current); openTimeoutRef.current = null; } }, []);
  const clearCloseTimeout = useCallback(() => { if (closeTimeoutRef.current) { clearTimeout(closeTimeoutRef.current); closeTimeoutRef.current = null; } }, []);

  const handleDropdownEnter = useCallback(() => {
    clearCloseTimeout(); clearOpenTimeout();
    openTimeoutRef.current = setTimeout(() => setDropdownOpen(true), OPEN_DELAY);
  }, [clearCloseTimeout, clearOpenTimeout]);

  const handleDropdownLeave = useCallback(() => {
    clearOpenTimeout(); clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => setDropdownOpen(false), CLOSE_DELAY);
  }, [clearOpenTimeout, clearCloseTimeout]);

  // Keyboard handler for dropdown trigger
  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ESCAPE_KEY) {
      setDropdownOpen(false);
      const triggerBtn = triggerRef.current?.querySelector('[aria-haspopup]');
      if (triggerBtn instanceof HTMLElement) triggerBtn.focus();
    }
    if (e.key === 'ArrowDown' && !dropdownOpen) { e.preventDefault(); setDropdownOpen(true); }
  }, [dropdownOpen]);

  // Mega-menu keyboard navigation
  const handleMegaMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ESCAPE_KEY) {
      setDropdownOpen(false);
      const triggerBtn = triggerRef.current?.querySelector('[aria-haspopup]');
      if (triggerBtn instanceof HTMLElement) triggerBtn.focus();
    }
    if (e.key === 'Tab' && megaMenuRef.current) {
      const focusable = megaMenuRef.current.querySelectorAll<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, []);

  // Close dropdown on route change
  useEffect(() => { startTransition(() => setDropdownOpen(false)); }, [pathname]);

  // Cleanup timeouts on unmount
  useEffect(() => { return () => { clearOpenTimeout(); clearCloseTimeout(); }; }, [clearOpenTimeout, clearCloseTimeout]);

  // Toggle mobile group expansion
  const toggleMobileGroup = useCallback((groupId: string) => {
    setExpandedMobileGroups((prev) => { const next = new Set(prev); if (next.has(groupId)) next.delete(groupId); else next.add(groupId); return next; });
  }, []);

  // Split product groups for mega-menu layout
  const primaryGroup = productNavGroups[0];
  const secondaryGroups = productNavGroups.slice(1);
  const domesticSub = (primaryGroup.children as ProductNavSubGroup[])[0];
  const internationalSub = (primaryGroup.children as ProductNavSubGroup[])[1];

  // Preview update on hover/focus
  const updatePreview = useCallback((href: string) => {
    const visual = previewMap[href];
    if (visual && visual.src !== previewVisual.src) {
      setPreviewVisual(visual);
      setPreviewKey((k) => k + 1);
    }
  }, [previewVisual.src]);

  const resetPreview = useCallback(() => {
    if (previewVisual.src !== DEFAULT_PREVIEW.src) {
      setPreviewVisual(DEFAULT_PREVIEW);
      setPreviewKey((k) => k + 1);
    }
  }, [previewVisual.src]);

  return (
    <header className="contents z-50">
      {/* ── Main-Header Bar ── */}
      <div
        className="sticky top-0 z-50 be-header-navy h-16 lg:h-20"
      >
        {/* 3-column grid: Logo | Nav | CTA */}
        <div className="container-site page-horizontal-padding grid grid-cols-[minmax(0,1fr)_auto] items-center h-full gap-2 lg:grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)] lg:gap-4">
          {/* ── Column 1: Logo ── */}
          <div className="flex items-center justify-start min-w-0">
            <Link
              href="/"
              className="shrink-0 flex items-center py-1 lg:py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-be-navy-800"
              aria-label="Bharat Electrosafe — Home"
            >
              <Image
                src={LOGO_SRC}
                alt="Bharat Electrosafe® logo"
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                sizes="(max-width: 1023px) 97px, 125px"
                className="object-contain h-[53px] lg:h-[68px] w-auto"
                priority
              />
            </Link>
          </div>

          {/* ── Column 2: Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center justify-center gap-1" aria-label="Main navigation">
            <Link
              href="/"
              className={cn(
                'px-3 py-2 text-sm font-medium transition-colors',
                pathname === '/'
                  ? 'text-be-brand-yellow'
                  : 'text-white/80 hover:text-white'
              )}
              aria-current={pathname === '/' ? 'page' : undefined}
            >
              Home
            </Link>

            {/* Products: hover opens mega-menu */}
            <div
              ref={triggerRef}
              className="flex items-center relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              onKeyDown={handleDropdownKeyDown}
            >
              <Link
                href="/products"
                className={cn(
                  'px-2 py-2 text-sm font-medium transition-colors',
                  isProductActive && !dropdownOpen ? 'text-be-brand-yellow' : 'text-white/80 hover:text-white'
                )}
                aria-current={isProductActive ? 'page' : undefined}
              >
                Products
              </Link>
              <button
                type="button"
                className={cn(
                  'px-1.5 py-2 text-sm font-medium transition-colors',
                  dropdownOpen
                    ? 'text-be-brand-yellow'
                    : isProductActive
                      ? 'text-be-brand-yellow'
                      : 'text-white/80 hover:text-white'
                )}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-controls="products-mega-menu"
                aria-label={dropdownOpen ? 'Close products menu' : 'Open products menu'}
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <ChevronDown
                  className={cn('size-3.5 transition-transform duration-200', dropdownOpen && 'rotate-180')}
                  aria-hidden="true"
                  focusable="false"
                />
              </button>
              {/* Subtle active indicator bar */}
              {(dropdownOpen || isProductActive) && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-be-brand-yellow rounded-full" aria-hidden="true" />
              )}
            </div>

            <Link
              href="/about-us"
              className={cn(
                'px-3 py-2 text-sm font-medium transition-colors',
                pathname === '/about-us' ? 'text-be-brand-yellow' : 'text-white/80 hover:text-white'
              )}
              aria-current={pathname === '/about-us' ? 'page' : undefined}
            >
              About Us
            </Link>

            <Link
              href="/contact-us"
              className={cn(
                'px-3 py-2 text-sm font-medium transition-colors',
                pathname === '/contact-us' ? 'text-be-brand-yellow' : 'text-white/80 hover:text-white'
              )}
              aria-current={pathname === '/contact-us' ? 'page' : undefined}
            >
              Contact Us
            </Link>
          </nav>

          {/* ── Column 3: CTA + Mobile menu ── */}
          <div className="flex items-center justify-end gap-2 shrink-0 lg:shrink">
            <PrimaryButton
              href="/contact-us"
              className="hidden lg:inline-flex text-sm px-4 py-2 shadow-sm hover:shadow-sm hover:translate-y-0 min-h-[40px]"
            >
              Request a Quote
            </PrimaryButton>

            {/* Mobile hamburger */}
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
                        src={LOGO_SRC}
                        alt="Bharat Electrosafe® logo"
                        width={LOGO_WIDTH}
                        height={LOGO_HEIGHT}
                        sizes="160px"
                        className="object-contain w-[160px] h-auto"
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col py-2 overflow-y-auto" aria-label="Mobile navigation">
                  <Link href="/"
                    className={cn('px-5 py-3.5 text-base font-medium transition-colors min-h-[44px] flex items-center', pathname === '/' ? 'text-be-brand-yellow bg-white/8 border-l-[3px] border-be-brand-yellow' : 'text-white/90 hover:bg-white/6 hover:text-be-brand-yellow')}
                    onClick={() => setMobileOpen(false)} aria-current={pathname === '/' ? 'page' : undefined}
                  >Home</Link>

                  {/* Products accordion */}
                  <Accordion type="single" collapsible className="px-0">
                    <AccordionItem value="products" className="border-b-0">
                      <AccordionTrigger className={cn('px-5 py-3.5 text-base font-medium transition-colors min-h-[44px] hover:no-underline', isProductActive ? 'text-be-brand-yellow bg-white/8 border-l-[3px] border-be-brand-yellow' : 'text-white/90 hover:bg-white/6 hover:text-be-brand-yellow')}>
                        Products
                      </AccordionTrigger>
                      <AccordionContent className="pb-2">
                        <div className="flex flex-col">
                          {/* Electrical Insulating Mats — expanded by default */}
                          <div className="pl-4">
                            <div className="px-3 py-2 text-[0.75rem] font-semibold text-be-brand-yellow uppercase tracking-wider">
                              Electrical Insulating Mats
                            </div>
                            {/* Domestic */}
                            <div className="pl-3">
                              <div className="px-2 py-1 text-[0.7rem] font-medium text-white/50 uppercase tracking-wider">
                                Domestic Mats — IS 15652:2006
                              </div>
                              {domesticSub.items.map((item) => (
                                <Link key={item.href} href={item.href}
                                  className="flex items-center px-2 py-2.5 text-sm text-white/85 hover:text-be-brand-yellow hover:bg-white/6 transition-colors min-h-[44px]"
                                  onClick={() => setMobileOpen(false)}
                                >{item.name}</Link>
                              ))}
                            </div>
                            {/* International */}
                            <div className="pl-3 mt-1">
                              <div className="px-2 py-1 text-[0.7rem] font-medium text-white/50 uppercase tracking-wider">
                                International / Global — IEC 61111:2009
                              </div>
                              {internationalSub.items.map((item) => (
                                <Link key={item.href} href={item.href}
                                  className="flex items-center px-2 py-2.5 text-sm text-white/85 hover:text-be-brand-yellow hover:bg-white/6 transition-colors min-h-[44px]"
                                  onClick={() => setMobileOpen(false)}
                                >{item.name}</Link>
                              ))}
                            </div>
                          </div>

                          {/* Secondary groups */}
                          {secondaryGroups.map((group) => {
                            const items = group.hasSubGroups
                              ? (group.children as ProductNavSubGroup[]).flatMap((s) => s.items)
                              : (group.children as ProductNavLeaf[]);
                            return (
                              <div key={group.id} className="pl-4 mt-1">
                                <div className="px-3 py-2 text-[0.75rem] font-semibold text-white/60 uppercase tracking-wider">
                                  {group.name}
                                </div>
                                <div className="pl-3">
                                  {items.map((item) => (
                                    <Link key={item.href} href={item.href}
                                      className="flex items-center px-2 py-2.5 text-sm text-white/85 hover:text-be-brand-yellow hover:bg-white/6 transition-colors min-h-[44px]"
                                      onClick={() => setMobileOpen(false)}
                                    >{item.name}</Link>
                                  ))}
                                </div>
                              </div>
                            );
                          })}

                          {/* View All + Technical Guidance */}
                          <div className="mt-2 mx-5 border-t border-white/10 pt-3 space-y-1">
                            <Link href="/products"
                              className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-be-brand-yellow hover:bg-white/6 rounded-md transition-colors min-h-[44px]"
                              onClick={() => setMobileOpen(false)}
                            >
                              View All Products
                              <ChevronRight className="size-3.5" aria-hidden="true" />
                            </Link>
                            <Link href="/contact-us?type=technical-guidance"
                              className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-white/80 hover:text-be-brand-yellow hover:bg-white/6 rounded-md transition-colors min-h-[44px]"
                              onClick={() => setMobileOpen(false)}
                            >
                              Technical Guidance
                              <ChevronRight className="size-3.5" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mx-5 my-1 h-px bg-white/10" />

                  <Link href="/about-us"
                    className={cn('px-5 py-3.5 text-base font-medium transition-colors min-h-[44px] flex items-center', pathname === '/about-us' ? 'text-be-brand-yellow bg-white/8 border-l-[3px] border-be-brand-yellow' : 'text-white/90 hover:bg-white/6 hover:text-be-brand-yellow')}
                    onClick={() => setMobileOpen(false)} aria-current={pathname === '/about-us' ? 'page' : undefined}
                  >About Us</Link>

                  <Link href="/contact-us"
                    className={cn('px-5 py-3.5 text-base font-medium transition-colors min-h-[44px] flex items-center', pathname === '/contact-us' ? 'text-be-brand-yellow bg-white/8 border-l-[3px] border-be-brand-yellow' : 'text-white/90 hover:bg-white/6 hover:text-be-brand-yellow')}
                    onClick={() => setMobileOpen(false)} aria-current={pathname === '/contact-us' ? 'page' : undefined}
                  >Contact Us</Link>
                </nav>

                {/* CTA at bottom of mobile sheet */}
                <div className="mt-auto px-5 pb-6 pt-4 border-t border-white/10">
                  <PrimaryButton href="/contact-us" className="w-full justify-center" onClick={() => setMobileOpen(false)}>
                    Request a Quote
                  </PrimaryButton>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* ── Products Mega-Menu ──
            70/30 layout: navigation links left, product preview right.
            Preview image updates on hover/keyboard focus. */}
        {dropdownOpen && (
          <div
            ref={megaMenuRef}
            id="products-mega-menu"
            role="menu"
            className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 w-[960px] max-w-[calc(100vw-32px)] bg-be-white border border-be-grey-250/80 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden animate-mega-menu-in"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
            onKeyDown={handleMegaMenuKeyDown}
            aria-label="Product categories"
          >
            {/* ── 70/30 Grid: Navigation | Preview ── */}
            <div className="flex">
              {/* LEFT — ~70% Navigation */}
              <div className="flex-1 min-w-0 border-r border-be-grey-200/60">
                {/* Top: Primary group — Electrical Insulating Mats */}
                <div className="px-5 pt-4 pb-0">
                  {/* Section eyebrow */}
                  <p className="text-[0.65rem] font-bold text-be-yellow-600 uppercase tracking-[0.12em] mb-2">
                    PRODUCTS
                  </p>

                  <p className="text-[0.9375rem] font-bold text-be-charcoal-950 mb-2.5">
                    Electrical Insulating Mats
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-3">
                    {/* Domestic Mats */}
                    <div role="group" aria-label="Domestic Mats">
                      <div className="flex items-baseline gap-2 mb-1.5">
                        <p className="text-xs font-bold text-be-charcoal-900">
                          Domestic Mats
                        </p>
                        <span className="text-[0.65rem] font-semibold text-be-yellow-700 bg-be-yellow-50 px-1.5 py-0.5 rounded">
                          IS 15652:2006
                        </span>
                      </div>
                      <div className="flex flex-col gap-px">
                        {domesticSub.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            className="flex items-center justify-between px-2.5 py-[6px] rounded-md text-[0.8125rem] font-medium text-be-charcoal-800 hover:bg-be-yellow-50/70 hover:text-be-charcoal-950 transition-all group/item"
                            onClick={() => setDropdownOpen(false)}
                            onMouseEnter={() => updatePreview(item.href)}
                            onFocus={() => updatePreview(item.href)}
                          >
                            {item.name}
                            <ChevronRight className="size-3 text-be-grey-300 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-focus-visible/item:opacity-100 transition-all" aria-hidden="true" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* International / Global */}
                    <div role="group" aria-label="International Mats">
                      <div className="flex items-baseline gap-2 mb-1.5">
                        <p className="text-xs font-bold text-be-charcoal-900">
                          International / Global
                        </p>
                        <span className="text-[0.65rem] font-semibold text-be-yellow-700 bg-be-yellow-50 px-1.5 py-0.5 rounded">
                          IEC 61111:2009
                        </span>
                      </div>
                      <div className="flex flex-col gap-px">
                        {internationalSub.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            className="flex items-center justify-between px-2.5 py-[6px] rounded-md text-[0.8125rem] font-medium text-be-charcoal-800 hover:bg-be-yellow-50/70 hover:text-be-charcoal-950 transition-all group/item"
                            onClick={() => setDropdownOpen(false)}
                            onMouseEnter={() => updatePreview(item.href)}
                            onFocus={() => updatePreview(item.href)}
                          >
                            {item.name}
                            <ChevronRight className="size-3 text-be-grey-300 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-focus-visible/item:opacity-100 transition-all" aria-hidden="true" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-5 h-px bg-be-grey-200/80" />

                {/* Middle: Secondary groups — 3 columns */}
                <div className="px-5 py-3">
                  <div className="grid grid-cols-3 gap-6">
                    {secondaryGroups.map((group) => {
                      const items = group.hasSubGroups
                        ? (group.children as ProductNavSubGroup[]).flatMap((s) => s.items)
                        : (group.children as ProductNavLeaf[]);
                      return (
                        <div key={group.id} role="group" aria-label={group.name}>
                          <p className="text-[0.6875rem] font-bold text-be-charcoal-900 uppercase tracking-[0.06em] mb-1.5">
                            {group.name}
                          </p>
                          <div className="flex flex-col gap-px">
                            {items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                role="menuitem"
                                className="flex items-center justify-between px-2.5 py-[6px] rounded-md text-[0.8125rem] font-medium text-be-charcoal-800 hover:bg-be-yellow-50/70 hover:text-be-charcoal-950 transition-all group/item"
                                onClick={() => setDropdownOpen(false)}
                                onMouseEnter={() => updatePreview(item.href)}
                                onFocus={() => updatePreview(item.href)}
                              >
                                {item.name}
                                <ChevronRight className="size-3 text-be-grey-300 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-focus-visible/item:opacity-100 transition-all" aria-hidden="true" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-5 h-px bg-be-grey-200/80" />

                {/* Bottom CTA row */}
                <div className="px-5 py-2.5 flex items-center justify-between bg-be-cream/40">
                  <Link
                    href="/contact-us?type=technical-guidance"
                    role="menuitem"
                    className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-be-charcoal-800 hover:text-be-yellow-text-hover transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Technical Guidance
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/products"
                    role="menuitem"
                    className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-be-charcoal-800 hover:text-be-yellow-text-hover transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    View All Products
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* RIGHT — ~30% Preview Panel */}
              <div
                className="w-[28%] min-w-[180px] flex flex-col items-center justify-center p-4 bg-be-cream/30"
                aria-hidden="true"
                onMouseEnter={resetPreview}
              >
                <div
                  key={previewKey}
                  className="relative w-full aspect-square rounded-xl overflow-hidden bg-be-cream animate-preview-crossfade"
                >
                  <Image
                    src={previewVisual.src}
                    alt={previewVisual.alt}
                    fill
                    className={cn(
                      previewVisual.fit === 'contain'
                        ? 'object-contain p-4'
                        : 'object-cover'
                    )}
                    sizes="280px"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <ScrollProgress />
      </div>
    </header>
  );
}
