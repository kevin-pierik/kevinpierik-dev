import {defineField, type SlugValidationContext} from 'sanity'

import {uriFromTitle, uriPrefix} from '../../slug'

async function isUniqueUri(uri: string, {document, getClient}: SlugValidationContext) {
  const id = document?._id.replace(/^drafts\./, '')
  const count = await getClient({apiVersion: '2026-10-28'}).fetch<number>(
    'count(*[_type == $type && uri.current == $uri && !(_id in [$id, $draft])])',
    {type: document?._type, uri, id, draft: `drafts.${id}`},
  )
  return count === 0
}

export function createUriField() {
  return defineField({
    name: 'uri',
    title: 'URI',
    type: 'slug',
    description: 'The full public path, with the language prefix, such as /about or /nl/over.',
    options: {
      source: (document) =>
        uriFromTitle(String(document.language ?? ''), String(document.title ?? '')),
      slugify: (uri) => uri,
      isUnique: isUniqueUri,
    },
    validation: (rule) =>
      rule.required().custom((value, {document}) => {
        const uri = value?.current
        if (!uri) return true
        const prefix = uriPrefix(String(document?.language ?? ''))
        return uri === (prefix || '/') || uri.startsWith(`${prefix}/`)
          ? true
          : `Start with ${prefix || '/'} for this language.`
      }),
  })
}
