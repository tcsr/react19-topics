/**
 * useState
 * --------
 * useState adds local, reactive state to a function component. It returns a pair:
 * [currentValue, setterFunction]. Calling the setter schedules a re-render with
 * the new value. State is preserved across re-renders and isolated per component
 * instance.
 *
 * Use the UPDATER form  setX(prev => prev + 1)  when the next value depends on
 * the previous one (avoids stale-closure bugs and batches correctly).
 */

import { useState } from "react";

export function UseStateDemo() {
  const [count, setCount] = useState(0); // type inferred as number

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
