/**
 * CODE SPLITTING: React.lazy & Suspense
 * -------------------------------------
 * React.lazy lets you load a component's code only when it's first rendered
 * (a separate JS chunk), shrinking the initial bundle. <Suspense> declares the
 * loading UI (fallback) shown while the lazy component (or any suspending
 * resource, e.g. use(promise)) is not ready.
 *
 * Suspense is also the mechanism behind data-fetching with use() and streaming SSR.
 */

import { lazy, Suspense } from "react";

// Dynamically imported: becomes its own chunk, loaded on demand.
const LazyBox = lazy(() => import("./LazyBox"));

export function LazySuspenseDemo() {
  return (
    <Suspense fallback={<p>Loading component…</p>}>
      <LazyBox />
    </Suspense>
  );
}
