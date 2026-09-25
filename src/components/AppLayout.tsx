"use client";

import { Navigation } from "@/components/layout/Navigation";
import { usePathname } from "next/navigation";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Determine active page from pathname
  const getActivePage = () => {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/work")) return "work";
    if (pathname.startsWith("/experience")) return "experience";
    if (pathname.startsWith("/about")) return "about";
    if (pathname.startsWith("/stack")) return "stack";
    if (pathname.startsWith("/certifications")) return "certifications";
    if (pathname.startsWith("/contact")) return "contact";
    if (pathname.startsWith("/github")) return "github";
    return "home";
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation activePage={getActivePage()} />
      <main className="flex-1 ml-0 md:ml-64 w-full min-w-0 transition-all pt-16 md:pt-0">{children}</main>
    </div>
  );
}
