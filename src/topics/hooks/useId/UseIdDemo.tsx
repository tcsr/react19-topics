/**
 * useId
 * -----
 * useId generates a unique, stable ID that is consistent between server and client
 * (SSR-safe). Use it to link elements for accessibility (label htmlFor / aria-*),
 * NOT for list keys. Call it once and derive suffixes for multiple related fields.
 */

import { useId } from "react";

export function UseIdDemo() {
  const id = useId();
  return (
    <div>
      <label htmlFor={`${id}-email`}>Email </label>
      <input id={`${id}-email`} type="email" />
      <p style={{ color: "#94a3b8" }}>Generated id: {id}</p>
    </div>
  );
}
