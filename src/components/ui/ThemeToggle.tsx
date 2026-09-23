"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/app/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="flex items-center gap-2 px-3 py-2 rounded bg-surface text-xs text-secondary transition-colors"
      >
        <span className="w-3 h-3 rounded-full bg-secondary/40 animate-pulse" />
        <span>THEME</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
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
