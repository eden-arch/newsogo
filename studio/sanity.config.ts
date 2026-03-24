import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

const SINGLETONS = [
  { type: 'siteHeader', title: 'Site Header', id: 'siteHeader' },
  { type: 'siteFooter', title: 'Site Footer', id: 'siteFooter' },
]

const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.type))

export default defineConfig({
  name: 'default',
  title: 'newsogo',

  projectId: '8itya3os',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('page').title('Pages'),
            S.divider(),
            S.listItem()
              .title('Global Settings')
              .child(
                S.list()
                  .title('Global Settings')
                  .items(
                    SINGLETONS.map(({ type, title, id }) =>
                      S.listItem()
                        .title(title)
                        .id(id)
                        .child(
                          S.document()
                            .schemaType(type)
                            .documentId(id)
                        )
                    )
                  )
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    // Remove singletons from the "New document" creation menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
})
