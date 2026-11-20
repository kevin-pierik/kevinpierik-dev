import {defineArrayMember, defineField, defineType} from 'sanity'

import {createRichText} from '../fields/create-rich-text'
import {createSeoField} from '../fields/create-seo-field'
import {createUriField} from '../fields/create-uri-field'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    createUriField(),
    createSeoField(),
    createRichText({of: [defineArrayMember({type: 'articleList'})]}),
  ],
  preview: {
    select: {title: 'title', uri: 'uri.current'},
    prepare: ({title, uri}) => ({
      title,
      subtitle: uri,
    }),
  },
})
