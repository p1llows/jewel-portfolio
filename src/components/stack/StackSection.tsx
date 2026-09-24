import Link from "next/link";
import { stackCategories } from "@/data/stack";

interface StackSectionProps {
  isPreview?: boolean;
}

export function StackSection({ isPreview = false }: StackSectionProps) {
  const entries = Object.entries(stackCategories);
  const displayEntries = isPreview ? entries.slice(0, 2) : entries;

  return (
    <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
      <div className="mb-10 pb-4 border-b border-border/60">
        <div className="text-xs font-mono text-secondary tracking-widest uppercase mb-2">05 / STACK</div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">TECH STACK</h2>
      </div>

      <div className={`grid gap-6 ${isPreview ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-4"}`}>
        {displayEntries.map(([category, technologies]) => (
          <div
            key={category}
            className="rounded-lg border border-border/60 bg-surface/40 p-5 transition-colors hover:border-foreground/30 flex flex-col justify-between"
          >
            <div>
              <h3 className="mb-3 text-xs font-mono text-secondary uppercase tracking-wider font-semibold border-b border-border/40 pb-2">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded px-2.5 py-1 text-xs font-mono text-secondary bg-background border border-border/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isPreview && (
        <div className="mt-10 pt-4 border-t border-border/40">
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



