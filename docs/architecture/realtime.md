# Real-Time & Event-Driven

## Transport options

| Transport | Direction | Use when |
|---|---|---|
| **Polling** | client pulls on interval | simple, low-frequency updates |
| **Long polling** | client holds request open | fallback where WS blocked |
| **SSE** (Server-Sent Events) | server → client, one-way | live feeds, notifications, logs |
| **WebSocket** | full duplex | chat, collaboration, games, trading |

- **SSE**: HTTP, auto-reconnect, text only, one-way — simplest for server→client
  streams.
- **WebSocket**: bidirectional, low overhead after handshake; needs its own
  scaling/heartbeat/reconnect handling. `socket.io` adds rooms + fallbacks.

## Scaling real-time (server side)

- WebSocket servers are **stateful** (connections pinned to a node). Scale with a
  **Redis pub/sub** backplane so a message on node A reaches clients on node B.
- **Presence / rooms / fan-out** via Redis channels.
- Backpressure: drop/coalesce updates the client can't keep up with.

## Event-driven architecture (the EventBridge phase)

- **Decouple** producers from consumers: a service **publishes a domain event**
  (`OrderPlaced`); interested consumers react independently.
- **EventBridge** (or Kafka/RabbitMQ/SNS+SQS) routes events to targets by rules.
- Benefits: loose coupling, independent scaling, retries/DLQ, audit trail.
- Patterns: **event notification**, **event-carried state transfer**, **event
  sourcing**, **CQRS**, **saga** (distributed transactions).
- **Async processing**: offload slow work (emails, thumbnails, aggregation) to a
  queue/worker; return fast to the user. Pair with Redis for the queue/cache.

## How it reaches the UI

Backend event → worker updates DB/cache → push to client via WebSocket/SSE, or the
client refetches (React Query `invalidateQueries`) on a lightweight "something
changed" signal.

## Interview signals

- SSE for one-way, WebSocket for bidirectional; polling as the simple baseline.
- Real-time at scale needs a Redis backplane because sockets are stateful.
- Events decouple services and enable async/background processing + resilience
  (retries, DLQ, idempotent consumers).
