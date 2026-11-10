import Link from "next/link";
import type { ReactNode } from "react";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  /** Display utilities etc. Defaults to "inline-flex"; pass e.g. "hidden sm:inline-flex" to hide on mobile. */
  className?: string;
  /** Defaults to true for http(s) URLs (opens in a new tab with a ↗ arrow). */
  external?: boolean;
  /** "back" puts a ← before the label and slides it left on hover. */
  direction?: "forward" | "back";
}

/**
 * Call-to-action link. Solid background (so the drifting binary background never shows through the label),
 * square 1px border to match the site, and a fill that wipes in from the left on hover/focus.
 */
export function ArrowLink({
  href,
  children,
  className = "inline-flex",
  external,
  direction = "forward",
}: ArrowLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const isBack = direction === "back";
  const arrow = isBack ? "←" : isExternal ? "↗" : "→";

  const classes = `group/btn relative items-center gap-3 overflow-hidden border border-border bg-background px-4 py-2.5 text-xs font-mono font-medium tracking-widest uppercase text-foreground transition-colors duration-300 hover:border-foreground hover:text-background focus-visible:border-foreground focus-visible:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none ${className}`;

  const arrowEl = (
    <span
      aria-hidden="true"
      className={`relative transition-transform duration-300 motion-reduce:transition-none ${
        isBack ? "group-hover/btn:-translate-x-1" : "group-hover/btn:translate-x-1"
      }`}
    >
      {arrow}
    </span>
  );

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover/btn:scale-x-100 group-focus-visible/btn:scale-x-100 motion-reduce:transition-none`}
      />
      {isBack && arrowEl}
      <span className="relative">{children}</span>
      {!isBack && arrowEl}
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
