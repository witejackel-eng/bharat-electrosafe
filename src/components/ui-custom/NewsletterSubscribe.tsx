'use client';

import { useState, useCallback, useRef } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Mail } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (status === 'loading') return;

      setStatus('loading');
      setMessage('');

      try {
        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'footer' }),
        });
        const data = await res.json();
        if (!res.ok) {
          setStatus('error');
          setMessage(data?.error || 'Could not subscribe. Please try again.');
          return;
        }
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } catch {
        setStatus('error');
        setMessage('Network error. Please try again.');
      }
    },
    [email, status]
  );

  if (status === 'success') {
    return (
      <div
        className="flex items-start gap-2 p-3 rounded-lg bg-white/5 border border-white/10"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="size-4 text-orange shrink-0 mt-0.5" />
        <div className="min-w-0">
          <p
            className="text-xs font-medium text-white"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Subscribed.
          </p>
          <p
            className="text-xs text-white/60 mt-0.5 leading-relaxed"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            {message}
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              setMessage('');
              inputRef.current?.focus();
            }}
            className="text-xs text-orange hover:text-orange-light mt-2 underline underline-offset-2"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Subscribe another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-2">
      <label
        htmlFor="newsletter-email"
        className="text-xs font-medium text-white/85"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        Technical updates from Bharat Electrosafe
      </label>
      <div className="relative flex items-center">
        <Mail
          className="absolute left-3 size-4 text-white/60 pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="you@company.in"
          disabled={status === 'loading'}
          aria-label="Email address"
          aria-invalid={status === 'error'}
          className="w-full h-10 pl-9 pr-12 rounded-lg bg-white/5 border border-white/25 text-white placeholder:text-white/55 text-sm focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-colors disabled:opacity-60"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        />
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          aria-label="Subscribe"
          className="absolute right-1.5 inline-flex items-center justify-center w-8 h-7 rounded-md bg-orange hover:bg-orange-hover text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <ArrowRight className="size-3.5" />
          )}
        </button>
      </div>
      {status === 'error' && (
        <p
          className="text-xs text-orange-light"
          role="alert"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          {message}
        </p>
      )}
      <p
        className="text-[0.7rem] text-white/55 leading-relaxed"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        Quarterly cadence. Unsubscribe anytime.
      </p>
    </form>
  );
}
