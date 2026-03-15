import { defineType } from 'sanity'

export const localeString = defineType({
  title: 'Localized String',
  name: 'localeString',
  type: 'object',
  fields: [
    {
      title: 'Chinese',
      name: 'zh',
      type: 'string',
    },
    {
      title: 'English',
      name: 'en',
      type: 'string',
    },
  ],
})
