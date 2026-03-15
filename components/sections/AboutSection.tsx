import type { AboutData } from "@/data/types";
import { CloseButton } from "./ui/CloseButton";
import { SectionHeading_Clickable } from "./ui/SectionHeading_Clickable";
import { useLanguage } from "../../app/LanguageContext";

import Image from "next/image";

type AboutSectionProps = {
  data: AboutData;
  onExpand?: () => void;
  isExpanded?: boolean;
};

export function AboutSection({
  data,
  onExpand,
  isExpanded = false,
}: AboutSectionProps) {
  const { t } = useLanguage();

  if (isExpanded) {
    return (
      <div className="relative h-full">
        <CloseButton onClick={onExpand} />

        {/* Mobile: stacked layout / Desktop: side-by-side */}
        <div className="flex h-full flex-col md:flex-row md:items-center md:gap-12 lg:gap-12 mx-6 my-12 md:m-12 overflow-y-auto scrollbar-none">
          <div className="flex shrink-0 items-center justify-center py-6 md:w-2/5 md:py-0 w-full relative h-48 sm:h-56 md:h-auto md:aspect-square">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data?.avatar || data?.image || "https://api.dicebear.com/7.x/notionists/svg?seed=Felix"}
              alt={data?.imageAlt || "Profile Avatar"}
              className="h-full w-full object-contain object-center"
            />
          </div>
          <div className="md:w-3/5 w-full">
            <SectionHeading_Clickable onClick={onExpand}>
              {t({ zh: "关于我", en: "About Me" })}
            </SectionHeading_Clickable>
            <p className="text-body leading-relaxed text-foreground md:text-lg md:leading-relaxed">
              {t(data.text)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between">
        <SectionHeading_Clickable onClick={onExpand}>
          {t({ zh: "关于我", en: "About Me" })}
        </SectionHeading_Clickable>
      </div>

      <div className="mt-3 flex flex-1 overflow-hidden items-start gap-3 sm:mt-4 sm:gap-4 xl:gap-6">
        <div className="relative h-24 w-24 shrink-0 sm:h-32 sm:w-32 md:h-40 md:w-40 xl:h-56 xl:w-56">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data?.avatar || data?.image || "https://api.dicebear.com/7.x/notionists/svg?seed=Felix"}
            alt={data?.imageAlt || "Profile Avatar"}
            className="h-full w-full object-contain object-center"
          />
        </div>
        <div className="flex-1 h-full overflow-y-auto scrollbar-none">
          <p className="text-body text-foreground pb-4">{t(data.text)}</p>
        </div>
      </div>
    </div>
  );
}
