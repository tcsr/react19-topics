/**
 * API CLIENT (typed fetch)
 * ------------------------
 * Thin wrapper over fetch with a base URL + JSON parsing + error throwing.
 * React Query needs the fetcher to THROW on failure so it can populate isError.
 *
 * BASE_URL points at the NestJS API (react19-nestjs-api) by default. Override with
 * VITE_API_URL (e.g. in .env.local) — set it to
 * https://jsonplaceholder.typicode.com to run the demos without the backend.
 * Types come from the shared Zod contract (contracts.ts), mirrored on the backend.
 */

import type { Post, CreatePost } from "./contracts";
export type { Post };

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

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

export const api = {
  getPosts: (page: number, limit = 5) =>
    request<Post[]>(`/posts?_page=${page}&_limit=${limit}`),
  getPost: (id: number) => request<Post>(`/posts/${id}`),
  createPost: (data: CreatePost) =>
    request<Post>("/posts", { method: "POST", body: JSON.stringify(data) }),
  deletePost: (id: number) =>
    request<Record<string, never>>(`/posts/${id}`, { method: "DELETE" }),
};
