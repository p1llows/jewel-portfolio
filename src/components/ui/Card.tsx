"use client";

import React, { ComponentPropsWithoutRef } from "react";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  className?: string;
  isLink?: boolean;
  href?: string;
  as?: React.ElementType;
}

export function CardCornerTicks() {
  return (
    <>
      {/* Top-Left Tick */}
      <span className="absolute top-0 left-0 w-[7px] h-[7px] group-hover:w-[12px] group-hover:h-[12px] border-t border-l border-muted group-hover:border-foreground transition-all duration-200 pointer-events-none z-10 motion-reduce:transition-none motion-reduce:group-hover:w-[7px] motion-reduce:group-hover:h-[7px]" />
      {/* Top-Right Tick */}
      <span className="absolute top-0 right-0 w-[7px] h-[7px] group-hover:w-[12px] group-hover:h-[12px] border-t border-r border-muted group-hover:border-foreground transition-all duration-200 pointer-events-none z-10 motion-reduce:transition-none motion-reduce:group-hover:w-[7px] motion-reduce:group-hover:h-[7px]" />
      {/* Bottom-Left Tick */}
      <span className="absolute bottom-0 left-0 w-[7px] h-[7px] group-hover:w-[12px] group-hover:h-[12px] border-b border-l border-muted group-hover:border-foreground transition-all duration-200 pointer-events-none z-10 motion-reduce:transition-none motion-reduce:group-hover:w-[7px] motion-reduce:group-hover:h-[7px]" />
      {/* Bottom-Right Tick */}
      <span className="absolute bottom-0 right-0 w-[7px] h-[7px] group-hover:w-[12px] group-hover:h-[12px] border-b border-r border-muted group-hover:border-foreground transition-all duration-200 pointer-events-none z-10 motion-reduce:transition-none motion-reduce:group-hover:w-[7px] motion-reduce:group-hover:h-[7px]" />
    </>
  );
}

export function CardHoverBar() {
  return (
    <span className="absolute top-0 left-0 right-0 h-[2px] bg-foreground scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[350ms] ease-out pointer-events-none z-20 motion-reduce:hidden" />
  );
}

interface CardIndexProps {
  index: number;
  className?: string;
}

export function CardIndex({ index, className = "" }: CardIndexProps) {
  const formattedDecimal = index.toString().padStart(2, "0");
  const formattedBinary = index.toString(2).padStart(8, "0");

  return (
    <span className={`inline-block font-mono text-xs font-medium text-secondary group-hover:text-foreground transition-colors min-w-[8ch] ${className}`}>
      <span className="inline group-hover:hidden motion-reduce:group-hover:inline">
        {formattedDecimal}
      </span>
      <span className="hidden group-hover:inline motion-reduce:group-hover:hidden">
        {formattedBinary}
      </span>
    </span>
  );
}

export function Card({
  children,
  className = "",
  as: Component = "div",
  ...props
}: CardProps) {
  return (
    <Component
      className={`group relative bg-surface border border-border rounded-none transition-colors duration-200 hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
      {...props}
    >
      <CardHoverBar />
      <CardCornerTicks />
      {children}
    </Component>
  );
}
