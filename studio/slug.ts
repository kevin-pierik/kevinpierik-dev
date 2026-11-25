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

const reservedUris = [
  /^\/contact$/,
  /^\/privacy$/,
  /^\/posts\/./,
  /^\/api(\/|$)/,
  /^\/studio(\/|$)/,
]

export function uriProblem(uri: string | undefined) {
  if (!uri) return undefined
  if (!/^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*)?$/.test(uri)) {
    return 'Use a path such as /about: a leading slash, lowercase letters, numbers, and hyphens, and no trailing slash.'
  }
  if (reservedUris.some((pattern) => pattern.test(uri))) {
    return 'The site already uses this path for something else.'
  }
  return undefined
}

export function slugProblem(slug: string | undefined) {
  if (!slug || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return undefined
  return 'Use lowercase letters, numbers, and hyphens only.'
}
