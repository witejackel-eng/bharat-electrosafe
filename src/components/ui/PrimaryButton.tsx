'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: 'default' | 'lg';
}

export function PrimaryButton({
  children,
  href,
  onClick,
  className,
  size = 'default',
}: PrimaryButtonProps) {
  const sizeClasses =
    size === 'lg'
      ? 'px-8 py-4 text-lg'
      : 'px-6 py-3 text-base';

  const baseClasses =
    'inline-flex items-center justify-center min-h-[44px] rounded-lg bg-be-yellow-500 text-be-charcoal-950 font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 hover:bg-be-yellow-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-be-yellow-400 focus-visible:ring-offset-2';

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseClasses, sizeClasses, className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseClasses, sizeClasses, className)}
    >
      {children}
    </button>
  );
}
