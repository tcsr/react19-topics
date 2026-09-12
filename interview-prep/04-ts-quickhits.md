# TypeScript Quick-Hits

## Generics
```ts
function identity<T>(x: T): T { return x; }
function first<T>(arr: T[]): T | undefined { return arr[0]; }
// constrained
function prop<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }
```

## Discriminated unions (model states so bad ones can't compile)
```ts
type Result<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ok"; data: T };

function render(r: Result<string[]>) {
  switch (r.status) {                 // TS narrows on the tag
    case "loading": return "…";
    case "error":   return r.message;
    case "ok":      return r.data.length; // r.data only exists here
  }
}
```

## Utility types (know cold)
- `Partial<T>` all optional · `Required<T>` all required · `Readonly<T>`
- `Pick<T,K>` / `Omit<T,K>` · `Record<K,V>`
- `ReturnType<F>` · `Parameters<F>` · `Awaited<T>` · `NonNullable<T>`
- `keyof T`, `typeof x`, indexed access `T[K]`, `as const`

## unknown vs any vs never
- `any` — opt out of checking (avoid). `unknown` — must narrow before use (safe).
  `never` — impossible value (exhaustiveness checks).
```ts
function assertNever(x: never): never { throw new Error("unexpected " + x); }
```

## Type vs interface
- Both describe object shapes. `interface` merges/`extends` (good for public APIs);
  `type` does unions/intersections/mapped/conditional. Pick either consistently.

## Narrowing tools
`typeof`, `instanceof`, `in`, truthiness, discriminant tag, custom type guards:
```ts
function isString(x: unknown): x is string { return typeof x === "string"; }
```

## Mapped + conditional (recognize them)
```ts
type Optional<T> = { [K in keyof T]?: T[K] };
type NonNull<T> = T extends null | undefined ? never : T;
```

## React + TS bits
- Props: `type Props = { title: string; children?: React.ReactNode }`
- Events: `React.ChangeEvent<HTMLInputElement>`, `React.FormEvent<HTMLFormElement>`
- Refs: `useRef<HTMLInputElement>(null)`
- Generic component: `function List<T>(props: { items: T[]; render: (t: T) => React.ReactNode })`
