import Link from "next/link";

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

export function NavLink({ href, label, isActive }: NavLinkProps) {
  return (
    <li className="relative">
      {isActive && (
        <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-5 bg-foreground rounded-r" />
      )}
      <Link
        href={href}
        className={`flex items-center py-2.5 px-3 rounded-md text-sm font-medium tracking-wide transition-all duration-200 ${
          isActive
            ? "text-foreground font-bold bg-secondary/10 translate-x-1"
            : "text-secondary hover:text-foreground hover:translate-x-1"
        }`}
      >
        {label}
      </Link>
    </li>
  );
}
