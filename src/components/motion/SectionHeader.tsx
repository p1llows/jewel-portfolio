import type { ReactNode } from "react";
import { ScrambleText } from "@/components/motion/ScrambleText";

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  /** Right-aligned content (e.g. a "SEE ALL" link) */
  aside?: ReactNode;
  className?: string;
  /** Use the full-strength border colour instead of the softer /60 one */
  strong?: boolean;
}

/** Shared section header: scrambling index label + hairline that draws in on scroll. */
export function SectionHeader({
  label,
  title,
  aside,
  className = "mb-8 sm:mb-10",
  strong = false,
}: SectionHeaderProps) {
  return (
    <div className={`relative pb-4 ${className}`}>
      <div className={aside ? "flex items-end justify-between" : undefined}>
        <div>
          <ScrambleText
            text={label}
            className="block text-xs sm:text-sm font-mono font-semibold text-secondary tracking-widest uppercase mb-2"
          />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">{title}</h2>
        </div>
        {aside}
      </div>
      <span
        data-draw
        aria-hidden="true"
        className={`absolute bottom-0 left-0 right-0 h-px ${strong ? "bg-border" : "bg-border/60"}`}
      />
    </div>
  );
}
