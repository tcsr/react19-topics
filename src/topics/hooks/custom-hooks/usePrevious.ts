/**
 * usePrevious — remembers the value from the previous render.
 * Uses a ref (which survives renders without causing re-renders).
 */
import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value; // runs AFTER render, so ref holds the prior value during render
  }, [value]);
  return ref.current;
}
