import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

import {createRichText} from '../fields/create-rich-text'
import {blockText} from './preview'

export const textSection = defineType({
  name: 'textSection',
  title: 'Text',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    createRichText(),
  ],
  preview: {
    select: {title: 'title', body: 'body'},
    prepare: ({title, body}) => ({title, subtitle: blockText(body), media: DocumentTextIcon}),
  },
})
