/**
 * useReducer
 * ----------
 * useReducer manages state via a pure reducer function (state, action) => newState.
 * Prefer it over useState when state logic is complex, involves multiple
 * sub-values, or the next state depends on the previous one in non-trivial ways.
 * It centralizes transitions and makes them testable.
 *
 * Returns [state, dispatch]. You call dispatch(action) to trigger a transition.
 */

import { useReducer } from "react";

type State = { count: number };
type Action = { type: "inc" } | { type: "dec" } | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "inc":
      return { count: state.count + 1 };
    case "dec":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

export function UseReducerDemo() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "dec" })}>-</button>
      <button onClick={() => dispatch({ type: "inc" })}>+</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
