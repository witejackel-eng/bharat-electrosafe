'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ProductSystemPanel } from '@/components/navigation/ProductSystemPanel';
import { MobileDrawer } from '@/components/navigation/MobileDrawer';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { QuoteAdminTrigger } from '@/components/quote/QuoteAdminTrigger';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { SearchTrigger } from '@/components/search/SearchTrigger';
import Link from 'next/link';
import Image from 'next/image';

const SCROLL_THRESHOLD = 80;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const productsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Motion 1: Header arrival animation
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProductsEnter = useCallback(() => {
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    setProductsOpen(true);
    setHoveredNav('products');
  }, []);

  const handleProductsLeave = useCallback(() => {
    productsTimeoutRef.current = setTimeout(() => {
      setProductsOpen(false);
      setHoveredNav(null);
    }, 200);
  }, []);

  const handleNavEnter = useCallback((item: string) => {
    setHoveredNav(item);
    if (item !== 'products') setProductsOpen(false);
  }, []);

  const handleNavLeave = useCallback(() => {
    setHoveredNav(null);
  }, []);

  return (
    <header
      className="fixed z-50"
      style={{
        top: scrolled ? '8px' : '16px',
        left: '50%',
        transform: `translateX(-50%) translateY(${loaded ? '0' : '-12px'})`,
        width: 'min(calc(100vw - 32px), 1380px)',
        opacity: loaded ? 1 : 0,
        transition: loaded
          ? 'all 350ms ease-out'
          : 'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 100ms',
      }}
    >
      <div
        className="relative flex items-center justify-between transition-all duration-[350ms] ease-out bg-white/80 backdrop-blur-xl border border-border/60 shadow-sm"
        style={{
          borderRadius: scrolled ? '12px' : '18px',
          height: scrolled ? '58px' : '72px',
          boxShadow: scrolled
            ? '0 4px 20px rgba(27, 42, 74, 0.08), 0 1px 3px rgba(27, 42, 74, 0.04)'
            : '0 1px 8px rgba(27, 42, 74, 0.04)',
          padding: '0 24px',
        }}
      >
        {/* Brand Block */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="relative shrink-0 transition-all duration-[350ms]"
            style={{ width: scrolled ? '28px' : '34px', height: scrolled ? '28px' : '34px' }}
          >
            <Image
              src="/logo-bharat.png"
              alt="Bharat Electrosafe"
              fill
              sizes="34px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-navy text-sm leading-tight tracking-tight">
              Bharat Electrosafe
            </span>
            <span
              className="text-[0.65rem] text-steel leading-tight transition-all duration-[350ms] ease-out overflow-hidden"
              style={{
                opacity: scrolled ? 0 : 1,
                maxHeight: scrolled ? '0px' : '16px',
                marginTop: scrolled ? '0px' : '2px',
              }}
            >
              Electrical safety systems
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav
          ref={navRef}
          className="hidden md:flex items-center gap-1 relative"
          onMouseLeave={handleNavLeave}
        >
          {/* Products */}
          <div
            onMouseEnter={handleProductsEnter}
            onMouseLeave={handleProductsLeave}
            className="relative"
          >
            <Link
              href="#products"
              className="relative px-4 py-2 text-sm font-medium text-navy/80 hover:text-navy transition-colors"
              onFocus={handleProductsEnter}
              onBlur={handleProductsLeave}
            >
              Products
              <span
                className="absolute bottom-0 left-4 right-4 h-[2px] bg-orange rounded-full transition-all duration-300"
                style={{
                  transform: hoveredNav === 'products' || productsOpen ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                }}
              />
            </Link>

            {/* Product System Panel */}
            <div
              className="absolute left-0"
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
              style={{
                opacity: productsOpen ? 1 : 0,
                pointerEvents: productsOpen ? 'auto' : 'none',
                transform: productsOpen ? 'translateY(0)' : 'translateY(-8px)',
                transition: 'opacity 200ms ease, transform 200ms ease',
              }}
            >
              <ProductSystemPanel />
            </div>
          </div>

          {/* Proof */}
          <Link
            href="#proof"
            className="relative px-4 py-2 text-sm font-medium text-navy/80 hover:text-navy transition-colors"
            onMouseEnter={() => handleNavEnter('proof')}
            onMouseLeave={handleNavLeave}
          >
            Proof
            <span
              className="absolute bottom-0 left-4 right-4 h-[2px] bg-orange rounded-full transition-all duration-300"
              style={{
                transform: hoveredNav === 'proof' ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
              }}
            />
          </Link>

          {/* Company */}
          <Link
            href="#company"
            className="relative px-4 py-2 text-sm font-medium text-navy/80 hover:text-navy transition-colors"
            onMouseEnter={() => handleNavEnter('company')}
            onMouseLeave={handleNavLeave}
          >
            Company
            <span
              className="absolute bottom-0 left-4 right-4 h-[2px] bg-orange rounded-full transition-all duration-300"
              style={{
                transform: hoveredNav === 'company' ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
              }}
            />
          </Link>
        </nav>

        {/* CTA + Mobile Menu */}
        <div className="flex items-center gap-2">
          <QuoteAdminTrigger className="hidden md:inline-flex" />
          <SearchTrigger className="hidden md:inline-flex" />
          <QuoteButton
            className="hidden md:inline-flex bg-orange hover:bg-orange-hover text-white font-medium text-sm h-9 px-5 rounded-lg transition-colors"
          >
            Request a Quote
          </QuoteButton>
          <ThemeToggle className="hidden md:inline-flex" />
          <MobileDrawer />
        </div>
      </div>
    </header>
  );
}
