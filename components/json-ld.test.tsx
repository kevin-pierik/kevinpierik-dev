import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";

import { JsonLd } from "./json-ld";

function scriptContent(markup: string) {
  return markup.match(/<script[^>]*>(.*)<\/script>/)?.[1] ?? "";
}

describe("JsonLd", () => {
  test("renders a JSON-LD script tag", () => {
    const markup = renderToStaticMarkup(
      <JsonLd data={{ "@type": "Person", name: "Kevin" }} />,
    );

    expect(markup).toBe(
      '<script type="application/ld+json">{"@type":"Person","name":"Kevin"}</script>',
    );
  });

  test("escapes markup so data cannot close the script element", () => {
    const data = {
      "@type": "Person",
      name: "</script><script>alert(1)</script>",
    } as const;
    const content = scriptContent(renderToStaticMarkup(<JsonLd data={data} />));

    expect(content).not.toContain("<");
    expect(JSON.parse(content)).toEqual(data);
  });
});
