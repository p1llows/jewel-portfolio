import Link from "next/link";
import { stackCategories } from "@/data/stack";
import { TechIcon } from "@/components/stack/TechIcon";

interface StackSectionProps {
  isPreview?: boolean;
}

export function StackSection({ isPreview = false }: StackSectionProps) {
  const displayCategories = isPreview ? stackCategories.slice(0, 3) : stackCategories;

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
        <div className="py-5 sm:py-7 flex flex-wrap gap-2 sm:gap-x-4 sm:gap-y-3 items-center border-t border-border/60">
          {Array.from(new Set(stackCategories.flatMap((c) => c.items)))
            .slice(0, 35)
            .map((tech) => (
              <div
                key={tech}
                className="inline-flex items-center gap-2 py-1 px-2.5 sm:py-1.5 sm:px-3 rounded-md text-xs sm:text-sm font-mono text-secondary hover:text-foreground hover:bg-surface/60 border border-transparent hover:border-border/40 transition-all duration-150 group/tech cursor-default"
              >
                <TechIcon
                  name={tech}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover/tech:scale-110"
                />
                <span className="whitespace-nowrap">{tech}</span>
              </div>
            ))}
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




