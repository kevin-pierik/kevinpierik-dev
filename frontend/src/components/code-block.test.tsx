import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";

import { CodeBlock } from "./code-block";

const labels = { copy: "Copy code", copied: "Copied", failed: "Copy failed" };

async function render(props: Partial<Parameters<typeof CodeBlock>[0]>) {
  return renderToStaticMarkup(
    await CodeBlock({ code: "one\ntwo\nthree", labels, ...props }),
  );
}

test("marks the highlighted lines by their 1-based number", async () => {
  const markup = await render({ highlightedLines: [2] });
  const lines = markup.match(/<span class="line"[^>]*>/g) ?? [];

  expect(lines.map((line) => line.includes("data-highlighted"))).toEqual([
    false,
    true,
    false,
  ]);
});

test("names the language from an id or alias", async () => {
  expect(await render({ lang: "ts" })).toContain(">TypeScript</span>");
  expect(await render({ lang: "sh" })).toContain(">Shell</span>");
});
