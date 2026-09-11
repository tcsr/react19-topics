# Project / Folder Architecture

## Layer-based vs Feature-based

**Layer-based** (group by technical type) — fine for small apps, doesn't scale:
```
src/components/  src/hooks/  src/services/  src/utils/
```
A single feature's code is scattered across every folder.

**Feature-based (feature-sliced)** — group by domain; the industry default at scale:
```
src/
  features/
    auth/         components/ hooks/ api/ store/ types/ index.ts
    checkout/     components/ hooks/ api/ store/ types/ index.ts
  shared/         ui/ lib/ hooks/ (cross-feature, reusable)
  app/            providers, router, store composition, entry
  pages/          route-level composition of features
```
Rules: features are **self-contained**; cross-feature use goes through a public
`index.ts` (barrel) API; **no deep imports** into another feature's internals;
dependencies point **inward/downward** (pages → features → shared), never sideways
between features.

> This learning repo groups by **topic** for teaching. A production app should use
> feature-based slices.

## Component patterns

- **Container / Presentational**: containers fetch/own state, presentational
  components are pure and prop-driven (testable, reusable). Hooks have largely
  absorbed the "container" role.
- **Compound components** for flexible APIs (`<Tabs><Tab/></Tabs>` — see
  `src/topics/advanced/patterns`).
- **Custom hooks** to extract logic; **colocate** state with where it's used.

## SOLID on the frontend

- **S**ingle responsibility: a component does one thing; split when it grows.
- **O**pen/closed: extend via props/composition/slots, not by editing internals.
- **L**iskov: variants honor the base component's contract.
- **I**nterface segregation: small focused props, not god-objects.
- **D**ependency inversion: depend on abstractions — inject services/clients via
  context/props so they're swappable and mockable.

## Interview signals

- Feature-based structure + enforced public APIs (barrels, lint import rules) is
  how large React codebases stay maintainable.
- Keep dependencies acyclic and directional; shared code is extracted deliberately,
  not by dumping everything in `utils/`.
