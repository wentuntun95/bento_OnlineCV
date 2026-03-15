"use client";

import { useLanguage } from "../app/LanguageContext";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center bg-panel-bg shadow-md border rounded-full p-1 border-border gap-1 overflow-hidden">
      <button
        onClick={() => setLanguage("zh")}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          language === "zh"
            ? "bg-btn-bg text-btn-text"
            : "text-foreground opacity-60 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        中
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          language === "en"
            ? "bg-btn-bg text-btn-text"
            : "text-foreground opacity-60 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        En
      </button>
      <div className="w-px h-5 bg-border mx-1"></div>
      <ThemeSwitcher />
    </div>
  );
}
