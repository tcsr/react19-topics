# Styling Architecture

## Options

| Approach | Scoping | Runtime cost | Notes |
|---|---|---|---|
| **Plain CSS / BEM** | manual (naming) | none | scales poorly without discipline |
| **CSS Modules** | build-time, local by default | none | simple, safe scoping, great default |
| **CSS-in-JS runtime** (styled-components, emotion) | component | **runtime** | dynamic theming, colocated; hurts SSR/perf |
| **Zero-runtime CSS-in-JS** (vanilla-extract, Linaria) | component | none (build-time) | type-safe, no runtime cost |
| **Utility-first** (Tailwind) | atomic classes | none | fast, consistent, small CSS via purge; verbose markup |

## Design tokens & theming

- **Design tokens**: named primitives (color, spacing, radius, typography) as the
  single source of truth, exposed as **CSS custom properties** (`--color-bg`).
- **Theming**: swap token values at `:root` / `[data-theme]`; supports light/dark
  and multi-brand without touching components.
- Keep semantic layers: primitive tokens → semantic tokens (`--surface`,
  `--text-muted`) → component styles.

## Architect concerns

- **Consistency at scale** → a **design system** + component library (Storybook to
  document/visual-test in isolation).
- **SSR**: runtime CSS-in-JS needs style extraction (FOUC/hydration risk); prefer
  zero-runtime or CSS Modules for SSR-heavy apps.
- **Performance**: avoid large runtime style engines on the critical path; purge
  unused CSS.
- **Accessibility**: tokens for focus rings, sufficient contrast; respect
  `prefers-reduced-motion` / `prefers-color-scheme`.

## Interview signals

- CSS Modules or zero-runtime for perf/SSR; Tailwind for velocity + consistency;
  runtime CSS-in-JS when dynamic theming outweighs its cost.
- Tokens + CSS variables are the backbone of theming and multi-brand.
