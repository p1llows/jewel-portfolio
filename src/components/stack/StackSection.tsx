"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { stackCategories } from "@/data/stack";
import { TechIcon } from "@/components/stack/TechIcon";

const allUniqueTechs = Array.from(new Set(stackCategories.flatMap((c) => c.items)))
  .filter((tech) => !tech.includes(" ") && tech !== "Wireframing" && tech !== "Prototyping");

const techGroups: string[][] = [];

for (let i = 0; i < allUniqueTechs.length; i += 5) {
  const chunk = allUniqueTechs.slice(i, i + 5);
  // Pad the last group with items from the beginning if it doesn't have exactly 5 elements
  if (chunk.length < 5) {
    const needed = 5 - chunk.length;
    chunk.push(...allUniqueTechs.slice(0, needed));
  }
  techGroups.push(chunk);
}

interface StackSectionProps {
  isPreview?: boolean;
}

export function StackSection({ isPreview = false }: StackSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Respect reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % techGroups.length);
    }, 2800); // ~2.8s per group

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20">
      <div className="mb-8 sm:mb-10 pb-4 border-b border-border/60 flex items-end justify-between">
        <div>
          <div className="text-xs sm:text-sm font-mono font-semibold text-secondary tracking-widest uppercase mb-2">05 / STACK</div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">TECH STACK</h2>
        </div>
        {isPreview && (
          <Link
            href="/stack"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-secondary hover:text-foreground transition-colors group"
          >
            <span>SEE FULL STACK</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>

      {isPreview ? (
        <div className="pt-10 sm:pt-14 md:pt-16 pb-2 sm:pb-4 md:pb-6 relative flex flex-col justify-center">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-4 md:gap-6 w-full max-w-5xl mx-auto">
            {[0, 1, 2, 3, 4].map((slotIndex) => (
              <div
                key={slotIndex}
                className={`relative flex items-center justify-center min-h-[5rem] sm:min-h-[6rem] md:min-h-[7rem]
                  ${slotIndex >= 3 ? "hidden sm:flex" : ""}
                  ${slotIndex >= 4 ? "hidden md:flex" : ""}
                `}
              >
                {techGroups.map((group, groupIndex) => {
                  const tech = group[slotIndex];
                  const activeIndex = currentIndex % techGroups.length;
                  const isActive = groupIndex === activeIndex;
                  return (
                    <div
                      key={`${groupIndex}-${tech}`}
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out
                        ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}
                      `}
                      aria-hidden={!isActive}
                    >
                      <div className="inline-flex items-center gap-3 sm:gap-4 md:gap-5 py-3 px-5 sm:py-4 sm:px-6 md:py-5 md:px-8 rounded-2xl text-base sm:text-lg md:text-xl lg:text-2xl font-mono text-secondary hover:text-foreground hover:bg-surface/60 transition-all duration-150 group/tech cursor-default">
                        <TechIcon
                          name={tech}
                          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 shrink-0 transition-transform group-hover/tech:scale-110"
                        />
                        <span className="whitespace-nowrap">{tech}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="border-t border-border/60 divide-y divide-border/40">
          {stackCategories.map((category, index) => (
            <div
              key={category.id}
              className="py-5 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start hover:bg-surface/30 transition-colors px-1 sm:px-4 rounded-lg group/row"
            >
              <div className="md:col-span-4 lg:col-span-3">
                <div className="text-xs font-mono text-secondary uppercase tracking-widest font-semibold flex items-center gap-2 mb-1">
                  <span>0{index + 1} /</span>
                  <span className="text-foreground">{category.title}</span>
                </div>
                <div className="text-xs font-mono text-secondary uppercase tracking-wider">
                  {category.items.length} Technologies
                </div>
              </div>

              <div className="md:col-span-8 lg:col-span-9 flex flex-wrap gap-2 sm:gap-x-5 sm:gap-y-3 items-center">
                {category.items.map((tech) => (
                  <div
                    key={tech}
                    className="inline-flex items-center gap-2 py-1 px-2.5 sm:py-1.5 sm:px-3 rounded-md text-xs sm:text-sm font-mono text-secondary hover:text-foreground hover:bg-surface/60 border border-transparent hover:border-border/40 transition-all duration-150 group/tech cursor-default"
                  >
                    <TechIcon name={tech} className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover/tech:scale-110" />
                    <span className="whitespace-nowrap">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {isPreview && (
        <div className="mt-10 pt-4 border-t border-border/40 sm:hidden">
          <Link
            href="/stack"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-secondary hover:text-foreground transition-colors group"
          >
            <span>SEE FULL STACK</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      )}
    </section>
  );
}




