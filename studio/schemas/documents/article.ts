import {defineField, defineType} from 'sanity'

import {createSections} from '../fields/create-sections'
import {createSeoField} from '../fields/create-seo-field'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    {name: 'post', title: 'Post', default: true},
    {name: 'content', title: 'Content'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'post',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      group: 'post',
      type: 'slug',
      description: 'The article lives at /posts/slug.',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      group: 'post',
      type: 'text',
      rows: 3,
      description: 'Shown on the posts index and used as the meta description.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'publishedAt',
      group: 'post',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'updatedAt', type: 'datetime', group: 'post'}),
    defineField({
      name: 'showInPosts',
      group: 'post',
      type: 'boolean',
      title: 'Show in posts overview',
      description: 'Published articles remain accessible by URL when this is turned off.',
      initialValue: true,
    }),
    createSections([
      'textSection',
      'mediaSection',
      'code',
      'table',
      'carouselSection',
      'listSection',
    ]),
    {...createSeoField(), group: 'seo'},
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
