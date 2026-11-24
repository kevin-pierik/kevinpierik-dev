import {defineArrayMember, defineField} from 'sanity'

export function createRichText() {
  return defineField({
    name: 'body',
    type: 'array',
    of: [
      defineArrayMember({
        type: 'block',
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'Heading 2', value: 'h2'},
          {title: 'Heading 3', value: 'h3'},
          {title: 'Quote', value: 'blockquote'},
        ],
      }),
    ],
  })
}
