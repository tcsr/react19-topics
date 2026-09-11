/**
 * DOCUMENT METADATA (React 19)
 * ----------------------------
 * React 19 natively supports rendering <title>, <meta>, and <link> tags anywhere
 * in your component tree. React automatically HOISTS them into the document <head>.
 * No more react-helmet for basic cases — set page metadata right where the
 * component lives, and it works with streaming SSR too.
 *
 * React also has built-in support for stylesheet precedence and async <script>
 * resource loading/dedup.
 */

export function DocumentMetadataDemo() {
  return (
    <div>
      {/* These get hoisted into <head> automatically */}
      <title>React 19 Topics — Metadata Demo</title>
      <meta name="description" content="Demonstrating native document metadata" />
      <link rel="canonical" href="https://example.com/react19-topics" />

      <p>Check the document &lt;head&gt; / browser tab title — set from here.</p>
    </div>
  );
}
