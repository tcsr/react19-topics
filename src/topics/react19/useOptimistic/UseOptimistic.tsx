/**
 * useOptimistic (React 19)
 * ------------------------
 * useOptimistic shows an immediate, "optimistic" UI update while an async action
 * is still in flight, then reconciles with the real result when it resolves (or
 * rolls back automatically if the action's state reverts).
 *
 * const [optimisticState, addOptimistic] = useOptimistic(actualState, updateFn)
 *  - optimisticState : what to render right now (real state + pending optimistic)
 *  - addOptimistic   : call inside an action to apply the optimistic change
 *  - updateFn(current, optimisticValue) => merged view
 */

import { useOptimistic, useState, useRef } from "react";

export function UseOptimisticDemo() {
  const [messages, setMessages] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (current, newMsg: string) => [...current, `${newMsg} (sending...)`]
  );

  async function send(formData: FormData) {
    const text = String(formData.get("msg") ?? "");
    if (!text) return;
    addOptimistic(text);              // instant UI
    formRef.current?.reset();
    await new Promise((r) => setTimeout(r, 900)); // fake network
    setMessages((m) => [...m, text]); // confirmed state
  }

  return (
    <div>
      <ul>
        {optimisticMessages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
      <form action={send} ref={formRef}>
        <input name="msg" placeholder="Message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
