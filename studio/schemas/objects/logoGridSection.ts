import { defineType, defineField } from 'sanity'

export const logoGridSection = defineType({
  name: 'logoGridSection',
  title: 'Logo Grid Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image' }),
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'link', title: 'Link (optional)', type: 'string' }),
          ],
        },
      ],
    }),
  ],
})
