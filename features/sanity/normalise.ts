import { stegaClean } from "next-sanity";

import type { SeoFields, SiteLink } from "@/features/site/types";
import { emptySeo } from "@/features/site/seo/utils";

export type Nullable = string | null | undefined;

export type RawSeo = {
  metaTitle?: Nullable;
  metaDescription?: Nullable;
  noIndex?: boolean | null;
} | null;

export type RawLink = { label?: Nullable; href?: Nullable } | null;

export function text(value: Nullable): string | null {
  const cleaned = stegaClean(value ?? "").trim();
  return cleaned.length > 0 ? cleaned : null;
}

export function toSeo(value: RawSeo | undefined): SeoFields {
  if (!value) return emptySeo;

  return {
    metaTitle: text(value.metaTitle),
    metaDescription: text(value.metaDescription),
    noIndex: value.noIndex === true,
  };
}

export function toLinks(
  value: RawLink[] | null | undefined,
  fallback: SiteLink[],
): SiteLink[] {
  const resolved = (value ?? []).flatMap((item) => {
    const label = text(item?.label);
    const href = text(item?.href);
    return label && href ? [{ label, href }] : [];
  });

  return resolved.length > 0 ? resolved : fallback;
}
