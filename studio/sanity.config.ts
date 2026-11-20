import {codeInput} from '@sanity/code-input'
import {table} from '@sanity/table'
import {visionTool} from '@sanity/vision'
import {defineConfig, defineSingleton} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schemaTypes} from './schemas'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'kevinpierik.dev',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [structureTool({structure}), visionTool(), codeInput(), table()],

  schema: {
    types: schemaTypes,
  },

  document: {
    singletons: [defineSingleton({documentId: 'settings', schemaType: 'settings'})],
  },
})
