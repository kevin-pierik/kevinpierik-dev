import {defineField, defineType} from 'sanity'

import {createSections} from '../fields/create-sections'
import {createSeoField} from '../fields/create-seo-field'
import {createUriField} from '../fields/create-uri-field'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    {name: 'page', title: 'Page', default: true},
    {name: 'content', title: 'Content'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'page',
      validation: (rule) => rule.required(),
    }),
    {...createUriField(), group: 'page'},
    createSections(['textSection', 'imageSection', 'carouselSection']),
    {...createSeoField(), group: 'seo'},
  ],
  preview: {
    select: {title: 'title', uri: 'uri.current'},
    prepare: ({title, uri}) => ({
      title,
      subtitle: uri,
    }),
  },
})
