/**
 * COMPONENTS
 * ----------
 * A component is a reusable, self-contained piece of UI written as a JavaScript
 * function that returns JSX. Components can accept inputs (props) and manage
 * their own internal state. They are the fundamental building block of React.
 *
 * Rules:
 *  - Name must start with an UPPERCASE letter (so React treats it as a component).
 *  - Must return a single root node (use a Fragment <>...</> to group siblings).
 *  - Should be pure: same props -> same output, no side effects during render.
 */

// A minimal function component that takes no props.
function Greeting() {
  return <h3>Hello from a component</h3>;
}

// Components compose: one component renders others.
export function Components() {
  return (
    <section>
      <Greeting />
      <Greeting />
    </section>
  );
}
