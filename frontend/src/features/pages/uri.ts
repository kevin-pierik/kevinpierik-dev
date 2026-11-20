export function pageUri(segments: readonly string[] = []) {
  return (
    `/${segments.map(encodeURIComponent).join("/")}`.replace(/\/$/, "") || "/"
  );
}

export function uriSegments(uri: string) {
  return uri.split("/").filter(Boolean).map(decodeURIComponent);
}

export function isHomeUri(uri: string) {
  return uri === "/";
}
