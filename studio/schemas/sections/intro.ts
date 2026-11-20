import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {defineType} from 'sanity'

import {createRichText} from '../fields/create-rich-text'
import {blockText} from './preview'

export const introSection = defineType({
  name: 'introSection',
  title: 'Intro',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [createRichText()],
  preview: {
    select: {body: 'body'},
    prepare: ({body}) => ({title: 'Intro', subtitle: blockText(body), media: BlockquoteIcon}),
  },
})
