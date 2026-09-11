/**
 * use() (React 19)
 * ----------------
 * `use` is a new API (not a hook in the traditional sense) that reads the value of
 * a resource such as a Promise or a Context. Unlike hooks, `use` CAN be called
 * conditionally and inside loops.
 *
 *  - use(promise) : suspends the component until the promise resolves, integrating
 *                   with <Suspense> for loading UI and error boundaries for errors.
 *                   The promise should be created/cached OUTSIDE render (e.g. by a
 *                   framework or a stable cache) — not created fresh every render.
 *  - use(context) : reads a context value, allowed after early returns / in
 *                   conditions, unlike useContext.
 *
 * Below: read a context conditionally with use().
 */

import { createContext, use } from "react";

const LangContext = createContext<"en" | "fr">("en");

function Label({ show }: { show: boolean }) {
  if (!show) return null;
  // use() may be called after an early return — useContext could not.
  const lang = use(LangContext);
  return <p>Language: {lang}</p>;
}

export function UseApiDemo() {
  return (
    <LangContext.Provider value="fr">
      <Label show={true} />
    </LangContext.Provider>
  );
}
