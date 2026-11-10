import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Flush action bar for the bottom edge of a <Card> (cards use p-5 / sm:p-6, which the negative margins cancel).
 * Actions are full-width cells separated by hairlines, so they read as part of the card's own chrome
 * instead of small bordered buttons sitting inside another bordered box. Hover is deliberately calm (tint +
 * arrow nudge) because the card itself already animates on hover.
 */
export function CardActionBar({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`-mx-5 sm:-mx-6 -mb-5 sm:-mb-6 mt-4 flex border-t border-border divide-x divide-border ${className}`}
    >
      {children}
    </div>
  );
}

interface CardActionProps {
  href: string;
  children: ReactNode;
  /** Opens in a new tab with a ↗ arrow. Defaults to true for http(s) URLs. */
  external?: boolean;
  /** The main action: bolder, wider cell. */
  primary?: boolean;
  /** Dimmed, non-interactive cell (e.g. a link that isn't available yet). */
  disabled?: boolean;
}

const CELL =
  "flex items-center justify-center gap-2 overflow-hidden px-3 py-3 text-[11px] font-mono font-medium tracking-widest uppercase";

export function CardAction({ href, children, external, primary = false, disabled = false }: CardActionProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const width = primary ? "flex-[1.4]" : "flex-1";

  if (disabled) {
    return (
      <span aria-disabled="true" className={`${CELL} ${width} cursor-not-allowed text-secondary/50`}>
        <span>{children}</span>
        <span aria-hidden="true">{isExternal ? "↗" : "→"}</span>
      </span>
    );
  }

  const classes = `group/act ${CELL} ${width} ${
    primary ? "text-foreground" : "text-secondary"
  } transition-colors duration-200 hover:bg-background hover:text-foreground focus-visible:bg-background focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground motion-reduce:transition-none`;

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`transition-transform duration-200 motion-reduce:transition-none ${
          isExternal ? "group-hover/act:translate-x-0.5 group-hover/act:-translate-y-0.5" : "group-hover/act:translate-x-1"
        }`}
      >
        {isExternal ? "↗" : "→"}
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
