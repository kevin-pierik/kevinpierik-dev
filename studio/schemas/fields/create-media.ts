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
