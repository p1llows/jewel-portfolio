import { stackCategories } from "@/data/stack";

export function StackSection() {
  return (
    <section className="px-8 py-16 md:py-24">
      <div className="mb-12">
        <div className="text-xs font-mono text-secondary mb-4">05 / STACK</div>
        <h2 className="text-3xl font-bold tracking-tight">TECH STACK</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {Object.entries(stackCategories).map(([category, technologies]) => (
          <div key={category}>
            <h3 className="mb-4 text-lg font-bold uppercase tracking-wider">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-surface px-3 py-1 text-sm text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
