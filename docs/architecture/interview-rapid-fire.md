# Rapid-Fire Interview Drill

Short answers. Expand from the linked sheets/demos.

## React core
- **Virtual DOM?** In-memory element tree; React diffs new vs old and commits
  minimal DOM mutations. Enables batching + interruptible rendering.
- **Why keys?** Identify list items across renders so React moves instead of
  recreating. Index keys break on reorder/insert.
- **Reconciliation?** Diff algorithm: different type → rebuild; same type → patch;
  lists → match by key.
- **Fiber?** Interruptible reconciler; work split into units with priority lanes.
- **Render vs commit?** Render is pure + interruptible; commit is synchronous DOM
  mutation + effects.
- **Controlled vs uncontrolled?** State-driven value+onChange vs DOM-owned via ref.
- **Effect cleanup?** Return fn from useEffect; runs before re-run and on unmount.
- **StrictMode double-invoke?** Dev-only; surfaces impure renders / missing cleanup.

## Hooks
- **useMemo vs useCallback?** Cache a value vs cache a function identity.
- **useRef vs useState?** Ref persists without re-render; state triggers re-render.
- **Rules of hooks?** Top level only, same order every render, only in components/
  hooks.
- **useLayoutEffect vs useEffect?** Sync before paint (measure) vs async after paint.
- **Custom hook?** `use*` function calling hooks to share logic (not state).

## React 19
- **Actions?** Functions wired to `<form action>`; auto pending/reset.
- **useActionState / useFormStatus / useOptimistic?** Action result+pending / read
  parent form status / optimistic UI.
- **use()?** Read a promise (suspends) or context; callable conditionally.
- **ref as prop?** No forwardRef needed anymore.
- **RSC?** Server-only components; JS never ships; `await` data directly.

## State & data
- **Where does state live?** Local → lift → server-cache lib for server data; URL
  for filters. Most "global state" is server cache.
- **Context downside?** Re-renders all consumers; it's DI, not a state manager.
- **Redux vs Zustand vs React Query?** Structured global client / minimal global
  client / server cache.
- **Optimistic update?** Apply expected result immediately, reconcile/rollback on
  response.

## Performance
- **Fix a janky list?** Virtualize; memoize rows; stable props.
- **Reduce re-renders?** React.memo + useCallback/useMemo; selector stores; split
  contexts.
- **Core Web Vitals?** LCP (load), INP (responsiveness), CLS (stability).
- **Cut bundle?** Route-based code splitting, tree-shaking, analyze, ship less JS.

## Architecture
- **Rendering strategy choice?** SEO/first-paint → SSR/SSG/RSC; app behind auth →
  CSR ok; per-route decision.
- **Token storage?** Access token in memory, refresh in httpOnly Secure SameSite
  cookie; avoid localStorage.
- **XSS defense?** React escapes by default; sanitize dangerouslySetInnerHTML; CSP.
- **REST vs GraphQL?** Caching/simplicity vs precise fetching/aggregation.
- **Micro-frontends?** Runtime independent deploys (Module Federation); org-scaling
  tool with real cost; share React as singleton.
- **Monorepo value?** Task graph + caching + shared tooling + atomic changes.
- **Testing strategy?** Unit (hooks/pure) + component (RTL by role) + E2E
  (Playwright); mock network with MSW.
- **Scale real-time?** WebSocket + Redis pub/sub backplane; events for decoupling
  and async work.
