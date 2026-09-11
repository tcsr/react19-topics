# PWA & Offline

## What makes a PWA

- **Web App Manifest** (`manifest.json`): name, icons, theme, `display: standalone`
  → installable to home screen.
- **Service Worker**: a background script proxying network requests → enables
  offline, caching, push notifications, background sync.
- **HTTPS** required.

## Service worker lifecycle

`register → install (precache) → activate (cleanup old caches) → fetch (intercept)`.
Updates: a new SW installs in the background and waits until all tabs close (or you
call `skipWaiting()` + `clients.claim()`); prompt the user to reload.

## Caching strategies (per request type)

| Strategy | Behavior | Use for |
|---|---|---|
| **Cache-first** | serve cache, fall back to network | static assets, fonts, images |
| **Network-first** | try network, fall back to cache | fresh-but-resilient API data |
| **Stale-while-revalidate** | serve cache, refresh in background | semi-dynamic content |
| **Network-only** | never cache | mutations, auth |
| **Cache-only** | precached shell | app shell |

## Tooling & UX

- **Workbox** / `vite-plugin-pwa` generate and manage the SW + precache manifest.
- **App shell** model: cache the shell for instant loads; hydrate data after.
- **Background sync**: queue failed mutations, replay when back online.
- **IndexedDB** for structured offline data (not localStorage — sync + size limits).
- Show clear **offline state** and reconcile on reconnect (conflict resolution).

## Interview signals

- SW is a programmable network proxy; match strategy to resource type.
- Know the update/waiting problem and how to prompt reloads.
- Offline mutations need a queue + conflict strategy, not just a read cache.
