'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Shield, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { company } from '@/data/company';
import { products } from '@/data/products';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 ${
        scrolled
          ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-border'
          : 'bg-background border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="#home"
          className="flex items-center gap-2.5 font-semibold tracking-tight"
          aria-label={`${company.name} home`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-base sm:text-lg leading-tight">
            Bharat<span className="text-amber-600">Electrosafe</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <Link
            href="#home"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
          >
            Home
          </Link>

          {/* Products dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Products menu"
              >
                Products
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="w-72"
              sideOffset={8}
            >
              <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Insulating Mats
              </DropdownMenuLabel>
              {products
                .filter((p) => p.category === 'Insulating Mats')
                .map((p) => (
                  <DropdownMenuItem key={p.slug} asChild>
                    <Link href={`#${p.slug}`} className="flex flex-col gap-0.5">
                      <span className="font-medium">{p.shortName}</span>
                      <span className="text-xs text-muted-foreground">{p.tagline}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Engineered Membranes
              </DropdownMenuLabel>
              {products
                .filter((p) => p.category === 'Engineered Membranes')
                .map((p) => (
                  <DropdownMenuItem key={p.slug} asChild>
                    <Link href={`#${p.slug}`} className="flex flex-col gap-0.5">
                      <span className="font-medium">{p.shortName}</span>
                      <span className="text-xs text-muted-foreground">{p.tagline}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="#about"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <a href={`tel:${company.phonePrimaryTel}`} className="flex items-center gap-1.5">
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden lg:inline">{company.phonePrimary}</span>
            </a>
          </Button>
          <Button asChild size="sm">
            <Link href="#contact">Enquire Now</Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 max-w-full overflow-y-auto">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col gap-1 pt-6">
              <SheetClose asChild>
                <Link
                  href="#home"
                  className="rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted"
                >
                  Home
                </Link>
              </SheetClose>
              <p className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Insulating Mats
              </p>
              {products
                .filter((p) => p.category === 'Insulating Mats')
                .map((p) => (
                  <SheetClose asChild key={p.slug}>
                    <Link
                      href={`#${p.slug}`}
                      className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                    >
                      {p.shortName}
                    </Link>
                  </SheetClose>
                ))}
              <p className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Engineered Membranes
              </p>
              {products
                .filter((p) => p.category === 'Engineered Membranes')
                .map((p) => (
                  <SheetClose asChild key={p.slug}>
                    <Link
                      href={`#${p.slug}`}
                      className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                    >
                      {p.shortName}
                    </Link>
                  </SheetClose>
                ))}
              <div className="my-3 border-t" />
              <SheetClose asChild>
                <Link
                  href="#about"
                  className="rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted"
                >
                  About
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="#contact"
                  className="rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted"
                >
                  Contact
                </Link>
              </SheetClose>
              <div className="mt-4 flex flex-col gap-2 px-3">
                <Button asChild>
                  <a href={`tel:${company.phonePrimaryTel}`}>Call {company.phonePrimary}</a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={company.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
