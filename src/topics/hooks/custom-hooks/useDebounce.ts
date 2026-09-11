/**
 * useDebounce — returns a value that only updates after `delay` ms of no changes.
 * Useful for search-as-you-type to avoid firing on every keystroke.
 */
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // cancel pending update on change/unmount
  }, [value, delay]);

  return debounced;
}
