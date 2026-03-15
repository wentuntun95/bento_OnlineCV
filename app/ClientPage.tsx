"use client";

import { useState } from "react";
import type { SiteData } from "@/data/types";
import MobileLayout from "../components/MobileLayout";
import LaptopLayout from "../components/LaptopLayout";
import { AIChatWidget } from "../components/AIChatWidget";
import { LanguageProvider } from "./LanguageContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

type ExpandedSection = "work" | "about" | null;

export default function ClientPage({ siteData }: { siteData: SiteData }) {
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);

  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <LanguageSwitcher />

        {/* Mobile Layout */}
      <div className="block md:hidden">
        <MobileLayout
          siteData={siteData}
          expandedSection={expandedSection}
          setExpandedSection={setExpandedSection}
        />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <LaptopLayout
          siteData={siteData}
          expandedSection={expandedSection}
          setExpandedSection={setExpandedSection}
        />
      </div>

      {/* AI Assistant Chat Widget */}
      <AIChatWidget />
    </div>
    </LanguageProvider>
  );
}
