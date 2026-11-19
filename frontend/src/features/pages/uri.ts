import type { Locale } from "@/features/i18n/config";
import { uriPrefix } from "@studio/slug";

export function pageUri(locale: Locale, segments: readonly string[] = []) {
  const path = segments.map(encodeURIComponent).join("/");
  return `${uriPrefix(locale)}/${path}`.replace(/\/$/, "") || "/";
}

export function uriSegments(locale: Locale, uri: string) {
  const prefix = uriPrefix(locale);
  const rest = uri.startsWith(prefix) ? uri.slice(prefix.length) : uri;
  return rest.split("/").filter(Boolean).map(decodeURIComponent);
}

export function isHomeUri(locale: Locale, uri: string) {
  return uri === pageUri(locale);
}
