---
Task ID: 1
Agent: main
Task: Fix reveal-animation bug — About section blank/invisible on homepage

Work Log:
- Cloned GitHub repo from https://github.com/witejackel-eng/bharat-electrosafe
- Synced all source code into /home/z/my-project (preserved node_modules, bun.lock)
- Identified root cause: HomeClient.tsx wrapped sections in `<div class="reveal-up">` but RevealObserver observed `<section>` elements and searched INSIDE for `.reveal-up` — the wrapper div was a PARENT, never found
- Fixed HomeClient.tsx: removed 4 outer `<div class="reveal-up">` wrappers
- Fixed HomeAbout.tsx: added `reveal-up` directly to `<section>` element
- Fixed StatisticsStrip.tsx: added `reveal-up` directly to `<section>` element
- Fixed TrustDocuments.tsx: added `className="reveal-up"` to `<SectionShell>`
- Fixed CapabilityIndustries.tsx: added `className="reveal-up"` to `<SectionShell>`
- Rewrote RevealObserver.tsx: observes `.reveal-up` and `.stagger-reveal` elements directly via IntersectionObserver; added 6s safety timeout
- Added `<noscript>` fallback in layout.tsx: forces reveal content visible when JS disabled
- Verified: 15 `.reveal-up` elements all have `revealed` class, 2 `.stagger-reveal` elements also revealed
- Verified: No blank areas in homepage, no horizontal overflow
- Verified: Section order correct (Hero → Statistics → About → Product Range → Trust → Capabilities → FAQ/CTA)
- Verified: Lint passes (0 errors, 1 pre-existing warning)
- Verified: TypeScript errors are all pre-existing (playwright, resend, Breadcrumb casing)
- Committed with correct git author (witejackel-eng / witejackel@gmail.com)

Stage Summary:
- Root cause: `.reveal-up` wrapper div outside `<section>` — observer searched inside sections, never found parent
- Fix: Move `reveal-up` class onto each section's root element; observe reveal elements directly
- Progressive enhancement: noscript fallback + 6s safety timeout + reduced-motion CSS preserved
- All visual QA passed: About section visible, Statistics visible, no blank areas, no overflow
- Commit: 7efea6c "fix: resolve reveal-animation bug — About section blank/invisible"
