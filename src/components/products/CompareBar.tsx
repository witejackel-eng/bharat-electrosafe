'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { X, GitCompare, Trash2, ArrowRight, Check, Link2 } from 'lucide-react';
import { useCompare } from './CompareContext';
import { CompareModal } from './CompareModal';
import { getProductBySlug } from '@/data/products';

/**
 * CompareBar — sticky bottom bar that appears when at least one product is
 * selected for comparison. Self-contained: it manages its own modal open
 * state and derives the selected product names from the product registry, so
 * it can be dropped into the root layout without props.
 *
 * Layout:
 *   • Fixed to the bottom of the viewport. On mobile it sits ABOVE the
 *     MobileStickyCTA (bottom-14 lg:bottom-0) so the two never overlap; on
 *     desktop the CTA is hidden so the bar sits flush to the bottom.
 *   • z-30 — below the modal (z-50) but above page content.
 *
 * Contents:
 *   • "Comparing N of 3" label with the GitCompare icon
 *   • One chip per selected product (name + remove X)
 *   • A "Share" button (copies the ?compare= URL — only when ≥ 2 selected)
 *   • A "Clear" button (Trash2 icon)
 *   • A "Compare now" button that opens the CompareModal
 *
 * Behaviour:
 *   • Slides up from the bottom when count > 0; slides down on clear.
 *   • Share button copies the current URL (with ?compare= param) to the
 *     clipboard and shows a "Copied!" confirmation for 2 seconds.
 *   • Respects reduced-motion via CSS (motion-reduce:transition-none).
 *
 * Accessibility:
 *   • role="region" with aria-label
 *   • Each remove button has aria-label
 *   • "Compare now" opens a dialog — aria-haspopup="dialog"
 *   • Share button has aria-live="polite" status region for confirmation
 */
export function CompareBar() {
  const { selected, count, clear, removeFromCompare, max, shareUrl } = useCompare();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Defer mount-in until after first paint so the slide-up transition runs.
  // rAF callback is async so it satisfies the set-state-in-effect lint rule.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reset copied state via a timer (rAF-deferred so no set-state-in-effect).
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  // Resolve product names from the registry so the chips always show the
  // canonical product name (and degrade gracefully to the raw slug).
  const selectedNames = useMemo(() => {
    const map: Record<string, string> = {};
    for (const slug of selected) {
      const product = getProductBySlug(slug);
      map[slug] = product?.name ?? slug;
    }
    return map;
  }, [selected]);

  const handleShare = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Fallback: select the URL using a temporary input
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand('copy');
      } catch {
        // ignore — clipboard not available
      }
      document.body.removeChild(input);
    }
    setCopied(true);
  }, [shareUrl]);

  const visible = mounted && count > 0;

  return (
    <>
      <div
        role="region"
        aria-label="Product comparison tray"
        className={cnBarWrap(visible)}
        aria-hidden={!visible}
      >
        <div className="border-t border-be-yellow-500/30 bg-be-navy-900/95 backdrop-blur-md shadow-[0_-8px_24px_-12px_rgba(0,26,67,0.5)]">
          <div className="container-site page-horizontal-padding py-3">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Label */}
              <div className="flex items-center gap-2 text-be-white shrink-0">
                <GitCompare
                  className="size-4 text-be-brand-yellow"
                  aria-hidden="true"
                  focusable="false"
                />
                <span className="text-sm font-semibold tabular-nums">
                  Comparing {count} of {max}
                </span>
              </div>

              {/* Selected product chips */}
              <div className="flex items-center gap-2 flex-wrap min-w-0 flex-1">
                {selected.map((slug) => (
                  <span
                    key={slug}
                    className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-sm text-be-white max-w-[14rem]"
                  >
                    <span className="truncate">{selectedNames[slug] ?? slug}</span>
                    <button
                      type="button"
                      onClick={() => removeFromCompare(slug)}
                      aria-label={`Remove ${selectedNames[slug] ?? slug} from comparison`}
                      className="rounded-sm p-0.5 text-white/60 hover:text-be-brand-yellow hover:bg-white/10 transition-colors focus-ring"
                    >
                      <X className="size-3.5" aria-hidden="true" focusable="false" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Share button — copies URL with ?compare= param */}
                {count >= 2 && (
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Copy comparison link to clipboard"
                    className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:text-be-brand-yellow hover:bg-white/10 transition-colors focus-ring"
                  >
                    {copied ? (
                      <>
                        <Check
                          className="size-4 text-be-brand-yellow"
                          aria-hidden="true"
                          focusable="false"
                        />
                        <span aria-live="polite">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="size-4" aria-hidden="true" focusable="false" />
                        <span className="hidden sm:inline">Share</span>
                      </>
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={clear}
                  disabled={!visible}
                  tabIndex={visible ? 0 : -1}
                  aria-label="Clear all compared products"
                  className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:text-be-brand-yellow transition-colors focus-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 className="size-4" aria-hidden="true" focusable="false" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  aria-haspopup="dialog"
                  disabled={count < 2}
                  className={cnCompareBtn(count >= 2)}
                >
                  Compare now
                  <ArrowRight className="size-4" aria-hidden="true" focusable="false" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The modal is rendered as a sibling so it overlays the whole page. */}
      <CompareModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}

function cnBarWrap(visible: boolean) {
  return [
    // On mobile the MobileStickyCTA (lg:hidden, ~56px tall) lives at the
    // bottom — sit the compare bar above it (bottom-14). On desktop there is
    // no CTA so the bar sits flush to the bottom (lg:bottom-0).
    'fixed inset-x-0 bottom-14 lg:bottom-0 z-30 transition-transform duration-300 motion-reduce:transition-none',
    visible ? 'translate-y-0' : 'translate-y-full pointer-events-none',
  ].join(' ');
}

function cnCompareBtn(enabled: boolean) {
  return [
    'be-premium-sheen inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-bold transition-colors focus-ring',
    enabled
      ? 'bg-be-brand-yellow text-be-charcoal-950 hover:bg-be-yellow-400'
      : 'bg-white/10 text-white/40 cursor-not-allowed',
  ].join(' ');
}
