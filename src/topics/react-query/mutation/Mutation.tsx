/**
 * useMutation + cache invalidation
 * --------------------------------
 * useMutation handles CREATE/UPDATE/DELETE (side effects). Unlike queries it runs
 * on demand via mutate()/mutateAsync(). After a successful write, INVALIDATE the
 * affected queries so React Query refetches fresh data — keeping the cache in sync
 * with the server (read-your-writes).
 *
 * Returns { mutate, isPending, isError, isSuccess, data, ... }.
 *
 * NOTE: JSONPlaceholder fakes writes (doesn't persist), so the list won't actually
 * grow — but the mutation lifecycle + invalidation flow is real.
 */

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";

export function Mutation() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: ["posts", { page: 1 }],
    queryFn: () => api.getPosts(1, 3),
  });

  const create = useMutation({
    mutationFn: () =>
      api.createPost({ title: "New post", body: "hello", userId: 1 }),
    onSuccess: () => {
      // Refetch any query whose key starts with ["posts"].
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <div>
      <button onClick={() => create.mutate()} disabled={create.isPending}>
        {create.isPending ? "Creating…" : "Create post"}
      </button>
      {create.isSuccess && <p>Created id: {create.data.id} (invalidated list)</p>}
      {create.isError && <p style={{ color: "salmon" }}>Create failed</p>}

      <h5>First 3 posts</h5>
      {list.isPending ? (
        <p>Loading…</p>
      ) : (
        <ul>
          {list.data?.map((p) => (
            <li key={p.id}>#{p.id} — {p.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
