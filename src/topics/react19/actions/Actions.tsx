/**
 * ACTIONS (React 19)
 * ------------------
 * "Actions" are functions (often async) that update state in response to a user
 * interaction, wired to a <form> via the `action` prop. React 19 lets a <form>,
 * <button>, or <input> take an `action` function directly. React automatically:
 *  - manages pending state during the async work,
 *  - resets the form on success (for uncontrolled forms),
 *  - and integrates with useActionState / useFormStatus / useOptimistic.
 *
 * A form action receives the FormData automatically. This replaces most manual
 * onSubmit + preventDefault + loading-flag boilerplate.
 */

export function Actions() {
  // A form action: async function receiving FormData.
  async function submitAction(formData: FormData) {
    const email = formData.get("email");
    // Simulate a request.
    await new Promise((r) => setTimeout(r, 500));
    alert(`Subscribed: ${email}`);
  }

  return (
    <form action={submitAction}>
      <input name="email" type="email" placeholder="you@example.com" required />
      <button type="submit">Subscribe</button>
    </form>
  );
}
