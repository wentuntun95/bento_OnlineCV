import type { StructureResolver } from 'sanity/structure'

const singletonTypes = new Set(['hero', 'skills', 'about', 'siteContact', 'jobStatus', 'resume'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Hero')
        .id('hero')
        .child(S.document().schemaType('hero').documentId('hero')),
      S.listItem()
        .title('Skills')
        .id('skills')
        .child(S.document().schemaType('skills').documentId('skills')),
      S.listItem()
        .title('About')
        .id('about')
        .child(S.document().schemaType('about').documentId('about')),
      S.listItem()
        .title('Contact')
        .id('siteContact')
        .child(
          S.document().schemaType('siteContact').documentId('siteContact'),
        ),
      S.listItem()
        .title('Job Status')
        .id('jobStatus')
        .child(S.document().schemaType('jobStatus').documentId('jobStatus')),
      S.listItem()
        .title('Resume Config')
        .id('resume')
        .child(S.document().schemaType('resume').documentId('resume')),
      S.divider(),
      // We only show the Project Categories list explicitly, hiding the default raw document list
      S.listItem()
        .title('Project Categories')
        .id('projectCategory')
        .child(S.documentTypeList('projectCategory').title('Project Categories')),
    ])
