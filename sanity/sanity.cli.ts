import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'v3zmx1mq',
    dataset: 'production',
  },
  studioHost: 'kevinpierik',
  deployment: {
    autoUpdates: true,
  },
  typegen: {
    path: '../features/**/*.{ts,tsx}',
    schema: './schema.json',
    generates: '../features/sanity/sanity.types.ts',
  },
})
