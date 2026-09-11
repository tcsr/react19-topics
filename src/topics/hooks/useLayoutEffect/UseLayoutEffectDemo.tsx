/**
 * useLayoutEffect
 * ---------------
 * Same API as useEffect, but it fires SYNCHRONOUSLY after DOM mutations and BEFORE
 * the browser paints. Use it when you must read layout (measure size/position) and
 * mutate the DOM before the user sees a flicker. Prefer useEffect for everything
 * else — useLayoutEffect can block painting if overused.
 */

import { useLayoutEffect, useRef, useState } from "react";

export function UseLayoutEffectDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    // Measure synchronously before paint — no flicker.
    if (boxRef.current) setWidth(boxRef.current.getBoundingClientRect().width);
  }, []);

  return (
    <div>
      <div ref={boxRef} style={{ padding: 10, background: "#1e293b" }}>
        Measured element
      </div>
      <p>Measured width before paint: {Math.round(width)}px</p>
    </div>
  );
}
