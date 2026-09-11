/**
 * useMemo & useCallback
 * ---------------------
 * Both cache something between renders to avoid unnecessary work, recomputing only
 * when their dependency array changes.
 *
 *  - useMemo(fn, deps)      -> caches the RETURNED VALUE of an expensive calc.
 *  - useCallback(fn, deps)  -> caches the FUNCTION itself (stable identity), so
 *                              child components wrapped in React.memo don't
 *                              re-render just because a new function was created.
 *
 * Don't over-use: memoization has its own cost. Reach for it for genuinely
 * expensive computations or to keep referential stability for memoized children.
 */

import { useCallback, useMemo, useState } from "react";

export function MemoizationHooks() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  // Recomputed only when `count` changes, not when `text` changes.
  const factorial = useMemo(() => {
    let r = 1;
    for (let i = 2; i <= count; i++) r *= i;
    return r;
  }, [count]);

  // Stable function reference across renders (deps: none).
  const increment = useCallback(() => setCount((c) => c + 1), []);

  return (
    <div>
      <p>{count}! = {factorial}</p>
      <button onClick={increment}>+1</button>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="type (won't recompute)" />
    </div>
  );
}
