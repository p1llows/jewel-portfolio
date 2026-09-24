"use client";

import { navigationItems } from "@/data/navigation";
import { NavLink } from "@/components/navigation/NavLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { VisitorCounter } from "@/components/ui/VisitorCounter";
import { CommandPaletteTrigger } from "@/components/ui/CommandPaletteTrigger";

export function Navigation({ activePage = "home" }: { activePage?: string }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-surface p-6 flex flex-col justify-between hidden md:flex z-30 select-none">
      {/* Top Brand Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground">JEWEL</h1>
        <p className="text-[11px] font-mono text-secondary tracking-widest uppercase">RAMIREZ</p>
      </div>

      {/* Center Navigation Links */}
      <nav className="my-auto py-6">
        <ul className="space-y-1.5">
          {navigationItems.map((item) => (
            <NavLink
              key={item.id}
              href={item.href}
              label={item.label}
              isActive={activePage === item.id}
            />
          ))}
        </ul>
      </nav>

      {/* Bottom Docked Tools & Status */}
      <div className="pt-5 border-t border-border flex flex-col gap-4">
        {/* Live Status Indicator */}
        <div className="rounded-md border border-border/60 bg-background/40 p-2.5">
          <span className="block text-[10px] font-mono text-secondary tracking-wider uppercase mb-1">
            STATUS
          </span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold tracking-wide text-foreground">
              AVAILABLE FOR WORK
            </span>
          </div>
        </div>

        {/* Theme & Visitor Stats */}
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <VisitorCounter />
        </div>

        {/* Search Trigger */}
        <div>
          <CommandPaletteTrigger />
        </div>

        {/* Copyright */}
        <div className="text-[10px] font-mono text-muted flex items-center justify-between">
          <span>© 2026 JEWEL RAMIREZ</span>
        </div>
      </div>
    </aside>
  );
}
