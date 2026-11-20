import {CogIcon} from '@sanity/icons/Cog'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'role',
      type: 'string',
      description: 'Shown under the name in the site header and on social images.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'navigation',
      type: 'array',
      description: 'Pages linked in the site header.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'page'}]})],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'colophon',
      type: 'text',
      rows: 2,
      description: 'Shown in the site footer.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Settings'}),
  },
})
