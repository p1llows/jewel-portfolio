"use client";

import { useState, useEffect } from "react";
import { CommandPalette } from "./CommandPalette";

export function CommandPaletteTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd + K or Ctrl + K to open palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 rounded border border-border bg-surface px-3 py-2 text-xs text-secondary hover:text-foreground transition-colors"
        aria-label="Open command palette"
      >
        <span className="font-mono">/</span>
        <span className="text-[10px]">Search</span>
      </button>

      <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
