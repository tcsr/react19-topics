/**
 * JSX
 * ---
 * JSX is a syntax extension for JavaScript that lets you write HTML-like markup
 * inside a JS file. It is not a string and not HTML — it compiles down to
 * React.createElement(...) calls that produce plain JS objects (React elements).
 *
 * Key rules:
 *  - Use camelCase for attributes (className, htmlFor, onClick).
 *  - Embed JS expressions with curly braces: {expression}.
 *  - Every tag must be closed, including self-closing ones (<br />).
 */

export function Jsx() {
  const name = "React 19";
  const items = ["a", "b", "c"];

  return (
    <div>
      {/* Expressions inside braces */}
      <p>Interpolated value: {name.toUpperCase()}</p>

      {/* Inline styles are objects, not strings */}
      <p style={{ color: "teal", fontWeight: 600 }}>Styled via object</p>

      {/* Any valid JS expression works */}
      <p>{items.join(" - ")}</p>
    </div>
  );
}
