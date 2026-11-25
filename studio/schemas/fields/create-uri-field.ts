import {defineField, type SlugValidationContext} from 'sanity'

import {uriFromTitle, uriProblem} from '../../slug'

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
    description: 'The full public path, such as /about.',
    options: {
      source: (document) => uriFromTitle(String(document.title ?? '')),
      slugify: (uri) => uri,
      isUnique: isUniqueUri,
    },
    validation: (rule) =>
      rule
        .required()
        .custom((value: {current?: string} | undefined) => uriProblem(value?.current) ?? true),
  })
}
