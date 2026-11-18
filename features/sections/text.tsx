import { Section } from "./section";
import { SimpleText } from "./simple-text";
import type { SectionOf } from "./types";

export function Text({ title, body }: SectionOf<"textSection">) {
  return (
    <Section title={title}>
      <SimpleText value={body} />
    </Section>
  );
}
