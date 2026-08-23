import type { ArticleText, WindowText } from "@/features/sanity/types.gen";

type Block = WindowText[number];
type Span = string | { text: string; href: string };

export function paragraph(key: string, ...spans: Span[]): Block {
  const markDefs: NonNullable<Block["markDefs"]> = [];

  const children = spans.map((span, index) => {
    if (typeof span === "string") {
      return {
        _type: "span" as const,
        _key: `${key}t${index}`,
        text: span,
        marks: [],
      };
    }

    const markKey = `${key}m${index}`;
    markDefs.push({ _key: markKey, _type: "link", href: span.href });

    return {
      _type: "span" as const,
      _key: `${key}t${index}`,
      text: span.text,
      marks: [markKey],
    };
  });

  return { _type: "block", _key: key, style: "normal", markDefs, children };
}

type ArticleBlock = ArticleText[number];

export function heading(
  key: string,
  level: "h2" | "h3",
  text: string,
): ArticleBlock {
  return {
    _type: "block",
    _key: key,
    style: level,
    markDefs: [],
    children: [{ _type: "span" as const, _key: `${key}t`, text, marks: [] }],
  };
}
