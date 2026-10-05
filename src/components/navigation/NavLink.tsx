import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

export function NavLink({ href, label, isActive, onClick }: NavLinkProps) {
  return (
    <li className="relative" onClick={onClick}>
      <Link
        href={href}
        className={`flex items-center justify-between py-2.5 px-3 rounded-none text-sm tracking-wide transition-all duration-200 ${
          isActive
            ? "text-foreground font-bold bg-foreground/10"
            : "text-secondary hover:text-foreground hover:translate-x-1"
        }`}
      >
        <span>{label}</span>
        
        {/* Active Arrow Indicator */}
        {isActive && (
          <ChevronRight className="w-4 h-4 text-foreground shrink-0" />
        )}
      </Link>
    </li>
  );
}


