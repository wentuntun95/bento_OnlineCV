import type { JobStatusData } from "@/data/types";
import { useLanguage } from "../../app/LanguageContext";

type JobStatusSectionProps = {
  data: JobStatusData;
};

export function JobStatusSection({ data }: JobStatusSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="flex h-full w-full flex-row items-center justify-between px-4 sm:px-6 py-2 sm:py-4 bg-panel-bg gap-4">
      <h3 className="heading-section-sm shrink-0 m-0">
        <span className="relative z-10 transition-colors duration-300">
          {t({ zh: "求职状态", en: "Status" })}
        </span>
      </h3>
      <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3 truncate">
        {data.isAvailable ? (
          <span className="relative flex h-3 w-3 sm:h-4 sm:w-4 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-light opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-status-light"></span>
          </span>
        ) : (
          <span className="relative flex h-3 w-3 sm:h-4 sm:w-4 shrink-0">
            <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-gray-400"></span>
          </span>
        )}
        <span className="font-medium text-meta text-sm sm:text-base truncate">
          {t(data.statusText)}
        </span>
      </div>
    </div>
  );
}
