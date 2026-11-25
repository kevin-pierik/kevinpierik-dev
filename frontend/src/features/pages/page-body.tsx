import type { PAGE_QUERY_RESULT } from "@/features/sanity/sanity.types";
import { Sections } from "@/features/sections";
import { Hero } from "@/features/sections/hero";

type Page = Pick<NonNullable<PAGE_QUERY_RESULT>, "title" | "sections">;

export function pageHero(page: Page) {
  const first = page.sections?.[0];
  return first?._type === "heroSection" ? first : null;
}

export function PageBody({ page }: { page: Page }) {
  const hero = pageHero(page);
  const sections = (hero ? page.sections?.slice(1) : page.sections) ?? [];

  return (
    <>
      {hero ? <Hero {...hero} /> : null}
      {sections.length > 0 ? (
        <article
          aria-label={page.title}
          className="*:max-w-[55.3125rem] [&>:is(figure,[data-table])]:max-w-[55.3125rem] [&>[data-full]]:max-w-none [&>figure[data-wide]]:max-w-none"
        >
          <Sections sections={sections} />
        </article>
      ) : null}
    </>
  );
}
