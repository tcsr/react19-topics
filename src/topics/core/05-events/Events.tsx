/**
 * EVENT HANDLING
 * --------------
 * React attaches events via camelCase props (onClick, onChange, onSubmit...).
 * You pass a function reference, not a call. Handlers receive a SyntheticEvent —
 * a cross-browser wrapper around the native event with the same interface.
 *
 * Call event.preventDefault() to stop default browser behavior (e.g. form submit
 * reloading the page).
 */

import { useState } from "react";

export function Events() {
  const [text, setText] = useState("");

  // Typed event handlers (TS): note the specific event types.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent full page reload
    alert(`Submitted: ${text}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={handleChange} placeholder="Type..." />
      <button type="submit">Send</button>
    </form>
  );
}
