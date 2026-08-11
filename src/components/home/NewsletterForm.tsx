'use client';

import { useState } from 'react';
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { cn } from '@/lib/utils';

/**
 * NewsletterForm — client island for the homepage newsletter section.
 *
 * Posts `{ email }` to `/api/newsletter` and renders inline idle / submitting
 * / success / error states. Server-side validation is authoritative; the
 * client-side check is progressive enhancement only.
 *
 * Accessibility:
 *   - `<label>` is programmatically associated via `htmlFor` / `id`.
 *   - Error message is wired with `aria-describedby` + `role="alert"`.
 *   - Success message uses `role="status"` + `aria-live="polite"`.
 *   - Submit button exposes `aria-busy` during submission.
 *   - Touch target ≥ 44px (input h-12, button min-h-[44px] via PrimaryButton).
 */

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState<string>('');
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  function resetError() {
    if (status === 'error') {
      setStatus('idle');
      setMessage('');
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    const trimmed = email.trim();
    if (!trimmed || !EMAIL_REGEX.test(trimmed)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setMessage('');
    setAlreadySubscribed(false);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        alreadySubscribed?: boolean;
        error?: string;
      };

      if (res.ok && data.success) {
        setStatus('success');
        setAlreadySubscribed(Boolean(data.alreadySubscribed));
        setEmail('');
        setMessage(
          data.alreadySubscribed
            ? "You're already on our list — thank you for your interest."
            : "You're subscribed. We'll send product updates and technical bulletins only.",
        );
        return;
      }

      setStatus('error');
      setMessage(
        data.error ||
          (res.status === 429
            ? 'Too many attempts. Please try again in a few minutes.'
            : 'Something went wrong. Please try again.'),
      );
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  }

  // ─── Success state — replace the form with an inline confirmation ───
  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-start gap-3 rounded-xl border border-be-yellow-400/40 bg-be-navy-850/60 p-5"
      >
        <CheckCircle2
          className="size-5 shrink-0 text-be-yellow-400"
          aria-hidden="true"
          focusable="false"
        />
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold text-white">
            {alreadySubscribed ? 'Already subscribed' : 'Subscription confirmed'}
          </p>
          <p className="text-sm text-be-grey-400 leading-relaxed">{message}</p>
        </div>
      </div>
    );
  }

  const isError = status === 'error';

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="newsletter-email"
          className="text-sm font-medium text-white"
        >
          Email address
          <span className="sr-only"> (required)</span>
        </label>

        {/* Input wrapper — hosts the absolutely-positioned Mail icon */}
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-be-grey-650"
            aria-hidden="true"
            focusable="false"
          />
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              resetError();
            }}
            disabled={status === 'submitting'}
            placeholder="you@company.com"
            aria-required="true"
            aria-invalid={isError || undefined}
            aria-describedby={isError ? 'newsletter-error' : 'newsletter-help'}
            className={cn(
              // Override shadcn defaults for high-contrast on navy background:
              // white fill, charcoal text, taller touch target, rounded-xl,
              // room for the icon prefix.
              'h-12 rounded-xl border-white/15 bg-white pl-10 pr-4 text-base text-be-charcoal-950 placeholder:text-be-grey-400',
              'focus-visible:border-be-yellow-500 focus-visible:ring-be-yellow-500/40',
              'disabled:cursor-not-allowed disabled:opacity-60',
              isError && 'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/40',
            )}
          />
        </div>
      </div>

      <PrimaryButton
        type="submit"
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting'}
        aria-label="Subscribe to the Bharat Electrosafe newsletter"
        className="w-full sm:w-auto"
      >
        {status === 'submitting' ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" focusable="false" />
            <span>Subscribing…</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <span>Subscribe</span>
            <Send className="size-4" aria-hidden="true" focusable="false" />
          </span>
        )}
      </PrimaryButton>

      {isError && (
        <p
          id="newsletter-error"
          role="alert"
          className="flex items-start gap-1.5 text-sm text-red-300"
        >
          <AlertCircle
            className="mt-0.5 size-4 shrink-0"
            aria-hidden="true"
            focusable="false"
          />
          <span>{message}</span>
        </p>
      )}

      <p id="newsletter-help" className="text-xs text-be-grey-400 leading-relaxed">
        We respect your privacy. Read our privacy policy.
      </p>
    </form>
  );
}
