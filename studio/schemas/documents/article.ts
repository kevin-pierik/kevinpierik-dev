import {defineField, defineType} from 'sanity'

import {createRichText} from '../fields/create-rich-text'
import {createSeoField} from '../fields/create-seo-field'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'The article lives at /posts/slug.',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      description: 'Shown on the posts index and used as the meta description.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'updatedAt', type: 'datetime'}),
    defineField({
      name: 'showInPosts',
      type: 'boolean',
      title: 'Show in posts overview',
      description: 'Published articles remain accessible by URL when this is turned off.',
      initialValue: true,
    }),
    createSeoField(),
    createRichText(),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', publishedAt: 'publishedAt'},
    prepare: ({title, publishedAt}) => ({
      title,
      subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString('en-GB') : undefined,
    }),
  },
})
