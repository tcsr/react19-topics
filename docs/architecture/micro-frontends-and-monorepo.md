# Micro-Frontends & Monorepos

## Micro-frontends (MFE)

Split a large frontend into independently developed/deployed pieces owned by
different teams — the frontend analog of microservices.

### Composition approaches

| Approach | How | Notes |
|---|---|---|
| **Build-time** | publish packages, host imports | simplest; coupled releases |
| **Server-side** | edge/SSR includes (SSI, fragments) | good TTFB, complex infra |
| **Run-time — Module Federation** (Webpack 5 / rspack / Vite plugin) | host loads remote bundles at runtime | independent deploys; the modern default |
| **iframes / Web Components** | strong isolation | integration & UX friction |

### Module Federation essentials

- **Host** (shell) loads **remotes** at runtime; remotes **expose** modules.
- **Shared dependencies** (react, react-dom) are **singletons** to avoid duplicate
  React / multiple-copies bugs — version-align them.
- Independent deploys: ship a remote without redeploying the host.

### MFE tradeoffs

- Wins: team autonomy, independent deploy, tech incrementalism, fault isolation.
- Costs: bundle duplication, version drift, shared-state/routing/design-system
  coordination, harder E2E + observability. **Don't adopt MFE for a small team** —
  it's an org-scaling tool, not a default.

## Monorepos

One repo, many packages/apps with shared tooling.

- **Tools**: **Nx**, **Turborepo**, pnpm/Yarn workspaces.
- **Wins**: atomic cross-package changes, shared config/lint/TS, one dependency
  graph, code sharing (ui, config, types).
- **Key features**: **task graph + caching** (only rebuild/test what changed),
  **affected** commands in CI, enforced module boundaries.
- **Costs**: CI must scale (remote cache, sharding); needs boundary discipline.
- Monorepo ≠ monolith: you can house MFEs, libraries, and the BFF (NestJS) together
  while deploying them independently.

## Interview signals

- Module Federation = runtime independent deploys; **shared singletons** are the
  classic gotcha.
- MFE solves an **organizational** scaling problem and adds real cost — justify it.
- Monorepo value is the **task graph + caching + shared tooling**, not just "one
  repo".
