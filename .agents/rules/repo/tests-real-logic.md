---
name: repo/tests-real-logic
rubric: testing
severity: advisory
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "frontend/e2e/**"
  - "frontend/vitest.config.*"
---

# Test real logic, next to the code

**Rule.** Tests use Vitest, live next to the code as `*.test.ts(x)`, import their APIs from `vitest`, and cover only real logic that is easy to break.

## Look for

- New logic with branches or edge cases (URI building, date formatting, reading time, slugs, `safeHref()`) without a test.
- Tests that assert hardcoded content, Tailwind classes, or that a framework renders what it was given.
- A test folder (`__tests__`, `tests/`) or a separate test workspace.
- Globals (`describe`, `it`, `expect`) used without importing them from `vitest`.
- Snapshot tests of whole components.

## Do not flag

- Playwright end-to-end tests in `frontend/e2e/`; they cover pages in a real browser.
- Components without tests when they only render markup.

## Why

Tests on copy and markup break with every edit and protect nothing. Tests on small pure functions catch the regressions that are hard to see in the browser.

## Example

Bad:

```ts
it("renders the footer", () => {
  expect(render(<SiteFooter />).getByText("© 2026")).toBeTruthy();
});
```

Good:

```ts
import { expect, it } from "vitest";

it("needs at least one minute to read", () => {
  expect(readingMinutes("word ".repeat(10))).toBe(1);
});
```
