import {defineType} from 'sanity'

import {createRichText} from '../fields/create-rich-text'

export const introSection = defineType({
  name: 'introSection',
  title: 'Intro',
  type: 'object',
  fields: [createRichText()],
  preview: {prepare: () => ({title: 'Intro'})},
})
