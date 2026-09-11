/**
 * use(promise) + Suspense — data fetching (React 19)
 * --------------------------------------------------
 * use(promise) reads a Promise and SUSPENDS the component until it resolves.
 * <Suspense> shows the fallback meanwhile; an error boundary catches rejection.
 *
 * CRITICAL: the promise must be created OUTSIDE render and cached/stable — if you
 * create a new promise on every render, it suspends forever. In real apps a data
 * library (React Query / RSC framework) provides the stable promise/cache. Here we
 * cache it in a module-level Map.
 */

import { Suspense, use } from "react";

// Simple module-level promise cache keyed by input.
const cache = new Map<string, Promise<string>>();
function getData(key: string): Promise<string> {
  if (!cache.has(key)) {
    cache.set(
      key,
      new Promise<string>((resolve) => setTimeout(() => resolve(`Loaded: ${key}`), 800))
    );
  }
  return cache.get(key)!;
}

function DataView({ id }: { id: string }) {
  const value = use(getData(id)); // suspends until resolved
  return <p>{value}</p>;
}

export function UsePromiseDemo() {
  return (
    <Suspense fallback={<p>Loading via Suspense…</p>}>
      <DataView id="user-1" />
    </Suspense>
  );
}
