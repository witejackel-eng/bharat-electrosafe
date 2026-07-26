'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { QuoteAdminDialog } from '@/components/quote/QuoteAdminDialog';

interface QuoteAdminContextValue {
  openAdmin: () => void;
  closeAdmin: () => void;
  isOpen: boolean;
}

const QuoteAdminContext = createContext<QuoteAdminContextValue | null>(null);

export function QuoteAdminProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openAdmin = useCallback(() => setIsOpen(true), []);
  const closeAdmin = useCallback(() => setIsOpen(false), []);

  return (
    <QuoteAdminContext.Provider value={{ openAdmin, closeAdmin, isOpen }}>
      {children}
      <QuoteAdminDialog open={isOpen} onOpenChange={setIsOpen} />
    </QuoteAdminContext.Provider>
  );
}

export function useQuoteAdmin() {
  const ctx = useContext(QuoteAdminContext);
  if (!ctx) {
    throw new Error('useQuoteAdmin must be used within QuoteAdminProvider');
  }
  return ctx;
}
