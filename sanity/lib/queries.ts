import { defineQuery } from 'next-sanity'

export const heroQuery = defineQuery(
  `*[_type == "hero" && _id == "hero"][0]{ greeting, titles }`,
)

export const skillsQuery = defineQuery(
  `*[_type == "skills" && _id == "skills"][0]{ skills, highlights }`,
)

export const aboutQuery = defineQuery(
  `*[_type == "about" && _id == "about"][0]{
    "image": image.asset->url,
    "avatar": avatar.asset->url,
    imageAlt,
    text
  }`,
)

export const contactQuery = defineQuery(
  `*[_type == "siteContact" && _id == "siteContact"][0]{
    entries[]{ type, value, href }
  }`,
)

export const projectCategoriesQuery = defineQuery(
  `*[_type == "projectCategory"] | order(order asc) {
    category,
    projects[]{
      title,
      description,
      "image": image.asset->url,
      href
    }
  }`,
)

export const jobStatusQuery = defineQuery(
  `*[_type == "jobStatus" && _id == "jobStatus"][0]{ statusText, isAvailable }`,
)

export const resumeQuery = defineQuery(
  `*[_type == "resume" && _id == "resume"][0]{ 
    title, 
    "fileUrl": {
      "zh": resumeFileZh.asset->url,
      "en": resumeFileEn.asset->url
    }
  }`,
)

export const faqQuery = defineQuery(
  `*[_type == "faq"]{ question, answer }`,
)
