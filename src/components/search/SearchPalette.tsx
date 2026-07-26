'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useQuote } from '@/components/quote/QuoteProvider';
import { useProductDetail } from '@/components/products/ProductDetailProvider';
import { productSystems } from '@/data/products';
import { applications } from '@/data/applications';
import { resources } from '@/data/resources';
import {
  Search,
  Package,
  Building2,
  FileText,
  LayoutDashboard,
  ArrowRight,
  GitCompare,
  Quote as QuoteIcon,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Hash,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Category = 'Product' | 'Application' | 'Resource' | 'Page' | 'Action';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  icon: LucideIcon;
  keywords?: string[];
  onSelect: () => void;
  popular?: boolean;
}

interface SearchPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialQuery?: string;
}

const CATEGORY_ORDER: Category[] = ['Product', 'Application', 'Resource', 'Page', 'Action'];

const CATEGORY_LABELS: Record<Category, string> = {
  Product: 'Products',
  Application: 'Applications',
  Resource: 'Resources',
  Page: 'Pages',
  Action: 'Actions',
};

const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  Product: Package,
  Application: Building2,
  Resource: FileText,
  Page: LayoutDashboard,
  Action: ArrowRight,
};

function scrollToAnchor(selector: string) {
  if (typeof document === 'undefined') return;
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function SearchPalette({ open, onOpenChange, initialQuery = '' }: SearchPaletteProps) {
  const { openQuote } = useQuote();
  const { openProduct, openCompare } = useProductDetail();

  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Build the full result set once. Actions close the palette then trigger the dialog/scroll.
  const closePalette = useCallback(() => onOpenChange(false), [onOpenChange]);

  const allResults = useMemo<SearchResult[]>(() => {
    const results: SearchResult[] = [];

    // Products
    productSystems.forEach((p) => {
      results.push({
        id: `product-${p.id}`,
        title: p.name,
        subtitle: p.description,
        category: 'Product',
        icon: Package,
        keywords: [p.shortName, p.index, ...p.variants, ...p.standards, 'mat', 'insulation', 'safety'],
        onSelect: () => {
          closePalette();
          // Defer to allow dialog close animation to start cleanly
          setTimeout(() => openProduct(p.id), 30);
        },
        popular: p.id === 'electrical-insulation',
      });
    });

    // Applications
    applications.forEach((a) => {
      results.push({
        id: `app-${a.id}`,
        title: a.name,
        subtitle: `${a.system} · ${a.systemShort}`,
        category: 'Application',
        icon: Building2,
        keywords: [a.id, a.system, a.systemShort, 'application', 'use case', 'sector'],
        onSelect: () => {
          closePalette();
          scrollToAnchor(`#${a.id}`);
        },
        popular: a.id === 'substations',
      });
    });

    // Resources
    resources.forEach((r) => {
      results.push({
        id: `resource-${r.id}`,
        title: r.title,
        subtitle: `${r.type} · ${r.pages} pages · ${r.fileSize}`,
        category: 'Resource',
        icon: FileText,
        keywords: [r.type, r.category, r.description, r.fileType, 'download', 'pdf', 'document'],
        onSelect: () => {
          closePalette();
          scrollToAnchor('#resources');
        },
        popular: r.id === 'selection-guide-mats',
      });
    });

    // Pages / Anchors
    const pages: Array<{ id: string; title: string; subtitle: string; anchor: string; keywords?: string[]; popular?: boolean }> = [
      { id: 'page-products', title: 'Products', subtitle: 'Browse all three product systems', anchor: '#products', keywords: ['systems', 'catalogue', 'mats', 'matting'], popular: true },
      { id: 'page-proof', title: 'Proof Centre', subtitle: 'Certificates, test reports and traceability', anchor: '#proof', keywords: ['certificates', 'bis', 'iso', 'test report', 'quality', 'documents'], popular: true },
      { id: 'page-applications', title: 'Applications', subtitle: 'Substations, control rooms, railways, tunnels & more', anchor: '#applications', keywords: ['sectors', 'use cases', 'substations', 'railways', 'metro'] },
      { id: 'page-testimonials', title: 'Testimonials', subtitle: 'What our institutional clients say', anchor: '#testimonials', keywords: ['reviews', 'clients', 'quotes', 'feedback'] },
      { id: 'page-resources', title: 'Resources', subtitle: 'Technical briefs, datasheets and selection guides', anchor: '#resources', keywords: ['downloads', 'pdfs', 'briefs', 'guides'] },
      { id: 'page-contact', title: 'Contact', subtitle: 'Facility address, phone, email and hours', anchor: '#contact', keywords: ['phone', 'email', 'address', 'sales', 'support'], popular: true },
      { id: 'page-about', title: 'About', subtitle: 'Company background and recognition', anchor: '#about', keywords: ['company', 'history', 'credibility', 'factory', 'recognition'] },
    ];
    pages.forEach((p) => {
      results.push({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        category: 'Page',
        icon: Hash,
        keywords: p.keywords,
        onSelect: () => {
          closePalette();
          scrollToAnchor(p.anchor);
        },
        popular: p.popular,
      });
    });

    // Actions
    results.push({
      id: 'action-quote',
      title: 'Request a Quote',
      subtitle: 'Open the quote request form',
      category: 'Action',
      icon: QuoteIcon,
      keywords: ['quote', 'rfq', 'enquiry', 'price', 'estimate', 'order', 'buy'],
      onSelect: () => {
        closePalette();
        setTimeout(() => openQuote(), 30);
      },
      popular: true,
    });
    results.push({
      id: 'action-compare',
      title: 'Compare systems',
      subtitle: 'Side-by-side comparison of all three product systems',
      category: 'Action',
      icon: GitCompare,
      keywords: ['compare', 'comparison', 'specs', 'specifications', 'versus', 'vs'],
      onSelect: () => {
        closePalette();
        setTimeout(() => openCompare(), 30);
      },
      popular: true,
    });

    return results;
  }, [closePalette, openQuote, openProduct, openCompare]);

  // Filter results by query (case-insensitive substring match on title/subtitle/keywords)
  const filteredResults = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allResults.filter((r) => {
      const haystack = [r.title, r.subtitle, ...(r.keywords ?? [])].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [query, allResults]);

  // Popular suggestions for empty state
  const popularResults = useMemo<SearchResult[]>(() => {
    return allResults.filter((r) => r.popular).slice(0, 8);
  }, [allResults]);

  // What to display: filtered when query present, popular when empty
  const activeResults = query.trim() ? filteredResults : popularResults;

  // Build a render list with category headers interspersed
  const renderList = useMemo<
    Array<
      | { type: 'header'; category: Category }
      | { type: 'item'; result: SearchResult; flatIndex: number }
    >
  >(() => {
    const list: Array<
      | { type: 'header'; category: Category }
      | { type: 'item'; result: SearchResult; flatIndex: number }
    > = [];
    let lastCat: Category | null = null;
    activeResults.forEach((result, idx) => {
      if (result.category !== lastCat) {
        list.push({ type: 'header', category: result.category });
        lastCat = result.category;
      }
      list.push({ type: 'item', result, flatIndex: idx });
    });
    return list;
  }, [activeResults]);

  const totalItems = activeResults.length;

  // Derived state: reset highlighted index when query changes (no effect needed).
  // This is the React "store previous value" pattern — calling setState during render
  // is safe here because it's conditional and React bails out when the value is unchanged.
  const [prevQuery, setPrevQuery] = useState('');
  if (query !== prevQuery) {
    setPrevQuery(query);
    setHighlightedIndex(0);
  }

  // Derived state: sync query with initialQuery prop on open / clear on close.
  // Also reset highlightedIndex whenever the dialog opens/closes so the first
  // item is always selected on a fresh open.
  const [prevOpen, setPrevOpen] = useState(false);
  if (open !== prevOpen) {
    setPrevOpen(open);
    setQuery(open ? initialQuery : '');
    setHighlightedIndex(0);
  }

  // Focus input when dialog opens (external side-effect, allowed in effect)
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open]);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onOpenChange]);

  // Keep highlighted item in view (external DOM side-effect)
  useEffect(() => {
    if (!open || highlightedIndex < 0) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${highlightedIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex, open]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (totalItems === 0) return;
      setHighlightedIndex((i) => (i + 1) % totalItems);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (totalItems === 0) return;
      setHighlightedIndex((i) => (i - 1 + totalItems) % totalItems);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = activeResults[highlightedIndex];
      if (item) item.onSelect();
    }
  };

  const hasQuery = query.trim().length > 0;
  const noResults = hasQuery && filteredResults.length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="block top-[12vh] left-1/2 -translate-x-1/2 translate-y-0 sm:max-w-2xl max-h-[76vh] p-0 gap-0 overflow-hidden rounded-xl border-border/60 shadow-2xl"
        style={{ fontFamily: "'Manrope', sans-serif" }}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {/* Visually-hidden accessible title/description */}
        <DialogTitle className="sr-only">Search Bharat Electrosafe</DialogTitle>
        <DialogDescription className="sr-only">
          Search across products, applications, resources, pages and quick actions. Use arrow keys to navigate, Enter to select, Escape to close.
        </DialogDescription>

        {/* Search input header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/60 bg-white/95 dark:bg-card/95">
          <Search className="size-5 text-steel shrink-0" aria-hidden="true" />
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={hasQuery ? '' : 'Search products, applications, resources, pages…'}
            className="border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 bg-transparent h-9 text-base text-navy dark:text-foreground placeholder:text-steel"
            aria-label="Search"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd
            className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-border/60 bg-muted/60 text-[0.65rem] font-medium text-steel uppercase tracking-wider"
            aria-hidden="true"
          >
            esc
          </kbd>
        </div>

        {/* Results list */}
        <div
          ref={listRef}
          className="overflow-y-auto max-h-[60vh] py-1.5 bg-ivory-light dark:bg-background"
          role="listbox"
          aria-label="Search results"
        >
          {noResults ? (
            <div className="px-6 py-12 text-center">
              <Search className="size-8 text-steel/60 mx-auto mb-3" aria-hidden="true" />
              <p className="text-sm text-navy dark:text-foreground font-medium">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-steel mt-1">Try a different keyword, or browse popular searches below.</p>
            </div>
          ) : (
            <ul className="flex flex-col">
              {renderList.map((entry) => {
                if (entry.type === 'header') {
                  const Icon = CATEGORY_ICONS[entry.category];
                  return (
                    <li
                      key={`header-${entry.category}`}
                      className="px-4 pt-2.5 pb-1 flex items-center gap-2 text-eyebrow text-[0.65rem] text-steel"
                    >
                      <Icon className="size-3" aria-hidden="true" />
                      {CATEGORY_LABELS[entry.category]}
                    </li>
                  );
                }
                const { result, flatIndex } = entry;
                const isHighlighted = flatIndex === highlightedIndex;
                const Icon = result.icon;
                return (
                  <li key={result.id} role="option" aria-selected={isHighlighted}>
                    <button
                      type="button"
                      data-idx={flatIndex}
                      onMouseEnter={() => setHighlightedIndex(flatIndex)}
                      onClick={() => result.onSelect()}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${
                        isHighlighted
                          ? 'bg-orange-soft text-navy dark:text-foreground'
                          : 'text-navy dark:text-foreground hover:bg-orange-soft/60'
                      }`}
                    >
                      <span
                        className={`shrink-0 size-8 rounded-md flex items-center justify-center border ${
                          isHighlighted
                            ? 'bg-orange text-white border-orange'
                            : 'bg-white dark:bg-card border-border/60 text-navy dark:text-foreground'
                        }`}
                      >
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="flex-1 min-w-0 flex flex-col">
                        <span className="text-sm font-medium leading-tight truncate">{result.title}</span>
                        <span className="text-xs text-steel leading-tight truncate">{result.subtitle}</span>
                      </span>
                      {isHighlighted && (
                        <CornerDownLeft className="size-4 text-orange shrink-0" aria-hidden="true" />
                      )}
                      {result.category === 'Action' && !isHighlighted && (
                        <ArrowRight className="size-4 text-steel shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer keyboard hints */}
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-t border-border/60 bg-white/95 dark:bg-card/95 text-[0.7rem] text-steel">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1">
              <kbd className="inline-flex items-center justify-center size-4 rounded border border-border/60 bg-muted/60 text-[0.6rem]">
                <ArrowUp className="size-2.5" />
              </kbd>
              <kbd className="inline-flex items-center justify-center size-4 rounded border border-border/60 bg-muted/60 text-[0.6rem]">
                <ArrowDown className="size-2.5" />
              </kbd>
              <span className="ml-0.5">navigate</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="inline-flex items-center justify-center px-1 h-4 rounded border border-border/60 bg-muted/60 text-[0.6rem]">
                <CornerDownLeft className="size-2.5" />
              </kbd>
              <span className="ml-0.5">select</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="inline-flex items-center justify-center px-1.5 h-4 rounded border border-border/60 bg-muted/60 text-[0.6rem] uppercase">esc</kbd>
              <span className="ml-0.5">close</span>
            </span>
          </div>
          <span className="hidden sm:inline text-steel/80">Bharat Electrosafe · Search</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
