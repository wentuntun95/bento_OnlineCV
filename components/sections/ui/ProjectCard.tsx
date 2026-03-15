import Image from "next/image";
import { useLanguage } from "../../../app/LanguageContext";
import type { LocaleString } from "@/data/types";

type ProjectCardProps = {
  title: string;
  description?: LocaleString;
  image: string;
  href?: string;
};

export function ProjectCard({
  title,
  description,
  image,
  href,
}: ProjectCardProps) {
  const { t } = useLanguage();
  const CardWrapper = href ? "a" : "div";
  const cardProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <CardWrapper
      {...cardProps}
      className="relative group block overflow-hidden rounded-2xl bg-panel-bg border border-border transition-shadow hover:shadow-lg"
    >
      {/* Image Area */}
      <div className="relative aspect-video sm:aspect-2/1 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-[2px] group-hover:opacity-60"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="bg-panel-bg/90 text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-md flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {t({ zh: "点击跳转查看", en: "Click to view" })}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full flex flex-col px-4 py-3 sm:py-4 bg-panel-bg/90 backdrop-blur-md border-t border-bento-line transform translate-y-[2rem] sm:translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center justify-between mb-1">
          {/* Title */}
          <h4 className="heading-card text-foreground line-clamp-1">{title}</h4>
        </div>
        
        {/* Description */}
        {description && (
          <p className="text-body text-xs sm:text-sm text-foreground/80 line-clamp-2 mt-1 font-light leading-relaxed">
            {t(description)}
          </p>
        )}
      </div>
    </CardWrapper>
  );
}
