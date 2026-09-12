# Node.js Quick-Hits

## Event loop
- Single JS thread + non-blocking I/O (libuv). Phases: timers → poll → check →
  close; microtasks (`process.nextTick` > promises) drain between them.
- CPU-bound work blocks everyone → offload to **worker_threads** or a queue.
- `setTimeout(0)` = timers; `setImmediate` = check; inside an I/O callback
  `setImmediate` beats `setTimeout(0)`.

## Async patterns
- Callbacks (error-first `cb(err, val)`) → Promises → async/await.
- `Promise.all` (fail-fast) / `allSettled` (all results) / `race` / `any`.
- Parallelize independent awaits with `Promise.all` (don't `await` in series).

## Streams (relevant to a streaming company)
- Process data in chunks, constant memory: Readable / Writable / Duplex /
  **Transform** (gzip, hashing). `pipeline()` handles **backpressure** + errors +
  cleanup. Use for large files / proxying media / big responses.
```js
import { pipeline } from "node:stream/promises";
await pipeline(readStream, gzipTransform, writeStream);
```

## EventEmitter
- Core pub/sub (`on`/`once`/`emit`/`off`); basis of streams/servers. Add an
  `'error'` listener or an unhandled error throws.

## HTTP / API / BFF
- `http.createServer` is what Express/Nest wrap. A **BFF** aggregates services +
  holds secrets for one frontend.
- Handling **match-time spikes**: horizontal scale (stateless nodes), caching
  (Redis/CDN), rate limiting, connection pooling, graceful degradation, queues for
  slow work.

## Error handling & ops
- try/catch around await; don't swallow. `unhandledRejection`/`uncaughtException`
  = log + exit (don't keep running in unknown state).
- Graceful shutdown on SIGTERM: stop accepting, drain, close DB/sockets.
- Env config (12-factor), structured logging + request/correlation id.

## Quick Q
- Why is Node good for I/O-heavy (streaming/APIs)? → Non-blocking event loop handles
  many concurrent connections on one thread.
- CPU-bound task in Node? → worker_threads / separate service; don't block the loop.
- Backpressure? → `pipeline`/`pipe` pauses the source when the sink is slow.
