import type { ResumeData } from "@/data/types";
import { useLanguage } from "../../app/LanguageContext";

type ResumeSectionProps = {
  data: ResumeData;
};

export function ResumeSection({ data }: ResumeSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="flex h-full flex-col p-4 bg-panel-bg group">
      <div className="mb-4 shrink-0">
        <h3 className="heading-section">
          <span className="relative z-10 transition-colors duration-300">
            {t({ zh: "简 历", en: "Resume" })}
          </span>
        </h3>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
      <a
        href={typeof data.fileUrl === 'string' ? data.fileUrl : t(data.fileUrl)}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="flex flex-col items-center justify-center gap-3 w-full h-full text-foreground"
      >
        <div className="rounded-full bg-btn-bg text-btn-text p-3 sm:p-4 hover:opacity-80 transition-opacity duration-300">
          <svg className="h-6 w-6 sm:h-8 sm:w-8 text-btn-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        <span className="font-medium text-sm sm:text-base heading-section-sm text-center">
          {t(data.title)}
        </span>
      </a>
      </div>
    </div>
  );
}
