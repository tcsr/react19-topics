/**
 * COMPONENT PATTERNS
 * ------------------
 * Reusable ways to share logic/structure between components:
 *
 *  1. HIGHER-ORDER COMPONENT (HOC): a function that takes a component and returns
 *     a new component with extra behavior. withX(Component) => EnhancedComponent.
 *
 *  2. RENDER PROPS: a component takes a function as a prop (often `children`) and
 *     calls it with data, letting the caller decide how to render.
 *
 *  3. COMPOUND COMPONENTS: a parent + related children that share implicit state
 *     via context (e.g. <Tabs><Tab/></Tabs>). Ergonomic, declarative APIs.
 *
 * Note: custom hooks now cover most cases HOCs/render-props historically solved.
 */

import { createContext, useContext, useState, type ReactNode } from "react";

/* 1. HOC */
function withBorder<P extends object>(Wrapped: React.ComponentType<P>) {
  return (props: P) => (
    <div style={{ border: "2px dashed #999", padding: 6 }}>
      <Wrapped {...props} />
    </div>
  );
}
const Plain = () => <span>I am wrapped by an HOC</span>;
const Bordered = withBorder(Plain);

/* 2. Render prop */
function MouseX({ children }: { children: (x: number) => ReactNode }) {
  const [x, setX] = useState(0);
  return <div onMouseMove={(e) => setX(e.clientX)}>{children(x)}</div>;
}

/* 3. Compound components */
const TabsCtx = createContext<{ active: number; setActive: (n: number) => void } | null>(null);
function Tabs({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  return <TabsCtx.Provider value={{ active, setActive }}>{children}</TabsCtx.Provider>;
}
function Tab({ index, label }: { index: number; label: string }) {
  const ctx = useContext(TabsCtx)!;
  return (
    <button
      onClick={() => ctx.setActive(index)}
      style={{ fontWeight: ctx.active === index ? 700 : 400 }}
    >
      {label}
    </button>
  );
}

export function PatternsDemo() {
  return (
    <div>
      <Bordered />
      <MouseX>{(x) => <p>Mouse X: {x}</p>}</MouseX>
      <Tabs>
        <Tab index={0} label="One" />
        <Tab index={1} label="Two" />
      </Tabs>
    </div>
  );
}
