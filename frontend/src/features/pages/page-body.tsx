import { PortableText } from "next-sanity";

import { richTextComponents } from "@/features/sanity/rich-text";
import type { PAGE_QUERY_RESULT } from "@/features/sanity/sanity.types";

type PageBodyProps = {
  page: Pick<NonNullable<PAGE_QUERY_RESULT>, "title" | "body">;
};

export function PageBody({ page }: PageBodyProps) {
  return (
    <article
      aria-label={page.title}
      className="site:col-span-full site:grid-site site:content-start site:*:col-[3/11] site:*:data-wide:col-[2/12] site:[&>:is(figure,[data-table]):not([data-wide])]:col-[3/11]"
    >
      <PortableText components={richTextComponents} value={page.body ?? []} />
    </article>
  );
}
