/**
 * useQuery — reading server data
 * ------------------------------
 * useQuery fetches, caches, and subscribes to server data. You give it:
 *  - queryKey : unique array identifying this data (cache key + dependency).
 *  - queryFn  : async fn returning the data (must throw on error).
 * It returns { data, isPending, isError, error, isFetching, refetch, ... } and
 * handles caching, dedup, background refetch, and stale-while-revalidate for free.
 *
 * isPending = no data yet (first load). isFetching = a request is in flight
 * (including background refetch while showing cached data).
 */

import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";

export function BasicQuery() {
  const { data, isPending, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["post", 1],
    queryFn: () => api.getPost(1),
  });

  if (isPending) return <p>Loading…</p>;
  if (isError) return <p style={{ color: "salmon" }}>Error: {error.message}</p>;

  return (
    <div>
      <h4>{data.title}</h4>
      <p>{data.body}</p>
      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "Refetching…" : "Refetch"}
      </button>
    </div>
  );
}
