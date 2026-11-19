import type { ReactNode } from "react";

import { slugify } from "@studio/slug";

export const row = "site:col-span-full site:grid-site";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export function Section({ title, children }: SectionProps) {
  const id = slugify(title);

  return (
    <section aria-labelledby={id} className={`mt-[6lh] [&+&]:mt-[3lh] ${row}`}>
      <h2 className="mb-[1lh] site:col-[3/11]" id={id}>
        {title}:
      </h2>
      {children}
    </section>
  );
}
