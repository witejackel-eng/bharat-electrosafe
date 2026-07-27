'use client';

import { useSearch } from '@/components/search/SearchProvider';
import { Search } from 'lucide-react';

interface SearchTriggerProps {
  /** Compact mode: icon-only button (used in mobile drawer / tight spaces). */
  compact?: boolean;
  /** Additional className for the button. */
  className?: string;
  /** Show the ⌘K hint pill on desktop. Defaults to true. */
  showHint?: boolean;
}

function detectPlatform(): 'mac' | 'other' {
  if (typeof navigator === 'undefined') return 'other';
  const platform = (navigator.platform || '').toLowerCase();
  const userAgent = (navigator.userAgent || '').toLowerCase();
  if (platform.includes('mac') || userAgent.includes('mac')) return 'mac';
  return 'other';
}

export function SearchTrigger({ compact = false, className = '', showHint = true }: SearchTriggerProps) {
  const { openSearch } = useSearch();
  const isMac = detectPlatform() === 'mac';
  const modKey = isMac ? '⌘' : 'Ctrl';

  return (
    <button
      type="button"
      onClick={() => openSearch()}
      aria-label="Search (opens command palette)"
      className={`group inline-flex items-center gap-2 rounded-lg border border-border/60 bg-white text-navy hover:border-orange/50 hover:text-orange transition-colors ${
        compact ? 'h-9 w-9 justify-center' : 'h-9 px-3'
      } ${className}`}
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <Search className="size-4 shrink-0" aria-hidden="true" />
      {!compact && (
        <>
          <span className="text-sm font-medium hidden sm:inline">Search</span>
          {showHint && (
            <kbd
              className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border/60 bg-muted/60 text-[0.65rem] font-medium text-steel"
              aria-hidden="true"
            >
              <span>{modKey}</span>
              <span>K</span>
            </kbd>
          )}
        </>
      )}
    </button>
  );
}
