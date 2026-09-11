/**
 * CONDITIONAL RENDERING & LISTS
 * -----------------------------
 * React renders UI based on data. You choose what to show using normal JS:
 *  - Ternary  cond ? <A/> : <B/>
 *  - Logical  cond && <A/>
 *  - Early return / variable assignment
 *
 * LISTS & KEYS: render arrays with .map(). Each sibling element needs a stable,
 * unique `key` so React can match items across renders and update efficiently.
 * Never use the array index as key when the list can reorder/insert/delete.
 */

const todos = [
  { id: "t1", text: "Learn hooks", done: true },
  { id: "t2", text: "Learn React 19", done: false },
];

export function Rendering() {
  const isLoggedIn = true;

  return (
    <div>
      {/* Ternary */}
      {isLoggedIn ? <p>Welcome back</p> : <p>Please log in</p>}

      {/* Logical AND (renders nothing when false) */}
      {todos.length > 0 && <p>You have {todos.length} todos</p>}

      {/* List with keys */}
      <ul>
        {todos.map((t) => (
          <li key={t.id} style={{ textDecoration: t.done ? "line-through" : "none" }}>
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
