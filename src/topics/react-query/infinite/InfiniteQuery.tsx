/**
 * useInfiniteQuery — "load more" / infinite scroll
 * ------------------------------------------------
 * For appending pages instead of replacing them. You provide:
 *  - initialPageParam : the first page param.
 *  - getNextPageParam(lastPage, allPages) : compute the next param, or undefined
 *    to signal there are no more pages.
 * data.pages is an array of page results; flatten to render. Exposes
 * fetchNextPage, hasNextPage, isFetchingNextPage.
 */

import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";

const PAGE_SIZE = 5;

export function InfiniteQuery() {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    queryFn: ({ pageParam }) => api.getPosts(pageParam, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length + 1 : undefined,
  });

  if (isPending) return <p>Loading…</p>;
  if (isError) return <p style={{ color: "salmon" }}>Error: {error.message}</p>;

  const posts = data.pages.flat();

  return (
    <div>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>#{p.id} — {p.title}</li>
        ))}
      </ul>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading…" : hasNextPage ? "Load more" : "No more"}
      </button>
    </div>
  );
}
