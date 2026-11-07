import type { Graph, Thing, WithContext } from "schema-dts";

type JsonLdProps = {
  data: Thing | WithContext<Thing> | Graph;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
