import type { PAGE_QUERY_RESULT } from "@/features/sanity/sanity.types";
import { Sections } from "@/features/sections";

type PageBodyProps = {
  page: Pick<NonNullable<PAGE_QUERY_RESULT>, "title" | "sections">;
};

export function PageBody({ page }: PageBodyProps) {
  return (
    <article
      aria-label={page.title}
      className="site:col-span-full site:grid-site site:content-start site:*:col-[3/11] site:*:data-bleed:col-[3/-1] site:*:data-wide:col-[2/12] site:[&>:is(figure,[data-table]):not([data-wide])]:col-[3/11]"
    >
      <Sections sections={page.sections} />
    </article>
  );
}
