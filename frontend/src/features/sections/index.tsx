import { PortableText } from "next-sanity";
import { Fragment } from "react";

import { CodeBlock } from "@/components/code-block";
import { Figure, figureSizes } from "@/components/figure";
import { Table } from "@/components/table";
import { labels, richTextComponents } from "@/features/sanity/rich-text";

import { Carousel } from "./carousel";
import { List } from "./list";
import { Media } from "./media";
import { Posts } from "./posts";
import { TitledText } from "./titled-text";
import type { Section } from "./types";

function SectionContent({ section }: { section: Section }) {
  switch (section._type) {
    case "textSection":
      return section.title ? (
        <TitledText {...section} />
      ) : (
        <PortableText
          components={richTextComponents}
          value={section.body ?? []}
        />
      );
    case "mediaSection":
      return (
        <Figure
          caption={section.caption}
          className="mt-[2lh] first:mt-0"
          wide={section.wide ?? false}
        >
          <Media
            className="h-auto w-full bg-subtle"
            media={section}
            sizes={section.wide ? figureSizes.wide : figureSizes.normal}
          />
        </Figure>
      );
    case "code":
      return (
        <CodeBlock
          className="mt-[1.5lh] first:mt-0"
          code={section.code ?? ""}
          highlightedLines={section.highlightedLines}
          labels={labels}
          lang={section.language ?? undefined}
        />
      );
    case "table": {
      const [head, ...rows] = section.rows ?? [];
      if (!head) return null;

      return (
        <Table className="mt-[2lh] first:mt-0">
          <thead>
            <tr>
              {head.cells?.map((cell, index) => (
                <th key={index} scope="col">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row._key}>
                {row.cells?.map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    case "carouselSection":
      return <Carousel {...section} />;
    case "listSection":
      return <List {...section} />;
    case "postsSection":
      return <Posts {...section} />;
    default:
      return null;
  }
}

export function Sections({ sections }: { sections: Section[] | null }) {
  return sections?.map((section) => (
    <Fragment key={section._key}>
      <SectionContent section={section} />
    </Fragment>
  ));
}
