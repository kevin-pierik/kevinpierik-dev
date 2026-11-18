import {defineArrayMember, defineField, defineType} from 'sanity'

import {createLink} from '../fields/create-link'

const entry = defineArrayMember({
  name: 'entry',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'The role for a job, or the school.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'company',
      type: 'string',
      description: 'The employer. The heading reads “role at company”.',
    }),
    createLink('link', 'Website'),
    defineField({name: 'start', type: 'date', validation: (rule) => rule.required()}),
    defineField({
      name: 'end',
      type: 'date',
      description: 'Leave empty for a single date, or tick “current”.',
    }),
    defineField({name: 'current', type: 'boolean', initialValue: false}),
    defineField({name: 'location', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text', rows: 2}),
  ],
  preview: {
    select: {title: 'title', company: 'company', start: 'start'},
    prepare: ({title, company, start}) => ({
      title: company ? `${title} at ${company}` : title,
      subtitle: start?.slice(0, 4),
    }),
  },
})

export const entriesSection = defineType({
  name: 'entriesSection',
  title: 'Entries',
  type: 'object',
  description: 'Work experience or education, with years on the left.',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'entries', type: 'array', of: [entry]}),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title, subtitle: 'Entries'}),
  },
})
