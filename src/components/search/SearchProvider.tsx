'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { SearchPalette } from '@/components/search/SearchPalette';

interface SearchContextValue {
  openSearch: (opts?: { initialQuery?: string }) => void;
  closeSearch: () => void;
  isOpen: boolean;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string>('');

  const openSearch = useCallback((opts?: { initialQuery?: string }) => {
    setInitialQuery(opts?.initialQuery ?? '');
    setOpen(true);
  }, []);

  const closeSearch = useCallback(() => setOpen(false), []);

  return (
    <SearchContext.Provider value={{ openSearch, closeSearch, isOpen: open }}>
      {children}
      <SearchPalette open={open} onOpenChange={setOpen} initialQuery={initialQuery} />
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return ctx;
}
