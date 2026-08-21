import type { PortableTextValue } from "@/features/rich-text/types";
import type { SeoFields } from "@/features/site/types";

export type PostSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
};

export type Post = PostSummary & {
  body: PortableTextValue;
  seo: SeoFields;
};
