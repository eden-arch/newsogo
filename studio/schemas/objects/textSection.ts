import { defineType, defineField } from 'sanity'

export const textSection = defineType({
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
  ],
})
