"use client";

import { useState, useEffect } from "react";
import { stackCategories } from "@/data/stack";
import { TechIcon } from "@/components/stack/TechIcon";
import { StackExplorer } from "@/components/stack/StackExplorer";
import { SectionHeader } from "@/components/motion/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";

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
    // Only the home-page preview rotates; the full page has nothing to cycle
    if (!isPreview) return;

    // Respect reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % techGroups.length);
    }, 2800); // ~2.8s per group

    return () => clearInterval(intervalId);
  }, [isPreview]);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20">
      <SectionHeader
        label="05 / STACK"
        title="TECH STACK"
        aside={
          isPreview ? (
            <ArrowLink href="/stack" className="hidden sm:inline-flex">SEE FULL STACK</ArrowLink>
          ) : undefined
        }
      />

      {isPreview ? (
        <div data-reveal className="pt-10 sm:pt-14 md:pt-16 pb-2 sm:pb-4 md:pb-6 relative flex flex-col justify-center">
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
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out
                        ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}
                      `}
                      aria-hidden={!isActive}
                    >
                      <div className="inline-flex items-center gap-3 sm:gap-4 md:gap-5 py-3 px-5 sm:py-4 sm:px-6 md:py-5 md:px-8 text-base sm:text-lg md:text-xl font-mono text-secondary hover:text-foreground transition-all duration-150 group/tech cursor-default">
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
        <StackExplorer />
      )}

      {isPreview && (
        <div className="mt-10 pt-4 border-t border-border/40 sm:hidden">
          <ArrowLink href="/stack">SEE FULL STACK</ArrowLink>
        </div>
      )}
    </section>
  );
}




