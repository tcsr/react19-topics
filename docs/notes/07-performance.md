# Performance — Study Notes

Demos: `src/topics/performance` · Deep dive:
`docs/architecture/web-vitals-performance.md`, `fiber-and-concurrency.md`

## Reconciliation (why re-renders happen)
- State/prop change → re-render → diff new vs old tree → minimal DOM mutation.
- Same type → patch; different type → rebuild; lists → match by **key**.
- By default, a parent re-render re-renders **all** children.

## React.memo
- Memoizes a component → re-renders only when **props** change (shallow compare).
- Pair with `useCallback`/`useMemo` to keep prop identities stable, else memo is
  defeated (new fn/object each render).
- **Gotcha**: shallow compare — new object/array/fn props break it.

## Virtualization (react-window)
- Render only visible rows (+ overscan); constant DOM size for huge lists.
- `FixedSizeList` (uniform height) / `VariableSizeList` (dynamic). Apply the
  provided `style` to each row (absolute positioning).
- **When**: hundreds+ rows, infinite/long lists.

## Concurrent levers
- `useTransition` / `useDeferredValue` → keep input responsive under heavy renders.
- Web workers → offload CPU work off the main thread.

## Bundle / load
- Route-based `React.lazy` + Suspense; tree-shaking; analyze bundle; ship less JS.
- Images: AVIF/WebP, `srcset`, lazy-load, set dimensions (CLS).
- Network: HTTP cache, CDN, preconnect/preload, brotli.

## Core Web Vitals
- **LCP** load (<2.5s) · **INP** responsiveness (<200ms) · **CLS** stability (<0.1).
- Measure: Lighthouse (lab), `web-vitals` (field), React Profiler.

## Rules
- **Measure before optimizing**; memoization has a cost.
- Biggest wins = less JS + fewer/parallel network round-trips.

## Quick Q
- Why does a child re-render? → Parent re-rendered / its props changed.
- Fix a janky 10k-row list? → Virtualize + memoize rows + stable props.
- INP high, what to do? → Break long tasks, transitions, workers.
