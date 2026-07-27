'use client';

import { productSystems } from '@/data/products';
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
import { QuoteButton } from '@/components/quote/QuoteButton';
import { QuoteAdminTrigger } from '@/components/quote/QuoteAdminTrigger';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { LocaleToggle } from '@/components/i18n/LocaleToggle';
import { SearchTrigger } from '@/components/search/SearchTrigger';
import { useProductDetail } from '@/components/products/ProductDetailProvider';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export function MobileDrawer() {
  const { openProduct } = useProductDetail();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] max-w-sm bg-ivory p-0 overflow-y-auto">
        <SheetHeader className="p-5 pb-0">
          <SheetTitle className="text-navy font-semibold text-lg" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Bharat Electrosafe
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col p-5 pt-3 gap-3">
          {/* Search trigger at top of mobile drawer */}
          <SearchTrigger compact={false} className="w-full justify-start h-10" />

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="products">
              <AccordionTrigger className="text-navy font-medium text-base py-3">
                Products
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1 pl-2">
                  {productSystems.map((system) => (
                    <div key={system.id}>
                      <button
                        type="button"
                        onClick={() => {
                          // Close sheet by clicking overlay trigger after a small delay
                          // The Sheet component manages its own state, so we navigate by triggering a state reset
                          openProduct(system.id);
                        }}
                        className="flex items-center gap-2 py-2 text-sm text-navy/80 hover:text-orange transition-colors w-full text-left"
                      >
                        <span className="text-eyebrow text-[0.65rem]">{system.index}</span>
                        {system.name}
                      </button>
                      <div className="pl-6 pb-1">
                        {system.variants.map((v) => (
                          <div key={v} className="text-xs text-steel py-0.5">{v}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link
            href="#proof"
            className="py-3 text-base font-medium text-navy hover:text-orange transition-colors border-b border-border"
          >
            Proof
          </Link>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="company">
              <AccordionTrigger className="text-navy font-medium text-base py-3">
                Company
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1 pl-2">
                  <Link href="#company" className="py-2 text-sm text-navy/80 hover:text-orange transition-colors">About</Link>
                  <Link href="#applications" className="py-2 text-sm text-navy/80 hover:text-orange transition-colors">Applications</Link>
                  <Link href="#contact" className="py-2 text-sm text-navy/80 hover:text-orange transition-colors">Contact</Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-6 flex flex-col gap-3">
            <QuoteButton className="w-full bg-orange hover:bg-orange-hover text-white font-medium h-11">
              Request a Quote
            </QuoteButton>
            <div className="flex items-center justify-between">
              <a
                href="tel:+911234567890"
                className="text-sm text-steel hover:text-navy transition-colors"
              >
                Call technical sales
              </a>
              <div className="flex items-center gap-2">
                <span className="text-xs text-steel" style={{ fontFamily: "'Manrope', sans-serif" }}>Theme</span>
                <LocaleToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Admin access — discreet, below the main navigation */}
          <div className="mt-6 pt-4 border-t border-border">
            <div
              className="text-[0.65rem] font-medium uppercase tracking-wider text-steel mb-2"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Internal
            </div>
            <QuoteAdminTrigger
              showLabel={true}
              className="w-full justify-start px-0 h-9 text-sm text-steel hover:text-orange"
            />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
