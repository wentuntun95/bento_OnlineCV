import type { SiteData } from "@/data/types";
import {
  heroData,
  skillsData,
  aboutData,
  contactData,
  projectCategories,
  jobStatusData,
  resumeData,
} from "@/data/content";
import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  heroQuery,
  skillsQuery,
  aboutQuery,
  contactQuery,
  projectCategoriesQuery,
  jobStatusQuery,
  resumeQuery,
} from "@/sanity/lib/queries";

const USE_SANITY = process.env.NEXT_PUBLIC_USE_SANITY === "true";

/**
 * Fetches all site data from either Sanity or local content.ts,
 * controlled by the NEXT_PUBLIC_USE_SANITY environment variable.
 */
export async function getSiteData(): Promise<SiteData> {
  // Use local data if Sanity is disabled or not configured
  if (!USE_SANITY || !isSanityConfigured || !client) {
    return {
      hero: heroData,
      skills: skillsData,
      about: aboutData,
      contact: contactData,
      projectCategories,
      jobStatus: jobStatusData,
      resume: resumeData,
    };
  }

  const [hero, skills, about, contact, categories, jobStatus, resume] = await Promise.all([
    client.fetch(heroQuery),
    client.fetch(skillsQuery),
    client.fetch(aboutQuery),
    client.fetch(contactQuery),
    client.fetch(projectCategoriesQuery),
    client.fetch(jobStatusQuery),
    client.fetch(resumeQuery),
  ]);

  return {
    hero: hero?.greeting && hero?.titles?.length ? hero : heroData,
    skills: skills?.skills ? skills : skillsData,
    about: {
      ...aboutData,
      ...about,
      image: about?.image || aboutData.image || "https://api.dicebear.com/7.x/notionists/svg?seed=Felix",
      avatar: about?.avatar || aboutData.avatar || "https://api.dicebear.com/7.x/notionists/svg?seed=Felix",
      text: about?.text || aboutData.text,
    },
    contact: contact?.entries?.length ? contact.entries : contactData,
    projectCategories: categories?.length ? categories.map((cat: any, i: number) => ({
      ...cat,
      projects: cat.projects?.map((proj: any, j: number) => ({
        ...proj,
        image: proj.image || projectCategories[i]?.projects[j]?.image || "/projects/placeholder.png"
      })) || []
    })) : projectCategories,
    jobStatus: jobStatus?.statusText ? jobStatus : jobStatusData,
    resume: resume?.fileUrl?.zh ? resume : resumeData,
  };
}
