# State Management — Decision Guide

The #1 architect question: "How do you decide where state lives?"

## First, classify the state

| Kind | Examples | Home |
|---|---|---|
| **Local UI** | input value, toggle, hover | `useState` / `useReducer` |
| **Shared UI** | theme, sidebar open, current tab | Context, or Zustand |
| **Server cache** | API data, lists, entities | **React Query / RTK Query** (NOT Redux/Context) |
| **URL state** | filters, page, tab, id | Router (search params) |
| **Form state** | field values, errors | React Hook Form |
| **Global client** | auth session, feature flags, cart | Zustand / Redux |

**Key insight**: most "global state" is actually **server cache** and belongs in a
data-fetching library with caching + invalidation — not a hand-rolled Redux/Context
store. This eliminates most global state.

## Client-state library matrix

| | Context | Zustand | Redux Toolkit |
|---|---|---|---|
| Boilerplate | low | very low | medium |
| Re-render control | poor (all consumers) | excellent (selectors) | excellent (selectors) |
| Devtools / time-travel | no | basic | excellent |
| Middleware / side effects | manual | middleware | thunks/listeners/RTK Query |
| Best for | low-freq values (theme, locale) | small–medium app global state | large apps, complex flows, teams needing structure |

- **Context** is a dependency-injection mechanism, not a state manager. It
  re-renders **all** consumers on any value change — split contexts or add a store
  underneath for frequently-changing data.
- **Zustand** — minimal, selector-based, no Provider. See `src/topics/state-management/zustand`.
- **Redux Toolkit** — structure, devtools, RTK Query. See `src/topics/state-management/redux-toolkit`.

## Server-cache library matrix

| | React Query (TanStack) | RTK Query | SWR |
|---|---|---|---|
| Standalone | yes | needs Redux store | yes |
| Caching/refetch/dedup | yes | yes | yes |
| Mutations + invalidation | yes | yes | basic |
| Best when | any stack | already on Redux | simple needs |

## Rules of thumb

1. Keep state as **local** as possible; lift only when shared.
2. **Derive**, don't store — compute from existing state instead of duplicating.
3. **Normalize** relational data (by id) to avoid duplication/sync bugs.
4. Server data → cache library; don't mirror it into Redux/Context.
5. Reach for Redux when you need devtools/time-travel, complex cross-cutting logic,
   or a large team needs enforced structure — otherwise Zustand.
