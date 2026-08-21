import { toPlainText } from "@portabletext/react";
import { stegaClean } from "next-sanity";

import type { PortableTextValue } from "@/features/rich-text/types";

const WORDS_PER_MINUTE = 200;

export function readingTime(value: PortableTextValue) {
  if (!value) return "1 min";

  const blocks = stegaClean(Array.isArray(value) ? value : [value]);
  const words = toPlainText(blocks).split(/\s+/).filter(Boolean).length;

  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min`;
}
