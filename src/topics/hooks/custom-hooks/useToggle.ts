/**
 * useToggle — boolean state with a memoized toggle/set API.
 * Example of a tiny reusable custom hook.
 */
import { useCallback, useState } from "react";

export function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  return { on, toggle, setOn } as const;
}
