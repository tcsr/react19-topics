/**
 * useEffect
 * ---------
 * useEffect lets a component synchronize with external systems (network, DOM,
 * timers, subscriptions) AFTER render. It runs side effects that shouldn't happen
 * during render.
 *
 * Signature: useEffect(setup, deps?)
 *  - setup runs after commit; it may return a CLEANUP function.
 *  - deps array controls when it re-runs:
 *      []          -> run once after mount (cleanup on unmount)
 *      [a, b]      -> run whenever a or b changes
 *      omitted     -> run after every render
 *
 * Always clean up subscriptions/timers to avoid leaks. In React 19 + StrictMode
 * (dev) effects run twice on mount to surface missing cleanup.
 */

import { useEffect, useState } from "react";

export function UseEffectDemo() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id); // cleanup prevents multiple timers
  }, []); // run once on mount

  return <p>Elapsed: {seconds}s</p>;
}
