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
import { Menu } from 'lucide-react';
import Link from 'next/link';

export function MobileDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] max-w-sm bg-ivory p-0">
        <SheetHeader className="p-5 pb-0">
          <SheetTitle className="text-navy font-semibold text-lg">Bharat Electrosafe</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col p-5 pt-2">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="products">
              <AccordionTrigger className="text-navy font-medium text-base py-3">
                Products
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-1 pl-2">
                  {productSystems.map((system) => (
                    <div key={system.id}>
                      <Link
                        href={system.exploreLink}
                        className="flex items-center gap-2 py-2 text-sm text-navy/80 hover:text-orange transition-colors"
                      >
                        <span className="text-eyebrow text-[0.65rem]">{system.index}</span>
                        {system.name}
                      </Link>
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
                  <Link href="#about" className="py-2 text-sm text-navy/80 hover:text-orange transition-colors">About</Link>
                  <Link href="#applications" className="py-2 text-sm text-navy/80 hover:text-orange transition-colors">Applications</Link>
                  <Link href="#contact" className="py-2 text-sm text-navy/80 hover:text-orange transition-colors">Contact</Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-6 flex flex-col gap-3">
            <Button className="w-full bg-orange hover:bg-orange-hover text-white font-medium">
              Request a Quote
            </Button>
            <a
              href="tel:+911234567890"
              className="text-center text-sm text-steel hover:text-navy transition-colors"
            >
              Call technical sales
            </a>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
