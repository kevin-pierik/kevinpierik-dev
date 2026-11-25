import type {
  ARTICLE_QUERY_RESULT,
  PAGE_QUERY_RESULT,
} from "@/features/sanity/sanity.types";

export type Section =
  | NonNullable<NonNullable<ARTICLE_QUERY_RESULT>["sections"]>[number]
  | NonNullable<NonNullable<PAGE_QUERY_RESULT>["sections"]>[number];

export type SectionOf<Type extends Section["_type"]> = Extract<
  Section,
  { _type: Type }
>;
