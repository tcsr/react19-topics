# Future Integrations (planned)

Placeholders for the next phases. Each subfolder gets real code when we wire it up.

## `react-query/`
TanStack React Query — server-state management for the client: caching,
background refetch, pagination, mutations, optimistic updates. Will wrap the
React app and talk to the NestJS API.

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
