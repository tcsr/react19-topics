/**
 * ZUSTAND — consuming the store
 * -----------------------------
 * Subscribe with a SELECTOR so a component re-renders only when its slice changes.
 * Two sibling components below share the SAME global state with no Provider — the
 * store is a module-level singleton.
 */

import { useCounterStore } from "./counterStore";

// Reads only `count` — re-renders only when count changes.
function CountDisplay() {
  const count = useCounterStore((s) => s.count);
  return <p>Global count: {count}</p>;
}

// Reads only the actions — stable, so this never re-renders on count change.
function Controls() {
  const increment = useCounterStore((s) => s.increment);
  const decrement = useCounterStore((s) => s.decrement);
  const reset = useCounterStore((s) => s.reset);
  return (
    <div>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export function ZustandDemo() {
  return (
    <div>
      <CountDisplay />
      <Controls />
      <p style={{ color: "#94a3b8" }}>
        Both children share one store — no Provider, no prop drilling.
      </p>
    </div>
  );
}
