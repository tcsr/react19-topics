/**
 * ERROR HANDLING + OBSERVABILITY
 * ------------------------------
 * Production resilience = catch errors, show graceful fallback, LOG to a service,
 * and let the user RECOVER. Patterns:
 *  - Error boundary with a reset action ("Try again").
 *  - Report to an observability tool (Sentry/Datadog) in componentDidCatch — here
 *    stubbed as reportError().
 *  - Distinguish render errors (boundaries) from async/event errors (try/catch +
 *    manual reporting), since boundaries DON'T catch those.
 *  - Retry with backoff for transient network failures (shown as a helper).
 */

import { Component, useState, type ReactNode } from "react";

// Stub for Sentry.captureException / logger.error.
function reportError(error: unknown, context?: Record<string, unknown>) {
  console.error("[observability] report:", error, context);
}

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

class ResettableBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }
  componentDidCatch(error: Error, info: unknown) {
    reportError(error, { info }); // send to observability backend
  }
  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <div style={{ color: "salmon" }}>
          <p>Failed: {this.state.error.message}</p>
          <button onClick={this.reset}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Flaky() {
  const [n, setN] = useState(0);
  if (n > 1) throw new Error("Rendered too many times");
  return <button onClick={() => setN((x) => x + 1)}>Click twice to crash ({n})</button>;
}

// Retry helper for async/transient errors (boundaries can't catch these).
export async function retry<T>(fn: () => Promise<T>, tries = 3, delay = 300): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    if (tries <= 1) {
      reportError(e, { exhausted: true });
      throw e;
    }
    await new Promise((r) => setTimeout(r, delay));
    return retry(fn, tries - 1, delay * 2); // exponential backoff
  }
}

export function ErrorObservabilityDemo() {
  return (
    <ResettableBoundary>
      <Flaky />
    </ResettableBoundary>
  );
}
