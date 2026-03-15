import { defineType, defineField } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      description: 'Accessible description for the profile image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar (Animated Style)',
      type: 'image',
      options: { hotspot: true },
      description: 'Your anime/animated style avatar image',
    }),
    defineField({
      name: 'text',
      title: 'About Text',
      type: 'localeText',
      description: 'Bio / about paragraph',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { media: 'image' },
    prepare: ({ media }) => ({ title: 'About', media }),
  },
})
