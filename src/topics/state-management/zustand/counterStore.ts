/**
 * ZUSTAND — store definition
 * --------------------------
 * Zustand is a tiny, unopinionated global state-management library. State lives in
 * a "store" created with create(); components subscribe with a selector hook and
 * re-render only when the selected slice changes (no Provider, no boilerplate,
 * no context needed).
 *
 * Pattern: create<StateShape>()((set, get) => ({ ...state, ...actions }))
 *  - set(partial | fn) updates state (shallow-merged).
 *  - get() reads current state inside actions.
 */

import { create } from "zustand";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>()((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
}));
