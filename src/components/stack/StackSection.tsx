import Link from "next/link";
import { stackCategories } from "@/data/stack";
import { TechIcon } from "@/components/stack/TechIcon";

interface StackSectionProps {
  isPreview?: boolean;
}

export function StackSection({ isPreview = false }: StackSectionProps) {
  const displayCategories = isPreview ? stackCategories.slice(0, 3) : stackCategories;

  return (
    <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
      <div className="mb-10 pb-4 border-b border-border/60 flex items-end justify-between">
        <div>
          <div className="text-xs font-mono text-secondary tracking-widest uppercase mb-2">05 / STACK</div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">TECH STACK</h2>
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

      <div className="border-t border-border/60 divide-y divide-border/40">
        {displayCategories.map((category, index) => (
          <div
            key={category.id}
            className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start hover:bg-surface/30 transition-colors px-2 sm:px-4 rounded-lg group/row"
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

            <div className="md:col-span-8 lg:col-span-9 flex flex-wrap gap-x-5 gap-y-3 items-center">
              {category.items.map((tech) => (
                <div
                  key={tech}
                  className="inline-flex items-center gap-2.5 py-1.5 px-3 rounded-md text-xs sm:text-sm font-mono text-secondary hover:text-foreground hover:bg-surface/60 border border-transparent hover:border-border/40 transition-all duration-150 group/tech cursor-default"
                >
                  <TechIcon name={tech} className="w-4 h-4 shrink-0 transition-transform group-hover/tech:scale-110" />
                  <span className="whitespace-nowrap">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

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




