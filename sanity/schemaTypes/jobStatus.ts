import { defineType, defineField } from 'sanity'

export const jobStatus = defineType({
  name: 'jobStatus',
  title: 'Job Status',
  type: 'document',
  fields: [
    defineField({
      name: 'statusText',
      title: 'Status Text',
      type: 'localeString',
      description: 'The job status (e.g. "Available - Ready to work")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isAvailable',
      title: 'Is Available?',
      type: 'boolean',
      description: 'Toggle on if you are available for work (will show green light).',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'statusText.zh' },
    prepare: ({ title }) => ({ title: title || 'Job Status' }),
  },
})
