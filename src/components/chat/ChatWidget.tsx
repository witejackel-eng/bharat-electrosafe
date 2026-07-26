'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useSyncExternalStore,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import { MessageCircle, X, ArrowUp, RotateCcw } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const INITIAL_GREETING: Message = {
  id: 'greeting',
  role: 'assistant',
  content:
    "Welcome to Bharat Electrosafe! 👋 I can help you with product specifications, insulation classes, IS 15652 standards, or guide you to the right solution for your project. What would you like to know?",
  timestamp: new Date(),
};

const SUGGESTIONS: readonly string[] = [
  'Class A vs B vs C',
  'IS 15652 specs',
  'Request a quote',
  'Talk to human',
] as const;

const MAX_INPUT_LENGTH = 500;
const TEXTAREA_MAX_HEIGHT = 120;

/** Format a Date as HH:MM 24-hour IST. */
function formatTime(date: Date): string {
  try {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    });
  } catch {
    // Fallback if Intl timeZone unsupported
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  }
}

// Shared external store for cookie banner visibility.
const COOKIE_STORAGE_KEY = 'be-cookie-consent';
const cookieListeners = new Set<() => void>();
let cookieCached = false;
let cookieInit = false;

function initCookieStore() {
  if (cookieInit || typeof window === 'undefined') return;
  cookieInit = true;
  try {
    const consent = window.localStorage.getItem(COOKIE_STORAGE_KEY);
    cookieCached = !consent;
  } catch {
    cookieCached = false;
  }
  window.addEventListener('be:cookie-visible', (e: Event) => {
    const ce = e as CustomEvent<{ visible: boolean }>;
    const next = Boolean(ce.detail?.visible);
    if (next !== cookieCached) {
      cookieCached = next;
      cookieListeners.forEach((l) => l());
    }
  });
}
function subscribeCookie(cb: () => void) {
  initCookieStore();
  cookieListeners.add(cb);
  return () => {
    cookieListeners.delete(cb);
  };
}
function getCookieClient() {
  initCookieStore();
  return cookieCached;
}
function getCookieServer() {
  return false;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const cookieVisible = useSyncExternalStore(
    subscribeCookie,
    getCookieClient,
    getCookieServer
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Auto-resize the textarea: reset to auto, then clamp scrollHeight to cap.
  const adjustTextareaHeight = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, TEXTAREA_MAX_HEIGHT)}px`;
  }, []);

  // Re-measure whenever the input value changes (typing, clearing, chip send).
  useEffect(() => {
    adjustTextareaHeight();
  }, [input, adjustTextareaHeight]);

  // Shift up when the cookie banner is visible (banner is ~6rem tall with padding).
  const bottomOffset = cookieVisible ? '7.5rem' : '1.5rem';

  // Quick-reply chips are visible only when no user message has been sent yet.
  const hasUserMessage = messages.some((m) => m.role === 'user');

  const sendMessage = async (overrideMessage?: string) => {
    const trimmed = (overrideMessage ?? input).trim();
    if (!trimmed || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Build conversation history for context (exclude greeting id-based)
      const history = messages
        .filter((m) => m.id !== 'greeting')
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      const data = await res.json();
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response || 'I apologize, I could not process your request. Please try again or contact our technical sales team at +91 123 456 7890.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'I apologize, I encountered a connection issue. Please try again or contact our technical sales team at +91 123 456 7890.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const resetConversation = () => {
    // Fresh greeting with a new timestamp so the chip row reappears.
    setMessages([{ ...INITIAL_GREETING, id: 'greeting', timestamp: new Date() }]);
    setInput('');
    setLoading(false);
    // Reset textarea height immediately.
    if (inputRef.current) inputRef.current.style.height = 'auto';
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter inserts a newline (default behavior).
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const showCharCounter = input.length > 100;

  return (
    <>
      {/* Floating chat bubble button */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open chat assistant"
          className="fixed left-6 z-50 w-14 h-14 rounded-full bg-orange hover:bg-orange-hover text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 group"
          style={{ fontFamily: "'Manrope', sans-serif", bottom: bottomOffset }}
        >
          {/* Pulsing ring animation */}
          <span
            className="absolute inset-0 rounded-full border-2 border-orange opacity-0 group-hover:opacity-100"
            style={{
              animation: open ? 'none' : 'chatPulseRing 2s ease-out infinite',
            }}
          />
          <MessageCircle className="size-6" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed left-6 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] rounded-2xl shadow-2xl border border-border/60 overflow-hidden flex flex-col"
          style={{
            fontFamily: "'Manrope', sans-serif",
            animation: 'chatPanelIn 0.3s ease-out forwards',
            bottom: bottomOffset,
          }}
        >
          {/* Header */}
          <div className="bg-navy text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center text-xs font-bold text-orange">
                BE
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-tight">
                  Bharat Electrosafe Assistant
                </h3>
                <span className="inline-flex items-center gap-1 text-[0.6rem] text-steel-light bg-white/10 rounded px-1.5 py-0.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                  AI-powered
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetConversation}
                aria-label="Start new conversation"
                title="New conversation"
                className="size-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <RotateCcw className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto bg-ivory-light dark:bg-background px-4 py-4 space-y-3 min-h-0">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
                style={{
                  animation: 'chatMsgIn 0.25s ease-out forwards',
                }}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-orange/20 flex items-center justify-center shrink-0 text-[0.55rem] font-bold text-orange">
                    BE
                  </div>
                )}
                <div
                  className={`flex flex-col max-w-[80%] ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`px-3 py-2 text-sm leading-relaxed ${
                      msg.role === 'assistant'
                        ? 'bg-white dark:bg-card rounded-xl rounded-bl-sm text-navy dark:text-foreground'
                        : 'bg-orange text-white rounded-xl rounded-br-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <span
                    className={`text-[0.6rem] text-steel-light mt-1 ${
                      msg.role === 'user' ? 'text-right' : 'text-left'
                    }`}
                    aria-label={`Sent at ${formatTime(msg.timestamp)}`}
                  >
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {/* Loading / typing indicator */}
            {loading && (
              <div
                className="flex items-end gap-2 justify-start"
                style={{ animation: 'chatMsgIn 0.25s ease-out forwards' }}
              >
                <div className="w-6 h-6 rounded-full bg-orange/20 flex items-center justify-center shrink-0 text-[0.55rem] font-bold text-orange">
                  BE
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[0.65rem] text-steel-light italic mb-1">
                    Bharat Electrosafe Assistant is typing…
                  </span>
                  <div className="bg-orange-soft/30 dark:bg-orange-soft/40 rounded-xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2 h-2 rounded-full bg-orange/60" style={{ animation: 'chatBounce 1.4s ease-in-out infinite', animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-orange/60" style={{ animation: 'chatBounce 1.4s ease-in-out infinite', animationDelay: '200ms' }} />
                      <span className="w-2 h-2 rounded-full bg-orange/60" style={{ animation: 'chatBounce 1.4s ease-in-out infinite', animationDelay: '400ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick-reply suggestion chips (only before first user message) */}
          {!hasUserMessage && (
            <div className="flex flex-wrap gap-2 px-3 py-2 bg-white dark:bg-card border-t border-border/60 shrink-0">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => void sendMessage(suggestion)}
                  disabled={loading}
                  aria-label={`Suggested question: ${suggestion}`}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-orange-soft text-orange border border-orange/20 hover:bg-orange hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div className="bg-white dark:bg-card border-t border-border/60 px-3 py-3 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void sendMessage();
              }}
              className="flex items-end gap-2"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask about products, standards, specifications..."
                disabled={loading}
                maxLength={MAX_INPUT_LENGTH}
                aria-label="Type your message"
                className="flex-1 rounded-lg border border-border/80 bg-background px-3 py-2 text-sm text-foreground placeholder:text-steel-light focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/30 disabled:opacity-50 resize-none max-h-[120px] min-h-[2.5rem] leading-relaxed"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="w-10 h-10 rounded-lg bg-orange hover:bg-orange-hover text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 self-end"
              >
                <ArrowUp className="size-5" />
              </button>
            </form>
            {showCharCounter && (
              <p className="text-[0.6rem] text-steel-light text-right mt-1">
                {input.length} / {MAX_INPUT_LENGTH}
              </p>
            )}
            <p className="text-xs text-steel mt-1.5 text-center">
              AI assistant · responses are informational
            </p>
          </div>
        </div>
      )}

      {/* Inline style for animations */}
      <style jsx>{`
        @keyframes chatPulseRing {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        @keyframes chatPanelIn {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes chatMsgIn {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes chatBounce {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.4;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          :global([style*='chatPulseRing']),
          :global([style*='chatPanelIn']),
          :global([style*='chatMsgIn']),
          :global([style*='chatBounce']) {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
