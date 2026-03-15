import { defineType, defineField } from 'sanity'

export const resume = defineType({
  name: 'resume',
  title: 'Resume Source File',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'e.g., "Download Resume" / "下载简历"',
    }),
    defineField({
      name: 'resumeFileZh',
      title: 'Chinese Resume File (PDF)',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'resumeFileEn',
      title: 'English Resume File (PDF)',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    }),
  ],
  preview: {
    select: { title: 'title.zh' },
    prepare: ({ title }) => ({ title: title || 'Resume' }),
  },
})
