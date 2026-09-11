/**
 * React.memo & RECONCILIATION
 * ---------------------------
 * RECONCILIATION: when state/props change, React re-renders the component and
 * DIFFS the new element tree against the previous one (the "virtual DOM"), then
 * applies the minimal set of real DOM mutations. `key` tells React which list
 * items are the same across renders so it can move rather than recreate them.
 *
 * By default a parent re-render re-renders ALL children. React.memo(Component)
 * memoizes a child so it re-renders only when its PROPS change (shallow compare).
 * Combine with useCallback/useMemo to keep prop identities stable.
 *
 * The counter below shows: the memoized child logs a render only when ITS prop
 * changes, not when the parent's unrelated state updates.
 */

import { memo, useCallback, useState } from "react";

// Memoized child: re-renders only when `label` changes (onClick is stable).
const Child = memo(function Child({ label, onClick }: { label: string; onClick: () => void }) {
  console.log("Child render:", label); // watch the console
  return <button onClick={onClick}>Child: {label}</button>;
});

export function MemoReconciliationDemo() {
  const [parentCount, setParentCount] = useState(0);
  const [label, setLabel] = useState("A");

  // Stable identity so memo isn't defeated.
  const handleChildClick = useCallback(() => setLabel((l) => (l === "A" ? "B" : "A")), []);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p>Parent count: {parentCount} (updating this does NOT re-render Child)</p>
      <button onClick={() => setParentCount((c) => c + 1)}>Bump parent</button>
      <Child label={label} onClick={handleChildClick} />
      <p style={{ color: "#94a3b8" }}>Open console: Child logs only when its label prop flips.</p>
    </div>
  );
}
