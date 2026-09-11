/**
 * REDUX TOOLKIT (RTK) + RTK QUERY — store
 * ---------------------------------------
 * Redux is a predictable, centralized state container. Redux Toolkit is the
 * official, batteries-included way to use it — it removes boilerplate via:
 *  - createSlice()  : reducers + action creators + immutable updates (Immer).
 *  - configureStore(): store with good defaults (thunk, devtools, serializable check).
 *  - createApi()    : RTK QUERY — data fetching & caching layer (auto hooks,
 *                     cache invalidation, refetch, dedup) — Redux's answer to
 *                     React Query, built on the store.
 *
 * Architect note: RTK for complex client state + cross-cutting logic; RTK Query
 * for server cache. Contrast with Zustand (simpler client state) and React Query
 * (server cache only, no global client store).
 */

import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// --- A classic slice (client state) ---
interface CounterState {
  value: number;
}
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 } as CounterState,
  reducers: {
    incremented: (state) => {
      state.value += 1; // Immer makes this safe (produces new state)
    },
    addedBy: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});
export const { incremented, addedBy } = counterSlice.actions;

// --- RTK Query API slice (server cache) ---
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  endpoints: (builder) => ({
    getTodo: builder.query<{ id: number; title: string }, number>({
      query: (id) => `todos/${id}`,
    }),
  }),
});
export const { useGetTodoQuery } = api;

// --- Store wiring both ---
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
