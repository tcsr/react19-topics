# Accessibility (a11y)

## Foundations

- **Semantic HTML first**: `<button>`, `<nav>`, `<main>`, `<label>`, headings in
  order. Native elements bring keyboard + screen-reader behavior for free. ARIA is
  a **fallback**, not a replacement ("no ARIA is better than bad ARIA").
- **WCAG** levels A / AA / AAA; target **AA**. Four principles: **POUR** —
  Perceivable, Operable, Understandable, Robust.

## Key practices

- **Labels**: every input has an associated `<label>` (or `aria-label`/
  `aria-labelledby`). Use `useId` to link them (see `src/topics/hooks/useId`).
- **Keyboard**: everything usable without a mouse; visible **focus indicators**;
  logical tab order; no keyboard traps.
- **Focus management**: on route change move focus to the heading; in modals **trap
  focus** and restore it on close; skip-to-content link.
- **ARIA roles/states**: `aria-expanded`, `aria-current`, `role="dialog"`,
  `aria-live` regions for async updates (toasts, validation).
- **Color**: don't rely on color alone; contrast ≥ 4.5:1 for text.
- **Motion**: honor `prefers-reduced-motion`.
- **Images**: meaningful `alt`; decorative → `alt=""`.

## Testing

- **Automated**: `eslint-plugin-jsx-a11y`, `axe-core` / `jest-axe`, Lighthouse a11y
  audit (catches ~30–50%).
- **Manual**: keyboard-only pass, screen reader (NVDA/VoiceOver), zoom to 200%.
- RTL encourages accessible queries: `getByRole`, `getByLabelText` — if you can't
  query by role, it's often an a11y smell (see `src/topics/testing`).

## Interview signals

- Semantic HTML before ARIA; ARIA can make things worse if misused.
- Focus management on route/modal changes is the most-missed SPA a11y issue.
- Automated tools catch only part — manual keyboard + SR testing is required.
