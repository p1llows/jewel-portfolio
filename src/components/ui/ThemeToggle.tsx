"use client";

import { useTheme } from "@/app/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded bg-surface hover:bg-secondary text-xs text-secondary hover:text-foreground transition-colors"
    >
      {theme === "light" ? (
        <>
          <Moon className="w-3 h-3" />
          <span>DARK</span>
        </>
      ) : (
        <>
          <Sun className="w-3 h-3" />
          <span>LIGHT</span>
        </>
      )}
    </button>
  );
}
