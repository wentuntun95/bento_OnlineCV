"use client";

import { useState, useRef } from "react";
import type { SiteData } from "@/data/types";
import {
  HeroSection,
  SkillsSection,
  WorkSection,
  AboutSection,
  ContactSection,
  JobStatusSection,
  ResumeSection,
  SectionHeading_Clickable,
  getClipFrom,
} from "./sections";
import ExpandedOverlay from "./sections/ui/ExpandedOverlay";
import { useLanguage } from "../app/LanguageContext";

type MobileLayoutProps = {
  siteData: SiteData;
  expandedSection: "work" | "about" | null;
  setExpandedSection: (section: "work" | "about" | null) => void;
};

export default function MobileLayout({
  siteData,
  expandedSection,
  setExpandedSection,
}: MobileLayoutProps) {
  const { t } = useLanguage();
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);

  const workRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWorkExpand = () => {
    if (expandedSection === "work") {
      setExpandedSection(null);
    } else {
      const rect = workRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("work");
    }
  };

  const handleAboutExpand = () => {
    if (expandedSection === "about") {
      setExpandedSection(null);
    } else {
      const rect = aboutRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("about");
    }
  };

  const clipFrom = getClipFrom(sourceRect);

  return (
    <div ref={containerRef} className="relative h-dvh overflow-hidden bg-background text-foreground">
      {/* Mobile column layout */}
      <div
        className="grid h-full"
        style={{
          gridTemplateRows:
            "minmax(0, 2fr) minmax(0, 0.5fr) minmax(0, 2fr) minmax(0, 0.7fr) minmax(0, 0.7fr) minmax(0, 1.5fr) minmax(0, 0.8fr)",
        }}
      >
        {/* Hero Section */}
        <div className="overflow-hidden border-b border-bento-line bg-panel-bg px-6 py-4">
          <HeroSection data={siteData.hero} />
        </div>

        {/* Job Status Section */}
        <div className="overflow-hidden border-b border-bento-line bg-panel-bg">
          <JobStatusSection data={siteData.jobStatus} />
        </div>

        {/* Skills Section */}
        <div className="overflow-hidden border-b border-bento-line bg-panel-bg px-6 py-6">
          <SkillsSection data={siteData.skills} />
        </div>

        {/* Work Section */}
        <div
          ref={workRef}
          className="flex cursor-pointer items-center justify-between overflow-hidden border-b border-bento-line bg-panel-bg px-6 transition-colors duration-200 hover:opacity-80"
        >
          <SectionHeading_Clickable onClick={handleWorkExpand}>
            {t({ zh: "作品集", en: "Portfolio" })}
          </SectionHeading_Clickable>
          <div onClick={handleWorkExpand} className="text-xl">
            +
          </div>
        </div>

        {/* About Section */}
        <div
          ref={aboutRef}
          className="flex cursor-pointer items-center justify-between overflow-hidden border-b border-bento-line bg-panel-bg px-6 transition-colors duration-200 hover:opacity-80"
          onClick={handleAboutExpand}
        >
          <SectionHeading_Clickable onClick={handleAboutExpand}>
            {t({ zh: "关于我", en: "About Me" })}
          </SectionHeading_Clickable>
          <div className="text-xl">
            +
          </div>
        </div>

        {/* Contact Section */}
        <div className="overflow-hidden border-b border-bento-line bg-panel-bg px-6 py-6 border-r-0">
          <ContactSection data={siteData.contact} />
        </div>

        {/* Resume Section */}
        <div className="overflow-hidden bg-panel-bg">
          <ResumeSection data={siteData.resume} />
        </div>
      </div>

      {/* Expanded overlays */}
      <ExpandedOverlay
        isOpen={expandedSection === "work"}
        clipFrom={clipFrom}
        uniqueKey="work-expanded"
      >
        <WorkSection
          data={siteData.projectCategories}
          onExpand={handleWorkExpand}
          isExpanded={true}
        />
      </ExpandedOverlay>

      <ExpandedOverlay
        isOpen={expandedSection === "about"}
        clipFrom={clipFrom}
        uniqueKey="about-expanded"
      >
        <AboutSection
          data={siteData.about}
          onExpand={handleAboutExpand}
          isExpanded={true}
        />
      </ExpandedOverlay>
    </div>
  );
}
