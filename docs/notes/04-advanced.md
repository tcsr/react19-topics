# Advanced — Study Notes

Demos: `src/topics/advanced`

## Error boundaries
- **Def**: component catching render errors in its subtree → fallback UI.
- **Key points**: must be a **class** (`getDerivedStateFromError` +
  `componentDidCatch`). React 19 adds root `onCaughtError`/`onUncaughtError`.
- **Does NOT catch**: event handlers, async code, SSR, errors in the boundary
  itself → handle those with try/catch.
- **Quick Q**: Why can't event-handler errors be caught? → They fire outside render.

## Error handling + observability
- Resettable boundary (`Try again`), report to Sentry/Datadog in
  `componentDidCatch`, retry with **exponential backoff** for transient async.
- Distinguish render errors (boundary) vs async/event errors (try/catch + report).

## lazy + Suspense
- `React.lazy(() => import(...))` code-splits a component into its own chunk;
  `<Suspense fallback>` shows loading. Also powers `use(promise)` + streaming SSR.
- **Gotcha**: lazy needs a **default export**.

## Portals
- Render children into a DOM node **outside** the parent hierarchy, but keep them in
  the React tree (context/events still work). For modals/tooltips escaping
  overflow/z-index. `createPortal(children, domNode)`.

## Forms: controlled vs uncontrolled
- **Controlled**: state is source of truth (value + onChange) — predictable,
  validatable. **Uncontrolled**: DOM owns value, read via ref/FormData — less code.
- React 19 Actions make uncontrolled + FormData ergonomic.

## React Hook Form
- Uncontrolled + refs → typing doesn't re-render whole form (**performant**).
- `register`, `handleSubmit`, `formState.errors`, `reset`, `watch`, `control`.

## Zod + RHF
- Zod schema = **runtime validator + TS type** (`z.infer`); one source of truth.
- `zodResolver(schema)` wires it into RHF; reuse schema for API/env validation.
- **Gotcha**: number field → `register('age', { valueAsNumber: true })` so Zod sees
  a number.

## Patterns
- **HOC**: `withX(Component)` → enhanced component.
- **Render props**: pass a function child called with data.
- **Compound components**: parent + children share state via context
  (`<Tabs><Tab/></Tabs>`).
- **Note**: custom hooks now cover most HOC/render-prop cases.
