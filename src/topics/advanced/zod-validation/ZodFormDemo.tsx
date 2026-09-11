/**
 * SCHEMA VALIDATION: Zod + React Hook Form
 * ----------------------------------------
 * Zod defines a schema that is BOTH a runtime validator AND a TypeScript type
 * (z.infer). One source of truth for shape + rules. @hookform/resolvers wires the
 * schema into React Hook Form via zodResolver, so validation logic lives in the
 * schema, not scattered across fields.
 *
 * Architect note: the same Zod schema can validate API responses, env vars, and
 * form input — shared client/server contracts.
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Single schema = validation + type.
const schema = z.object({
  username: z.string().min(3, "Min 3 chars"),
  email: z.string().email("Invalid email"),
  // RHF converts the input to a number (valueAsNumber) before Zod validates it.
  age: z.number().int().min(18, "18+ only"),
});
type FormValues = z.infer<typeof schema>;

export function ZodFormDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
      style={{ display: "grid", gap: 8, maxWidth: 320 }}
    >
      <input placeholder="username" {...register("username")} />
      {errors.username && <span style={{ color: "salmon" }}>{errors.username.message}</span>}

      <input placeholder="email" {...register("email")} />
      {errors.email && <span style={{ color: "salmon" }}>{errors.email.message}</span>}

      <input type="number" placeholder="age" {...register("age", { valueAsNumber: true })} />
      {errors.age && <span style={{ color: "salmon" }}>{errors.age.message}</span>}

      <button type="submit">Validate & submit</button>
    </form>
  );
}
