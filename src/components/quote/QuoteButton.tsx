'use client';

import { Button } from '@/components/ui/button';
import { useQuote } from '@/components/quote/QuoteProvider';
import { ArrowRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

interface QuoteButtonProps {
  children: ReactNode;
  productSystem?: string;
  productClass?: string;
  variant?: ComponentProps<typeof Button>['variant'];
  className?: string;
  size?: ComponentProps<typeof Button>['size'];
  showArrow?: boolean;
}

export function QuoteButton({
  children,
  productSystem,
  productClass,
  variant = 'default',
  className,
  size,
  showArrow = false,
}: QuoteButtonProps) {
  const { openQuote } = useQuote();

  return (
    <Button
      variant={variant}
      className={className}
      size={size}
      onClick={(e) => {
        e.preventDefault();
        openQuote({ productSystem, productClass });
      }}
    >
      {children}
      {showArrow && <ArrowRight className="size-4 ml-1" />}
    </Button>
  );
}
