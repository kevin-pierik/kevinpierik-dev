import { SanityLink } from "@/features/sanity/link";

import { row, Section } from "./section";
import type { SectionOf } from "./types";

export function Rows({ title, address, rows }: SectionOf<"rowsSection">) {
  const list = (
    <ul className={row}>
      {rows?.map(({ _key, label, text, link }) => (
        <li
          className="grid grid-cols-[7rem_1fr] gap-x-4 site:col-span-full site:grid-site [&+&]:mt-0.5"
          key={_key}
        >
          <span className="text-muted site:col-[3/5]">{label}</span>
          <span className="site:col-[5/11]">
            <SanityLink href={link}>{text}</SanityLink>
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <Section title={title}>
      {address ? (
        <address className={`not-italic ${row}`}>{list}</address>
      ) : (
        list
      )}
    </Section>
  );
}
