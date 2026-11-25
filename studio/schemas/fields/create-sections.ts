import {BlockElementIcon} from '@sanity/icons/BlockElement'
import {CodeBlockIcon} from '@sanity/icons/CodeBlock'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {ImageIcon} from '@sanity/icons/Image'
import {ImagesIcon} from '@sanity/icons/Images'
import {PlayIcon} from '@sanity/icons/Play'
import {TextIcon} from '@sanity/icons/Text'
import {ThListIcon} from '@sanity/icons/ThList'
import {TimelineIcon} from '@sanity/icons/Timeline'
import {defineArrayMember, defineField, type PortableTextBlock} from 'sanity'

import {createLink} from './create-link'
import {createMedia, createMediaFields} from './create-media'
import {createRichText} from './create-rich-text'

function firstLine(blocks: PortableTextBlock[] | undefined) {
  const block = blocks?.find((item) => item._type === 'block')
  const children = (block?.children ?? []) as {text?: string}[]
  return children.map((child) => child.text ?? '').join('')
}

function createButtons(max: number) {
  return defineField({
    name: 'buttons',
    type: 'array',
    description: 'The first button is filled, the second has an outline.',
    validation: (rule) => rule.max(max),
    of: [
      defineArrayMember({
        name: 'button',
        type: 'object',
        fields: [
          defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
          defineField({
            name: 'link',
            type: 'url',
            description: 'A path on this site, such as /contact, or a full URL.',
            validation: (rule) =>
              rule
                .required()
                .uri({scheme: ['https', 'http', 'mailto', 'tel'], allowRelative: true}),
          }),
        ],
        preview: {select: {title: 'label', subtitle: 'link'}},
      }),
    ],
  })
}

const heroSection = defineArrayMember({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({name: 'eyebrow', type: 'string', description: 'Small line above the heading.'}),
    defineField({
      name: 'title',
      type: 'string',
      description: 'The main heading of the page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleMuted',
      title: 'Second line',
      type: 'string',
      description: 'Shown in grey on its own line below the heading.',
    }),
    defineField({name: 'lead', type: 'text', rows: 3}),
    createButtons(2),
    defineField({
      name: 'size',
      type: 'string',
      initialValue: 'large',
      options: {
        list: [
          {title: 'Large', value: 'large'},
          {title: 'Small', value: 'small'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      description: 'Small suits pages with little content, such as Projects.',
    }),
    defineField({
      name: 'align',
      title: 'Alignment',
      type: 'string',
      initialValue: 'center',
      options: {
        list: [
          {title: 'Centre', value: 'center'},
          {title: 'Left', value: 'left'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      description: 'With an image, the text is always on the left.',
    }),
    {
      ...createMedia('image'),
      description: 'Optional. Shown to the right of the text, which is then left-aligned.',
    },
  ],
  preview: {
    select: {title: 'title', media: 'image'},
    prepare: ({title, media}) => ({title: title || 'Hero', subtitle: 'Hero', media}),
  },
})

const postsSection = defineArrayMember({
  name: 'postsSection',
  title: 'Posts',
  type: 'object',
  icon: DocumentsIcon,
  description: 'The newest published posts, filled in automatically.',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Optional heading, such as Writing. Leave empty to show only the posts.',
    }),
    defineField({
      name: 'limit',
      title: 'Number of posts',
      type: 'number',
      description: 'Leave empty to show all posts.',
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: 'layout',
      type: 'string',
      initialValue: 'grid',
      options: {
        list: [
          {title: 'Two columns', value: 'grid'},
          {title: 'Three columns', value: 'grid-3'},
          {title: 'One column (list)', value: 'list'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'showAllLink',
      title: 'Link to all posts',
      type: 'boolean',
      initialValue: false,
      description: 'Shows “See all posts” next to the heading.',
    }),
  ],
  preview: {
    select: {title: 'title', limit: 'limit'},
    prepare: ({title, limit}) => ({
      title: title || 'Posts',
      subtitle: `Posts · ${limit ? `newest ${limit}` : 'all'}`,
    }),
  },
})

const textSection = defineArrayMember({
  name: 'textSection',
  title: 'Text',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description:
        'Optional. Shows the heading on the left and the text on the right, as About me on the homepage.',
    }),
    createRichText(),
  ],
  preview: {
    select: {title: 'title', body: 'body'},
    prepare: ({title, body}) => ({
      title: title || firstLine(body) || 'Empty text',
      subtitle: 'Text',
    }),
  },
})

const mediaSection = defineArrayMember({
  name: 'mediaSection',
  title: 'Media',
  type: 'object',
  icon: ImageIcon,
  fields: [
    ...createMediaFields(),
    defineField({name: 'caption', type: 'string'}),
    defineField({
      name: 'wide',
      type: 'boolean',
      description: 'Show the media wider than the text column.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      kind: 'kind',
      caption: 'caption',
      alt: 'image.alt',
      videoTitle: 'videoTitle',
      image: 'image',
    },
    prepare: ({kind, caption, alt, videoTitle, image}) => ({
      title: caption || (kind === 'video' ? videoTitle : alt) || 'Media',
      subtitle: kind === 'video' ? 'Media · Video' : 'Media · Image',
      media: kind === 'video' ? PlayIcon : image,
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
            defineField({
              name: 'media',
              type: 'object',
              options: {collapsible: false},
              description: 'Leave the image empty to show a Coming soon placeholder.',
              fields: createMediaFields({optional: true}),
            }),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            createLink(),
            defineField({name: 'description', type: 'text', rows: 2}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description', media: 'media.image'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', items: 'items', media: 'items.0.media.image'},
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

const listSection = defineArrayMember({
  name: 'listSection',
  title: 'List',
  type: 'object',
  icon: TimelineIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Shown as a heading above the list.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleMuted',
      title: 'Second line',
      type: 'string',
      description: 'Shown in grey on its own line below the heading.',
    }),
    createButtons(1),
    defineField({
      name: 'items',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'listItem',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'period',
              type: 'string',
              description: 'Shown on the left, such as 2025–now.',
            }),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'organization',
              type: 'string',
              description:
                'Shown after the title as “at …”. With a link, only the organization is linked.',
            }),
            createLink(),
            defineField({name: 'description', type: 'text', rows: 2}),
            defineField({name: 'location', type: 'string'}),
            defineField({
              name: 'tags',
              type: 'array',
              of: [{type: 'string'}],
              options: {layout: 'tags'},
              description: 'Skills or tools, such as Next.js.',
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'period'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', items: 'items'},
    prepare: ({title, items}) => {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: title || 'List',
        subtitle: `List · ${count} ${count === 1 ? 'item' : 'items'}`,
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
  heroSection,
  postsSection,
  textSection,
  mediaSection,
  carouselSection,
  listSection,
  code: codeSection,
  table: tableSection,
}

export function createSections(types: (keyof typeof sections)[]) {
  return defineField({
    name: 'sections',
    type: 'array',
    group: 'content',
    of: types.map((type) => sections[type]),
    validation: (rule) =>
      rule.custom((value: {_type: string}[] | undefined) => {
        const heroes = (value ?? []).filter((section) => section._type === 'heroSection')
        if (heroes.length > 1) return 'Use one hero per page.'
        if (heroes.length === 1 && value?.[0]?._type !== 'heroSection') return 'Put the hero first.'
        return true
      }),
  })
}
