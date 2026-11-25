import {defineField} from 'sanity'

export function createMedia(name = 'image', extraFields: ReturnType<typeof defineField>[] = []) {
  return defineField({
    name,
    type: 'image',
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        type: 'string',
        description: 'Describe the image for people who can’t see it.',
        validation: (rule) => rule.required(),
      }),
      ...extraFields,
    ],
  })
}

type MediaParent = {kind?: string} | undefined

export function createMediaFields({optional = false}: {optional?: boolean} = {}) {
  return [
    defineField({
      name: 'kind',
      title: 'Type',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      ...createMedia('image'),
      hidden: ({parent}) => (parent as MediaParent)?.kind === 'video',
      validation: (rule) =>
        rule.custom((value: {asset?: unknown} | undefined, {parent}) =>
          !optional && (parent as MediaParent)?.kind !== 'video' && !value?.asset
            ? 'Add an image.'
            : true,
        ),
    }),
    defineField({
      name: 'video',
      type: 'mux.video',
      hidden: ({parent}) => (parent as MediaParent)?.kind !== 'video',
      validation: (rule) =>
        rule.custom((value: {asset?: unknown} | undefined, {parent}) =>
          (parent as MediaParent)?.kind === 'video' && !value?.asset ? 'Add a video.' : true,
        ),
    }),
    defineField({
      name: 'videoTitle',
      title: 'Video description',
      type: 'string',
      description: 'Describe the video for people who can’t see it.',
      hidden: ({parent}) => (parent as MediaParent)?.kind !== 'video',
      validation: (rule) =>
        rule.custom((value, {parent}) =>
          (parent as MediaParent)?.kind === 'video' && !value ? 'Describe the video.' : true,
        ),
    }),
    defineField({
      name: 'autoplay',
      type: 'boolean',
      description:
        'Play muted on a loop, like a GIF. Skipped when the visitor asks for reduced motion.',
      initialValue: false,
      hidden: ({parent}) => (parent as MediaParent)?.kind !== 'video',
    }),
  ]
}
