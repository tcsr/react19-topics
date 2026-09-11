# Rendering Strategies

How and where HTML is produced. The central architecture decision for any React app.

## The options

| Strategy | HTML built | Where | Best for | Tradeoff |
|---|---|---|---|---|
| **CSR** (Client-Side Rendering) | In browser, at runtime | Client | Dashboards, apps behind login | Slow first paint, poor SEO, big JS |
| **SSR** (Server-Side Rendering) | Per request | Server | Personalized + SEO pages | Server cost, TTFB tied to data |
| **SSG** (Static Site Generation) | At build time | Build | Marketing, docs, blogs | Stale until rebuild |
| **ISR** (Incremental Static Regen) | Build + revalidate on interval | Build/Edge | Large mostly-static catalogs | Eventual consistency |
| **RSC** (React Server Components) | Per request, streamed | Server | Data-heavy trees, small bundles | Needs framework (Next App Router) |

This project is **CSR** (Vite SPA). When NestJS is added it becomes CSR client +
API server — not SSR. RSC would require a framework.

## Hydration

SSR/SSG send HTML the browser paints immediately (fast FCP), then React
**hydrates**: attaches event listeners and reconciles the client tree with the
server HTML to make it interactive. Mismatches (server vs client output) cause
hydration errors.

- **Time-to-interactive gap**: HTML is visible but not clickable until hydration
  finishes. Big trees = long gap.
- **Streaming SSR** (`renderToPipeableStream`): send HTML in chunks as it's ready;
  `<Suspense>` boundaries stream in independently.
- **Selective hydration**: React hydrates the parts the user interacts with first,
  driven by Suspense boundaries.

## RSC vs SSR (common confusion)

- **SSR** renders **client components** to HTML on the server; their JS still ships
  and hydrates.
- **RSC** run only on the server; their **JS never ships**. They can `await` data
  directly. Mark interactive leaves `"use client"`. Server Actions (`"use server"`)
  handle mutations. See `src/topics/react19/server-components/`.

## Interview signals

- Pick strategy per-route, not per-app (Next.js allows mixing).
- SEO + fast first paint → SSR/SSG/RSC. App behind auth → CSR is fine.
- Know the hydration cost and how streaming + selective hydration mitigate it.
- RSC reduces bundle size by keeping data/logic on the server.
