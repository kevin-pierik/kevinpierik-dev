import { expect, test } from "vitest";

import { escapeXml } from "./escape-xml";

test("escapes every XML special character, ampersands first", () => {
  expect(escapeXml(`Tom & "Jerry" <it's> &amp;`)).toBe(
    "Tom &amp; &quot;Jerry&quot; &lt;it&apos;s&gt; &amp;amp;",
  );
});
