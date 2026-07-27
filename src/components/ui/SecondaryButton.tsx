'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SecondaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function SecondaryButton({
  children,
  href,
  onClick,
  className,
}: SecondaryButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center min-h-[44px] rounded-lg border border-be-grey-250 text-be-charcoal-800 font-semibold transition-colors duration-200 hover:border-be-yellow-400 hover:text-be-charcoal-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-400 focus-visible:ring-offset-2 px-6 py-3 text-base bg-transparent';

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseClasses, className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseClasses, className)}
    >
      {children}
    </button>
  );
}
