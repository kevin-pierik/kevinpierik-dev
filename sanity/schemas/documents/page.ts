import {defineField, defineType} from 'sanity'

import {createLanguageField} from '../fields/create-language-field'
import {createPageBuilder} from '../fields/create-page-builder'
import {createSeoField} from '../fields/create-seo-field'
import {createUriField} from '../fields/create-uri-field'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    createLanguageField(),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    createUriField(),
    createSeoField(),
    createPageBuilder(),
  ],
  preview: {
    select: {title: 'title', uri: 'uri.current', language: 'language'},
    prepare: ({title, uri, language}) => ({
      title,
      subtitle: [language?.toUpperCase(), uri].filter(Boolean).join(' · '),
    }),
  },
})
