/**
 * useSyncExternalStore
 * --------------------
 * The official way to subscribe a component to an EXTERNAL store (one outside
 * React: a browser API, a redux-like store, an event emitter) safely with
 * concurrent rendering. Libraries like Zustand/Redux use it internally.
 *
 * useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
 *  - subscribe(cb)   : register cb to run when the store changes; return unsubscribe.
 *  - getSnapshot()   : return the current value (must be referentially stable).
 *
 * Below: subscribe to the browser's online/offline status.
 */

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export function UseSyncExternalStoreDemo() {
  const isOnline = useSyncExternalStore(
    subscribe,
    () => navigator.onLine, // client snapshot
    () => true // server snapshot (SSR fallback)
  );

  return <p>Network status: {isOnline ? "🟢 online" : "🔴 offline"}</p>;
}
