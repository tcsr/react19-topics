/**
 * TESTING (Vitest + React Testing Library)
 * ----------------------------------------
 * Testing strategy an architect defines:
 *  - UNIT: pure functions & custom hooks (renderHook).
 *  - COMPONENT/INTEGRATION: render + query by ROLE/TEXT (user-centric), simulate
 *    user events with @testing-library/user-event, assert on visible output.
 *  - E2E: real browser flows (Playwright/Cypress) — separate from this runner.
 *  - MOCKING network with MSW so tests hit a fake server, not the real API.
 *
 * Principle (RTL): test behavior the user sees, not implementation details.
 * The component below is trivially testable; see Counter.test.tsx next to it.
 */

import { useState } from "react";

export function Counter() {
  const [n, setN] = useState(0);
  return (
    <div>
      <p>Count: {n}</p>
      <button onClick={() => setN((x) => x + 1)}>increment</button>
    </div>
  );
}

export function TestingDemo() {
  return (
    <div>
      <Counter />
      <p style={{ color: "#94a3b8" }}>
        Run <code>npm test</code>. See <code>Counter.test.tsx</code> and{" "}
        <code>useToggle.test.ts</code> for unit + component examples.
      </p>
    </div>
  );
}
