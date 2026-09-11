# Core — Study Notes

Demos: `src/topics/core`

## Components
- **Def**: reusable function returning JSX; the unit of UI.
- **Key points**: name PascalCase; return one root (Fragment `<>` to group);
  render must be **pure** (same props → same output, no side effects).
- **Gotcha**: lowercase name → React treats it as an HTML tag, not a component.
- **Quick Q**: Why must render be pure? → It can be interrupted/re-run under
  concurrent rendering.

## JSX
- **Def**: syntax sugar compiling to `React.createElement` → plain JS objects.
- **Key points**: `{expr}` for JS; `className`/`htmlFor`; style is an **object**;
  all tags self-close.
- **Gotcha**: `{}` takes an **expression**, not a statement (no `if`/`for` inside).
- **Quick Q**: What does JSX compile to? → `createElement(type, props, ...children)`.

## Props & children
- **Def**: read-only inputs passed parent→child; one-way data flow.
- **Key points**: never mutate props; `children` is the nested JSX; default values
  via destructuring; type with interface.
- **Gotcha**: mutating a prop object/array breaks the data-flow contract → bugs.
- **Quick Q**: How to pass content between tags? → `children` prop.

## Conditional rendering & lists
- **Key points**: `cond ? A : B`, `cond && A`; render arrays with `.map`; each item
  needs a **stable unique key**.
- **Gotcha 1**: `count && <X/>` renders `0` when count is 0 — use `count > 0 &&`.
- **Gotcha 2**: index-as-key breaks on reorder/insert/delete → use a real id.
- **Quick Q**: Why keys? → Identity across renders so React moves vs recreates.

## Event handling
- **Key points**: camelCase (`onClick`); pass a function **reference**;
  SyntheticEvent (cross-browser wrapper); `e.preventDefault()`.
- **Gotcha**: `onClick={fn()}` calls immediately — use `onClick={fn}` or
  `onClick={() => fn(arg)}`.
- **Quick Q**: SyntheticEvent? → React's normalized wrapper over native events.
