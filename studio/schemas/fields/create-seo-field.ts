import {defineField} from 'sanity'

export function createSeoField() {
  return defineField({
    name: 'seo',
    title: 'SEO',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        description: 'Defaults to the page or post title.',
        validation: (rule) => rule.max(60).warning('Keep it under 60 characters.'),
      }),
      defineField({
        name: 'description',
        type: 'text',
        rows: 3,
        validation: (rule) => rule.max(160).warning('Keep it under 160 characters.'),
      }),
    ],
  })
}
