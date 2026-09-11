# TypeScript in React — Study Notes

Demos: `src/topics/typescript`

## Typing components & props
- Props via `interface`/`type`; `children: React.ReactNode`.
- Extend intrinsic elements: `React.ComponentProps<'button'> & { variant }`.
- Event types: `React.ChangeEvent<HTMLInputElement>`,
  `React.FormEvent<HTMLFormElement>`, `React.MouseEvent`.
- Ref types: `useRef<HTMLInputElement>(null)`; `React.Ref<T>` prop (React 19).

## Generic components
- `function List<T>({ items, render }: ListProps<T>)` → reusable + type-safe over
  data. Keeps callbacks/return types inferred.

## Discriminated unions (model state safely)
```ts
type Async<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ok'; data: T };
```
- Switch on the tag → TS **narrows**; impossible states unrepresentable
  (accessing `data` while loading = compile error).

## Utility types (know these)
- `Partial<T>`, `Required<T>`, `Pick<T,K>`, `Omit<T,K>`, `Record<K,V>`,
  `Readonly<T>`, `ReturnType<F>`, `Parameters<F>`, `Awaited<T>`, `NonNullable<T>`.
- `as const` for literal tuples/objects; `keyof`, `typeof` for derived types.

## Hooks typing
- `useState<T>()`; `useReducer<State, Action>`; typed context via
  `createContext<T | null>(null)` + a guarded `useX()` hook that throws if null.
- Zod: `z.infer<typeof schema>` = single source of truth for shape + validation.

## Gotchas
- `useState` with no arg infers `undefined` — pass a type or initial value.
- Avoid `any`; prefer `unknown` + narrowing. Avoid `React.FC` (implicit children,
  awkward generics) — type props directly.

## Quick Q
- Model loading/error/data safely? → Discriminated union on a `status` tag.
- Reusable typed list? → Generic component `<T>`.
- One source of truth for a form's type + rules? → Zod schema + `z.infer`.
