/**
 * APP SHELL
 * ---------
 * Renders a sidebar of all registered topics and the currently selected demo.
 * Each demo file carries a generic definition comment at the top — open the file
 * shown by "Source" to read it. This is a learning playground, not a router-based
 * app (routing is a future topic).
 */

import { useMemo, useState } from "react";
import { registry } from "./topics/registry";
import "./App.css";

export default function App() {
  const flat = useMemo(
    () => registry.flatMap((g) => g.topics.map((t) => ({ ...t, group: g.group }))),
    []
  );
  const [activeId, setActiveId] = useState(flat[0]?.id ?? "");
  const active = flat.find((t) => t.id === activeId) ?? flat[0];
  const ActiveComponent = active?.Component;

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1 className="brand">React 19 Topics</h1>
        {registry.map((g) => (
          <div key={g.group} className="group">
            <div className="group-title">{g.group}</div>
            {g.topics.map((t) => (
              <button
                key={t.id}
                className={`nav-item ${t.id === activeId ? "active" : ""}`}
                onClick={() => setActiveId(t.id)}
              >
                {t.title}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <main className="content">
        <h2 className="topic-title">{active?.title}</h2>
        <div className="demo">{ActiveComponent && <ActiveComponent />}</div>
      </main>
    </div>
  );
}
