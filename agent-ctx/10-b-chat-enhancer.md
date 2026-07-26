# Task 10-b — chat-enhancer

## Task
Enhance the existing Bharat Electrosafe ChatWidget (`/home/z/my-project/src/components/chat/ChatWidget.tsx`) with 6 features: quick-reply suggestion chips, enhanced typing indicator, message timestamps, reset/clear conversation button, character counter, and auto-resize textarea.

## Files read for context
- `/home/z/my-project/worklog.md` — full project history (Tasks 1–9). ChatWidget was originally built in Task 1 (AI chat widget + hero styling), refined in Task 9 (cookie-banner-aware bottomOffset via useSyncExternalStore).
- `/home/z/my-project/src/components/chat/ChatWidget.tsx` (328 lines, pre-edit)
- `/home/z/my-project/src/app/api/chat/route.ts` (POST endpoint using z-ai-web-dev-sdk LLM skill — UNCHANGED)
- `/home/z/my-project/src/app/globals.css` — confirmed brand tokens: `--color-orange-soft` (rgba 0.08 light / 0.16 dark), `--color-steel-light` (#9CA3AF light / #6B7280 dark), `--color-orange` (#E8611A), `--color-orange-hover` (#D45510)

## Edits made to ChatWidget.tsx

### Imports
- Added `RotateCcw` from `lucide-react`
- Added `type ChangeEvent, type KeyboardEvent` from `react` (for typed textarea handlers — no React default import needed with new JSX transform)

### Module-level constants
- `SUGGESTIONS` — readonly 4-string array: `'Class A vs B vs C'`, `'IS 15652 specs'`, `'Request a quote'`, `'Talk to human'`
- `MAX_INPUT_LENGTH = 500`
- `TEXTAREA_MAX_HEIGHT = 120`

### Helpers
- `formatTime(date: Date): string` — uses `toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:false, timeZone:'Asia/Kolkata' })` with try/catch fallback to manual `getHours/getMinutes` padding for environments without Intl timeZone support

### Refactor: sendMessage
- Signature changed from `sendMessage()` to `sendMessage(overrideMessage?: string)`
- Body uses `const trimmed = (overrideMessage ?? input).trim();` so chip clicks bypass the input state
- All other logic (history collection, fetch, error handling, assistant/error message creation) unchanged

### New: resetConversation
- Replaces `messages` with a fresh `[{ ...INITIAL_GREETING, id: 'greeting', timestamp: new Date() }]` (new timestamp)
- Clears `input`, sets `loading` false, resets textarea height
- Silent — no toast (per spec, action is reversible by typing again)

### New: textarea auto-resize
- `adjustTextareaHeight()` useCallback: `el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 120) + 'px'`
- Wired to a `useEffect` on `[input, adjustTextareaHeight]` so it runs on every keystroke AND after the input is cleared post-send (the original `onChange` approach would miss the post-send reset because `setInput('')` doesn't fire onChange)

### New: handleKeyDown
- `if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void sendMessage(); }` — Enter sends, Shift+Enter inserts newline via default behavior

### Computed: hasUserMessage
- `messages.some(m => m.role === 'user')` — gates the chip row visibility

### JSX changes

**Header** — wrapped close button in a `flex items-center gap-1` container and inserted the RotateCcw reset button BEFORE the close button:
```tsx
<button onClick={resetConversation} aria-label="Start new conversation" title="New conversation"
  className="size-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
  <RotateCcw className="size-3.5" />
</button>
```

**Message bubbles** — restructured each row to wrap the bubble + timestamp in a flex-col:
```tsx
<div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
  <div className={bubbleClasses}>{msg.content}</div>
  <span className={`text-[0.6rem] text-steel-light mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
    aria-label={`Sent at ${formatTime(msg.timestamp)}`}>
    {formatTime(msg.timestamp)}
  </span>
</div>
```

**Typing indicator** — wrapped dots bubble in flex-col with italic label above, replaced `bg-white dark:bg-card` with `bg-orange-soft/30 dark:bg-orange-soft/40`:
```tsx
<div className="flex flex-col items-start">
  <span className="text-[0.65rem] text-steel-light italic mb-1">Bharat Electrosafe Assistant is typing…</span>
  <div className="bg-orange-soft/30 dark:bg-orange-soft/40 rounded-xl rounded-bl-sm px-4 py-3">
    {/* 3 dots with animationDelay 0ms/200ms/400ms — verified preserved */}
  </div>
</div>
```

**Quick-reply chips** — rendered ABOVE the input area (BELOW messages) only when `!hasUserMessage`:
```tsx
{!hasUserMessage && (
  <div className="flex flex-wrap gap-2 px-3 py-2 bg-white dark:bg-card border-t border-border/60 shrink-0">
    {SUGGESTIONS.map((suggestion) => (
      <button key={suggestion} type="button" onClick={() => void sendMessage(suggestion)}
        disabled={loading} aria-label={`Suggested question: ${suggestion}`}
        className="text-xs font-medium px-3 py-1.5 rounded-full bg-orange-soft text-orange border border-orange/20 hover:bg-orange hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
        {suggestion}
      </button>
    ))}
  </div>
)}
```

**Input → textarea** — replaced `<input type="text" h-10>` with `<textarea rows={1}>`. Form layout changed from `items-center` to `items-end` (so send button stays bottom-anchored as textarea grows); send button gets `self-end`. Textarea classes: `flex-1 rounded-lg border border-border/80 bg-background px-3 py-2 text-sm text-foreground placeholder:text-steel-light focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/30 disabled:opacity-50 resize-none max-h-[120px] min-h-[2.5rem] leading-relaxed` with `maxLength={500}` and `aria-label="Type your message"`.

**Character counter** — between form and footer:
```tsx
{showCharCounter && (
  <p className="text-[0.6rem] text-steel-light text-right mt-1">{input.length} / {MAX_INPUT_LENGTH}</p>
)}
```
where `showCharCounter = input.length > 100`.

**Reduced motion** — appended to `<style jsx>`:
```css
@media (prefers-reduced-motion: reduce) {
  :global([style*='chatPulseRing']),
  :global([style*='chatPanelIn']),
  :global([style*='chatMsgIn']),
  :global([style*='chatBounce']) {
    animation: none !important;
  }
}
```
Uses `:global()` so styled-jsx doesn't scope the attribute selectors; matches inline-styled elements whose `style` attribute string contains the keyframe name.

## Verification
- `cd /home/z/my-project && bun run lint` → **0 errors, 1 pre-existing warning** (Manrope font in layout.tsx — unrelated to this task)
- `bunx tsc --noEmit` filtered for `chat/` → no errors in ChatWidget.tsx (one pre-existing TS error in `src/app/api/chat/route.ts:12` from a prior task, not touched here)
- `dev.log` → server stable, `GET / 200`, clean compiles, no runtime errors after the edit

## Notes for downstream agents
- The `sendMessage(overrideMessage?)` signature is now part of the public API of this component — future callers can pass a string to bypass the input state
- The chip row disappears after the first user message and reappears after `resetConversation()` because both paths funnel through `setMessages` which updates `hasUserMessage`
- The textarea auto-resize relies on the `useEffect([input, adjustTextareaHeight])` — do NOT remove this or replace with an `onChange`-only approach (the post-send clear would not trigger a re-measure)
- The `:global([style*='…'])` attribute-selector pattern for reduced-motion depends on the inline `style` attribute string containing the keyframe name; if anyone refactors the animations to a Tailwind class or to a CSS module, the reduced-motion selector will need to be updated accordingly
