"use client";

import { useState, useCallback, useRef, useEffect, RefObject } from "react";

export type PanelSizes = {
  topHeight: number;
  topLeftWidth: number;
  bottomLeftStatusHeight: number;
  bottomLeftWidth: number;
  bottomRightTopHeight: number;
  bottomRightContactHeight: number;
};

type DividerType =
  | "horizontal-main"
  | "vertical-top"
  | "horizontal-bottom-left"
  | "vertical-bottom"
  | "horizontal-bottom-right"
  | "vertical-bottom-right-contact"
  | null;

const CONSTRAINTS = {
  minTopHeight: 15,
  maxTopHeight: 40,
  minLeftWidth: 30,
  maxLeftWidth: 70,
  minAboutHeight: 30,
  maxAboutHeight: 70,
  minStatusHeight: 8,
  maxStatusHeight: 30,
  minContactWidth: 40,
  maxContactWidth: 80,
};

const LERP_FACTOR = 0.15;

const DEFAULT_SIZES: PanelSizes = {
  topHeight: 25,
  topLeftWidth: 55,
  bottomLeftStatusHeight: 13,
  bottomLeftWidth: 40,
  bottomRightTopHeight: 60,
  bottomRightContactHeight: 70,
};

export function useResizablePanels(
  containerRef: RefObject<HTMLDivElement | null>,
) {
  const [sizes, setSizes] = useState<PanelSizes>(DEFAULT_SIZES);
  const targetSizes = useRef<PanelSizes>({ ...DEFAULT_SIZES });
  const rafId = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState<DividerType>(null);

  const handleMouseDown = useCallback((divider: NonNullable<DividerType>) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(divider);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      if (isDragging === "horizontal-main") {
        const newTopHeight = ((e.clientY - rect.top) / rect.height) * 100;
        targetSizes.current.topHeight = Math.min(
          CONSTRAINTS.maxTopHeight,
          Math.max(CONSTRAINTS.minTopHeight, newTopHeight),
        );
      } else if (isDragging === "vertical-top") {
        const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100;
        targetSizes.current.topLeftWidth = Math.min(
          CONSTRAINTS.maxLeftWidth,
          Math.max(CONSTRAINTS.minLeftWidth, newLeftWidth),
        );
      } else if (isDragging === "vertical-bottom") {
        const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100;
        targetSizes.current.bottomLeftWidth = Math.min(
          CONSTRAINTS.maxLeftWidth,
          Math.max(CONSTRAINTS.minLeftWidth, newLeftWidth),
        );
      } else if (isDragging === "horizontal-bottom-left") {
        const topOffset = (targetSizes.current.topHeight / 100) * rect.height;
        const bottomHeight = rect.height - topOffset;
        const mouseY = e.clientY - rect.top - topOffset;
        const newStatusHeight = (mouseY / bottomHeight) * 100;
        targetSizes.current.bottomLeftStatusHeight = Math.min(
          CONSTRAINTS.maxStatusHeight,
          Math.max(CONSTRAINTS.minStatusHeight, newStatusHeight),
        );
      } else if (isDragging === "vertical-bottom-right-contact") {
        const leftOffset = (targetSizes.current.bottomLeftWidth / 100) * rect.width;
        const rightWidthPixels = rect.width - leftOffset;
        const mouseX = e.clientX - rect.left - leftOffset;
        const newContactWidth = (mouseX / rightWidthPixels) * 100;
        targetSizes.current.bottomRightContactHeight = Math.min(
          CONSTRAINTS.maxContactWidth,
          Math.max(CONSTRAINTS.minContactWidth, newContactWidth),
        );
      } else if (isDragging === "horizontal-bottom-right") {
        const topOffset = (targetSizes.current.topHeight / 100) * rect.height;
        const bottomHeight = rect.height - topOffset;
        const mouseY = e.clientY - rect.top - topOffset;
        const newAboutHeight = (mouseY / bottomHeight) * 100;
        targetSizes.current.bottomRightTopHeight = Math.min(
          CONSTRAINTS.maxAboutHeight,
          Math.max(CONSTRAINTS.minAboutHeight, newAboutHeight),
        );
      }
    },
    [isDragging, containerRef],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Animation loop: lerp sizes toward target for damping effect
  useEffect(() => {
    if (!isDragging) {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      setSizes({ ...targetSizes.current });
      return;
    }

    const animate = () => {
      setSizes((prev) => {
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        return {
          topHeight: lerp(
            prev.topHeight,
            targetSizes.current.topHeight,
            LERP_FACTOR,
          ),
          topLeftWidth: lerp(
            prev.topLeftWidth,
            targetSizes.current.topLeftWidth,
            LERP_FACTOR,
          ),
          bottomLeftWidth: lerp(
            prev.bottomLeftWidth,
            targetSizes.current.bottomLeftWidth,
            LERP_FACTOR,
          ),
          bottomRightTopHeight: lerp(
            prev.bottomRightTopHeight,
            targetSizes.current.bottomRightTopHeight,
            LERP_FACTOR,
          ),
          bottomLeftStatusHeight: lerp(
            prev.bottomLeftStatusHeight,
            targetSizes.current.bottomLeftStatusHeight,
            LERP_FACTOR,
          ),
          bottomRightContactHeight: lerp(
            prev.bottomRightContactHeight,
            targetSizes.current.bottomRightContactHeight,
            LERP_FACTOR,
          ),
        };
      });
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [isDragging]);

  // Global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = isDragging.startsWith("horizontal")
        ? "row-resize"
        : "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    sizes,
    isDragging,
    handleMouseDown,
  };
}
