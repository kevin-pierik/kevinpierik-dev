export function countWords(text: string) {
  return text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu)?.length ?? 0;
}

export function readingMinutes(text: string) {
  return Math.max(1, Math.ceil(countWords(text) / 200));
}
