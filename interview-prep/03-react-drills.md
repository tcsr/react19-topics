# React Coding Drills

Common frontend build-tasks, solved. Practice typing these fast + explaining.

## Debounced search (autocomplete) — very likely
```tsx
import { useState, useEffect, useRef } from "react";

function useDebounced<T>(value: T, delay = 300): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id); // cancel on change/unmount
  }, [value, delay]);
  return v;
}

export function Search() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const debounced = useDebounced(q, 400);

  useEffect(() => {
    if (!debounced) { setResults([]); return; }
    const ctrl = new AbortController();               // cancel stale request
    fetch(`/api/search?q=${encodeURIComponent(debounced)}`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then(setResults)
      .catch((e) => { if (e.name !== "AbortError") console.error(e); });
    return () => ctrl.abort();
  }, [debounced]);

  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." />
      <ul>{results.map((r) => <li key={r}>{r}</li>)}</ul>
    </div>
  );
}
```
- Talk about: debounce to cut requests, **AbortController** to avoid race/stale
  results, cleanup, key on stable id.

## Live-updating widget (polling scores) — DAZN-flavored
```tsx
function useInterval(cb: () => void, ms: number | null) {
  const saved = useRef(cb);
  useEffect(() => { saved.current = cb; }, [cb]);       // always latest cb
  useEffect(() => {
    if (ms === null) return;                            // pause when null
    const id = setInterval(() => saved.current(), ms);
    return () => clearInterval(id);
  }, [ms]);
}
// usage: useInterval(() => refetchScore(), isLive ? 5000 : null);
```
- Real-time options to mention: polling (simple) vs **SSE** (one-way live) vs
  **WebSocket** (bidirectional). For live scores, SSE/WebSocket beats polling.

## useFetch (loading/error/data)
```tsx
function useFetch<T>(url: string) {
  const [state, setState] = useState<{ loading: boolean; error?: string; data?: T }>({ loading: true });
  useEffect(() => {
    const ctrl = new AbortController();
    setState({ loading: true });
    fetch(url, { signal: ctrl.signal })
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((data) => setState({ loading: false, data }))
      .catch((e) => { if (e.name !== "AbortError") setState({ loading: false, error: e.message }); });
    return () => ctrl.abort();
  }, [url]);
  return state;
}
```

## Prevent needless re-renders
```tsx
const Row = React.memo(function Row({ item, onPick }: { item: Item; onPick: (id: string) => void }) {
  return <li onClick={() => onPick(item.id)}>{item.name}</li>;
});

function List({ items }: { items: Item[] }) {
  const onPick = useCallback((id: string) => console.log(id), []); // stable identity
  return <ul>{items.map((i) => <Row key={i.id} item={i} onPick={onPick} />)}</ul>;
}
```
- `React.memo` + `useCallback` so rows don't re-render when the parent updates.

## Long lists → virtualization (talk, don't hand-roll)
- Thousands of rows (catalog / EPG): render only visible rows with `react-window`
  (`FixedSizeList`). Constant DOM size regardless of list length.

## Controlled form + validation (quick)
```tsx
function Form() {
  const [email, setEmail] = useState("");
  const valid = /^\S+@\S+$/.test(email);
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (valid) alert(email); }}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      {!valid && email && <span>Invalid email</span>}
      <button disabled={!valid}>Submit</button>
    </form>
  );
}
```

## Talking points they'll dig into
- Why the `useEffect` cleanup (cancel timers/requests/subscriptions).
- Reconciliation + **why keys** (stable ids, not index).
- When to memoize (measure first; stable props for memoized children).
- Data fetching: loading/error/empty states, cancellation, caching (React Query).
