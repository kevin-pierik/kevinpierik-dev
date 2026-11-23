import {CodeBlockIcon} from '@sanity/icons/CodeBlock'
import {ImageIcon} from '@sanity/icons/Image'
import {ImagesIcon} from '@sanity/icons/Images'
import {TextIcon} from '@sanity/icons/Text'
import {ThListIcon} from '@sanity/icons/ThList'
import {defineArrayMember, defineField, type PortableTextBlock} from 'sanity'

import {createLink} from './create-link'
import {createMedia} from './create-media'
import {createRichText} from './create-rich-text'

function firstLine(blocks: PortableTextBlock[] | undefined) {
  const block = blocks?.find((item) => item._type === 'block')
  const children = (block?.children ?? []) as {text?: string}[]
  return children.map((child) => child.text ?? '').join('')
}

const textSection = defineArrayMember({
  name: 'textSection',
  title: 'Text',
  type: 'object',
  icon: TextIcon,
  fields: [createRichText()],
  preview: {
    select: {body: 'body'},
    prepare: ({body}) => ({title: firstLine(body) || 'Empty text', subtitle: 'Text'}),
  },
})

const imageSection = defineArrayMember({
  ...createMedia('imageSection', [
    defineField({name: 'caption', type: 'string'}),
    defineField({
      name: 'wide',
      type: 'boolean',
      description: 'Reach one column further on each side.',
      initialValue: false,
    }),
  ]),
  title: 'Image',
  icon: ImageIcon,
  preview: {
    select: {caption: 'caption', alt: 'alt', media: 'asset'},
    prepare: ({caption, alt, media}) => ({
      title: caption || alt || 'Image',
      subtitle: 'Image',
      media,
    }),
  },
})

const carouselSection = defineArrayMember({
  name: 'carouselSection',
  title: 'Carousel',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Shown as a heading above the carousel.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'carouselItem',
          title: 'Item',
          type: 'object',
          fields: [
            createMedia('image'),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            createLink('link'),
            defineField({name: 'description', type: 'text', rows: 2}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description', media: 'image'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', items: 'items', media: 'items.0.image'},
    prepare: ({title, items, media}) => {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: title || 'Carousel',
        subtitle: `Carousel · ${count} ${count === 1 ? 'item' : 'items'}`,
        media: media ?? ImagesIcon,
      }
    },
  },
})

const codeSection = defineArrayMember({
  name: 'code',
  title: 'Code',
  type: 'code',
  icon: CodeBlockIcon,
  options: {withFilename: false},
  preview: {
    select: {code: 'code', language: 'language'},
    prepare: ({code, language}) => ({
      title: String(code ?? '').split('\n')[0] || 'Empty code',
      subtitle: language ? `Code · ${language}` : 'Code',
    }),
  },
})

const tableSection = defineArrayMember({
  name: 'table',
  title: 'Table',
  type: 'table',
  icon: ThListIcon,
  preview: {
    select: {rows: 'rows'},
    prepare: ({rows}) => ({
      title: (rows?.[0]?.cells ?? []).join(' · ') || 'Empty table',
      subtitle: 'Table',
    }),
  },
})

const sections = {
  textSection,
  imageSection,
  carouselSection,
  code: codeSection,
  table: tableSection,
}

export function createSections(types: (keyof typeof sections)[]) {
  return defineField({
    name: 'sections',
    type: 'array',
    group: 'content',
    of: types.map((type) => sections[type]),
  })
}
