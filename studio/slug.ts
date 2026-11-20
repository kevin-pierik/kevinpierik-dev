export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function uriFromTitle(title: string) {
  const slug = slugify(title)
  return `/${slug}`.replace(/\/$/, '') || '/'
}
