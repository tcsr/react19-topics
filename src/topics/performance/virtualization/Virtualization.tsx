/**
 * LIST VIRTUALIZATION (react-window)
 * ----------------------------------
 * Rendering thousands of DOM nodes kills performance. Virtualization ("windowing")
 * renders only the rows currently visible in the viewport (plus a small overscan),
 * recycling nodes as you scroll. Constant DOM size regardless of dataset length.
 *
 * FixedSizeList: known, uniform row height. (VariableSizeList for dynamic heights.)
 * Architect note: reach for this at ~hundreds+ rows, or any long/infinite list.
 */

import { FixedSizeList, type ListChildComponentProps } from "react-window";

// 10,000 items — only visible rows are mounted.
const items = Array.from({ length: 10_000 }, (_, i) => `Row ${i + 1}`);

function Row({ index, style }: ListChildComponentProps) {
  // `style` positions the row absolutely — MUST be applied.
  return (
    <div style={{ ...style, padding: "0 8px", borderBottom: "1px solid #1f2937" }}>
      {items[index]}
    </div>
  );
}

export function VirtualizationDemo() {
  return (
    <div>
      <p style={{ color: "#94a3b8" }}>10,000 rows — inspect DOM: only ~visible rows exist.</p>
      <FixedSizeList height={240} width={"100%"} itemCount={items.length} itemSize={32}>
        {Row}
      </FixedSizeList>
    </div>
  );
}
