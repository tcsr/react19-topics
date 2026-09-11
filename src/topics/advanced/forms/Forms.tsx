/**
 * FORMS: CONTROLLED vs UNCONTROLLED
 * ---------------------------------
 * CONTROLLED: React state is the single source of truth. The input's value comes
 * from state and every keystroke updates state via onChange. Predictable, easy to
 * validate/transform.
 *
 * UNCONTROLLED: the DOM holds the value; you read it when needed via a ref (or
 * FormData on submit). Less code, closer to plain HTML. React 19 Actions make the
 * uncontrolled + FormData style very ergonomic.
 */

import { useRef, useState } from "react";

export function FormsDemo() {
  // Controlled input
  const [controlled, setControlled] = useState("");
  // Uncontrolled input
  const uncontrolledRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div>
        <label>Controlled: </label>
        <input value={controlled} onChange={(e) => setControlled(e.target.value)} />
        <span> → {controlled}</span>
      </div>

      <div>
        <label>Uncontrolled: </label>
        <input ref={uncontrolledRef} defaultValue="edit me" />
        <button onClick={() => alert(uncontrolledRef.current?.value)}>Read value</button>
      </div>
    </div>
  );
}
