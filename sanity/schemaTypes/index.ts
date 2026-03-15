import { type SchemaTypeDefinition } from 'sanity'

import { hero } from './hero'
import { skills } from './skills'
import { about } from './about'
import { siteContact } from './siteContact'
import { projectCategory } from './projectCategory'
import { localeString } from './localeString'
import { localeText } from './localeText'
import { jobStatus } from './jobStatus'
import { faq } from './faq'
import { resume } from './resume'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localeString,
    localeText,
    hero,
    skills,
    about,
    siteContact,
    projectCategory,
    jobStatus,
    faq,
    resume
  ],
}
