# Task 8 — Quote Admin Dashboard Builder

## Task
Build a polished admin dashboard that opens from the Header (discreet "Admin" button) showing all submitted quote requests in a clean table view with summary stats, plus provider + trigger wiring.

## Work Log

### Step 1 — QuoteAdminDialog component (`src/components/quote/QuoteAdminDialog.tsx`)
- `'use client'` component. Props: `open: boolean`, `onOpenChange`.
- Uses shadcn `Dialog`, `DialogContent` (`sm:max-w-5xl max-h-[85vh] overflow-hidden flex flex-col bg-ivory-light p-0 gap-0`), `DialogHeader`, `DialogTitle`, `DialogDescription`, plus `Button`, `Input`, `Badge`, `Skeleton`, `Select`, `Tooltip`.
- Lucide icons: `LayoutDashboard`, `RefreshCw`, `Search`, `Eye`, `Copy`, `Mail`, `Phone`, `MapPin`, `FileText`, `ChevronDown`, `Inbox`, `AlertCircle`.
- Header: orange-soft icon chip + `LayoutDashboard` + title "Quote requests dashboard" + subtitle showing `${counts.total} request(s) · last refreshed ${relative}`.
- Toolbar (white/40 bg, border-b): Refresh button (with spinning `RefreshCw` while loading), Select filter (All / Class A / Class B / Class C / Other systems), and `Input[type=search]` with leading `Search` icon. Stats row: 4 mini cards (Total / Class A / Class B / Class C) on `grid-cols-2 md:grid-cols-4 gap-2.5`.
- Table (`max-h-[50vh] overflow-y-auto` via flex-1 inner container; sticky thead): columns Reference (mono, orange, tabular-nums), Submitted (relative time with `title=` absolute time), Contact (name + company + email stacked), System + class, Voltage / Quantity, Status (orange NEW badge), Actions (View toggle + Copy email).
- Row hover: `hover:bg-orange-soft`; even rows: `bg-muted/40` striped.
- Expanded row: animated `slide-in-from-top-2 fade-in-0` reveal; renders DetailField grid (Delivery location, Dimensions, Phone, Email, Additional requirements) with orange lucide icons + steel label uppercase; "Not provided" placeholder for empty fields.
- Empty state: `Inbox` icon + heading ("No quote requests yet" or "No matching requests" when filtered) + description.
- Loading state: 6 skeleton rows with skeleton cells sized to match real columns.
- Error state: `AlertCircle` icon + heading + retry button calling `fetchQuotes()`.
- Footer summary: "Showing X of Y requests" + "Data is in-memory and resets on server restart" notice.
- Helpers: `formatRelativeTime(iso)` returns `Xs ago` / `Xm ago` / `Xh ago` / `Xd ago`; `formatAbsoluteTime(iso)` for `title` attr; `resolveProductSystemName(id)` looks up `productSystems` from `@/data/products`; `classLabel(cls)` returns `Class X` or `—`.
- Data fetching: simple `fetch('/api/quote', { cache: 'no-store' })` inside `useEffect` triggered on `open`; manual `Refresh` button re-calls `fetchQuotes`. Toast on copy email via `useToast` from `@/hooks/use-toast`.

### Step 2 — QuoteAdminProvider (`src/components/quote/QuoteAdminProvider.tsx`)
- `'use client'` React context with `useQuoteAdmin()` hook returning `{ openAdmin, closeAdmin, isOpen }`.
- Single `useState<boolean>` for `isOpen` — mirrors the existing `SearchProvider` lint-safe pattern (state stored in context, child Dialog reads `open` + `onOpenChange`).
- Renders `<QuoteAdminDialog open={isOpen} onOpenChange={setIsOpen} />` once at provider level.
- `openAdmin()`/`closeAdmin()` are `useCallback`-wrapped.

### Step 3 — QuoteAdminTrigger (`src/components/quote/QuoteAdminTrigger.tsx`)
- `'use client'` discreet ghost button. Uses `cn()` from `@/lib/utils` so consumer `className` is properly merged (Tailwind display conflicts resolved via tailwind-merge — critical for the `hidden md:inline-flex` responsive override).
- Wrapped in shadcn `Tooltip` with "View submitted quote requests" content.
- `aria-label="Open admin dashboard"`, `LayoutDashboard` icon, "Admin" label hidden on mobile via `span.hidden.md:inline`.
- Base styling: `text-steel hover:text-orange`, `text-xs font-medium`, `h-8 px-2.5`.

### Step 4 — Integration
- `src/app/page.tsx`: imported `QuoteAdminProvider`, wrapped the existing provider chain (`<QuoteProvider><QuoteAdminProvider><ProductDetailProvider>…`) so the admin dialog can be opened from anywhere.
- `src/components/layout/Header.tsx`: imported `QuoteAdminTrigger`, placed `<QuoteAdminTrigger className="hidden md:inline-flex" />` BEFORE `<SearchTrigger>` and `<QuoteButton>` in the desktop action cluster — discreet ghost button.
- `src/components/navigation/MobileDrawer.tsx`: imported `QuoteAdminTrigger`, added a divider + "Internal" eyebrow + `<QuoteAdminTrigger showLabel className="w-full justify-start px-0 h-9 text-sm" />` at the bottom of the drawer (after the Quote CTA + Theme toggle row).

## Verification

### Lint
- `bun run lint` — **0 errors, 1 pre-existing acceptable warning** (`@next/next/no-page-custom-font` on `src/app/layout.tsx` from the Manrope `<link>` in `<head>`, present since Task 1).

### Dev server
- `GET / 200`, `POST /api/quote 200`, `GET /api/quote 200` — all stable, no compile or runtime errors.

### agent-browser (desktop 1440×900)
- Loaded `http://localhost:3000`. Header now has 5 desktop controls: **Admin** (ghost) → Search → Request a Quote (orange) → ThemeToggle → MobileDrawer trigger.
- Submitted 1 quote via QuoteDialog (Arjun Mehta / Power Grid / Class C / 33 kV) — verified the success state shows reference `Q-MS26CT7U`. Then added 5 more quotes via `curl POST /api/quote` to cover all classes (A, B, C) and the "Other systems" filter (visible-safety, civil-protection). Stored 6 quotes total.
- Click **Admin** button → dialog opens. Dialog is 1080×717 (≈85vh on 1440×900). Header shows "6 requests · last refreshed 19s ago". Stats cards: Total 6, Class A 1, Class B 1, Class C 2 ✓ (matches data).
- Table shows 6 rows newest-first. Reference column shows orange mono `Q-MS26HT54` etc with tabular-nums. Submitted column shows relative time ("26s ago", "3m ago", "1m ago"); `title` attr exposes absolute timestamp. Contact column shows name + company + email stacked. System column shows "Electrical Insulation / Class C", "Visible Safety / —", "Civil Protection / —". V/Qty column shows voltage on top, qty below. Status column shows orange NEW badge. Actions column has "View" toggle + "Copy email" buttons with tooltips.
- Even rows striped (`bg-muted/40`); row hover (`hover:bg-orange-soft`) verified via DOM inspection.
- **Refresh button**: clicked → spinner spins → rows re-rendered. New quote added via curl during the session appeared at the top after refresh ✓.
- **Filter dropdown**: Class A → only Rajesh Kumar's quote visible ✓. Other systems → only Vikram Singh (civil-protection) + Anita Reddy (visible-safety) visible ✓. All systems → all 6 visible ✓.
- **Search**: typing "NTPC" → only Priya Sharma's quote visible ✓. Clearing → all 6 visible again.
- **Expand**: click "View" on Sneha Iyer's row → row expands inline with DELIVERY LOCATION / DIMENSIONS / PHONE / EMAIL / ADDITIONAL REQUIREMENTS in a 2-column grid, animated slide-in. Button label changes to "Hide" + chevron rotates 180° ✓.
- **Collapse**: click again → expanded row disappears.
- **Copy email**: click "Copy email" on Vikram Singh's row → toast appears: "Email copied / vsingh@larsentoubro.com" ✓. Verified via `document.querySelectorAll('li[role="status"]')` containing the toast text.
- **Empty state**: searched "zzznomatch" → table replaced with `Inbox` icon + "No matching requests" heading + "Try adjusting the filter or search query..." description ✓.
- **Dark mode** (`.dark` class toggled via JS): dialog background changes to navy card (`--card` = `#1B2A4A`), navy text inverts to ivory (`--foreground`), orange accents remain unchanged, stripes become subtle navy-light. Stats cards and badges render correctly.

### agent-browser (mobile 390×844)
- Header Admin button correctly hidden on mobile (`display: none` via `hidden md:inline-flex` — verified after switching to `cn()` merge).
- Open MobileDrawer → bottom section shows "Internal" eyebrow + Admin link below a divider ✓.
- Click Admin link from drawer → drawer closes, admin dialog opens. Dialog rect: 358×717 (85vh) ✓. Internal table scrolls (`scrollHeight 601 > clientHeight 251`) ✓. All 6 rows accessible via scroll.
- Verified mobile dark mode screenshot.

### VLM verification
- `qa-admin-dashboard.png`: VLM confirms title "Quote requests dashboard", subtitle "6 requests · last refreshed 19s ago", stats (Total 6 / Class A 1 / Class B 1 / Class C 2), all 7 columns (Reference / Submitted / Contact / System / V / Qty / Status / Actions), NEW orange badges, brand palette (navy text + orange accents + ivory bg).
- `qa-admin-expanded.png`: VLM confirms all 5 expanded fields visible: DELIVERY LOCATION (Chennai, Tamil Nadu), DIMENSIONS (1.5m x 2m), PHONE (+91 9455 66778), EMAIL (sneha.iyer@tneb.gov.in), ADDITIONAL REQUIREMENTS (For 400 kV substation). Distinct cream/beige highlight on expanded row.

## Files created
- `src/components/quote/QuoteAdminDialog.tsx`
- `src/components/quote/QuoteAdminProvider.tsx`
- `src/components/quote/QuoteAdminTrigger.tsx`

## Files modified
- `src/app/page.tsx` (added `QuoteAdminProvider` import + wrapped main in `<QuoteAdminProvider>` inside `<QuoteProvider>`)
- `src/components/layout/Header.tsx` (added `QuoteAdminTrigger` import + placed discreet Admin button before SearchTrigger/QuoteButton in desktop action cluster)
- `src/components/navigation/MobileDrawer.tsx` (added `QuoteAdminTrigger` import + added divider + "Internal" section with Admin link at bottom of drawer)

## Screenshots saved
- `/home/z/my-project/download/qa-admin-dashboard.png` — desktop 1440×900, dialog open with 6 quotes, stats showing 6/1/1/2.
- `/home/z/my-project/download/qa-admin-expanded.png` — desktop with Sneha Iyer row expanded showing all detail fields.
- `/home/z/my-project/download/qa-admin-empty.png` — desktop with search query "zzznomatch" returning "No matching requests" empty state.
- `/home/z/my-project/download/qa-admin-dark.png` — desktop dark mode with all 6 quotes.
- `/home/z/my-project/download/qa-admin-mobile-drawer.png` — mobile 390×844 MobileDrawer showing the "Internal" section with Admin link at bottom.
- `/home/z/my-project/download/qa-admin-mobile.png` — mobile 390×844 admin dialog open with quotes list.
- `/home/z/my-project/download/qa-admin-mobile-dark.png` — mobile dark mode.

## Issues encountered & resolved
1. **Tailwind display conflict**: initial implementation used template-string class concatenation, which left both `inline-flex` (from the trigger's base classes) and `hidden md:inline-flex` (from the consumer `className`) in the final string. Tailwind did not deduplicate them, so on a 390px viewport the button stayed `display: flex` instead of being hidden. Fixed by switching to `cn()` from `@/lib/utils` (which uses `tailwind-merge`) — verified `getComputedStyle(...).display === 'none'` on mobile after the fix.
2. **Search state sync via raw DOM**: during testing, attempting to clear the search input via `document.querySelector('input').value = ''` + dispatching a plain `input` event did not sync React's controlled state, leaving the previous "NTPC" filter active. Resolved by using `agent-browser fill @e6 " "` then `fill @e6 ""` (Playwright's fill triggers React's onChange properly). This is a test-harness quirk, not a code issue.

## Notes
- Quote references are generated by the existing API route as `Q-${Date.now().toString(36).toUpperCase()}` — visually matches the `Q-MS23ZT6J` pattern in the spec.
- The `Q-XXXX` reference is rendered in `font-mono text-orange tabular-nums` per spec.
- All dates use the manual `formatRelativeTime` helper (no `Intl.RelativeTimeFormat` dependency).
- Clipboard write uses `navigator.clipboard.writeText(email)` wrapped in try/catch with a fallback toast message if denied.
