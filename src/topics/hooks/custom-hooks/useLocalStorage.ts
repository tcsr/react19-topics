/**
 * CUSTOM HOOKS
 * ------------
 * A custom hook is a reusable function whose name starts with "use" and that calls
 * other hooks. It lets you extract and share stateful logic between components
 * without changing their structure. It shares LOGIC, not state — each caller gets
 * its own isolated state.
 *
 * Example below: useLocalStorage syncs a piece of state to window.localStorage.
 */

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage may be unavailable (private mode, quota) */
    }
  }, [key, value]);

  return [value, setValue] as const;
}
