/**
 * CUSTOM HOOKS — showcase
 * -----------------------
 * Demonstrates several reusable custom hooks. Each shares LOGIC (not state):
 *   useLocalStorage  — persist state to localStorage
 *   useToggle        — boolean toggle
 *   useDebounce      — debounced value
 *   usePrevious      — previous render's value
 */

import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useToggle } from "./useToggle";
import { useDebounce } from "./useDebounce";
import { usePrevious } from "./usePrevious";

export function CustomHookDemo() {
  const [name, setName] = useLocalStorage("demo:name", "");
  const { on, toggle } = useToggle();

  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 500);

  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div>
        <strong>useLocalStorage</strong>
        <br />
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="persists on reload" />
        <p>Saved: {name || "(empty)"}</p>
      </div>

      <div>
        <strong>useToggle</strong>
        <br />
        <button onClick={toggle}>{on ? "ON" : "OFF"}</button>
      </div>

      <div>
        <strong>useDebounce</strong>
        <br />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="type fast" />
        <p>Debounced (500ms): {debounced || "(empty)"}</p>
      </div>

      <div>
        <strong>usePrevious</strong>
        <br />
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
        <p>now: {count} — previous: {prevCount ?? "—"}</p>
      </div>
    </div>
  );
}
