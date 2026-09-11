/**
 * QueryClient — the React Query cache + config.
 * ---------------------------------------------
 * One QueryClient holds the whole app's server-cache. Sensible global defaults:
 *  - staleTime : how long data is "fresh" before a background refetch is allowed.
 *  - gcTime    : how long unused/inactive cache is kept before garbage collection.
 *  - retry     : failed-query retry count (with exponential backoff by default).
 * Provided once at the app root via <QueryClientProvider> (see main.tsx).
 */

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, // 30s fresh -> no refetch on remount within window
      gcTime: 5 * 60_000, // 5 min
      retry: 1,
      refetchOnWindowFocus: false, // quieter for a demo; often true in prod
    },
  },
});
