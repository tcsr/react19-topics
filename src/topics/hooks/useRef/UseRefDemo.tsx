/**
 * useRef
 * ------
 * useRef returns a mutable container { current } that persists across renders and
 * does NOT trigger a re-render when changed. Two main uses:
 *  1. Access a DOM node directly (focus, measure, play/pause media).
 *  2. Store a mutable value between renders without causing re-renders
 *     (previous value, timer id, instance flag).
 */

import { useRef } from "react";

export function UseRefDemo() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus(); // imperative DOM access
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Click button to focus me" />
      <button onClick={focusInput}>Focus input</button>
    </div>
  );
}
