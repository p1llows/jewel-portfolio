"use client";

import { navigationItems } from "@/data/navigation";
import { NavLink } from "@/components/navigation/NavLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { VisitorCounter } from "@/components/ui/VisitorCounter";
import { CommandPaletteTrigger } from "@/components/ui/CommandPaletteTrigger";

export function Navigation({ activePage = "home" }: { activePage?: string }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-surface p-6 hidden md:block">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">JEWEL</h1>
        <p className="text-sm text-secondary">RAMIREZ</p>
      </div>

      <nav>
        <ul className="space-y-1">
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

      <div className="mt-auto pt-8 border-t border-border">
        <div className="mb-4">
          <span className="block text-xs text-secondary mb-1">STATUS</span>
          <span className="text-sm font-bold">AVAILABLE</span>
        </div>

        <div className="mb-4">
          <ThemeToggle />
        </div>

        <div className="mb-6">
          <VisitorCounter />
        </div>

        <div className="mt-4">
          <p className="text-[10px] text-muted">© 2026</p>
        </div>

        {/* Command palette trigger (hidden on desktop, visible via / key) */}
        <div className="mt-6 hidden md:block">
          <CommandPaletteTrigger />
        </div>
      </div>
    </aside>
  );
}
