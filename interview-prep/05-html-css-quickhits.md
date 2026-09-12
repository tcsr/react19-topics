# HTML5 & CSS3 Quick-Hits

## HTML / semantics / a11y
- Semantic tags: `header nav main section article aside footer figure`. Screen
  readers + SEO rely on them. Use one `<h1>`, ordered headings.
- Forms: `<label for>` (or wrap), `<button type="button|submit">`, native validation.
- **Accessibility** (matters for a video player / TV remote):
  - Everything keyboard-usable; visible focus; logical tab order; no traps.
  - `aria-*` only to fill gaps native HTML can't (`aria-label`, `aria-live` for live
    scores, `role="dialog"` + focus trap for modals).
  - `alt` on images (empty `alt=""` for decorative). Contrast ≥ 4.5:1.
- `<video>` with captions (`<track kind="captions">`), `preload`, `poster`.
- `defer` vs `async` on scripts; `<img loading="lazy">`; `srcset`/`sizes` responsive.

## CSS layout
- **Flexbox** (1-D): `display:flex; justify-content; align-items; gap; flex:1`.
- **Grid** (2-D): `display:grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap`.
- Centering: fl/grid `place-items:center`. Box model: `box-sizing:border-box`.
- Position: static/relative/absolute/fixed/**sticky**; stacking context + `z-index`.

## Responsive
- Mobile-first + `@media (min-width: …)`. Relative units (`rem`, `%`, `vw/vh`,
  `clamp()`). Fluid images `max-width:100%`. Test phone → tablet → **TV** (10-foot UI:
  bigger targets, keyboard/remote nav).

## Specificity & cascade
- Inline > id > class/attr/pseudo-class > element. `!important` last resort.
  Later rule wins on a tie. Keep specificity low (BEM / CSS Modules / utilities).

## Performance (streaming site cares a lot)
- **Reflow** (layout) vs **repaint** (paint) — animating `top/left/width` triggers
  layout; animate **`transform`/`opacity`** (GPU, no layout). `will-change` sparingly.
- Reduce critical CSS; avoid deep selectors; `content-visibility`/CSS containment
  for offscreen sections; minimize layout thrash (batch reads/writes).
- Core Web Vitals: LCP (optimize hero/poster), CLS (reserve image/ad space — set
  width/height), INP (keep main thread free).

## Common asks
- Build a responsive card grid (Grid `auto-fit minmax`).
- Center a box (flex/grid).
- Sticky header. Truncate text (`overflow:hidden; text-overflow:ellipsis;
  white-space:nowrap`). Aspect-ratio box (`aspect-ratio: 16/9` for video).
