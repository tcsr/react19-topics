# Routing — Study Notes

Demos: `src/topics/routing` · Deep dive: `docs/architecture/rendering-strategies.md`

## React Router v7 (data router)
- **Def**: map URLs → component trees.
- **Key APIs**:
  - `createBrowserRouter` + `RouterProvider` (data router). `createMemoryRouter` for
    tests/embedded (used in the demo so it doesn't hijack the app URL).
  - **Nested routes** + `<Outlet/>` for shared layout.
  - **`loader`** — fetch data **before** render (no render-then-fetch waterfall);
    read with `useLoaderData`.
  - **`action`** — handle mutations (form submit) per route.
  - **Params** `:id` via `useParams` / `loader({ params })`.
  - **Lazy routes** — code-split component + loader per route.
  - Navigation: `<Link>`, `<NavLink>`, `useNavigate`; `redirect()` in loaders for
    guards.

## Key points
- Data router removes fetch waterfalls by loading in parallel before render.
- **Route guards**: `loader` checks auth, throws `redirect('/login')`.
- **Code splitting** is naturally route-based → smaller initial bundle.
- **URL is state**: filters/pagination/tab belong in search params, not React state.

## Gotchas
- `useLoaderData` types are `unknown` — cast or use typed helpers.
- Client route guards are **UX only** — enforce authz on the server.

## Quick Q
- Why loaders? → Fetch before render, in parallel, no waterfall.
- Where do filters live? → URL search params (shareable, back-button friendly).
- SPA route change + a11y? → Move focus to the new page heading.
