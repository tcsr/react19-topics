/**
 * useActionState (React 19)
 * -------------------------
 * useActionState manages state produced by a form Action, plus the pending state,
 * in one hook. It replaces the old pattern of separate useState for result +
 * loading + error.
 *
 * const [state, formAction, isPending] = useActionState(actionFn, initialState)
 *  - actionFn(previousState, formData) => nextState   (can be async)
 *  - state       : latest value returned by the action
 *  - formAction  : pass to <form action={formAction}>
 *  - isPending   : true while the action is running
 */

import { useActionState } from "react";

type Result = { message: string };

export function UseActionStateDemo() {
  const [state, formAction, isPending] = useActionState<Result, FormData>(
    async (_prev, formData) => {
      const name = String(formData.get("name") ?? "");
      await new Promise((r) => setTimeout(r, 600)); // fake async
      if (!name) return { message: "Name is required" };
      return { message: `Hello, ${name}!` };
    },
    { message: "" }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Your name" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Greet"}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}
