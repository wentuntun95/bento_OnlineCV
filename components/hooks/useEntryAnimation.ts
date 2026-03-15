"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";

type AnimationRefs = {
  lines: {
    mainHLine: RefObject<HTMLDivElement | null>;
    topVLine: RefObject<HTMLDivElement | null>;
    bottomVLine: RefObject<HTMLDivElement | null>;
    bottomRightHLine: RefObject<HTMLDivElement | null>;
    topLeftHLine: RefObject<HTMLDivElement | null>;
    bottomRightContactVLine: RefObject<HTMLDivElement | null>;
  };
  content: {
    hero: RefObject<HTMLDivElement | null>;
    jobStatus: RefObject<HTMLDivElement | null>;
    skills: RefObject<HTMLDivElement | null>;
    work: RefObject<HTMLDivElement | null>;
    about: RefObject<HTMLDivElement | null>;
    contact: RefObject<HTMLDivElement | null>;
    resume: RefObject<HTMLDivElement | null>;
  };
};

export function useEntryAnimation(refs: AnimationRefs) {
  useEffect(() => {
    const { lines, content } = refs;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Set initial states for lines
      gsap.set([lines.mainHLine.current, lines.bottomRightHLine.current, lines.topLeftHLine.current], { scaleX: 0, scaleY: 1 });
      gsap.set([lines.topVLine.current, lines.bottomVLine.current, lines.bottomRightContactVLine.current], {
        scaleY: 0,
        scaleX: 1,
      });

      // Set initial states for content
      gsap.set(
        [
          content.hero.current,
          content.jobStatus.current,
          content.skills.current,
          content.work.current,
          content.about.current,
          content.contact.current,
          content.resume.current,
        ],
        { opacity: 0, y: 20 },
      );

      // Animation sequence
      tl.to(lines.mainHLine.current, {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          [lines.topVLine.current, lines.bottomVLine.current],
          {
            scaleY: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          [lines.bottomRightHLine.current, lines.topLeftHLine.current],
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          lines.bottomRightContactVLine.current,
          {
            scaleY: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          [
            content.hero.current,
            content.skills.current,
            content.work.current,
            content.about.current,
            content.contact.current,
            content.jobStatus.current,
            content.resume.current,
          ],
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3",
        );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount - refs are stable
}
