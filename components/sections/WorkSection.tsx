import type { ProjectCategory } from "@/data/types";
import { CloseButton } from "./ui/CloseButton";
import { ProjectCard } from "./ui/ProjectCard";
import { SectionHeading_Clickable } from "./ui/SectionHeading_Clickable";
import { useLanguage } from "../../app/LanguageContext";

type WorkSectionProps = {
  data: ProjectCategory[];
  onExpand?: () => void;
  isExpanded?: boolean;
};

export function WorkSection({
  data,
  onExpand,
  isExpanded = false,
}: WorkSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="relative h-full">
      <div className="flex items-center justify-between">
        <SectionHeading_Clickable onClick={!isExpanded ? onExpand : undefined}>
          {t({ zh: "作品集", en: "Portfolio" })}
        </SectionHeading_Clickable>
      </div>
      {isExpanded && <CloseButton onClick={onExpand} />}
      {data.map((group) => (
        <div key={t(group.category) || Math.random().toString()} className="mb-4">
          <p className="mt-2 text-meta">{t(group.category)}</p>
          <div
            className={`mt-4 ${isExpanded ? "grid grid-cols-2 gap-6" : "space-y-4"}`}
          >
            {group.projects.map((project) => (
              <ProjectCard
                key={t(project.title) || Math.random().toString()}
                title={t(project.title)}
                description={project.description}
                image={project.image}
                href={project.href}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
