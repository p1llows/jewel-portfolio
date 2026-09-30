import Link from "next/link";
import { stackCategories } from "@/data/stack";
import { TechIcon } from "@/components/stack/TechIcon";

interface StackSectionProps {
  isPreview?: boolean;
}

export function StackSection({ isPreview = false }: StackSectionProps) {
  const displayCategories = isPreview ? stackCategories.slice(0, 3) : stackCategories;
  
  const allTechs = Array.from(new Set(stackCategories.flatMap((c) => c.items))).slice(0, 35);
  const row1Techs = allTechs.slice(0, Math.ceil(allTechs.length / 2));
  const row2Techs = allTechs.slice(Math.ceil(allTechs.length / 2));

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20">
      <div className="mb-8 sm:mb-10 pb-4 border-b border-border/60 flex items-end justify-between">
        <div>
          <div className="text-xs font-mono text-secondary tracking-widest uppercase mb-2">05 / STACK</div>
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
        <div className="py-5 sm:py-7 overflow-hidden relative flex flex-col gap-4 sm:gap-6">
          {/* Gradient edges for smooth fade */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Row 1 */}
          <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap min-w-max items-center will-change-transform">
            {[...Array(2)].map((_, i) => (
              <div key={`r1-${i}`} className="flex gap-6 sm:gap-8 pr-6 sm:pr-8 items-center shrink-0">
                {row1Techs.map((tech) => (
                  <div
                    key={`${i}-${tech}`}
                    className="inline-flex items-center gap-2.5 sm:gap-3 py-2.5 px-4 sm:py-3 sm:px-5 rounded-xl text-sm sm:text-base md:text-lg font-mono text-secondary hover:text-foreground hover:bg-surface/60 border border-transparent hover:border-border/40 transition-all duration-150 group/tech cursor-default"
                  >
                    <TechIcon
                      name={tech}
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 transition-transform group-hover/tech:scale-110"
                    />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Row 2 (Moves in opposite direction with the same speed) */}
          <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap min-w-max items-center will-change-transform" style={{ animationDirection: 'reverse' }}>
            {[...Array(2)].map((_, i) => (
              <div key={`r2-${i}`} className="flex gap-6 sm:gap-8 pr-6 sm:pr-8 items-center shrink-0">
                {row2Techs.map((tech) => (
                  <div
                    key={`${i}-${tech}`}
                    className="inline-flex items-center gap-2.5 sm:gap-3 py-2.5 px-4 sm:py-3 sm:px-5 rounded-xl text-sm sm:text-base md:text-lg font-mono text-secondary hover:text-foreground hover:bg-surface/60 border border-transparent hover:border-border/40 transition-all duration-150 group/tech cursor-default"
                  >
                    <TechIcon
                      name={tech}
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 transition-transform group-hover/tech:scale-110"
                    />
                    <span>{tech}</span>
                  </div>
                ))}
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
                <div className="text-[10px] font-mono text-muted uppercase">
                  {category.items.length} TECHNOLOGIES
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




