/**
 * Paginated queries — placeholderData: keepPreviousData
 * -----------------------------------------------------
 * The page number is part of the queryKey, so each page is cached separately.
 * `placeholderData: keepPreviousData` keeps showing the previous page's data while
 * the next page loads — no flicker to a loading state between pages. `isFetching`
 * tells you a background load is happening.
 */

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { api } from "../../../lib/api";

export function Pagination() {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["posts", { page }], // page in key = per-page cache
    queryFn: () => api.getPosts(page, 5),
    placeholderData: keepPreviousData, // show prior page while fetching next
  });

  if (isPending) return <p>Loading…</p>;
  if (isError) return <p style={{ color: "salmon" }}>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data.map((p) => (
          <li key={p.id}>#{p.id} — {p.title}</li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page}</span>
        {/* Avoid over-fetching past the last page when showing placeholder data. */}
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={isPlaceholderData || data.length < 5}
        >
          Next
        </button>
        {isFetching && <span style={{ color: "#94a3b8" }}> fetching…</span>}
      </div>
    </div>
  );
}
