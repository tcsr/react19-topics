# Hooks — Study Notes

Demos: `src/topics/hooks`

## Rules of Hooks
- Call only at **top level** (no conditions/loops/nested fns) and only from
  components or custom hooks. React tracks hooks **by call order**.
- **Gotcha**: conditional hook call shifts order → state maps to wrong hook.

## useState
- **Def**: local reactive state → `[value, setter]`.
- **Key points**: use **updater** `set(p => ...)` when next depends on prev; lazy
  init `useState(() => expensive())`; state updates are async/batched.
- **Gotcha**: reading state right after `setState` gives the **old** value (this
  render's closure).
- **Quick Q**: Why updater form? → Avoids stale closures + batches correctly.

## useEffect
- **Def**: sync with external systems after render/commit.
- **Key points**: deps `[]` = mount once; `[a]` = on change; none = every render;
  **return cleanup**. StrictMode runs it twice in dev.
- **Gotcha**: missing deps → stale values; object/array deps → new identity each
  render → effect loops.
- **Quick Q**: When cleanup runs? → Before next effect run + on unmount.
- **Anti-pattern**: fetching in useEffect by hand → use a data lib (React Query).

## useRef
- **Def**: mutable `{current}` persisting across renders, **no** re-render.
- **Uses**: DOM access; store mutable value (timer id, prev value, flag).
- **Gotcha**: changing `.current` does NOT re-render — don't use for display state.

## useContext
- **Def**: read a Provider value without prop drilling.
- **Key points**: DI mechanism, not a state manager; **all consumers re-render** on
  value change → split contexts / memoize value.
- **Quick Q**: Context perf issue? → Every consumer re-renders on any change.

## useReducer
- **Def**: state via `(state, action) => newState`; `[state, dispatch]`.
- **When**: complex/multi-field state or intricate transitions; testable reducers.
- **Quick Q**: vs useState? → Reducer centralizes complex transition logic.

## useMemo / useCallback
- **useMemo** caches a **value**; **useCallback** caches a **function identity**.
- **When**: genuinely expensive calc, or stable props for `React.memo` children.
- **Gotcha**: over-memoizing costs more than it saves; wrong deps = stale.

## useId
- SSR-safe unique id for a11y linking (label/aria). **Not** for list keys.

## useLayoutEffect
- Sync, **before paint** — measure DOM without flicker. Blocks paint; prefer
  useEffect unless you must read layout pre-paint.

## useImperativeHandle
- Expose a small imperative API to a parent via ref (focus/scroll/play). Use
  sparingly. React 19: ref is a normal prop (no forwardRef).

## useSyncExternalStore
- Subscribe to an **external** store safely under concurrency
  (`subscribe`, `getSnapshot`). Redux/Zustand use it internally.

## Custom hooks
- `use*` function calling hooks → shares **logic, not state**. Each caller gets
  isolated state. Examples: useLocalStorage, useToggle, useDebounce, usePrevious.
