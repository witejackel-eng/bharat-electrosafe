'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb — semantic navigation trail with BreadcrumbList JSON-LD.
 *
 * Upgraded from the original (which was visual-only) to also emit
 * schema.org BreadcrumbList structured data so search engines can display
 * the trail in SERP results. Adds a leading Home icon, focus rings, and
 * label truncation for long product names.
 *
 * Accessibility:
 *   • `<nav aria-label="Breadcrumb">` landmark
 *   • `aria-current="page"` on the active crumb
 *   • Decorative icons are `aria-hidden`
 *   • Focus-visible ring via .focus-ring utility
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  // Build BreadcrumbList JSON-LD for SEO. Only emitted when crumbs have
  // hrefs (i.e. a real trail, not a single stub).
  const ldJson =
    items.length > 1
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            ...(item.href ? { item: item.href } : {}),
          })),
        }
      : null;

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center min-w-0', className)}>
      {ldJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
      )}
      <ol className="flex flex-wrap items-center gap-1 text-metadata text-be-grey-550 min-w-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHome = index === 0;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1 min-w-0">
              {index > 0 && (
                <ChevronRight
                  className="size-3.5 text-be-grey-350 shrink-0"
                  aria-hidden="true"
                  focusable="false"
                />
              )}
              {isLast || !item.href ? (
                <span
                  className="flex items-center gap-1 text-be-charcoal-950 font-semibold truncate max-w-[16rem]"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {isHome && <Home className="size-3.5 shrink-0" aria-hidden="true" focusable="false" />}
                  <span className="truncate">{item.label}</span>
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-sm text-be-charcoal-800 hover:text-be-yellow-text-hover transition-colors duration-200 underline-offset-2 hover:underline focus-ring"
                >
                  {isHome && <Home className="size-3.5 shrink-0" aria-hidden="true" focusable="false" />}
                  <span className="truncate max-w-[12rem]">{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
