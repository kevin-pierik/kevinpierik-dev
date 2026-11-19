import {defineArrayMember, defineField} from 'sanity'

import {createMedia} from './create-media'

const block = (headings: boolean) =>
  defineArrayMember({
    type: 'block',
    styles: [
      {title: 'Normal', value: 'normal'},
      ...(headings
        ? [
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ]
        : []),
    ],
  })

export function createRichText({name = 'body', article = false} = {}) {
  return defineField({
    name,
    type: 'array',
    of: article
      ? [
          block(true),
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
        ]
      : [block(false)],
  })
}
