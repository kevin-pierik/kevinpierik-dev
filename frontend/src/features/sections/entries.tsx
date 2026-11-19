import { getDictionary, getLocale } from "@/features/i18n";
import { SanityLink } from "@/features/sanity/link";

import { row, Section } from "./section";
import type { SectionOf } from "./types";

type Entry = NonNullable<SectionOf<"entriesSection">["entries"]>[number];

function Years({ start, end, current }: Entry) {
  return (
    <>
      <time dateTime={start.slice(0, 7)}>{start.slice(0, 4)}</time>
      {end || current ? " – " : null}
      {end ? <time dateTime={end.slice(0, 7)}>{end.slice(0, 4)}</time> : null}
    </>
  );
}

async function EntryRow(entry: Entry) {
  const { at, present } = getDictionary(await getLocale());
  const { title, company, link, location, description } = entry;
  const name = (
    <SanityLink href={link} variant="nav">
      {company ?? title}
      {link ? (
        <>
          {" "}
          <span aria-hidden="true" className="text-muted">
            ↗
          </span>
        </>
      ) : null}
    </SanityLink>
  );

  return (
    <div className={`grid [&+&]:mt-[1lh] ${row}`}>
      <h3 className="site:col-[5/11]">
        {company ? (
          <>
            {title} {at} {name}
          </>
        ) : (
          name
        )}
      </h3>
      <p className="order-first text-muted tabular-nums site:order-0 site:col-[3/5] site:row-start-1">
        <Years {...entry} />
        {!entry.end && entry.current ? present : null}
      </p>
      <div className="max-w-[80ch] text-muted site:col-[5/11]">
        {description ? <div>{description}</div> : null}
        <div>{location}</div>
      </div>
    </div>
  );
}

export function Entries({ title, entries }: SectionOf<"entriesSection">) {
  return (
    <Section title={title}>
      {entries?.map((entry) => (
        <EntryRow key={entry._key} {...entry} />
      ))}
    </Section>
  );
}
