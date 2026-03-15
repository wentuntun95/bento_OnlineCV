import { defineType, defineField } from 'sanity'

export const projectCategory = defineType({
  name: 'projectCategory',
  title: 'Project Category',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category Name',
      type: 'localeString',
      description: 'e.g. "Web Development" / "网站开发"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localeString',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Screenshot / Thumbnail',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'localeString',
              description: 'e.g. "Led the restructuring of an automated dispatch system..."',
            }),
            defineField({
              name: 'href',
              title: 'Project URL',
              type: 'url',
              description: 'Link to live project (optional)',
            }),
          ],
          preview: {
            select: { title: 'title.zh', media: 'image' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'category.zh' },
  },
})
