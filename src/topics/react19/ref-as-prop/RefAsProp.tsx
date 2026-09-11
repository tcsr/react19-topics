/**
 * ref AS A PROP (React 19)
 * ------------------------
 * In React 19, function components can receive `ref` as a regular prop. The old
 * forwardRef wrapper is no longer required for most cases — just declare `ref` in
 * your props type and pass it to the underlying DOM node.
 *
 * (forwardRef still works but is now deprecated for new code.)
 */

import { useRef } from "react";

// `ref` is just another prop now.
function FancyInput({
  ref,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
}) {
  return <input ref={ref} {...props} style={{ padding: 6 }} />;
}

export function RefAsPropDemo() {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <FancyInput ref={ref} placeholder="No forwardRef needed" />
      <button onClick={() => ref.current?.focus()}>Focus</button>
    </div>
  );
}
