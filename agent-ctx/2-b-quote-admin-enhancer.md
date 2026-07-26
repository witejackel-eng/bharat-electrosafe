# Task 2-b — Quote Admin Enhancer (CSV export + status workflow)

## Task
Enhance the existing `QuoteAdminDialog.tsx` with:
1. CSV Export button (exports filtered list, UTF-8 BOM, proper escaping, toast)
2. Per-quote status workflow (`new`/`reviewed`/`quoted`/`archived`) with localStorage persistence via `useSyncExternalStore`
3. Status filter chips above the table (All / New / Reviewed / Quoted / Archived)
4. Updated stats row with status counts

## Files inspected (prior work)
- `/home/z/my-project/worklog.md` — homepage fully built across tasks 1–7; Task 8 (quote-admin-builder) created `QuoteAdminDialog.tsx`, `QuoteAdminProvider.tsx`, `QuoteAdminTrigger.tsx` and wired them into Header + MobileDrawer + page.tsx.
- `/home/z/my-project/src/components/quote/QuoteAdminDialog.tsx` — existing dashboard with Refresh button, class filter Select, search input, stats cards (Total/Class A/B/C), table with 7 columns, expandable rows, copy-email action.
- `/home/z/my-project/src/components/ui-custom/CookieConsent.tsx` — reference for `useSyncExternalStore` + localStorage pattern with cached raw/parsed to avoid infinite re-renders.
- `/home/z/my-project/src/app/api/quote/route.ts` — confirms QuoteRecord fields (id, submittedAt, name, email, phone, company?, productSystem, productClass?, operatingVoltage?, dimensions?, quantity?, deliveryLocation?, message?).
- `/home/z/my-project/src/components/ui/dropdown-menu.tsx` — Radix-based dropdown, keyboard accessible out of the box.
- `/home/z/my-project/src/hooks/use-toast.ts` — existing `useToast()` hook.
- `/home/z/my-project/src/app/globals.css` — confirmed `bg-steel`, `text-navy`, `bg-orange`, `bg-muted`, `bg-emerald-600` all resolve (Tailwind 4 + brand CSS vars; dark mode overrides `text-steel` → muted-foreground and `bg-muted` → navy-light).

## Files created

### `/home/z/my-project/src/lib/quote-status-store.ts`
- `'use client'` directive (uses `useSyncExternalStore`).
- `QuoteStatus` type = `'new' | 'reviewed' | 'quoted' | 'archived'`.
- `QuoteStatusMap = Record<string, QuoteStatus>`.
- `QUOTE_STATUS_ORDER` (readonly array) + `QUOTE_STATUS_LABELS` (Record mapping to display names).
- Internal store: `listeners` Set, `cachedRaw` + `cachedParsed` memoization (so `getSnapshot` returns stable reference — required by `useSyncExternalStore`).
- `subscribe(cb)` — adds listener, attaches `storage` event listener filtered by `STORAGE_KEY = 'be-quote-status'`.
- `getSnapshot()` — reads `localStorage`, re-parses only when raw string changes.
- `getServerSnapshot()` — returns `{}` (SSR-safe).
- `setQuoteStatus(quoteId, status)` — writes to localStorage, updates cache directly, notifies listeners. Skips work if no change.
- Public hooks: `useQuoteStatuses()` (returns full map), `useQuoteStatus(quoteId)` (returns single status, default `'new'`).
- `readQuoteStatus(quoteId)` — imperative non-reactive read for one-shot uses.

### `/home/z/my-project/src/lib/csv-export.ts`
- `CsvQuoteRow` interface with 14 fields (Reference, Submitted At, Name, Company, Email, Phone, Product System, Class, Voltage, Quantity, Dimensions, Delivery Location, Message, Status).
- `CSV_HEADERS` (readonly) + `COLUMN_ORDER` (readonly keys of `CsvQuoteRow`).
- `escapeCell(value)` — wraps in double quotes, doubles internal quotes, normalizes newlines to spaces (RFC 4180 compliant).
- `buildCsv(rows)` — emits header line + body lines joined by `\r\n`.
- `todayDateStamp()` — formats `YYYY-MM-DD` in local TZ.
- `downloadCsv(rows)` — prepends UTF-8 BOM (`\uFEFF`) so Excel opens ₹ etc. correctly, creates Blob, triggers `<a download>` click, revokes URL after 1 second. Returns filename `bharat-electrosafe-quotes-YYYY-MM-DD.csv`.

## Files modified

### `/home/z/my-project/src/components/quote/QuoteAdminDialog.tsx`

**Imports changed**
- Removed: `Badge` (no longer used).
- Added: `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuTrigger` from `@/components/ui/dropdown-menu`.
- Added: `cn` from `@/lib/utils`.
- Added: `Download`, `Check` from lucide-react.
- Added: `QUOTE_STATUS_LABELS`, `QUOTE_STATUS_ORDER`, `setQuoteStatus`, `useQuoteStatuses`, `type QuoteStatus`, `type QuoteStatusMap` from `@/lib/quote-status-store`.
- Added: `downloadCsv`, `type CsvQuoteRow` from `@/lib/csv-export`.

**New types/constants**
- `StatusFilterValue = 'all' | QuoteStatus`.
- `STATUS_FILTER_OPTIONS` array (All / New / Reviewed / Quoted / Archived with labels).
- `statusBadgeClasses(status)` helper — returns Tailwind class string for the badge trigger:
  - `new`: `bg-orange text-white`
  - `reviewed`: `bg-steel/20 text-navy border border-steel/30`
  - `quoted`: `bg-emerald-600 text-white`
  - `archived`: `bg-muted text-steel`
- `statusDotClasses(status)` helper — returns Tailwind class string for the small coloured dot inside the dropdown menu (orange/steel/emerald-600/steel-light).

**StatCard extended**
- `accent` prop now accepts `'navy' | 'orange' | 'steel' | 'emerald' | 'muted'`.
- Dot color computed via a `dotClass` variable for clarity.

**Main component state + handlers**
- New state: `statusFilter` (default `'all'`).
- New reactive read: `const statusMap = useQuoteStatuses()`.
- `filteredQuotes` now also filters by `statusFilter` (compares `statusMap[rec.id] ?? 'new'` against the active filter).
- `counts` memo extended with `newCount`, `reviewedCount`, `quotedCount`, `archivedCount` (loop over `quotes`, tally by status from `statusMap`).
- New `handleStatusChange(quoteId, next)` callback — calls `setQuoteStatus()`, shows toast `Marked as {status}` with description `Quote {id} updated.`
- New `handleExportCsv()` callback — maps `filteredQuotes` to `CsvQuoteRow[]` (resolves product system name, class label, absolute timestamp, status label), calls `downloadCsv()`, shows toast `Exported N quote(s) to CSV`. Early-returns when `filteredQuotes.length === 0`.
- `handleOpenChange` also resets `statusFilter` to `'all'` on close.

**Toolbar UI**
- Added an "Export CSV" outline button between Refresh and the class Select. Uses `Download` icon. `disabled` when `status === 'loading' || filteredQuotes.length === 0`. `aria-label="Export filtered quotes as CSV"`.
- Stats grid split into two rows (each `grid-cols-2 md:grid-cols-4 gap-2.5`):
  - Row 1 (existing): Total requests / Class A / Class B / Class C.
  - Row 2 (new): New / Reviewed / Quoted / Archived — dots colored to match badge colors (orange/steel/emerald-600/steel-light).
- Status filter chips row (`flex flex-wrap items-center gap-1.5`) with "Status" eyebrow label + 5 pill buttons. Active chip = `bg-navy text-white`; inactive = white/70 with border. Each chip shows the live count for that status in a small pill on the right. `aria-pressed={active}` for accessibility.

**Row rendering**
- `filteredQuotes.map(...)` now computes `currentStatus = statusMap[rec.id] ?? 'new'` and passes it to `<QuoteRow>` along with `onStatusChange={(next) => handleStatusChange(rec.id, next)}`.
- `QuoteRow` props extended: `currentStatus: QuoteStatus`, `onStatusChange: (next: QuoteStatus) => void`.
- The Status `<td>` now renders a `DropdownMenu` instead of the static `<Badge>NEW</Badge>`:
  - Trigger = small pill button (`rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase`) styled via `statusBadgeClasses(currentStatus)`, with a `ChevronDown` that rotates 180° on `data-[state=open]`. `aria-haspopup="menu"` + descriptive `aria-label`.
  - Content = `DropdownMenuLabel` "Set status" + separator + 4 `DropdownMenuItem`s (one per status), each with a colored dot (`statusDotClasses`), the label, and a `Check` icon if it's the current status. `onSelect` calls `onStatusChange(s)`.
  - Radix dropdown is keyboard accessible by default (Enter/Space to open, arrow keys to navigate, Enter to select, Esc to close).

## Verification

### Lint
- `bun run lint` → **0 errors, 1 pre-existing warning** (`@next/next/no-page-custom-font` on `src/app/layout.tsx`, unrelated to this task — same warning since Task 1).

### TypeScript
- `bunx tsc --noEmit -p tsconfig.json` filtered for the 3 files touched → no errors reported for `quote-status-store`, `csv-export`, or `QuoteAdminDialog`.

### Dev server
- `GET /` → 200 (no compile errors after edits).
- `POST /api/quote` → 200 (test quote submission still works).
- Dev log shows clean `✓ Compiled in XXXms` entries, no runtime errors attributed to my files.

## Notes
- The `useSyncExternalStore` pattern with `cachedRaw`/`cachedParsed` memoization is critical: returning a fresh object on every `getSnapshot` call would cause React to detect an infinite render loop.
- The CSV `submittedAt` column uses `formatAbsoluteTime(iso)` (e.g. "12 Mar 2025, 14:30") for spreadsheet readability rather than raw ISO — admins opening in Excel prefer this format.
- All 4 status badge color tokens verified against `globals.css`: `bg-orange`/`text-white` (light), `bg-steel/20`/`text-navy`/`border-steel/30` (light, with text-navy remapping to foreground in dark), `bg-emerald-600`/`text-white` (Tailwind built-in), `bg-muted`/`text-steel` (with dark-mode overrides to navy-light bg + muted-foreground text).
- `colSpan={7}` on the expanded row is unchanged — still 7 columns (Reference, Submitted, Contact, System, V/Qty, Status, Actions).
