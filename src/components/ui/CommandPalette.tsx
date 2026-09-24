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
        <div className="flex items-center border-b border-border px-4 py-3">
          <span className="text-xs font-mono text-secondary mr-2">/^</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or run a command..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            aria-label="Command palette search"
          />
          <div className="flex items-center gap-2 text-xs text-secondary">
            <span className="hidden md:inline">↑↓</span>
            <span>to navigate</span>
            <span className="hidden md:inline">⏎</span>
            <span className="hidden md:inline">to select</span>
            <span className="ml-2 rounded border border-border px-1.5 py-0.5 text-[10px]">
              ESC
            </span>
            <span>to close</span>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-2">
          {actions.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted">
              No matches found
            </div>
          ) : (
            actions.map((item, index) => (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-secondary hover:text-foreground ${
                  index === selectedIndex ? "bg-secondary text-foreground" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs font-mono text-secondary">{item.section}</span>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="border-t border-border px-4 py-2 text-center text-xs text-muted">
          Press <span className="rounded border border-border px-1">Esc</span> to close
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
