# API Layer Architecture

## REST vs GraphQL

| | REST | GraphQL |
|---|---|---|
| Shape | Resource endpoints | Single endpoint, client-specified query |
| Over/under-fetching | Common | Client asks for exactly what it needs |
| Versioning | URL/header versions | Schema evolution + deprecations |
| Caching | HTTP cache friendly (URLs) | Needs client cache (Apollo/urql) |
| Complexity | Simple | Server resolvers, N+1 risk, query cost limits |
| Best for | CRUD, public APIs, caching | Many clients / varied data needs, aggregation |

Not either/or — pick per product. GraphQL shines aggregating many services; REST is
simpler and cache-friendly.

## BFF (Backend For Frontend)

A thin server dedicated to one frontend that:
- Aggregates/reshapes multiple downstream services into UI-friendly responses.
- Holds **secrets** and does token exchange (keeps them out of the browser).
- Handles auth cookies, rate limiting, and per-client concerns.

In the next phase, **NestJS acts as the BFF/API** over PostgreSQL + Redis.

## Client-side API concerns

- **Interceptors** (axios) / middleware: attach auth headers, refresh on 401,
  add correlation IDs, centralize error mapping.
- **Error contract**: standardize server errors `{ code, message, details }`; map
  to typed client errors and user-facing messages.
- **Cancellation**: `AbortController` to cancel stale requests (React Query does
  this for you).
- **Retries + backoff** for idempotent/transient failures (see
  `src/topics/advanced/error-observability`).
- **Timeouts** and **circuit breaking** for resilience.
- **Contract typing**: share types via **Zod** schemas or OpenAPI/GraphQL codegen
  so client and server agree (see `src/topics/advanced/zod-validation`).

## Interview signals

- Justify REST vs GraphQL by client diversity + caching, not hype.
- BFF for secret-keeping and aggregation.
- Centralize cross-cutting concerns (auth, errors, retries) in one layer.
