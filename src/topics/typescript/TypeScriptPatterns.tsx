/**
 * TYPESCRIPT PATTERNS IN REACT
 * ----------------------------
 * Type architecture an interviewer probes:
 *  1. GENERIC COMPONENTS — reusable, type-safe over their data (<List<T>/>).
 *  2. DISCRIMINATED UNIONS — model mutually-exclusive states (loading/error/ok)
 *     so impossible states are unrepresentable; TS narrows by the tag field.
 *  3. TYPED PROPS via utility types — Pick/Omit/Partial, extending intrinsic
 *     element props (React.ComponentProps<'button'>).
 */

/* 1. Generic component */
interface ListProps<T> {
  items: T[];
  render: (item: T) => React.ReactNode;
}
function List<T>({ items, render }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{render(item)}</li>
      ))}
    </ul>
  );
}

/* 2. Discriminated union for async state */
type Async<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ok"; data: T };

function AsyncView({ state }: { state: Async<string[]> }) {
  // TS narrows on `status` — accessing state.data in "loading" is a compile error.
  switch (state.status) {
    case "loading":
      return <p>Loading…</p>;
    case "error":
      return <p style={{ color: "salmon" }}>{state.message}</p>;
    case "ok":
      return <p>Loaded {state.data.length} items</p>;
  }
}

/* 3. Extending intrinsic element props + utility types */
type ButtonProps = React.ComponentProps<"button"> & { variant?: "primary" | "ghost" };
function Button({ variant = "primary", ...rest }: ButtonProps) {
  return <button data-variant={variant} {...rest} />;
}

export function TypeScriptPatternsDemo() {
  const state: Async<string[]> = { status: "ok", data: ["a", "b", "c"] };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <List items={[1, 2, 3]} render={(n) => <b>#{n}</b>} />
      <AsyncView state={state} />
      <Button variant="ghost">Typed button</Button>
    </div>
  );
}
