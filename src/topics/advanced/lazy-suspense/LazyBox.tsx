// Lazily-loaded component (its own chunk). Default export required by React.lazy.
export default function LazyBox() {
  return (
    <div style={{ padding: 8, background: "#eef" }}>
      I was code-split and loaded on demand.
    </div>
  );
}
