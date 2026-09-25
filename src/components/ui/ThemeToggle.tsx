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
      <div className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono text-muted">
        <span className="w-3.5 h-3.5 rounded-full bg-border animate-pulse" />
        <span>...</span>
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={(e) => toggleTheme(e)}
      aria-label="Toggle theme"
      className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-background/80 text-xs font-mono text-secondary hover:text-foreground transition-all duration-200 group active:scale-95 select-none"
    >
      {isDark ? (
        <>
          <Moon className="w-3.5 h-3.5 text-secondary group-hover:text-foreground transition-colors" />
          <span className="tracking-wider font-semibold">DARK</span>
        </>
      ) : (
        <>
          <Sun className="w-3.5 h-3.5 text-secondary group-hover:text-foreground transition-colors" />
          <span className="tracking-wider font-semibold">LIGHT</span>
        </>
      )}
    </button>
  );
}


