# Project Talking-Points

How to present these projects in an interview: what was built, the key decisions
and *why*, the trade-offs, and what I'd change at scale. Structured so you can talk
for 2-3 minutes per project and then go deep on any thread.

---

## Project 1 — React 19 Topics Playground (frontend)
**One-liner**: a React 19 + Vite + TypeScript app that demonstrates every major
React concept as a runnable, navigable topic, backed by React Query talking to a
real API.

**What it shows**: components/hooks, React 19 features (Actions, `useActionState`,
`useOptimistic`, `use`, ref-as-prop, RSC notes), routing, state management
(Zustand + Redux Toolkit), performance (memo, virtualization), forms (RHF + Zod),
testing (Vitest + RTL), and React Query (queries, mutations, pagination, infinite,
optimistic).

**Key decisions + why**
- **React Query for server state, not Redux** — most "global state" is really
  server cache; a cache library gives dedup/refetch/stale-while-revalidate for free
  and eliminates hand-rolled `useEffect` fetching.
- **Zustand vs Redux** — showed both: Zustand for simple global state (no Provider,
  selector re-renders), Redux Toolkit when you need devtools/structure/RTK Query.
- **Shared Zod contract** with the backend — one schema for types + runtime
  validation on both sides so the API contract can't silently drift.

**Trade-offs**: single 534kb bundle (would route-split with `React.lazy` per route
at scale); topic-organized for learning (a product app uses feature-slice folders).

**What I'd do differently at scale**: SSR/RSC via Next.js for SEO + faster first
paint; route-based code splitting; MSW-mocked integration tests + Playwright E2E.

**Likely questions**: reconciliation & keys · why React Query over Redux · Server vs
Client Components · how `useOptimistic` reconciles · virtualization threshold.

---

## Project 2 — NestJS + Prisma + PostgreSQL API (backend)
**One-liner**: a production-shaped NestJS API over PostgreSQL (Prisma) with caching,
background jobs, auth, and observability — plus a DDD hexagonal slice.

**What it shows**: modules/DI, the full request lifecycle (middleware → guard →
interceptor → pipe → filter), DTO/Zod validation, Prisma with real relations
(1-1/1-many/m-n), **Redis cache-aside**, **BullMQ** background jobs, **JWT + RBAC**,
**Prometheus + OpenTelemetry**, GraphQL, and a **DDD Order aggregate** in
hexagonal (ports & adapters) layers.

**Key decisions + why**
- **Cache-aside in Redis** (not in-process) — shared + consistent across instances;
  invalidate on write. TTL bounds staleness.
- **BullMQ for async work** — return fast, retry with backoff, DLQ; workers scale
  independently of the API.
- **JWT stateless auth + RBAC guards** — no server session lookup (scales
  horizontally); authorization enforced on the server, never the client.
- **Soft delete** (`deleted_at`) — production data isn't physically deleted;
  reversible + audit-friendly.
- **Hexagonal DDD slice** — domain depends on ports (interfaces); infra are
  adapters, so the DB/broker is swappable and the domain is unit-testable.
- **Global exception filter + request-id + metrics** — consistent error contract,
  correlated logs, RED metrics.

**Trade-offs**: JWT can't be revoked before expiry (mitigate with short expiry +
refresh rotation + a denylist); Redis adds an operational dependency; DDD is
overhead for simple CRUD (used it on the one aggregate that has real invariants).

**What I'd do differently at scale**: refresh-token rotation + httpOnly cookies;
outbox pattern for atomic state-change + event publish; read replicas + PgBouncer;
OTLP export to Jaeger/Tempo instead of console.

**Likely questions**: cache invalidation strategy · at-least-once + idempotent jobs
· JWT storage (cookie vs localStorage) · isolation levels · N+1 · what an aggregate
is · expand-contract migrations.

**Bugs I found by testing live** (good story): the global exception filter,
throttler, and logging interceptor all assumed an HTTP request and broke under
GraphQL — fixed by making them context-aware. Shows I test the seams, not just the
happy path.

---

## Project 3 — NestJS Kafka Microservices (distributed)
**One-liner**: an event-driven e-commerce checkout across 5 services (gateway,
products, orders, inventory, payment) on Kafka, with a **saga** + compensation and
real-time status pushed to the browser.

**What it shows**: sync RPC (pricing, order creation) vs async events (the saga);
Kafka topics/partitions/consumer-groups; **choreographed saga** with **compensating
transactions** (release stock on payment failure); **idempotent consumers**
(at-least-once); an **event envelope with a correlation id** for tracing; WebSocket
push; shared contracts lib; Docker/CI/k8s.

**Key decisions + why**
- **Events over sync chains for the workflow** — a sync A→B→C→D chain adds latency
  and cascades failures; events decouple services and the broker buffers work.
- **Choreography (not orchestration)** — simple linear flow; orders holds the saga
  state. (I can explain when orchestration wins: complex branching, central control.)
- **Database-per-service** — each owns its data; no cross-service joins; consistency
  is eventual, coordinated by the saga.
- **Idempotency + correlation id** — Kafka is at-least-once, so consumers dedup by
  event id; the correlation id threads one checkout across all services' logs.

**Trade-offs**: eventual consistency (the order is briefly PENDING); choreography's
flow is emergent (harder to see end-to-end than orchestration); in-memory stores in
the demo (a real system uses a DB + the outbox pattern per service).

**What I'd do differently at scale**: outbox pattern for atomic publish; OTel trace
propagation through Kafka headers; schema registry for event versioning; a DLQ topic
+ retry policy; orchestration if the flow grows branches.

**Likely questions**: saga vs 2PC · choreography vs orchestration · exactly-once vs
at-least-once · why idempotency · partition/ordering/consumer-group mechanics · how
you'd trace a request across services.

---

## Cross-cutting themes to weave in
- **"Right tool, not most tools"** — React Query for server state, Zustand vs Redux
  by need, sync vs async by whether you need an immediate answer.
- **Design for failure** — retries+backoff, circuit breaker, idempotency, DLQ,
  graceful degradation; partial failure is the normal state of a distributed system.
- **Consistency is a choice** — strong within an aggregate/DB; eventual across
  services (saga), with the trade-offs stated.
- **Observability first** — correlation id + metrics + tracing aren't add-ons.
- **Start simple** — modular monolith before microservices; extract along proven
  bounded contexts.
