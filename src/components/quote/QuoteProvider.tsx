'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { QuoteDialog } from '@/components/quote/QuoteDialog';

interface QuoteContextValue {
  openQuote: (opts?: { productSystem?: string; productClass?: string }) => void;
  closeQuote: () => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [defaultProductSystem, setDefaultProductSystem] = useState<string | undefined>(undefined);
  const [defaultProductClass, setDefaultProductClass] = useState<string | undefined>(undefined);

  const openQuote = useCallback((opts?: { productSystem?: string; productClass?: string }) => {
    setDefaultProductSystem(opts?.productSystem);
    setDefaultProductClass(opts?.productClass);
    setOpen(true);
  }, []);

  const closeQuote = useCallback(() => setOpen(false), []);

  return (
    <QuoteContext.Provider value={{ openQuote, closeQuote }}>
      {children}
      <QuoteDialog
        open={open}
        onOpenChange={setOpen}
        defaultProductSystem={defaultProductSystem}
        defaultProductClass={defaultProductClass}
      />
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) {
    throw new Error('useQuote must be used within QuoteProvider');
  }
  return ctx;
}
