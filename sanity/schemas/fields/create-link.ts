import {defineField} from 'sanity'

export function createLink(name = 'link', title = 'Link') {
  return defineField({
    name,
    title,
    type: 'url',
    validation: (rule) => rule.uri({scheme: ['https', 'http', 'mailto', 'tel']}),
  })
}
