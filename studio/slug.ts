import {defaultLanguage} from './i18n'

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function uriPrefix(language: string) {
  return language === defaultLanguage ? '' : `/${language}`
}

export function uriFromTitle(language: string, title: string) {
  const slug = slugify(title)
  return `${uriPrefix(language)}/${slug}`.replace(/\/$/, '') || '/'
}
