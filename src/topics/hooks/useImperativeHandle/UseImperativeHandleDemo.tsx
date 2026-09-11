/**
 * useImperativeHandle
 * -------------------
 * useImperativeHandle customizes the value exposed to a parent through a ref,
 * letting a child publish a small imperative API (methods) instead of its raw DOM
 * node. Use sparingly — prefer props/state; reach for it for focus, scroll,
 * animations, or media controls.
 *
 * React 19: `ref` is a normal prop, so no forwardRef needed.
 */

import { useImperativeHandle, useRef } from "react";

interface InputHandle {
  focus: () => void;
  clear: () => void;
}

function TextField({ ref }: { ref?: React.Ref<InputHandle> }) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Expose only focus() and clear() to the parent — not the whole DOM node.
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) inputRef.current.value = "";
    },
  }));

  return <input ref={inputRef} placeholder="Controlled imperatively" />;
}

export function UseImperativeHandleDemo() {
  const handleRef = useRef<InputHandle>(null);
  return (
    <div>
      <TextField ref={handleRef} />
      <button onClick={() => handleRef.current?.focus()}>Focus</button>
      <button onClick={() => handleRef.current?.clear()}>Clear</button>
    </div>
  );
}
