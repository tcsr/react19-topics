# Performance & Web Vitals

## Core Web Vitals (measure what users feel)

| Metric | Measures | Good | Fix levers |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | loading — largest element paint | < 2.5s | image opt, preload, SSR/SSG, CDN, less JS |
| **INP** (Interaction to Next Paint) | responsiveness (replaced FID) | < 200ms | break up long tasks, transitions, memo, web workers |
| **CLS** (Cumulative Layout Shift) | visual stability | < 0.1 | size images/ads, reserve space, avoid inserting above content |

Supporting: **TTFB** (server/CDN), **FCP** (first paint), **TBT** (lab proxy for INP).

## Measure

- **Lab**: Lighthouse, WebPageTest (repeatable, pre-release).
- **Field/RUM**: `web-vitals` library → analytics (real users, real devices).
- **React Profiler** (DevTools + `<Profiler>` API): find slow/needless renders.
- Set **performance budgets** in CI (bundle size, LCP) to prevent regressions.

## React-specific optimization checklist

1. **Ship less JS**: route-based `React.lazy` + Suspense; tree-shake; analyze
   bundle (rollup-plugin-visualizer). (See `src/topics/advanced/lazy-suspense`.)
2. **Cut needless renders**: `React.memo` + stable props (`useCallback`/`useMemo`);
   selector-based stores. (See `src/topics/performance/memo`.)
3. **Virtualize** long lists. (See `src/topics/performance/virtualization`.)
4. **Keep input responsive**: `useTransition` / `useDeferredValue` for heavy
   updates; offload CPU work to **web workers**.
5. **Images**: modern formats (AVIF/WebP), responsive `srcset`, lazy-load,
   dimensions to avoid CLS.
6. **Network**: HTTP caching, CDN, `preconnect`/`preload`/`prefetch`, compression
   (brotli), HTTP/2-3.
7. **Data**: cache + dedup (React Query); avoid waterfalls (parallel/loader fetch).
8. **Fonts**: `font-display: swap`, preload, subset.

## Interview signals

- Optimize the metric that matches the complaint (LCP=slow load, INP=janky,
  CLS=jumping).
- Measure before optimizing; premature memoization has a cost.
- Biggest wins are usually **less JS** and **fewer/parallel network round-trips**,
  not micro-memoization.
