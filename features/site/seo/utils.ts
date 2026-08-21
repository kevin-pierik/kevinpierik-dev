import type { SeoFields } from "@/features/site/types";

export const emptySeo: SeoFields = {
  metaTitle: null,
  metaDescription: null,
  noIndex: false,
};

export function robotsFor(seo: SeoFields) {
  return seo.noIndex ? { index: false, follow: false } : undefined;
}
