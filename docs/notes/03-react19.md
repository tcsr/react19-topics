# React 19 — Study Notes

Demos: `src/topics/react19`

## Actions
- **Def**: (async) fn wired to `<form action={fn}>`; receives FormData.
- **Key points**: auto pending state, auto form reset (uncontrolled) on success;
  base for useActionState/useFormStatus/useOptimistic. Kills onSubmit boilerplate.
- **Quick Q**: What does a form action receive? → `FormData`.

## useActionState
- `[state, formAction, isPending] = useActionState(fn(prev, formData), init)`.
- Combines result + pending + error in one hook. Pass `formAction` to `<form>`.

## useFormStatus
- Read **parent** form status (`pending`, `data`, ...) from a **child**. Import from
  **`react-dom`**. Must be inside the `<form>`, not the same component rendering it.
- **Use**: reusable submit button that knows it's submitting.

## useOptimistic
- Show optimistic UI during async action; auto-reconcile/rollback.
- `[optimistic, addOptimistic] = useOptimistic(actual, (cur, val) => merged)`.
- **Gotcha**: call `addOptimistic` inside the action; confirm real state after.

## use()
- Read a **promise** (suspends → Suspense/error boundary) or **context**.
- Can be called **conditionally / in loops** (unlike hooks).
- **Gotcha**: promise must be created outside render + cached/stable, else suspends
  forever.

## ref as a prop
- Function components take `ref` as a normal prop. forwardRef no longer needed
  (still works, deprecated for new code).

## Document metadata
- `<title>/<meta>/<link>` rendered anywhere get **hoisted to `<head>`**. Native;
  no react-helmet for basics. Also stylesheet precedence + async script dedup.

## <Context> as provider
- `<MyContext value={...}>` instead of `<MyContext.Provider value={...}>`.

## Transitions / deferred
- `useTransition` → `[isPending, startTransition]`; mark updates **non-urgent** so
  input stays responsive. React 19: `startTransition` accepts async fns.
- `useDeferredValue(v)` → lagging copy during heavy renders.
- **Quick Q**: What problem? → Keep UI responsive by deprioritizing heavy updates.

## RSC + Server Actions (notes; needs framework)
- **Server Components**: run on server, JS never ships, `await` data directly.
- **Client Components**: `"use client"` for state/effects/handlers.
- **Server Actions**: `"use server"` async fns callable from client (mutations
  without hand-written endpoints). Needs Next App Router / RSC bundler.
