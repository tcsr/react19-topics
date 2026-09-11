/**
 * REACT HOOK FORM
 * ---------------
 * React Hook Form (RHF) is a performant form library built on UNCONTROLLED inputs
 * + refs, so typing doesn't re-render the whole form. It gives you registration,
 * validation, error state, and submission handling with minimal code.
 *
 * Core API:
 *  - register(name, rules)  wires an input (ref-based) + validation rules.
 *  - handleSubmit(onValid)  validates, then calls your handler with typed values.
 *  - formState.errors       per-field validation errors.
 *  - watch / setValue / reset / control for advanced cases.
 */

import { useForm } from "react-hook-form";

interface FormValues {
  email: string;
  age: number;
}

export function ReactHookFormDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ defaultValues: { email: "", age: 18 } });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 500)); // fake submit
    alert(JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          placeholder="email"
          {...register("email", {
            required: "Email required",
            pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
          })}
        />
        {errors.email && <span style={{ color: "salmon" }}> {errors.email.message}</span>}
      </div>
      <div>
        <input
          type="number"
          placeholder="age"
          {...register("age", {
            valueAsNumber: true,
            min: { value: 18, message: "Must be 18+" },
          })}
        />
        {errors.age && <span style={{ color: "salmon" }}> {errors.age.message}</span>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
