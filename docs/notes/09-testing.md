# Testing — Study Notes

Demos: `src/topics/testing` (`*.test.tsx` co-located) · Run: `npm test`

## Test pyramid
- **Unit** — pure fns + custom hooks (`renderHook`). Fast, many.
- **Component/Integration** — render + interact + assert visible output (RTL).
- **E2E** — real browser flows (Playwright/Cypress). Few, slow, high-value.

## Vitest
- Vite-native runner (Jest-compatible API). `environment: 'jsdom'`, `globals: true`,
  `setupFiles` for jest-dom matchers. Scripts: `test`, `test:watch`, `test:cov`.

## React Testing Library (RTL)
- **Philosophy**: test **behavior the user sees**, not implementation.
- Query priority: `getByRole` > `getByLabelText` > `getByText` > ... >
  `getByTestId` (last resort). Role-based queries double as an **a11y check**.
- `getBy*` (throws if absent) · `queryBy*` (null, for absence) · `findBy*` (async).
- Interactions: **`@testing-library/user-event`** (realistic) over `fireEvent`.
- Async: `findBy*` / `waitFor`. Wrap manual state changes in `act`.
- Hooks: `renderHook` + `act`.

## Mocking network
- **MSW** (Mock Service Worker) intercepts at the network layer → tests hit a fake
  server, not stubbed fetch. Same handlers for tests + dev.

## Gotchas
- Don't assert on internal state/props — assert on rendered output.
- Overusing `getByTestId` = testing implementation; prefer role/label.
- `act` warnings → an update happened outside `act`; wrap it or use `findBy`.

## Quick Q
- RTL core principle? → Test what the user sees/does, not internals.
- Query for a button? → `getByRole('button', { name: /.../ })`.
- Mock APIs? → MSW at the network layer.
- Test a custom hook? → `renderHook` + `act`.
