import {defineField, defineType} from 'sanity'

import {createLanguageField} from '../fields/create-language-field'
import {createMedia} from '../fields/create-media'
import {createRichText} from '../fields/create-rich-text'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    createLanguageField(),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'The article lives at /blog/slug, or /nl/blog/slug in Dutch.',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      description: 'Shown in the timeline and used as the meta description.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'updatedAt', type: 'datetime'}),
    createMedia('cover'),
    createRichText({article: true}),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', language: 'language', media: 'cover'},
    prepare: ({title, language, media}) => ({title, subtitle: language?.toUpperCase(), media}),
  },
})
