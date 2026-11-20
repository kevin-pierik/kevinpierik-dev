import {LinkIcon} from '@sanity/icons/Link'
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
  title: 'Links',
  type: 'object',
  icon: LinkIcon,
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
    select: {title: 'title', rows: 'rows'},
    prepare: ({title, rows}) => ({
      title,
      subtitle: (rows ?? [])
        .map((row: {label?: string}) => row.label)
        .filter(Boolean)
        .join(', '),
      media: LinkIcon,
    }),
  },
})
