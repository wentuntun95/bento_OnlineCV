import { defineType, defineField } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ / Knowledge Base',
  type: 'document',
  description: 'Private knowledge base for AI Assistant',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The topic or question (e.g., MBTI, reason for leaving)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      description: 'The detailed answer that the AI should know',
      validation: (rule) => rule.required(),
    }),
  ],
})
