# Glossary & Quick Cheat-Sheet

## React & Frontend
| Term | Meaning |
|---|---|
| JSX | HTML-like syntax compiling to `React.createElement` (JS objects) |
| Virtual DOM | In-memory element tree; diffed to compute minimal real-DOM changes |
| Reconciliation | The diff algorithm (type/props/keys) that decides DOM updates |
| Fiber | React's interruptible reconciler; work split into prioritized units (lanes) |
| Hook | Function (`use*`) adding state/lifecycle to a function component |
| Memoization | Cache to skip work: `useMemo` (value), `useCallback` (fn), `React.memo` (component) |
| Controlled / uncontrolled | Input value owned by React state vs by the DOM (ref/FormData) |
| Suspense | Declares fallback UI while a child (lazy/`use(promise)`) isn't ready |
| CSR/SSR/SSG/ISR | Render in browser / per-request / at build / build+revalidate |
| RSC | React Server Components: run on server, JS never ships |
| Hydration | Attaching client JS + listeners to server-rendered HTML |
| Core Web Vitals | LCP (load) / INP (responsiveness) / CLS (stability) |
| Optimistic update | Show expected result immediately; reconcile/rollback on response |

## Node & NestJS
| Term | Meaning |
|---|---|
| Event loop | Single JS thread + non-blocking I/O; phases + microtasks (nextTick > promise) |
| Stream / backpressure | Process data in chunks; pause source when sink is slow |
| Worker thread | Real thread for CPU-bound work (keep the event loop free) |
| Middleware / Guard / Interceptor / Pipe / Filter | NestJS lifecycle: pre-handler / authz / wrap / validate / error-shape |
| DI / Provider | Nest IoC injects `@Injectable` providers by type |
| DTO | Request-shape class validated by a pipe (class-validator / Zod) |
| ORM / migration | Prisma maps DB<->types; versioned schema changes |
| N+1 | One query per row in a loop; fix with include/join/batch |

## Data, DB & PostgreSQL
| Term | Meaning |
|---|---|
| ACID | Atomicity, Consistency, Isolation, Durability |
| Isolation levels | Read Committed (PG default) < Repeatable Read < Serializable |
| MVCC | Multi-version concurrency: readers don't block writers |
| Index (B-tree / GIN) | Speed reads; GIN for JSONB/arrays/full-text |
| CTE / window fn | `WITH` subquery / per-row analytics without collapsing rows |
| Connection pool | Reuse DB connections (PgBouncer / ORM pool) |
| Soft delete | Hide rows via `deleted_at` instead of physical DELETE |
| Cache-aside | get cache -> miss -> DB -> set; invalidate on write |
| Stale-while-revalidate | Serve cache instantly, refetch in background (React Query) |

## Auth
| Term | Meaning |
|---|---|
| AuthN / AuthZ | Who you are / what you may do |
| JWT | Signed, stateless token (header.payload.signature); payload not encrypted |
| OAuth2 / OIDC | Delegated authorization / identity layer on top |
| PKCE | Auth-code flow protection for SPAs/mobile |
| Refresh rotation | New refresh token each use; detects theft |
| RBAC / ABAC | Authorize by role / by attributes+policy |

## Async, Queues & Kafka
| Term | Meaning |
|---|---|
| Redis | In-memory store: cache, sessions, pub/sub, queues, locks |
| BullMQ | Redis-backed job queue: offload work, retries/backoff, DLQ |
| Topic / partition / offset | Kafka stream / ordered log shard / read position |
| Consumer group | Each partition to one consumer in the group (scale + order) |
| At-least-once | Default delivery; may redeliver -> consumers must be idempotent |
| Idempotency | Processing the same message twice == once (dedup by id) |
| DLQ | Dead-letter queue for poison messages after retries |
| Backpressure | Signal upstream to slow down (Kafka pull model gives this) |

## Microservices & Distributed Systems
| Term | Meaning |
|---|---|
| Bounded context | Consistency boundary for one model; = one microservice |
| Database-per-service | Each service owns its data; no shared tables/joins |
| Saga | Local transactions + compensations (replaces cross-service ACID/2PC) |
| Choreography / orchestration | Services react to events / a central coordinator commands |
| Compensation | New action that semantically undoes a prior step |
| Eventual consistency | System converges over time as events flow |
| Outbox | Persist event with state in one txn, relay to broker (atomic publish) |
| CQRS / event sourcing | Split read/write models / events as source of truth |
| API gateway | Single entry: routing, auth, aggregation |
| Circuit breaker / bulkhead | Fail fast on a dead dep / isolate resource pools |
| 2PC | Two-phase commit: blocking distributed txn (avoided; use sagas) |
| Strangler fig | Incrementally extract services from a monolith |
| Service mesh | Sidecars for mTLS/retries/telemetry (Istio/Linkerd) |

## Observability
| Term | Meaning |
|---|---|
| RED / USE | Rate-Errors-Duration (services) / Utilization-Saturation-Errors (resources) |
| Tracing / span | One request across services; timed operations tied by trace id |
| Correlation id | One id threaded through logs+traces of a request |
| Consumer lag | How far behind Kafka consumers are (key queue health signal) |
| SLO | Service-level objective; alert on symptoms users feel |

## When to use what (quick decisions)
| Question | Answer |
|---|---|
| Server state (API data)? | React Query / RTK Query (NOT Redux/Context) |
| Global client state? | Zustand (simple) / Redux Toolkit (structure+devtools) |
| Low-freq shared value? | Context (it's DI, re-renders all consumers) |
| Cross-service workflow? | Async events (saga), not sync call chains |
| Need an immediate answer? | Sync RPC (gRPC internal / REST edge) |
| Offload slow work? | Queue (BullMQ) - return fast, retry, DLQ |
| Cross-service consistency? | Eventual (events + saga + outbox), not 2PC |
| Split into microservices? | Only at org scale; start with a modular monolith |
| Rename/remove a DB column live? | Expand-contract across releases; never drop in one shot |
