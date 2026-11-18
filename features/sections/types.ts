import type { PAGE_QUERY_RESULT } from "@/features/sanity/sanity.types";

export type SectionData = NonNullable<
  NonNullable<PAGE_QUERY_RESULT>["sections"]
>[number];

export type SectionOf<Type extends SectionData["_type"]> = Extract<
  SectionData,
  { _type: Type }
>;
