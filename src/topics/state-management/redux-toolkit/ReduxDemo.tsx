/**
 * RTK + RTK QUERY — consuming
 * ---------------------------
 * useSelector reads store state; useDispatch dispatches actions. RTK Query's
 * auto-generated hook (useGetTodoQuery) handles fetch + cache + loading/error.
 * Self-contained: wraps its own <Provider store>. In a real app the Provider
 * lives once at the app root.
 */

import { Provider, useDispatch, useSelector } from "react-redux";
import { store, incremented, addedBy, useGetTodoQuery, type RootState, type AppDispatch } from "./store";

function Counter() {
  const value = useSelector((s: RootState) => s.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <strong>RTK slice</strong>
      <p>value: {value}</p>
      <button onClick={() => dispatch(incremented())}>+1</button>
      <button onClick={() => dispatch(addedBy(5))}>+5</button>
    </div>
  );
}

function TodoFetcher() {
  // RTK Query: auto loading/error/data + cache.
  const { data, isLoading, isError } = useGetTodoQuery(1);
  return (
    <div>
      <strong>RTK Query</strong>
      {isLoading && <p>Loading…</p>}
      {isError && <p>Error.</p>}
      {data && <p>Todo #{data.id}: {data.title}</p>}
    </div>
  );
}

export function ReduxDemo() {
  return (
    <Provider store={store}>
      <div style={{ display: "grid", gap: 14 }}>
        <Counter />
        <TodoFetcher />
      </div>
    </Provider>
  );
}
