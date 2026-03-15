"use client";

import React, { useState, useCallback, useRef } from "react";
import type { SiteData } from "@/data/types";
import {
  HeroSection,
  SkillsSection,
  WorkSection,
  AboutSection,
  ContactSection,
  JobStatusSection,
  ResumeSection,
  getClipFrom,
} from "./sections";
import { useResizablePanels, useEntryAnimation } from "./hooks";
import ExpandedOverlay from "./sections/ui/ExpandedOverlay";

type ResizableLayoutProps = {
  siteData: SiteData;
  expandedSection: "work" | "about" | null;
  setExpandedSection: (section: "work" | "about" | null) => void;
};

export default function ResizableLayout({
  siteData,
  expandedSection,
  setExpandedSection,
}: ResizableLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);

  // Refs for panel containers (used to capture bounding rect for expansion)
  const workPanelRef = useRef<HTMLDivElement>(null);
  const aboutPanelRef = useRef<HTMLDivElement>(null);

  const handleWorkExpand = useCallback(() => {
    if (expandedSection === "work") {
      setExpandedSection(null);
    } else {
      const rect = workPanelRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("work");
    }
  }, [expandedSection]);

  const handleAboutExpand = useCallback(() => {
    if (expandedSection === "about") {
      setExpandedSection(null);
    } else {
      const rect = aboutPanelRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("about");
    }
  }, [expandedSection]);

  const clipFrom = getClipFrom(sourceRect);

  // Use custom hooks for animation logic
  const { sizes, isDragging, handleMouseDown } =
    useResizablePanels(containerRef);

  // Animation refs for lines
  const mainHLineRef = useRef<HTMLDivElement>(null);
  const topVLineRef = useRef<HTMLDivElement>(null);
  const bottomVLineRef = useRef<HTMLDivElement>(null);
  const bottomRightHLineRef = useRef<HTMLDivElement>(null);
  const topLeftHLineRef = useRef<HTMLDivElement>(null);
  const bottomRightContactVLineRef = useRef<HTMLDivElement>(null);

  // Animation refs for content
  const heroContentRef = useRef<HTMLDivElement>(null);
  const jobStatusContentRef = useRef<HTMLDivElement>(null);
  const skillsContentRef = useRef<HTMLDivElement>(null);
  const workContentRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const contactContentRef = useRef<HTMLDivElement>(null);
  const resumeContentRef = useRef<HTMLDivElement>(null);

  // Entry animation
  useEntryAnimation({
    lines: {
      mainHLine: mainHLineRef,
      topVLine: topVLineRef,
      bottomVLine: bottomVLineRef,
      bottomRightHLine: bottomRightHLineRef,
      topLeftHLine: topLeftHLineRef,
      bottomRightContactVLine: bottomRightContactVLineRef,
    },
    content: {
      hero: heroContentRef,
      jobStatus: jobStatusContentRef,
      skills: skillsContentRef,
      work: workContentRef,
      about: aboutContentRef,
      contact: contactContentRef,
      resume: resumeContentRef,
    },
  });

  const bottomHeight = 100 - sizes.topHeight;

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* ===== TOP SECTION (Hero | Skills) ===== */}
      <div
        className="absolute left-0 right-0 top-0 flex"
        style={{ height: `${sizes.topHeight}%` }}
      >
        {/* Hero Section */}
        <div
          className="relative h-full overflow-hidden border-b border-bento-line"
          style={{ width: `${sizes.topLeftWidth}%` }}
        >
          <div ref={heroContentRef} className="h-full bg-panel-bg p-4 overflow-y-auto scrollbar-none">
            <HeroSection data={siteData.hero} />
          </div>
        </div>

        {/* Vertical Divider (Top Section) */}
        <div
          className="group relative z-10 flex h-full w-0 cursor-col-resize items-center justify-center"
          onMouseDown={handleMouseDown("vertical-top")}
        >
          <div
            ref={topVLineRef}
            className={`absolute h-full w-px origin-top bg-bento-line ${
              isDragging === "vertical-top"
                ? "w-1 bg-gray-400"
                : "group-hover:w-1 group-hover:bg-gray-400"
            }`}
          />
        </div>

        {/* Skills Section */}
        <div
          className="relative h-full overflow-auto scrollbar-none"
          style={{ width: `${100 - sizes.topLeftWidth}%` }}
        >
          <div ref={skillsContentRef} className="h-full bg-panel-bg p-4">
            <SkillsSection data={siteData.skills} />
          </div>
        </div>
      </div>

      {/* Horizontal Divider (Main - between Top and Bottom) */}
      <div
        className="group absolute left-0 right-0 z-10 flex h-0 cursor-row-resize items-center justify-center"
        style={{ top: `${sizes.topHeight}%` }}
        onMouseDown={handleMouseDown("horizontal-main")}
      >
        <div
          ref={mainHLineRef}
          className={`absolute h-px w-full origin-left bg-bento-line ${
            isDragging === "horizontal-main"
              ? "h-1 bg-gray-400"
              : "group-hover:h-1 group-hover:bg-gray-400"
          }`}
        />
      </div>

      {/* ===== BOTTOM SECTION (Work | About + Contact) ===== */}
      <div
        className="absolute bottom-0 left-0 right-0 flex"
        style={{ height: `${bottomHeight}%` }}
      >
        {/* Work Section (Left) */}
        <div
          ref={workPanelRef}
          className="relative h-full overflow-hidden"
          style={{ width: `${sizes.bottomLeftWidth}%` }}
        >
          <div className="flex h-full flex-col bg-panel-bg relative">
            <div 
              ref={jobStatusContentRef}
              className="shrink-0 bg-panel-bg overflow-hidden"
              style={{ height: `${sizes.bottomLeftStatusHeight}%`, flex: 'none' }}
            >
              <JobStatusSection data={siteData.jobStatus} />
            </div>

            {/* Horizontal Divider (Status/Work) */}
            <div
              className="group absolute left-0 right-0 z-20 flex h-4 -translate-y-1/2 cursor-row-resize items-center justify-center"
              style={{ top: `${sizes.bottomLeftStatusHeight}%` }}
              onMouseDown={handleMouseDown("horizontal-bottom-left")}
            >
              <div
                ref={topLeftHLineRef}
                className={`absolute h-px w-full origin-left bg-bento-line ${
                  isDragging === "horizontal-bottom-left"
                    ? "h-1 bg-gray-400"
                    : "group-hover:h-1 group-hover:bg-gray-400"
                }`}
              />
            </div>

            <div 
              ref={workContentRef}
              className="flex-1 overflow-auto scrollbar-none border-t border-bento-line p-4"
              style={{ height: `${100 - sizes.bottomLeftStatusHeight}%`, flex: 'none' }}
            >
              <WorkSection
                data={siteData.projectCategories}
                onExpand={handleWorkExpand}
              />
            </div>
          </div>
        </div>

        {/* Vertical Divider (Bottom Section) */}
        <div
          className="group relative z-10 flex h-full w-0 cursor-col-resize items-center justify-center"
          onMouseDown={handleMouseDown("vertical-bottom")}
        >
          <div
            ref={bottomVLineRef}
            className={`absolute h-full w-px origin-top bg-bento-line ${
              isDragging === "vertical-bottom"
                ? "w-1 bg-gray-400"
                : "group-hover:w-1 group-hover:bg-gray-400"
            }`}
          />
        </div>

        {/* Right Section (About + Contact) */}
        <div
          className="relative h-full"
          style={{ width: `${100 - sizes.bottomLeftWidth}%` }}
        >
          {/* About Section */}
          <div
            ref={aboutPanelRef}
            className="absolute left-0 right-0 top-0 overflow-auto scrollbar-none"
            style={{ height: `${sizes.bottomRightTopHeight}%` }}
          >
            <div ref={aboutContentRef} className="h-full bg-panel-bg p-4 flex flex-col">
              <AboutSection
                data={siteData.about}
                onExpand={handleAboutExpand}
              />
            </div>
          </div>

          {/* Horizontal Divider (About/Contact) */}
          <div
            className="group absolute left-0 right-0 z-10 flex h-0 cursor-row-resize items-center justify-center"
            style={{ top: `${sizes.bottomRightTopHeight}%` }}
            onMouseDown={handleMouseDown("horizontal-bottom-right")}
          >
            <div
              ref={bottomRightHLineRef}
              className={`absolute h-px w-full origin-left bg-bento-line ${
                isDragging === "horizontal-bottom-right"
                  ? "h-1 bg-gray-400"
                  : "group-hover:h-1 group-hover:bg-gray-400"
              }`}
            />
          </div>

          {/* Contact Section */}
          <div
            className="absolute bottom-0 left-0 right-0 overflow-auto scrollbar-none"
            style={{ height: `${100 - sizes.bottomRightTopHeight}%` }}
          >
            <div ref={contactContentRef} className="flex h-full w-full bg-panel-bg relative">
              <div 
                className="flex-1 overflow-auto scrollbar-none p-4"
                style={{ width: `${sizes.bottomRightContactHeight}%`, flex: 'none' }}
              >
                <ContactSection data={siteData.contact} />
              </div>

              {/* Vertical Divider (Contact/Resume) */}
              <div
                className="group absolute top-0 bottom-0 z-20 flex w-4 -translate-x-1/2 cursor-col-resize items-center justify-center"
                style={{ left: `${sizes.bottomRightContactHeight}%` }}
                onMouseDown={handleMouseDown("vertical-bottom-right-contact")}
              >
                <div
                  ref={bottomRightContactVLineRef}
                  className={`absolute h-full w-px origin-top bg-bento-line ${
                    isDragging === "vertical-bottom-right-contact"
                      ? "w-1 bg-gray-400"
                      : "group-hover:w-1 group-hover:bg-gray-400"
                  }`}
                />
              </div>

              <div 
                ref={resumeContentRef}
                className="shrink-0 bg-panel-bg border-l border-bento-line"
                style={{ width: `${100 - sizes.bottomRightContactHeight}%`, flex: 'none' }}
              >
                <ResumeSection data={siteData.resume} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded overlays */}
      <ExpandedOverlay
        isOpen={expandedSection === "work"}
        clipFrom={clipFrom}
        padding="p-8"
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
        padding="p-8"
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
