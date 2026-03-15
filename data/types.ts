// Shared types used by both content.ts (local data) and Sanity (CMS data).

export type LocaleString = {
  zh: string;
  en: string;
};

export type HeroData = {
  greeting: LocaleString;
  titles: LocaleString[];
};

export type SkillsData = {
  skills: string;
  highlights: string[];
};

export type AboutData = {
  image: string;
  avatar?: string;
  imageAlt: string;
  text: LocaleString;
};

export type ContactEntry = {
  type: LocaleString;
  value: string;
  href: string;
};

export type Project = {
  title: LocaleString;
  description?: LocaleString;
  image: string;
  href?: string;
};

export type ProjectCategory = {
  category: LocaleString;
  projects: Project[];
};

export type JobStatusData = {
  statusText: LocaleString;
  isAvailable: boolean;
};

export type ResumeData = {
  title: LocaleString;
  fileUrl: string | LocaleString;
};

export type SiteData = {
  hero: HeroData;
  skills: SkillsData;
  about: AboutData;
  contact: ContactEntry[];
  projectCategories: ProjectCategory[];
  jobStatus: JobStatusData;
  resume: ResumeData;
};
