import {defineField} from 'sanity'

export function createLanguageField() {
  return defineField({
    name: 'language',
    type: 'string',
    readOnly: true,
    hidden: true,
  })
}
