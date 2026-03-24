import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'newsogo',

  projectId: 'REPLACE_WITH_PROJECT_ID',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: [],
  },
})
