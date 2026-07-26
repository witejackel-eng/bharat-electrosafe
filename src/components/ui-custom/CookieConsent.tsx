'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Cookie, ShieldCheck, BarChart3, Megaphone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'be-cookie-consent';
const STORAGE_VERSION = 1;
const SHOW_DELAY_MS = 1500;

type ConsentState = {
  version: number;
  timestamp: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

// Mount guard using useSyncExternalStore to avoid setState-in-effect lint error
// and hydration mismatch. Server snapshot is always false (render nothing on
// SSR), client snapshot becomes true after hydration.
const emptySubscribe = () => () => {};
const getMountedClient = () => true;
const getMountedServer = () => false;
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    getMountedClient,
    getMountedServer
  );
}

// localStorage-backed external store so we can read consent state without
// calling setState inside an effect.
//
// IMPORTANT: useSyncExternalStore expects getSnapshot to return a STABLE
// reference when the underlying data has not changed (otherwise React
// detects an infinite loop). We therefore cache the last raw string and
// the parsed object, and only re-parse when the raw string differs.
const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedParsed: ConsentState | null = null;

function notifyListeners() {
  listeners.forEach((l) => l());
}
function subscribeConsent(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', onStorage);
  };
}
function getConsentSnapshot(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw === cachedRaw) {
    return cachedParsed;
  }
  cachedRaw = raw;
  cachedParsed = parseConsent(raw);
  return cachedParsed;
}
function getConsentServerSnapshot(): ConsentState | null {
  return null;
}

function parseConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      parsed.version !== STORAGE_VERSION
    ) {
      return null;
    }
    return {
      version: parsed.version ?? STORAGE_VERSION,
      timestamp: parsed.timestamp ?? Date.now(),
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}

function readConsent(): ConsentState | null {
  return getConsentSnapshot();
}

function writeConsent(
  state: Omit<ConsentState, 'version' | 'timestamp' | 'necessary'>
) {
  if (typeof window === 'undefined') return;
  const full: ConsentState = {
    version: STORAGE_VERSION,
    timestamp: Date.now(),
    necessary: true,
    ...state,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
  } catch {
    /* no-op: storage unavailable */
  }
  notifyListeners();
}

function clearConsent() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* no-op */
  }
  notifyListeners();
}

const manrope = { fontFamily: "'Manrope', sans-serif" } as const;

type BannerView = 'hidden' | 'visible';

export function CookieConsent() {
  const mounted = useIsMounted();
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot
  );

  const [view, setView] = useState<BannerView>('hidden');
  const [prefsOpen, setPrefsOpen] = useState(false);

  // preference toggles (independent of saved state until user clicks Save)
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // container ref for banner slide-in styling
  const bannerRef = useRef<HTMLDivElement | null>(null);

  // After mount: if no prior consent, reveal the banner after a short delay.
  // All setState calls happen inside setTimeout callback (not synchronously
  // inside the effect body), so this does not trigger the cascading-render
  // lint rule.
  useEffect(() => {
    if (!mounted) return;
    if (consent) return; // user already chose — keep hidden
    const t = window.setTimeout(() => setView('visible'), SHOW_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [mounted, consent]);

  const handleAcceptAll = () => {
    writeConsent({ analytics: true, marketing: true });
    setView('hidden');
  };

  const handleNecessaryOnly = () => {
    writeConsent({ analytics: false, marketing: false });
    setView('hidden');
  };

  const handleOpenPrefs = () => {
    // pre-seed toggles with any current saved state (or sensible defaults)
    const current = readConsent();
    setAnalytics(current?.analytics ?? false);
    setMarketing(current?.marketing ?? false);
    setPrefsOpen(true);
  };

  const handleSavePrefs = () => {
    writeConsent({ analytics, marketing });
    setPrefsOpen(false);
    setView('hidden');
  };

  if (!mounted) return null;

  const isBannerVisible = view === 'visible' && !consent;

  return (
    <>
      <div
        ref={bannerRef}
        role="dialog"
        aria-label="Cookie consent"
        aria-live="polite"
        aria-modal="false"
        aria-hidden={!isBannerVisible}
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 pointer-events-none',
          'px-3 pb-3 sm:px-4 sm:pb-4'
        )}
      >
        <div
          className={cn(
            'pointer-events-auto mx-auto w-full max-w-5xl',
            'rounded-2xl border border-white/15 shadow-2xl',
            'bg-navy text-white',
            'backdrop-blur supports-[backdrop-filter]:bg-navy/95',
            'transition-all duration-500 ease-out',
            isBannerVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[calc(100%+1.5rem)] opacity-0'
          )}
          style={manrope}
        >
          {/* top accent line */}
          <div className="h-[3px] rounded-t-2xl bg-gradient-to-r from-orange/0 via-orange to-orange/0" />

          <div className="p-4 sm:p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
              {/* icon + copy */}
              <div className="flex items-start gap-3 md:gap-4 md:flex-1">
                <div
                  className="shrink-0 grid place-items-center w-11 h-11 rounded-xl bg-white/10 border border-white/15 text-orange"
                  aria-hidden="true"
                >
                  <Cookie className="size-5" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold tracking-tight text-white">
                    We value your privacy
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                    Bharat Electrosafe uses cookies to keep our product
                    documentation, quote requests and technical resources working
                    smoothly. Necessary cookies are always on. You can accept all
                    or choose your preferences.{' '}
                    <a
                      href="#"
                      className="text-orange hover:text-orange-light underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-sm"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* actions */}
              <div className="flex flex-col gap-2 md:flex-col md:items-stretch md:w-56 lg:w-64 shrink-0">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  <ShieldCheck className="size-4" />
                  Accept all
                </button>
                <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
                  <button
                    type="button"
                    onClick={handleNecessaryOnly}
                    className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-white/25 hover:border-white/40 hover:bg-white/5 text-white text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                  >
                    Necessary only
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenPrefs}
                    className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-white/25 hover:border-white/40 hover:bg-white/5 text-white text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                  >
                    Manage preferences
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences dialog (focus-trap + Esc handled by Radix Dialog) */}
      <Dialog open={prefsOpen} onOpenChange={setPrefsOpen}>
        <DialogContent
          className="sm:max-w-xl bg-navy border-white/15 text-white"
          style={manrope}
        >
          <DialogHeader>
            <DialogTitle className="text-white text-lg">
              Manage cookie preferences
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Choose which categories of cookies you allow. Necessary cookies
              cannot be disabled — they keep the site working.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-1">
            {/* Necessary */}
            <PrefRow
              icon={<ShieldCheck className="size-4 text-orange" />}
              title="Necessary"
              description="Required for core site features: session integrity, quote form submissions, and security. Always on."
              checked
              disabled
              onChange={() => {}}
            />

            {/* Analytics */}
            <PrefRow
              icon={<BarChart3 className="size-4 text-orange" />}
              title="Analytics"
              description="Anonymised usage metrics that help us improve documentation, product pages and quote workflows."
              checked={analytics}
              onChange={(v) => setAnalytics(v)}
            />

            {/* Marketing */}
            <PrefRow
              icon={<Megaphone className="size-4 text-orange" />}
              title="Marketing"
              description="Used to measure the effectiveness of our resources and to show relevant product updates. Off by default."
              checked={marketing}
              onChange={(v) => setMarketing(v)}
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-2 pt-2">
            <button
              type="button"
              onClick={() => setPrefsOpen(false)}
              className="inline-flex items-center justify-center h-10 px-4 rounded-lg border border-white/25 hover:border-white/40 hover:bg-white/5 text-white text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSavePrefs}
              className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Save preferences
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

type PrefRowProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
};

function PrefRow({
  icon,
  title,
  description,
  checked,
  disabled,
  onChange,
}: PrefRowProps) {
  const rowId = `cookie-pref-${title.toLowerCase()}`;
  const descId = `${rowId}-desc`;
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4 rounded-xl border p-4 transition-colors',
        'border-white/15 bg-white/[0.04]',
        disabled && 'opacity-90'
      )}
    >
      <div className="flex items-start gap-3 min-w-0">
        <div
          className="shrink-0 grid place-items-center w-8 h-8 rounded-lg bg-white/10 border border-white/15"
          aria-hidden="true"
        >
          {icon}
        </div>
        <div className="min-w-0">
          <Label
            htmlFor={rowId}
            className="text-white text-sm font-semibold leading-tight"
          >
            {title}
            {disabled && (
              <span className="ml-2 text-[0.65rem] uppercase tracking-wider text-white/50 font-medium">
                Always on
              </span>
            )}
          </Label>
          <p
            id={descId}
            className="mt-1 text-xs leading-relaxed text-white/65"
          >
            {description}
          </p>
        </div>
      </div>
      <div className="shrink-0 pt-0.5">
        <Switch
          id={rowId}
          checked={checked}
          disabled={disabled}
          onCheckedChange={onChange}
          aria-describedby={descId}
          className={cn(
            'data-[state=checked]:bg-orange data-[state=unchecked]:bg-white/20',
            'h-6 w-11',
            '[&_[data-slot=switch-thumb]]:size-5',
            '[&_[data-slot=switch-thumb]]:data-[state=checked]:translate-x-[calc(100%-4px)]'
          )}
        />
      </div>
    </div>
  );
}

// Internal dev helper exported for re-triggering banner in development
// (not used in production UI but available via console if needed)
export function _resetCookieConsent() {
  clearConsent();
}
