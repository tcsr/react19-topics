/**
 * useContext
 * ----------
 * Context provides a way to pass data through the component tree without manually
 * threading props at every level ("prop drilling"). Create a context, wrap a
 * subtree in its Provider, then any descendant reads the value with useContext.
 *
 * React 19 note: you can render <MyContext> directly as the provider instead of
 * <MyContext.Provider> (see topics/react19/context-provider).
 *
 * Good for low-frequency global-ish data: theme, current user, locale.
 */

import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<Theme>("light");

function ThemedLabel() {
  const theme = useContext(ThemeContext); // reads nearest provider value
  return <p>Current theme: {theme}</p>;
}

export function UseContextDemo() {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <ThemeContext.Provider value={theme}>
      <ThemedLabel />
      <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
        Toggle theme
      </button>
    </ThemeContext.Provider>
  );
}
