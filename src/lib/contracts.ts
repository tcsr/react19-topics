/**
 * SHARED CONTRACT (Zod) — mirrors the backend's src/contracts/post.contract.ts.
 * ---------------------------------------------------------------------------
 * One schema defines the Post shape + types for the client. In a MONOREPO this
 * file and the backend's would be a single shared package; with separate repos we
 * keep them in sync by hand. Using the same schema on both sides means the API
 * contract is validated identically client- and server-side.
 */

import { z } from "zod";

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});
export type Post = z.infer<typeof postSchema>;

export const createPostSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  userId: z.number().int().positive(),
});
export type CreatePost = z.infer<typeof createPostSchema>;
