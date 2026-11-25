import { describe, expect, test, vi } from "vitest";

vi.mock("@/features/sanity/media/image", () => ({
  imageProps: () => ({ src: "https://cdn.sanity.io/image.png" }),
}));

import { absoluteUrl } from "@/features/site";

import { sectionsToMarkdown } from "./markdown";
import type { Section } from "./types";

const sections = (...items: unknown[]) => items as Section[];

describe("sectionsToMarkdown", () => {
  test("renders rich text with absolute internal links", () => {
    expect(
      sectionsToMarkdown(
        sections({
          _key: "a",
          _type: "textSection",
          body: [
            {
              _type: "block",
              _key: "b",
              style: "h2",
              markDefs: [],
              children: [{ _type: "span", _key: "c", text: "Hi", marks: [] }],
            },
            {
              _type: "block",
              _key: "d",
              style: "normal",
              markDefs: [{ _key: "l", _type: "link", href: "/posts" }],
              children: [
                { _type: "span", _key: "e", text: "Posts", marks: ["l"] },
              ],
            },
          ],
        }),
      ),
    ).toBe("## Hi\n\n[Posts](https://www.kevinpierik.dev/posts)");
  });

  test("fences code longer than the backtick runs inside it", () => {
    expect(
      sectionsToMarkdown(
        sections({ _key: "a", _type: "code", code: "```js", language: "md" }),
      ),
    ).toBe("````md\n```js\n````");
  });

  test("renders tables with the first row as header and escaped pipes", () => {
    expect(
      sectionsToMarkdown(
        sections({
          _key: "a",
          _type: "table",
          rows: [
            { _key: "h", cells: ["A", "B"] },
            { _key: "r", cells: ["1|2", "3"] },
          ],
        }),
      ),
    ).toBe("| A | B |\n| --- | --- |\n| 1\\|2 | 3 |");
  });

  test("renders videos by title, captions, and carousels as link lists", () => {
    expect(
      sectionsToMarkdown(
        sections(
          {
            _key: "a",
            _type: "mediaSection",
            kind: "video",
            videoTitle: "Demo",
            caption: "A demo",
          },
          {
            _key: "b",
            _type: "carouselSection",
            title: "Work",
            items: [
              { _key: "c", title: "Site", link: "/", description: "Home" },
              { _key: "d", title: "Other", link: null, description: null },
              { _key: "e", title: "A [b]", link: "/a (b)", description: null },
            ],
          },
        ),
      ),
    ).toBe(
      "Video: Demo\n\n_A demo_\n\n## Work\n\n- [Site](https://www.kevinpierik.dev): Home\n- Other\n- [A \\[b\\]](https://www.kevinpierik.dev/a%20%28b%29)",
    );
  });

  test("renders images with alt text", () => {
    expect(
      sectionsToMarkdown(
        sections({
          _key: "a",
          _type: "mediaSection",
          kind: "image",
          image: { alt: "Desk", asset: { _id: "image-1" } },
        }),
      ),
    ).toBe("![Desk](https://cdn.sanity.io/image.png)");
  });

  test("renders list items with their period", () => {
    expect(
      sectionsToMarkdown(
        sections({
          _key: "a",
          _type: "listSection",
          title: "Work",
          items: [
            { _key: "b", period: "2025–now", title: "Friday", link: null },
            {
              _key: "c",
              period: null,
              title: "Intern",
              description: "Web",
              location: "Zwolle",
            },
          ],
        }),
      ),
    ).toBe("## Work\n\n- 2025–now: Friday\n- Intern: Web (Zwolle)");
  });

  test("links only the organization when a list item has one", () => {
    expect(
      sectionsToMarkdown(
        sections({
          _key: "a",
          _type: "listSection",
          title: "Experience",
          items: [
            {
              _key: "b",
              title: "Intern",
              organization: "Friday",
              link: "https://www.friday.nl",
            },
          ],
        }),
      ),
    ).toBe("## Experience\n\n- Intern at [Friday](https://www.friday.nl)");
  });

  test("skips empty sections", () => {
    expect(
      sectionsToMarkdown(
        sections({ _key: "a", _type: "table", rows: [] }, { _key: "b" }),
      ),
    ).toBe("");
  });
});

test("absoluteUrl leaves external and protocol-relative URLs alone", () => {
  expect(absoluteUrl("https://github.com")).toBe("https://github.com");
  expect(absoluteUrl("//evil.example")).toBe("//evil.example");
});
