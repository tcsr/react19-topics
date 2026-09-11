# Data Fetching & Caching

## Anti-pattern: useEffect + fetch

`useEffect(() => { fetch()... }, [])` by hand means you reimplement caching,
dedup, retries, loading/error, refetch-on-focus, pagination, and cancellation —
badly. Use a server-cache library. React 19's `use(promise)` + Suspense removes the
loading-flag boilerplate but still needs a stable cache (framework or library).

## What a server-cache library gives you

- **Cache** keyed by query key; **dedup** concurrent identical requests.
- **Background refetch** (on mount, focus, reconnect, interval).
- **Stale-while-revalidate**: show cached data instantly, refetch in background.
- **Mutations** with cache invalidation + **optimistic updates** (pair with
  `useOptimistic`).
- **Pagination / infinite** queries; request **cancellation**.

## Cache layers (know them all)

1. **Browser HTTP cache** — `Cache-Control`, `ETag`/`If-None-Match`, CDN edge cache.
2. **Client data cache** — React Query / RTK Query in memory (+ optional persist).
3. **Server cache** — **Redis** in front of the DB (cache-aside), computed results.
4. **Database** — query cache, materialized views, indexes.

Cache invalidation strategy is the hard part: TTLs, event-driven invalidation
(publish an event on write — ties to **EventBridge**), and versioned keys.

## Cache-aside (the pattern for the Redis phase)

```
read:  check Redis -> hit? return : miss? read DB -> write Redis (TTL) -> return
write: write DB -> invalidate/refresh Redis key (or publish event to invalidate)
```

## React Query key design

- Keys are arrays: `['todos', { status, page }]`. Changing params = new cache entry.
- Invalidate by prefix: `queryClient.invalidateQueries({ queryKey: ['todos'] })`.

## Maps to next phase

- Client: **React Query** talking to **NestJS**.
- Server: **NestJS** cache-aside over **PostgreSQL** using **Redis**.
- Async invalidation / fan-out: **EventBridge** (or a broker) publishes domain
  events; consumers refresh caches / do background work.
