# Future Integrations (planned)

Placeholders for the next phases. Each subfolder gets real code when we wire it up.

## `react-query/` ✅ DONE
TanStack React Query — implemented in `src/topics/react-query` (basic query,
dependent query, pagination, infinite, mutation + invalidation, optimistic).
Currently talks to JSONPlaceholder via `src/lib/api.ts`; swap BASE_URL to the
NestJS API in the next phase.

## `nestjs-api/`
NestJS backend (Node) — modular controllers/services/providers, DI, DTOs +
validation, guards/interceptors. Exposes REST (and/or GraphQL) consumed by React
Query.

## `postgresql/`
PostgreSQL relational database. Accessed from NestJS via an ORM (TypeORM/Prisma).
Migrations, entities, relations.

## `redis-cache/`
Redis in-memory cache in front of PostgreSQL/expensive work. Cache-aside pattern,
TTLs, invalidation on writes. Also usable as a session/queue store.

## `async-eventbridge/`
Asynchronous / event-driven programming. AWS EventBridge (or a message
broker) to decouple services: publish domain events, fan out to consumers,
schedule jobs. Pairs with Redis/queues for background processing.
