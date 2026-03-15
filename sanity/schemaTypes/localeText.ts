import { defineType } from 'sanity'

export const localeText = defineType({
  title: 'Localized Text',
  name: 'localeText',
  type: 'object',
  fields: [
    {
      title: 'Chinese',
      name: 'zh',
      type: 'text',
      rows: 4,
    },
    {
      title: 'English',
      name: 'en',
      type: 'text',
      rows: 4,
    },
  ],
})
