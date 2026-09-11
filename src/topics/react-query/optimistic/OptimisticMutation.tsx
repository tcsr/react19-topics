/**
 * Optimistic updates (useMutation onMutate / onError / onSettled)
 * --------------------------------------------------------------
 * Update the cache IMMEDIATELY (before the server responds) for instant UI, then
 * roll back if the request fails. The lifecycle:
 *  - onMutate(vars) : cancel in-flight refetches, snapshot current cache, write the
 *                     optimistic value, return a context (the snapshot).
 *  - onError(err, vars, context) : restore the snapshot (rollback).
 *  - onSettled() : invalidate to resync with the server (success or failure).
 *
 * This is the cache-level equivalent of React 19's useOptimistic, but persisted in
 * the query cache and shared across components.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type Post } from "../../../lib/api";

const KEY = ["posts", { page: 1, opt: true }] as const;

export function OptimisticMutation() {
  const qc = useQueryClient();

  const { data } = useQuery({ queryKey: KEY, queryFn: () => api.getPosts(1, 3) });

  const remove = useMutation({
    mutationFn: (id: number) => api.deletePost(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: KEY }); // avoid overwriting optimistic write
      const prev = qc.getQueryData<Post[]>(KEY); // snapshot for rollback
      qc.setQueryData<Post[]>(KEY, (old) => old?.filter((p) => p.id !== id) ?? []);
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev); // rollback
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }), // resync
  });

  return (
    <div>
      <p style={{ color: "#94a3b8" }}>Delete removes the row instantly (optimistic).</p>
      <ul>
        {data?.map((p) => (
          <li key={p.id}>
            #{p.id} — {p.title}{" "}
            <button onClick={() => remove.mutate(p.id)} disabled={remove.isPending}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
