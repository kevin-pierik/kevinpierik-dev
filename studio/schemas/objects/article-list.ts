import {DocumentsIcon} from '@sanity/icons/Documents'
import {defineField, defineType} from 'sanity'

export const articleList = defineType({
  name: 'articleList',
  title: 'Post list',
  type: 'object',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'limit',
      type: 'number',
      description: 'Show only the newest posts. Leave empty to show all listed posts.',
      validation: (rule) => rule.integer().positive(),
    }),
  ],
  preview: {
    select: {limit: 'limit'},
    prepare: ({limit}) => ({
      title: 'Post list',
      subtitle: limit ? `Newest ${limit}` : 'All listed posts',
    }),
  },
})
