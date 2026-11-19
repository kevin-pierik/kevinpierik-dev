import { Entries } from "./entries";
import { Intro } from "./intro";
import { Rows } from "./rows";
import { Text } from "./text";
import type { SectionData } from "./types";

export function Sections({ sections }: { sections: SectionData[] | null }) {
  return sections?.map((section) => {
    switch (section._type) {
      case "introSection":
        return <Intro key={section._key} {...section} />;
      case "entriesSection":
        return <Entries key={section._key} {...section} />;
      case "textSection":
        return <Text key={section._key} {...section} />;
      case "rowsSection":
        return <Rows key={section._key} {...section} />;
    }
  });
}
