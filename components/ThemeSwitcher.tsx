"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-full opacity-0 pointer-events-none">
        <Palette size={20} />
      </button>
    );
  }

  const cycleTheme = () => {
    if (theme === "fluorescent") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("fluorescent"); // fallback catch-all
  };

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-full transition-colors flex items-center justify-center bg-btn-bg text-btn-text hover:opacity-80"
      title={`Current Theme: ${theme}`}
    >
      <Palette size={20} className="text-btn-text" />
    </button>
  );
}
