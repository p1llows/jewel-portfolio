import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/work/ProjectCard";

export function WorkSection() {
  return (
    <section className="px-8 py-16 md:py-24">
      <div className="mb-12">
        <div className="text-xs font-mono text-secondary mb-4">02 / WORK</div>
        <h2 className="text-3xl font-bold tracking-tight">SELECTED PROJECTS</h2>
      </div>

      <div className="grid gap-16 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index + 1}
          />
        ))}
      </div>

      <div className="mt-16">
        <a
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-foreground transition-colors"
        >
          VIEW ALL PROJECTS
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
