import type { SectionOf } from "./types";
import { SimpleText } from "./simple-text";

export function Intro({ body }: SectionOf<"introSection">) {
  return (
    <div className="max-w-[80ch] text-muted site:col-[3/11]">
      <SimpleText value={body} />
    </div>
  );
}
