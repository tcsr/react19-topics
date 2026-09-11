/**
 * Dependent (chained) queries — the `enabled` option
 * --------------------------------------------------
 * When one query needs another's result first, gate it with `enabled`. The second
 * query stays idle (isPending, not fetching) until its input exists — avoiding a
 * request with undefined params.
 *
 * Here: pick a post id, then fetch that post only once an id is selected.
 */

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";

export function DependentQuery() {
  const [id, setId] = useState<number | null>(null);

  const post = useQuery({
    queryKey: ["post", id],
    queryFn: () => api.getPost(id as number),
    enabled: id !== null, // don't run until an id is chosen
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 6 }}>
        {[1, 2, 3].map((n) => (
          <button key={n} onClick={() => setId(n)}>
            Load post {n}
          </button>
        ))}
      </div>
      {id === null && <p style={{ color: "#94a3b8" }}>Pick a post — query is disabled until then.</p>}
      {post.isFetching && <p>Loading…</p>}
      {post.data && (
        <div>
          <h4>{post.data.title}</h4>
          <p>{post.data.body}</p>
        </div>
      )}
    </div>
  );
}
