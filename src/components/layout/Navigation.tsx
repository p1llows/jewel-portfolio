"use client";

import { useState, useEffect } from "react";
import { navigationItems } from "@/data/navigation";
import { NavLink } from "@/components/navigation/NavLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { VisitorCounter } from "@/components/ui/VisitorCounter";
import { CommandPaletteTrigger } from "@/components/ui/CommandPaletteTrigger";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export function Navigation({ activePage = "home" }: { activePage?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on page navigation or window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile Fixed Header Bar (< md) */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-border/80 bg-surface/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between md:hidden z-40 select-none">
        <Link
          href="/"
          className="flex flex-col"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="text-lg font-black tracking-tight text-foreground leading-none">JEWEL</span>
          <span className="text-[9px] font-mono text-secondary tracking-widest uppercase">RAMIREZ</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md border border-border/60 bg-background text-foreground hover:bg-surface transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer Navigation (< md) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background/95 backdrop-blur-xl z-30 p-6 flex flex-col justify-between overflow-y-auto md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-6">
            <div className="pb-3 border-b border-border/60 flex items-center justify-between">
              <span className="text-xs font-mono text-secondary tracking-widest uppercase">
                NAVIGATION
              </span>
              <VisitorCounter />
            </div>

            <nav>
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.id}
                    href={item.href}
                    label={item.label}
                    isActive={activePage === item.id}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                ))}
              </ul>
            </nav>
          </div>

          <div className="pt-6 border-t border-border flex flex-col gap-4 mt-8">
            {/* Live Status Indicator */}
            <div className="p-3 rounded-lg border border-border/60 bg-surface/50">
              <span className="block text-[10px] font-mono text-muted tracking-wider uppercase mb-1 font-medium">
                STATUS
              </span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                </span>
                <span className="text-xs font-mono font-semibold tracking-wider text-foreground">
                  AVAILABLE FOR WORK
                </span>
              </div>
            </div>

            {/* Command Palette Trigger */}
            <div onClick={() => setMobileMenuOpen(false)}>
              <CommandPaletteTrigger />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar Navigation (>= md) */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-surface p-6 flex flex-col justify-between hidden md:flex z-30 select-none">
        {/* Top Header & Navigation */}
        <div className="flex flex-col gap-6">
          <div className="px-3 pb-6 border-b border-border/60">
            <h1 className="text-2xl font-black tracking-tight text-foreground">JEWEL</h1>
            <p className="text-[11px] font-mono text-secondary tracking-widest uppercase">RAMIREZ</p>
          </div>

          <nav>
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
        </div>

        {/* Bottom Docked Tools & Status */}
        <div className="pt-3 border-t border-border flex flex-col gap-3">
          {/* Live Status Indicator */}
          <div className="pb-3 px-1 border-b border-border/60">
            <span className="block text-[10px] font-mono text-muted tracking-wider uppercase mb-1 font-medium">
              STATUS
            </span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
              </span>
              <span className="text-xs font-mono font-semibold tracking-wider text-foreground">
                AVAILABLE FOR WORK
              </span>
            </div>
          </div>

          {/* Theme & Visitor Stats */}
          <div className="flex items-center justify-between gap-2 px-0.5 pt-0.5">
            <ThemeToggle />
            <VisitorCounter />
          </div>

          {/* Search Trigger */}
          <div>
            <CommandPaletteTrigger />
          </div>
        </div>
      </aside>
    </>
  );
}
