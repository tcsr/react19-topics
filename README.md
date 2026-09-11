# React 19 Topics Playground

Vite + React 19 + TypeScript learning app. Folders are organized by **React topic**.
Every demo file starts with a **generic definition comment** explaining the concept,
followed by a minimal working example. The app shell (`src/App.tsx`) renders a
sidebar to browse and run each topic.

**Three parts:**
1. **Runnable demos** — `src/topics/` (browse in the app sidebar); each file opens
   with a generic definition comment.
2. **Study / preparation notes** — [`docs/notes/`](docs/notes/README.md):
   revision-grade notes per topic (definition → key points → gotchas → when to use
   → quick Q).
3. **Architect interview cheat-sheets** — [`docs/architecture/`](docs/architecture/README.md)
   for system-design topics without a client-side demo (SSR/RSC, Fiber, auth,
   security, micro-frontends, web vitals, …).

## Run

```bash
npm install
npm run dev      # start dev server
npm run build    # typecheck (tsc -b) + production build
npm test         # run unit + component tests (Vitest + RTL)
```

## Structure

```
src/topics/
  core/                     React fundamentals
    01-components/          Components
    02-jsx/                 JSX
    03-props/               Props & children
    04-rendering/           Conditional rendering, lists & keys
    05-events/              Event handling
  hooks/                    Built-in & custom hooks
    useState/  useEffect/  useRef/  useContext/  useReducer/
    useMemo-useCallback/    Memoization
    useId/                  SSR-safe unique ids
    useLayoutEffect/        Sync measure before paint
    useImperativeHandle/    Expose imperative API via ref
    useSyncExternalStore/   Subscribe to external stores
    custom-hooks/           useLocalStorage, useToggle, useDebounce, usePrevious
  react19/                  NEW in React 19
    actions/                <form action={fn}>
    useActionState/         Form state + pending
    useFormStatus/          Read parent form status
    useOptimistic/          Optimistic UI
    use-api/                use() for promises & context
    ref-as-prop/            ref without forwardRef
    document-metadata/      Native <title>/<meta>/<link>
    context-provider/       <Context> as provider
    transitions/            useTransition / useDeferredValue
    use-promise/            use(promise) + Suspense data fetching
    server-components/       RSC + Server Actions (notes; needs a framework)
  advanced/
    error-boundaries/       Class boundary + fallback
    error-observability/    Resettable boundary, logging, retry/backoff
    lazy-suspense/  portals/  patterns/
    forms/                  Controlled vs uncontrolled
    react-hook-form/        Performant validation-driven forms
    zod-validation/         Zod schema + RHF resolver (type + runtime)
  routing/                  React Router v7 data router (loaders, nested, params)
  state-management/
    zustand/                Tiny global store, no Provider
    redux-toolkit/          RTK slice + RTK Query (server cache)
  performance/
    memo/                   React.memo + reconciliation
    virtualization/         react-window windowing (10k rows)
  typescript/               Generic components, discriminated unions, utility types
  testing/                  Vitest + RTL + user-event (*.test.tsx co-located)
  future-integrations/      Planned phases (placeholders)
    react-query/  nestjs-api/  postgresql/  redis-cache/  async-eventbridge/
```

## React 19 coverage

Actions, `useActionState`, `useFormStatus`, `useOptimistic`, `use()`, ref as a
prop (forwardRef no longer required), native document metadata, `<Context>` as a
provider, transitions/deferred values, and RSC/Server Actions notes.

## Roadmap (next phases)

1. **React Query** — client server-state (cache, refetch, mutations).
2. **NestJS + PostgreSQL** — backend API + relational DB (TypeORM/Prisma).
3. **Redis cache** — cache-aside in front of Postgres.
4. **Async / EventBridge** — event-driven, decoupled background processing.

See `src/topics/future-integrations/README.md`.
