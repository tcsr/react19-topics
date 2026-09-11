# State Management — Study Notes

Demos: `src/topics/state-management` · Deep dive:
`docs/architecture/state-management-decision.md`

## Classify first
- Local UI → `useState`/`useReducer`
- Shared UI → Context / Zustand
- **Server data → React Query / RTK Query** (NOT Redux/Context)
- URL state → router search params
- Form → React Hook Form
- Global client (auth, flags, cart) → Zustand / Redux

**Insight**: most "global state" is really **server cache** → belongs in a data lib.

## Zustand
- Tiny store; `create((set,get)=>({...}))`; subscribe via **selector**
  `useStore(s => s.slice)` → re-render only on that slice. **No Provider**,
  module-level singleton.
- **When**: small–medium global client state, minimal boilerplate.
- **Gotcha**: selecting whole store defeats the perf benefit — select slices.

## Redux Toolkit (RTK)
- `createSlice` (reducers+actions+Immer), `configureStore`, `createAsyncThunk`.
- **RTK Query** (`createApi`) = server cache layer (auto hooks, invalidation,
  refetch, dedup) built on the store.
- `useSelector` / `useDispatch`; needs `<Provider store>`.
- **When**: large apps, complex flows, devtools/time-travel, team structure.

## Context (contrast)
- DI mechanism, **not** a state manager. All consumers re-render on value change →
  split contexts or memoize the value; put a store underneath for hot data.

## Decision rules
1. Keep state local; lift only when shared.
2. **Derive**, don't duplicate.
3. **Normalize** relational data by id.
4. Server data → cache lib; don't mirror into Redux/Context.
5. Redux for devtools/structure/scale; else Zustand.

## Quick Q
- Redux vs React Query? → Client state vs server cache; complementary.
- Zustand re-render control? → Selector subscriptions.
- Context downside? → Re-renders all consumers.
