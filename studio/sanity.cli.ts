import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
    dataset: process.env.SANITY_STUDIO_DATASET!,
  },
  studioHost: 'kevinpierik',
  deployment: {
    appId: 'ojpq9ieprzfpr94c396gr3kb',
    autoUpdates: true,
  },
  typegen: {
    path: '../frontend/src/features/**/*.{ts,tsx}',
    schema: './schema.json',
    generates: '../frontend/src/features/sanity/sanity.types.ts',
  },
})
