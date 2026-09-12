# DAZN-Specific Angles & Session Plan

> Educated guess, not insider info. DAZN = global live-sports streaming: massive
> match-time concurrency, multi-device (web/mobile/smart-TV/console), latency- +
> performance-critical, i18n. React + TypeScript + Node.

## Domain angles to weave into answers
- **Match-time traffic spikes** → stateless horizontal scaling, CDN + cache, rate
  limiting, queues for slow work, graceful degradation.
- **Multi-device / TV** → responsive + 10-foot UI, **keyboard/remote accessibility**,
  focus management.
- **Live/real-time data** (scores, availability) → polling vs **SSE** (one-way) vs
  **WebSocket** (bidirectional); pick SSE/WS for live, polling for simple.
- **Large catalogs / EPG** → **virtualization** + code-splitting + lazy images.
- **Streaming/latency** → Node streams + backpressure; CDN edge; minimize main-thread
  work (INP).
- **Global / i18n** → locale, RTL, number/date formats, per-region content.
- **Performance budget** → Core Web Vitals (LCP hero/poster, CLS reserve space, INP).

## Likely 1-hour split
- ~25-30 min rapid Q&A across JS/TS, HTML/CSS, React, Node (expect "why" + follow-ups).
- ~30 min live coding (share screen): most likely a **JS util** (debounce/throttle/
  Promise.all) or a **React component** (debounced search / live-polling widget), or
  a medium algorithm.

## Highest-ROI prep order (this pack)
1. `01-js-implement-utils` — write debounce/throttle/Promise.all/EventEmitter/deepClone from memory.
2. `03-react-drills` — debounced search + live-polling `useInterval` + memoization.
3. `02-event-loop-puzzles` — narrate micro/macrotask ordering.
4. `07-ds-patterns` — 10-15 easy/medium in JS, timed, out loud.
5. `04/05/06 quick-hits` — TS unions/generics, flex/grid + a11y + reflow-vs-repaint,
   Node streams/event-loop.

## Behavioral one-liners (have ready)
- A perf problem you fixed (what you measured, what you changed, the result).
- A tricky bug (how you isolated it) — e.g. "guards/filters assumed HTTP, broke under
  GraphQL; made them context-aware."
- A trade-off you made under time pressure.

## During coding — the winning habits
Clarify → state approach + Big-O → code cleanly narrating → test edge cases →
mention improvements. Communication is scored as much as the solution.
