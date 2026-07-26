'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, ArrowUp, ShieldCheck, Clock } from 'lucide-react';

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

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const sendMessage = async () => {
    const trimmed = input.trim();
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

  return (
    <>
      {/* Floating chat bubble button */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open chat assistant"
          className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-orange hover:bg-orange-hover text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 group"
          style={{ fontFamily: "'Manrope', sans-serif" }}
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
          className="fixed bottom-6 left-6 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] rounded-2xl shadow-2xl border border-border/60 overflow-hidden flex flex-col"
          style={{
            fontFamily: "'Manrope', sans-serif",
            animation: 'chatPanelIn 0.3s ease-out forwards',
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
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X className="size-4" />
            </button>
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
                  className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'bg-white dark:bg-card rounded-xl rounded-bl-sm text-navy dark:text-foreground'
                      : 'bg-orange text-white rounded-xl rounded-br-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex items-end gap-2 justify-start" style={{ animation: 'chatMsgIn 0.25s ease-out forwards' }}>
                <div className="w-6 h-6 rounded-full bg-orange/20 flex items-center justify-center shrink-0 text-[0.55rem] font-bold text-orange">
                  BE
                </div>
                <div className="bg-white dark:bg-card rounded-xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2 h-2 rounded-full bg-orange/60" style={{ animation: 'chatBounce 1.4s ease-in-out infinite', animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-orange/60" style={{ animation: 'chatBounce 1.4s ease-in-out infinite', animationDelay: '200ms' }} />
                    <span className="w-2 h-2 rounded-full bg-orange/60" style={{ animation: 'chatBounce 1.4s ease-in-out infinite', animationDelay: '400ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="bg-white dark:bg-card border-t border-border/60 px-3 py-3 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about products, standards, specifications..."
                disabled={loading}
                className="flex-1 h-10 rounded-lg border border-border/80 bg-background px-3 text-sm text-foreground placeholder:text-steel-light focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/30 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="w-10 h-10 rounded-lg bg-orange hover:bg-orange-hover text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <ArrowUp className="size-5" />
              </button>
            </form>
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
      `}</style>
    </>
  );
}
