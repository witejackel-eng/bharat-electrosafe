'use client';

import { useQuoteAdmin } from '@/components/quote/QuoteAdminProvider';
import { LayoutDashboard } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface QuoteAdminTriggerProps {
  /** Show the "Admin" text label. Defaults to true on desktop, false on mobile. */
  showLabel?: boolean;
  /** Additional className. */
  className?: string;
}

export function QuoteAdminTrigger({
  showLabel = true,
  className,
}: QuoteAdminTriggerProps) {
  const { openAdmin } = useQuoteAdmin();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={() => openAdmin()}
          aria-label="Open admin dashboard"
          className={cn(
            'group inline-flex items-center gap-1.5 rounded-md px-2.5 h-8 text-steel hover:text-orange transition-colors text-xs font-medium',
            className
          )}
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          <LayoutDashboard className="size-4 shrink-0" aria-hidden="true" />
          {showLabel ? (
            <span className="hidden md:inline">Admin</span>
          ) : null}
        </button>
      </TooltipTrigger>
      <TooltipContent>View submitted quote requests</TooltipContent>
    </Tooltip>
  );
}
