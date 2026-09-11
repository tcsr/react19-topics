/**
 * CONCURRENT UI: useTransition & useDeferredValue
 * -----------------------------------------------
 * These let you keep the UI responsive by marking some updates as non-urgent so
 * React can interrupt them for higher-priority updates (like typing).
 *
 *  - useTransition() -> [isPending, startTransition]. Wrap slow state updates in
 *    startTransition(); React renders them in the background and gives you a
 *    pending flag. In React 19, startTransition can accept an async function
 *    (Actions build on this).
 *
 *  - useDeferredValue(value) -> a deferred copy of a value that "lags behind"
 *    during heavy renders, so the input stays snappy.
 */

import { useState, useTransition, useDeferredValue, useMemo } from "react";

function ExpensiveList({ query }: { query: string }) {
  const deferred = useDeferredValue(query); // lags behind while typing
  const items = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i < 2000; i++) out.push(`${deferred} #${i}`);
    return out;
  }, [deferred]);
  return <p>{items.length} items for "{deferred}"</p>;
}

export function TransitionsDemo() {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value); // urgent: keeps input responsive
          startTransition(() => setQuery(e.target.value)); // non-urgent
        }}
        placeholder="Type fast..."
      />
      {isPending && <span> updating…</span>}
      <ExpensiveList query={query} />
    </div>
  );
}
