/**
 * HOOK UNIT TEST — renderHook + act.
 * Tests a custom hook in isolation without a component.
 */
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useToggle } from "../hooks/custom-hooks/useToggle";

describe("useToggle", () => {
  it("defaults to false and flips", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.on).toBe(false);

    act(() => result.current.toggle());
    expect(result.current.on).toBe(true);
  });

  it("honors initial value", () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current.on).toBe(true);
  });
});
