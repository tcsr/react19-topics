/**
 * ROUTING (React Router v7 — data router)
 * ---------------------------------------
 * React Router maps URLs to component trees. The modern "data router" API adds:
 *  - Nested routes with a parent <Outlet/> for shared layout.
 *  - loader() : fetch data BEFORE the route renders (no render-then-fetch waterfall).
 *  - action() : handle mutations (form submissions) per route.
 *  - useLoaderData() : read the loaded data.
 *  - lazy routes: code-split a route's component + loader.
 *  - route params (:id) via useParams / loader args.
 *
 * This demo uses a MEMORY router (in-memory history) so it is self-contained and
 * doesn't hijack the app's URL. In a real app you'd use createBrowserRouter and
 * RouterProvider at the app root.
 */

import {
  createMemoryRouter,
  RouterProvider,
  Outlet,
  Link,
  useLoaderData,
  useParams,
  type LoaderFunctionArgs,
} from "react-router-dom";

// Shared layout with nav + <Outlet/> where child routes render.
function Layout() {
  return (
    <div>
      <nav style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/users/42">User 42</Link>
      </nav>
      <div style={{ borderTop: "1px solid #1f2937", paddingTop: 12 }}>
        <Outlet />
      </div>
    </div>
  );
}

function Home() {
  return <p>Home route.</p>;
}

// Route with a loader: data ready before render.
async function usersLoader() {
  await new Promise((r) => setTimeout(r, 200));
  return { users: ["Ada", "Alan", "Grace"] };
}
function Users() {
  const { users } = useLoaderData() as { users: string[] };
  return (
    <ul>
      {users.map((u) => (
        <li key={u}>{u}</li>
      ))}
    </ul>
  );
}

// Dynamic param + loader using the param.
async function userLoader({ params }: LoaderFunctionArgs) {
  return { id: params.id, name: `User #${params.id}` };
}
function UserDetail() {
  const data = useLoaderData() as { id: string; name: string };
  const { id } = useParams();
  return (
    <p>
      Param id={id} → {data.name}
    </p>
  );
}

const router = createMemoryRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "users", element: <Users />, loader: usersLoader },
        { path: "users/:id", element: <UserDetail />, loader: userLoader },
      ],
    },
  ],
  { initialEntries: ["/"] }
);

export function RoutingDemo() {
  return <RouterProvider router={router} />;
}
