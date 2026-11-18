import {defineArrayMember, defineField, defineType} from 'sanity'

import {createLink} from '../fields/create-link'

const row = defineArrayMember({
  name: 'row',
  type: 'object',
  fields: [
    defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'text', type: 'string', validation: (rule) => rule.required()}),
    createLink(),
  ],
  preview: {select: {title: 'label', subtitle: 'text'}},
})

export const rowsSection = defineType({
  name: 'rowsSection',
  title: 'Rows',
  type: 'object',
  description: 'Label and value rows, such as contact details or profiles.',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'address',
      type: 'boolean',
      description: 'Mark the rows up as contact information.',
      initialValue: false,
    }),
    defineField({name: 'rows', type: 'array', of: [row]}),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title, subtitle: 'Rows'}),
  },
})
