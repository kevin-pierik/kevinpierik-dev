// @vitest-environment jsdom
import { act, cleanup, render, screen } from "@testing-library/react";
import { createAgent } from "@ui-sdk/react/agent";
import { afterEach, expect, test, vi } from "vitest";

afterEach(cleanup);

test("an agent can find the form and fill in an email address", async () => {
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "site-key");
  const { NewsletterForm } = await import("./newsletter-form");
  const agent = createAgent();
  render(<NewsletterForm />);
  await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

  const components = agent
    .snapshot()
    .filter((entry) => !entry.offPage && entry.component !== "more");
  for (const entry of components) {
    expect(
      entry.label,
      `${entry.component} ${entry.ref} has no name`,
    ).toBeTruthy();
  }
  const labels = components.map((entry) => entry.label);
  expect(labels).toContain("Get new posts by email");
  expect(labels).toContain("Subscribe");

  const result = await agent.act({
    steps: [
      { ref: "Get new posts by email", action: "setValue", args: ["a@b.co"] },
    ],
  });
  expect(result.ok, result.error?.message).toBe(true);
  expect(
    screen.getByRole<HTMLInputElement>("textbox", {
      name: "Get new posts by email",
    }).value,
  ).toBe("a@b.co");
});
