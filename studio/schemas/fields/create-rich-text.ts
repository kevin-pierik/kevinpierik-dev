import {defineArrayMember, defineField} from 'sanity'

export function createRichText({name = 'body'} = {}) {
  return defineField({
    name,
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
