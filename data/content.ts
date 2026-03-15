import type {
  HeroData,
  SkillsData,
  AboutData,
  ContactEntry,
  ProjectCategory,
  JobStatusData,
  ResumeData,
} from "./types";

// Re-export types so existing imports keep working.
export type { ContactEntry, Project, ProjectCategory } from "./types";

// ─── Hero ────────────────────────────────────────────────────
export const heroData: HeroData = {
  greeting: { zh: "你好，我是张雨卿", en: "Hi, I am Yuki Zhang" },
  titles: [
    { zh: "产品经理", en: "Product Manager" },
    { zh: "AI探索者", en: "AI Explorer" },
  ],
};

// ─── Skills ──────────────────────────────────────────────────
export const skillsData: SkillsData = {
  skills: "PRD 漏斗分析 用户画像分析 A/B Test Vibecoding Claude Code Cursor Axure Figma Markdown",
  highlights: ["Vibecoding"],
};

// ─── About ───────────────────────────────────────────────────
export const aboutData: AboutData = {
  image: "https://api.dicebear.com/7.x/notionists/svg?seed=Felix",
  avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Felix",
  imageAlt: "Character Illustration",
  text: {
    zh: "深耕 B 端与中后台架构的全栈产品经理。我习惯在复杂的业务线（如千万级 DAU 策略大盘）中理清逻辑，用系统化的手段实现降本增效。\n\n我没有极客般的技术背景，但我是一个绝对务实的“前沿工具应用者”。近期我正热情拥抱 AI（比如用 vibeCoding 搭建了这个网站），因为我相信 AI 很快会成为重塑全行业的底层基建。我期待带着扎实的 B 端业务底盘，与团队一起探索业务智能化演进的落地可能。",
    en: "A full-stack Product Manager deeply cultivated in B2B and mid-to-back-office architectures. I excel at clarifying logic within complex business lines (like tens-of-millions DAU strategy ecosystems) and using systematic methods to achieve cost reduction and efficiency gains.\n\nWhile I don't possess a geek-level technical background, I am an absolutely pragmatic \"early adopter of frontier tools\". Recently, I've been enthusiastically embracing AI (for instance, building this website via vibeCoding) because I believe AI will soon become the underlying infrastructure reshaping all industries. Armed with a solid B2B business foundation, I look forward to exploring the possibilities of intelligent business evolution alongside a team.",
  },
};

// ─── Contact ─────────────────────────────────────────────────
export const contactData: ContactEntry[] = [
  {
    type: { zh: "邮箱", en: "Email" },
    value: "aprilzyq@126.com",
    href: "mailto:aprilzyq@126.com",
  },
  {
    type: { zh: "手机号", en: "Phone" },
    value: "18897929159",
    href: "tel:18897929159",
  },
];

// ─── Work / Projects ─────────────────────────────────────────
export const projectCategories: ProjectCategory[] = [
  {
    category: { zh: "近期产出", en: "Recent Work" },
    projects: [
      {
        title: { zh: "某B端智能化大盘重构", en: "B2B Intelligent Core Re-architecture" },
        description: { zh: "主导2.8亿客户自动化调度系统重组，通过大中台策略解耦，让长尾运营场景效率裂变至 9 倍。", en: "Led the restructuring of an automated dispatch system for 280M users, increasing operational efficiency by 9x through deep decoupling." },
        image: "/projects/placeholder.png",
        href: "#",
      },
      {
        title: { zh: "跨省域分销生态从0到1", en: "Cross-Provincial Ecosystem 0 to 1" },
        description: { zh: "打破集团与下辖分公司的壁垒博弈，跑通政府补贴G-B-C链路，拉动千万级破冰流水。", en: "Broke through organizational silos to establish a G-B-C business ecosystem, converting subsidies into multi-million revenue." },
        image: "/projects/placeholder.png",
        href: "#",
      },
    ],
  },
];

// ─── Job Status ──────────────────────────────────────────────
export const jobStatusData: JobStatusData = {
  statusText: { zh: "已离职-随时到岗", en: "Available - Ready to work" },
  isAvailable: true,
};

// ─── Resume ──────────────────────────────────────────────────
export const resumeData: ResumeData = {
  title: { zh: "下载简历", en: "Download Resume" },
  fileUrl: {
    zh: "/resume/YukiZhang_Resume.pdf",
    en: "/resume/YukiZhang_Resume_EN.pdf",
  },
};
