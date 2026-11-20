import {defineArrayMember, defineField} from 'sanity'

import {createMedia} from './create-media'

const block = defineArrayMember({
  type: 'block',
  styles: [
    {title: 'Normal', value: 'normal'},
    {title: 'Heading 2', value: 'h2'},
    {title: 'Heading 3', value: 'h3'},
    {title: 'Quote', value: 'blockquote'},
  ],
})

export function createRichText({name = 'body'} = {}) {
  return defineField({
    name,
    type: 'array',
    of: [
      block,
      defineArrayMember({
        ...createMedia('image', [
          defineField({name: 'caption', type: 'string'}),
          defineField({
            name: 'wide',
            type: 'boolean',
            description: 'Reach one column further on each side.',
            initialValue: false,
          }),
        ]),
      }),
      defineArrayMember({type: 'code', options: {withFilename: false}}),
      defineArrayMember({
        name: 'tableBlock',
        title: 'Table',
        type: 'object',
        fields: [
          defineField({name: 'table', type: 'table'}),
          defineField({name: 'caption', type: 'string'}),
        ],
        preview: {
          select: {title: 'caption'},
          prepare: ({title}) => ({title: title ?? 'Table'}),
        },
      }),
    ],
  })
}
