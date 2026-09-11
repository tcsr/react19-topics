# React Architect — Interview Cheat Sheets

Conceptual/system-design topics that don't have a runnable demo in a client-side
Vite SPA but are core to a **React architect** interview. Pair these with the
runnable demos in `src/topics/`.

| Sheet | Covers |
|---|---|
| [rendering-strategies.md](./rendering-strategies.md) | CSR / SSR / SSG / ISR / RSC, hydration, streaming |
| [fiber-and-concurrency.md](./fiber-and-concurrency.md) | Fiber, reconciliation, lanes, batching, concurrent features |
| [state-management-decision.md](./state-management-decision.md) | When to use useState / Context / Zustand / Redux / React Query |
| [data-fetching-and-caching.md](./data-fetching-and-caching.md) | React Query vs RTK Query vs SWR, cache layers |
| [auth.md](./auth.md) | OAuth/OIDC, JWT, refresh rotation, token storage, RBAC |
| [security.md](./security.md) | XSS, dangerouslySetInnerHTML, CSP, CSRF, supply chain |
| [api-layer.md](./api-layer.md) | REST vs GraphQL, BFF, interceptors, error contracts |
| [realtime.md](./realtime.md) | WebSocket / SSE / polling (ties to Redis + EventBridge phase) |
| [pwa-offline.md](./pwa-offline.md) | Service workers, cache strategies, offline UX |
| [web-vitals-performance.md](./web-vitals-performance.md) | LCP/CLS/INP, budgets, optimization checklist |
| [styling-architecture.md](./styling-architecture.md) | CSS Modules / CSS-in-JS / Tailwind, design tokens, theming |
| [accessibility.md](./accessibility.md) | ARIA, focus management, keyboard nav, a11y testing |
| [folder-architecture.md](./folder-architecture.md) | Feature-based structure, container/presentational, SOLID on FE |
| [micro-frontends-and-monorepo.md](./micro-frontends-and-monorepo.md) | Module Federation, Nx/Turborepo |
| [interview-rapid-fire.md](./interview-rapid-fire.md) | Quick Q&A drill |

## How the whole repo maps to an interview

- **Fundamentals & hooks** → `src/topics/core`, `src/topics/hooks`
- **React 19 specifics** → `src/topics/react19`
- **Advanced patterns / forms / errors** → `src/topics/advanced`
- **Routing / state / performance / TS / testing** → their own groups
- **System design & tradeoffs** → these sheets
- **Backend + async + cache** → `src/topics/future-integrations` (next phase:
  NestJS + PostgreSQL + Redis + EventBridge + React Query)
