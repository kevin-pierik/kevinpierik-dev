import {
  DefaultLinkRenderer,
  portableTextToMarkdown,
} from "@portabletext/markdown";

import { imageProps } from "@/features/sanity/media/image";
import { absoluteUrl } from "@/features/site";

import type { Section, SectionOf } from "./types";

type Media = Pick<SectionOf<"mediaSection">, "kind" | "image" | "videoTitle">;

const text = (value: string) => value.replace(/[[\]]/g, "\\$&");
const url = (value: string) =>
  value.replace(
    /[()\s]/g,
    (char) =>
      `%${char.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")}`,
  );
const linked = (label: string, href?: string | null) =>
  href ? `[${text(label)}](${url(absoluteUrl(href))})` : label;

function media(value: Media | null, caption?: string | null) {
  const line =
    value?.kind === "video"
      ? value.videoTitle && `Video: ${value.videoTitle}`
      : value?.image?.asset &&
        `![${text(value.image.alt ?? "")}](${url(imageProps(value.image).src)})`;

  return [line, caption && `_${caption}_`].filter(Boolean).join("\n\n");
}

function fence(code: string) {
  const longest = Math.max(
    2,
    ...(code.match(/`+/g) ?? []).map((run) => run.length),
  );
  return "`".repeat(longest + 1);
}

function row(cells: string[] | null | undefined) {
  return `| ${(cells ?? []).map((cell) => cell.replace(/\|/g, "\\|").replace(/\n/g, " ")).join(" | ")} |`;
}

function section(value: Section) {
  switch (value._type) {
    case "heroSection":
      return [
        [value.title, value.titleMuted].filter(Boolean).join(" "),
        value.lead,
      ]
        .filter(Boolean)
        .join("\n\n");
    case "textSection": {
      const body = portableTextToMarkdown(value.body ?? [], {
        marks: {
          link: (options) =>
            DefaultLinkRenderer({
              ...options,
              value: options.value && {
                ...options.value,
                href: absoluteUrl(options.value.href ?? ""),
              },
            }),
        },
      });
      return [value.title && `## ${value.title}`, body]
        .filter(Boolean)
        .join("\n\n");
    }
    case "mediaSection":
      return media(value, value.caption);
    case "code": {
      const marker = fence(value.code ?? "");
      return `${marker}${value.language ?? ""}\n${value.code ?? ""}\n${marker}`;
    }
    case "table": {
      const [head, ...rows] = value.rows ?? [];
      if (!head) return "";
      return [
        row(head.cells),
        row(head.cells?.map(() => "---")),
        ...rows.map((tableRow) => row(tableRow.cells)),
      ].join("\n");
    }
    case "carouselSection":
    case "listSection":
      return [
        value.title && `## ${value.title}`,
        value.items
          ?.map(
            (item) =>
              `- ${"period" in item && item.period ? `${item.period}: ` : ""}${"organization" in item && item.organization ? `${item.title} at ${linked(item.organization, item.link)}` : linked(item.title ?? "", item.link)}${item.description ? `: ${item.description}` : ""}${"location" in item && item.location ? ` (${item.location})` : ""}`,
          )
          .join("\n"),
      ]
        .filter(Boolean)
        .join("\n\n");
    case "linksSection":
      return [
        value.title && `## ${value.title}`,
        value.text,
        value.links
          ?.map((item) => `- ${linked(item.label ?? "", item.link)}`)
          .join("\n"),
      ]
        .filter(Boolean)
        .join("\n\n");
    default:
      return "";
  }
}

export function sectionsToMarkdown(sections: Section[] | null | undefined) {
  return (sections ?? []).map(section).filter(Boolean).join("\n\n");
}
