import {defineField} from 'sanity'

export function createLink() {
  return defineField({
    name: 'link',
    type: 'url',
    validation: (rule) => rule.uri({scheme: ['https', 'http', 'mailto', 'tel']}),
  })
}
