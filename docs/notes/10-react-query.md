# React Query (TanStack Query) — Study Notes

Demos: `src/topics/react-query` · Deep dive:
`docs/architecture/data-fetching-and-caching.md`

## Why
- Manages **server state** (async, remote, shared, cacheable) — different from
  client UI state. Removes hand-rolled useEffect+fetch (caching, dedup, retries,
  refetch, loading/error).

## Core concepts
- **QueryClient** — the cache; provided once via `<QueryClientProvider>` (root).
- **queryKey** — array uniquely identifying data; also the dependency (change key
  → new fetch/cache entry). E.g. `['posts', { page }]`.
- **queryFn** — async fetcher; **must throw** on error.
- **staleTime** — how long data is fresh (no refetch). **gcTime** — how long unused
  cache is kept. Fresh vs stale ≠ cached vs GC'd.

## useQuery
- Returns `data, isPending, isError, error, isFetching, refetch, isSuccess`.
- **isPending** = no data yet (first load). **isFetching** = request in flight
  (incl. background refetch while showing cached data).
- **Stale-while-revalidate**: shows cache instantly, refetches in background.

## Key options
- **enabled** — gate a query (dependent/chained queries) until inputs exist.
- **placeholderData: keepPreviousData** — keep prior data during pagination (no
  flicker); check `isPlaceholderData`.
- **select** — transform/derive data without re-fetch.
- **refetchOnWindowFocus / refetchInterval** — auto refresh behavior.

## useInfiniteQuery
- `initialPageParam` + `getNextPageParam(last, all) => next | undefined`.
- `data.pages` = array of pages; flatten to render. `fetchNextPage`, `hasNextPage`,
  `isFetchingNextPage`.

## Mutations (writes)
- **useMutation** `{ mutationFn }` → `mutate()/mutateAsync()`, `isPending`,
  `isSuccess`, `isError`.
- After success **invalidate** affected queries → refetch fresh (read-your-writes):
  `queryClient.invalidateQueries({ queryKey: ['posts'] })` (prefix match).

## Optimistic updates
- `onMutate`: `cancelQueries` → snapshot (`getQueryData`) → write optimistic
  (`setQueryData`) → return context.
- `onError(err, vars, ctx)`: rollback to snapshot.
- `onSettled`: `invalidateQueries` to resync.
- Cache-level equivalent of React 19 `useOptimistic`, shared across components.

## Gotchas
- Unstable queryKey (new object each render is fine; but wrong/duplicate keys cause
  cache collisions or missed cache).
- queryFn must throw, not return an error, for `isError` to populate.
- Don't mirror React Query data into Redux/Context — it IS your server cache.

## Quick Q
- Server state vs client state? → Remote/async/shared/cacheable vs local UI.
- staleTime vs gcTime? → Fresh window vs cache retention for inactive queries.
- Read-your-writes? → Invalidate queries after a mutation.
- No-flicker pagination? → `placeholderData: keepPreviousData`.
- Dependent query? → `enabled: !!input`.

## Maps to next phase
Swap `src/lib/api.ts` BASE_URL from JSONPlaceholder to the **NestJS** server — query
and mutation code is unchanged. NestJS then does cache-aside over PostgreSQL with
Redis, and publishes events (EventBridge) that can trigger `invalidateQueries`.
