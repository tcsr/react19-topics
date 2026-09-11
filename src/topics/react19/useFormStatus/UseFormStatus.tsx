/**
 * useFormStatus (React 19)
 * ------------------------
 * useFormStatus reads the status of the PARENT <form> from inside a child
 * component, without prop drilling. Useful for building a reusable submit button
 * that knows when the form is submitting.
 *
 * It returns { pending, data, method, action }. It MUST be called from a component
 * rendered inside the <form> (not the same component that renders <form>).
 *
 * Import path: "react-dom".
 */

import { useFormStatus } from "react-dom";

// Reusable submit button aware of its enclosing form's pending state.
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

export function UseFormStatusDemo() {
  async function action(formData: FormData) {
    await new Promise((r) => setTimeout(r, 800));
    alert(`Sent: ${formData.get("q")}`);
  }

  return (
    <form action={action}>
      <input name="q" placeholder="Search..." />
      {/* Child reads parent form status */}
      <SubmitButton />
    </form>
  );
}
