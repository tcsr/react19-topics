/**
 * PORTALS
 * -------
 * A portal renders children into a DOM node that lives OUTSIDE the parent
 * component's DOM hierarchy, while keeping them in the React tree (so context and
 * events still work / bubble as if nested). Ideal for modals, tooltips, and
 * popovers that must escape overflow:hidden or z-index stacking contexts.
 *
 * createPortal(children, domNode).
 */

import { useState } from "react";
import { createPortal } from "react-dom";

function Modal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.4)",
        display: "grid",
        placeItems: "center",
      }}
      onClick={onClose}
    >
      <div style={{ background: "#fff", padding: 20, borderRadius: 8 }}>
        Modal rendered via portal. Click backdrop to close.
      </div>
    </div>,
    document.body // target node outside the parent DOM
  );
}

export function PortalsDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open modal</button>
      {open && <Modal onClose={() => setOpen(false)} />}
    </div>
  );
}
