import type { SkillsData } from "@/data/types";
import FallingText from "@/components/ReactBits/FallingText";
import { useLanguage } from "../../app/LanguageContext";

type SkillsSectionProps = {
  data: SkillsData;
};

export function SkillsSection({ data }: SkillsSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="overflow-hidden flex h-full flex-col [--falling-text-size:1.0rem] md:[--falling-text-size:1.1rem] xl:[--falling-text-size:1.2rem]">
      <h3 className="shrink-0 heading-section-sm">{t({ zh: "技能", en: "Skills" })}</h3>
      <FallingText
        className="min-h-10 flex-1"
        text={data.skills}
        highlightWords={data.highlights}
        highlightClass="highlighted"
        trigger="click"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.56}
        fontSize="var(--falling-text-size)"
        mouseConstraintStiffness={0.9}
      />
    </div>
  );
}
