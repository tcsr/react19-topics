/**
 * ERROR BOUNDARIES
 * ----------------
 * An error boundary is a component that catches JavaScript errors thrown during
 * rendering in its child tree, logs them, and shows a fallback UI instead of
 * crashing the whole app. As of today error boundaries MUST be class components
 * (they use getDerivedStateFromError / componentDidCatch).
 *
 * They do NOT catch: event handler errors, async code, SSR, or errors in the
 * boundary itself. React 19 improves error reporting and adds root options like
 * onCaughtError / onUncaughtError.
 */

import { Component, type ReactNode } from "react";

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  // Update state so the next render shows the fallback.
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  // Side effect: log to a service.
  componentDidCatch(error: unknown) {
    console.error("Caught by boundary:", error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// A component that throws, to demonstrate the boundary.
function Bomb(): React.ReactElement {
  throw new Error("Boom during render");
}

export function ErrorBoundaryDemo() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong (fallback UI).</p>}>
      <Bomb />
    </ErrorBoundary>
  );
}
