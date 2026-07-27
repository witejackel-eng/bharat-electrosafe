'use client';

import { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  eyebrow?: string;
  supportingText?: string;
  className?: string;
}

export function FAQ({
  items,
  title,
  eyebrow,
  supportingText,
  className,
}: FAQProps) {
  const staggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!staggerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(staggerRef.current);
    return () => observer.disconnect();
  }, []);

  const showHeader = Boolean(title || eyebrow);

  return (
    <div className={cn('w-full', className)}>
      {showHeader && (
        <div className="reveal-up mb-10 max-w-2xl">
          <SectionHeader
            eyebrow={eyebrow}
            title={title ?? ''}
            supportingText={supportingText}
            align="left"
          />
        </div>
      )}

      <div ref={staggerRef} className="stagger-reveal">
        <Accordion
          type="single"
          collapsible
          className="flex flex-col gap-3"
        >
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="group border border-be-grey-250 last:border-b rounded-lg bg-be-white px-5 transition-colors duration-200 hover:border-be-yellow-400 data-[state=open]:bg-be-yellow-50/50 data-[state=open]:border-be-yellow-400"
            >
              <AccordionTrigger className="hover:no-underline py-5 [&>svg:last-child]:hidden">
                <span className="text-card-title text-be-charcoal-950 text-left flex-1 pr-4">
                  {item.question}
                </span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-be-yellow-50 text-be-yellow-600 border border-be-yellow-100 transition-all duration-200 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-be-yellow-500 group-data-[state=open]:text-be-charcoal-950 group-data-[state=open]:border-be-yellow-500">
                  <Plus className="h-4 w-4" />
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-body text-be-grey-650 leading-relaxed pb-5 pr-8">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FAQ;
