# Fiber, Reconciliation & Concurrency

## Reconciliation & the Virtual DOM

- React keeps an in-memory tree of elements (the "virtual DOM").
- On state/prop change it re-renders to a new tree and **diffs** it against the old
  one, then commits the **minimal** real-DOM mutations.
- Diffing is O(n) via heuristics:
  1. Different element **type** → tear down subtree, rebuild.
  2. Same type → keep node, update changed props.
  3. Lists → match children by **`key`**. Stable keys let React move nodes instead
     of destroying/recreating. Index-as-key breaks on reorder/insert.

## Fiber architecture

- **Fiber** = React's reimplemented reconciler (React 16+). Each element has a
  fiber node — a unit of work holding state, effects, and pointers (child, sibling,
  return).
- Work is **incremental and interruptible**: React can render part of the tree,
  yield to the browser (for input/paint), then resume. Old (stack) reconciler was
  synchronous and blocking.
- Two phases:
  - **Render/reconcile** (interruptible, no side effects) — builds the work-in-
    progress tree.
  - **Commit** (synchronous, uncancellable) — applies DOM mutations, runs effects.

## Lanes & priority

- Updates are assigned **lanes** (priority bitmask). High-priority (user input,
  discrete events) preempts low-priority (transitions, offscreen).
- This is what makes `useTransition` / `useDeferredValue` work — they mark updates
  as low-priority so typing stays responsive (see `src/topics/react19/transitions`).

## Automatic batching (React 18+)

- Multiple `setState` calls in the same tick are batched into **one** re-render —
  now including inside promises, timeouts, and native event handlers (not just
  React events, as pre-18). Use `flushSync` to opt out when you must.

## Concurrent features (built on the above)

- `startTransition` / `useTransition` — non-urgent updates.
- `useDeferredValue` — lagging copy of a value.
- `<Suspense>` — coordinate loading states; enables streaming + selective hydration.
- `use()` — read promises/context, integrates with Suspense.

## Interview signals

- "Virtual DOM is faster" is imprecise — it's about **minimizing + batching**
  mutations and enabling **interruptible** rendering, not raw speed.
- Explain why `key` matters and why index keys are a bug source.
- Render phase must be **pure** (no side effects) precisely because it can be
  interrupted, restarted, or discarded.
