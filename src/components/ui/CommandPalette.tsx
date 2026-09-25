"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useTheme } from "@/app/theme-provider";
import { navigationItems } from "@/data/navigation";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme } = useTheme();

  // Command items derived with useMemo (prevents infinite re-render loop)
  const actions: CommandItem[] = useMemo(() => {
    const navItems: CommandItem[] = navigationItems.map((item) => ({
      id: `nav-${item.id}`,
      label: item.label,
      value: item.label,
      action: () => {
        window.location.href = item.href;
      },
      section: "Navigation",
    }));

    const themeAction: CommandItem = {
      id: "toggle-theme",
      label: `Toggle ${theme === "light" ? "Dark" : "Light"} Mode`,
      value: `Toggle ${theme === "light" ? "Dark" : "Light"} Mode`,
      action: () => {
        toggleTheme();
        onClose();
      },
      section: "Actions",
    };

    const githubAction: CommandItem = {
      id: "github",
      label: "Open GitHub",
      value: "Open GitHub",
      action: () => {
        window.open("https://github.com/p1llows", "_blank");
      },
      section: "Actions",
    };

    const allItems = [...navItems, themeAction, githubAction];

    if (!query) return allItems;

    return allItems.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, theme, toggleTheme, onClose]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % actions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + actions.length) % actions.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (actions[selectedIndex]) {
          actions[selectedIndex].action();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, actions, selectedIndex, onClose]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
      <div
        ref={containerRef}
        className="relative w-full max-w-xl rounded-lg border border-border bg-surface shadow-2xl"
      >
        <div className="flex items-center border-b border-border/60 px-4 py-3.5">
          <span className="text-xs font-mono text-secondary mr-2">/^</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or run a command..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted text-foreground font-medium"
            aria-label="Command palette search"
          />
          <div className="flex items-center gap-2 text-xs text-secondary font-mono">
            <span className="hidden md:inline">↑↓</span>
            <span className="hidden md:inline">navigate</span>
            <span className="hidden md:inline">⏎</span>
            <span className="hidden md:inline">select</span>
            <span className="ml-2 rounded border border-border/80 px-1.5 py-0.5 text-[10px] text-foreground bg-background font-semibold">
              ESC
            </span>
            <span>close</span>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {actions.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs font-mono text-muted">
              No matches found
            </div>
          ) : (
            actions.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full px-3.5 py-2.5 rounded-md text-left text-sm transition-colors duration-150 flex items-center justify-between group focus:outline-none ${
                    isSelected
                      ? "bg-foreground/10 text-foreground font-bold"
                      : "text-secondary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center justify-center w-4 h-4 transition-opacity ${isSelected ? "opacity-100 text-foreground" : "opacity-0"}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                    <span className={`transition-colors ${isSelected ? "text-foreground font-bold" : "text-secondary"}`}>
                      {item.label}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-mono transition-colors ${
                      isSelected ? "text-foreground/90 font-medium" : "text-secondary/70"
                    }`}
                  >
                    {item.section}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="border-t border-border/60 px-4 py-2.5 text-center text-xs font-mono text-secondary flex items-center justify-between">
          <span>{actions.length} COMMANDS AVAILABLE</span>
          <div>
            Press <span className="rounded border border-border/80 px-1.5 py-0.5 text-[10px] text-foreground bg-background font-semibold">Esc</span> to close
          </div>
        </div>
      </div>
    </div>
  );
}

interface CommandItem {
  id: string;
  label: string;
  value: string;
  action: () => void;
  section: string;
}
