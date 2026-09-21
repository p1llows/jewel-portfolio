import Link from "next/link";

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

export function NavLink({ href, label, isActive }: NavLinkProps) {
  return (
    <li className="group">
      <Link
        href={href}
        className={`block py-2 px-4 text-sm transition-colors duration-200
          ${isActive ? "font-bold" : "hover:text-secondary"}`}
      >
        {label}
      </Link>
    </li>
  );
}
