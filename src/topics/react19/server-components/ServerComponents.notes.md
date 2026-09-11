# React Server Components (RSC) & Server Actions — React 19

> Note-only topic. RSC requires a framework/bundler with a server (Next.js App
> Router, React Router/Remix, or a custom RSC setup). A plain Vite SPA (this app)
> runs everything on the client, so there is no runnable demo here — this file
> documents the concept so the topic is covered.

## Server Components
- Components that render **on the server**; their JS is **never shipped to the browser**.
- Can `async/await` directly and read server resources (DB, filesystem, secrets)
  inside the component body.
- Reduce client bundle size and move data fetching close to the data.
- Default in RSC frameworks; mark interactive components with `"use client"`.

## Client Components
- Opt in with the `"use client"` directive at the top of the file.
- Needed for state, effects, event handlers, browser APIs.

## Server Actions (`"use server"`)
- Async functions that run on the server, callable from the client (e.g. as a
  form `action`). Enable mutations without hand-writing an API endpoint.
- Integrate with `useActionState`, `useFormStatus`, and `useOptimistic`.

## Where this app fits
This project is a **client-side SPA**. When we add **NestJS + PostgreSQL** later,
NestJS plays the "server" role via REST/GraphQL endpoints, and the React app calls
it (with **React Query** for caching/async state). If we later adopt an RSC
framework, these notes become runnable.
