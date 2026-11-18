import {codeInput} from '@sanity/code-input'
import {documentInternationalization} from '@sanity/document-internationalization'
import {table} from '@sanity/table'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {languages, translatedTypes} from './i18n'
import {schemaTypes} from './schemas'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'kevinpierik.dev',

  projectId: 'v3zmx1mq',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    codeInput(),
    table(),
    documentInternationalization({
      supportedLanguages: languages,
      schemaTypes: translatedTypes,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
