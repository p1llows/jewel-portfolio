import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

export function NavLink({ href, label, isActive }: NavLinkProps) {
  return (
    <li className="relative">
      {/* Primary Left Bar Indicator */}
      {isActive && (
        <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-foreground rounded-r-full shadow-sm" />
      )}
      <Link
        href={href}
        className={`flex items-center justify-between py-2.5 px-3 rounded-md text-sm tracking-wide transition-all duration-200 ${
          isActive
            ? "text-foreground font-bold bg-foreground/10 translate-x-1"
            : "text-secondary hover:text-foreground hover:translate-x-1"
        }`}
      >
        <span className="flex items-center gap-2">
          {/* Secondary Minimal Dot Indicator */}
          {isActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse shrink-0" />
          )}
          {label}
        </span>
        
        {/* Secondary Chevron Indicator */}
        {isActive && (
          <ChevronRight className="w-3.5 h-3.5 text-foreground opacity-80 shrink-0" />
        )}
      </Link>
    </li>
  );
}

