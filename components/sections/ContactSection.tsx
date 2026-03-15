import type { ContactEntry } from "@/data/types";
import { useLanguage } from "../../app/LanguageContext";

type ContactSectionProps = {
  data: ContactEntry[];
};

export function ContactSection({ data }: ContactSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="h-full">
      <h3 className="heading-section-sm">{t({ zh: "联系我", en: "Contact Me" })}</h3>
      <div className="mt-4 space-y-2">
        {data.map((entry) => (
          <a
            key={entry.value}
            href={entry.href}
            className="flex items-baseline gap-2 text-foreground opacity-60 hover:opacity-100 transition-opacity"
          >
            <span className="text-foreground opacity-50 w-16 text-sm">{t(entry.type)}</span>
            <span>{entry.value}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
