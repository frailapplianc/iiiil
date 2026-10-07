# AGENTS.md — Design Standards for OGH Accounting

## Stack
- Single HTML file (index-4.html)
- No build step, no framework
- No new dependencies unless truly needed
- Fonts: self-hosted or single Google Fonts request with fallback
- All data in localStorage (key: `drops-app-v1`)

## Typography
- **Serif (identity):** Used for headings, emphasis numbers, logo context. Refined, not generic.
- **Sans (UI):** Clean, neutral, NOT Inter. Used for tables, buttons, labels.
- **Tabular numerals:** `font-variant-numeric: tabular-nums` on all tables and analytics.
- **Hierarchy:** Clear weight/size/leading progression. Tight tracking on large text (`-0.02em` to `-0.04em`), body near `0`.

## Layout
- Intentional composition, consistent spacing scale (4px base: 4, 8, 12, 16, 24, 32, 48, 64).
- No cards inside cards. No endless card grids.
- Hairline borders (`1px solid rgba(0,0,0,.08)` light / `rgba(255,255,255,.08)` dark) instead of heavy shadows.
- Tables are first-class: sticky header, good row height (48-56px), subtle hover, aligned numbers.
- `max-width: 1140px` centered with `margin: 0 auto`.
- `min-height: 100dvh` (never `100vh`).

## Motion
- Only `transform`, `opacity`, `clip-path`, `filter`. Never `width`/`height`/`top`/`left`.
- Page load: staggered fade-up (300-500ms total), easing `cubic-bezier(.2,.7,.2,1)`.
- Tab switch: crossfade/slide 8-12px with animated indicator.
- Numbers: gentle fade on change, no bouncing.
- Table rows: new row enters softly, deleted row collapses, edited cell highlights briefly.
- Hover/focus/active: 120-200ms on every interactive element.
- `prefers-reduced-motion`: disable or minimize everything.
- No scroll-jacking, no parallax on data views.

## Interaction States
- Loading: skeleton or spinner where relevant.
- Empty: clear message + CTA if actionable.
- Error: inline validation, toast for async errors.
- Disabled: reduced opacity, no pointer events.
- Hover: subtle background/border change, 150ms.
- Focus-visible: 2px accent outline, 2px offset.
- Active: `scale(.97)` on buttons, 120ms.
- Selected: accent background/border.

## Accessibility
- Semantic HTML: `<button>` for actions, `<a>` for links, `<table>` for data.
- `aria-label` on icon-only buttons.
- Visible focus indicators (never `outline: none` without replacement).
- Contrast: WCAG AA minimum (4.5:1 for text, 3:1 for large text/UI).
- Keyboard: all interactive elements reachable, tabs/editor navigable.

## Redesign Rules
- Preserve ALL existing functionality (CRUD, tabs, editor, logo upload, analytics).
- Preserve data format (localStorage key `drops-app-v1`).
- No placeholder names (Acme, John Doe, Lorem Ipsum).
- No fake stats or decorative blobs.
- No emojis as icons.
- Real labels, real data structure from existing site.

## No Placeholder Code
- No `<!-- rest of code here -->`.
- No `// TODO`.
- No incomplete functions.
- Every line must be production-ready.
