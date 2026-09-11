/**
 * API CLIENT (typed fetch)
 * ------------------------
 * Thin wrapper over fetch with a base URL + JSON parsing + error throwing.
 * React Query needs the fetcher to THROW on failure so it can populate isError.
 *
 * Currently points at the public JSONPlaceholder API. In the NestJS phase, swap
 * BASE_URL to the NestJS server (e.g. http://localhost:3000) — the query/mutation
 * code stays the same.
 */

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    // Throw so React Query marks the query/mutation as errored.
    throw new Error(`API ${res.status} ${res.statusText} on ${path}`);
  }
  return res.json() as Promise<T>;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const api = {
  getPosts: (page: number, limit = 5) =>
    request<Post[]>(`/posts?_page=${page}&_limit=${limit}`),
  getPost: (id: number) => request<Post>(`/posts/${id}`),
  createPost: (data: Pick<Post, "title" | "body" | "userId">) =>
    request<Post>("/posts", { method: "POST", body: JSON.stringify(data) }),
  deletePost: (id: number) =>
    request<Record<string, never>>(`/posts/${id}`, { method: "DELETE" }),
};
