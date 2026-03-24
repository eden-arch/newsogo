import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '8itya3os',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
