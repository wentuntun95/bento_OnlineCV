import { createClient } from '@sanity/client'
import {
  heroData,
  skillsData,
  aboutData,
  contactData,
  projectCategories,
  jobStatusData,
  resumeData,
} from '../data/content'

// IMPORTANT: Define these securely or run via local command line injecting envs
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8y7abwbi' // Fallback to user's known ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiToken = process.env.SANITY_API_TOKEN

if (!apiToken) {
  console.error("Error: SANITY_API_TOKEN environment variable is missing.");
  console.error("Please create a token in https://manage.sanity.io/projects/[id]/api with 'Editor' or 'Contributor' permissions.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false, // Must be false for mutations
  token: apiToken,
  apiVersion: '2024-03-15',
})

async function migrateData() {
  console.log('Starting data migration to Sanity...');

  try {
    // 1. Hero
    console.log('Migrating Hero data...');
    await client.createOrReplace({
      _id: 'hero',
      _type: 'hero',
      greeting: heroData.greeting,
      titles: heroData.titles,
    })

    // 2. Skills
    console.log('Migrating Skills data...');
    await client.createOrReplace({
      _id: 'skills',
      _type: 'skills',
      skills: skillsData.skills,
      highlights: skillsData.highlights,
    })

    // 3. About
    // Note: Images require uploading as assets first in Sanity. 
    // We'll skip uploading the image asset here for simplicity and let the user do it via Studio,
    // but we can set the text content so it isn't empty.
    console.log('Migrating About data (Text only)...');
    await client.createOrReplace({
      _id: 'about',
      _type: 'about',
      text: aboutData.text,
    })

    // 4. Contact
    console.log('Migrating Contact data...');
    await client.createOrReplace({
      _id: 'siteContact',
      _type: 'siteContact',
      entries: contactData.map(entry => ({
        _key: entry.value,
        type: entry.type,
        value: entry.value,
        href: entry.href
      }))
    })

    // 5. Job Status
    console.log('Migrating Job Status data...');
    await client.createOrReplace({
      _id: 'jobStatus',
      _type: 'jobStatus',
      statusText: jobStatusData.statusText,
      isAvailable: jobStatusData.isAvailable,
    })

    // 6. Resume
    // Note: File uploads need to be treated as assets. We will pre-fill the titles.
    console.log('Migrating Resume data (Text only)...');
    await client.createOrReplace({
      _id: 'resume',
      _type: 'resume',
      title: resumeData.title,
    })

    // 7. Projects
    console.log('Migrating Project Categories...');
    for (const [index, category] of projectCategories.entries()) {
      await client.createOrReplace({
        _id: `category-${index}`,
        _type: 'projectCategory',
        category: category.category,
        order: index,
        projects: category.projects.map((proj, pIndex) => ({
          _key: `proj-${pIndex}`,
          title: proj.title,
          description: proj.description,
          href: proj.href
        }))
      })
    }

    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

migrateData();
