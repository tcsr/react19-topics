/**
 * COMPONENT TEST — Vitest + React Testing Library + user-event.
 * Queries by role/text (what the user sees); simulates a real click.
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Counter } from "./Testing";

describe("Counter", () => {
  it("starts at 0 and increments on click", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    expect(screen.getByText("Count: 0")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /increment/i }));

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
