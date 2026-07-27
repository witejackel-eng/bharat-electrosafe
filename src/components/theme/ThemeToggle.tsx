'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';

// Track mount state without setState-in-effect pattern (avoids cascading renders).
const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // client snapshot — always true after hydration
    () => false // server snapshot — false during SSR
  );
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    // Render a placeholder with the same dimensions to avoid layout shift.
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-white text-navy ${className}`}
      >
        <Sun className="size-4" />
      </button>
    );
  }

  const isDark = (theme === 'system' ? resolvedTheme : theme) === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-white text-navy hover:border-orange/50 hover:text-orange transition-colors ${className}`}
    >
      <Sun
        className={`size-4 transition-all duration-300 ${
          isDark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
        } absolute`}
      />
      <Moon
        className={`size-4 transition-all duration-300 ${
          isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'
        } absolute`}
      />
    </button>
  );
}
