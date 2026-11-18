import {defineField, defineType} from 'sanity'

import {createRichText} from '../fields/create-rich-text'

export const textSection = defineType({
  name: 'textSection',
  title: 'Text',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    createRichText(),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title, subtitle: 'Text'}),
  },
})
