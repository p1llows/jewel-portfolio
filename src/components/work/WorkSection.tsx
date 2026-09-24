import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/work/ProjectCard";

interface WorkSectionProps {
  isPreview?: boolean;
}

export function WorkSection({ isPreview = false }: WorkSectionProps) {
  const displayProjects = isPreview ? projects.slice(0, 2) : projects;

  return (
    <section className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-20">
      <div className="mb-10 pb-4 border-b border-border/60">
        <div className="text-xs font-mono text-secondary tracking-widest uppercase mb-2">02 / WORK</div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {isPreview ? "SELECTED PROJECTS" : "ALL PROJECTS"}
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {displayProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index + 1}
          />
        ))}
      </div>

      {isPreview && (
        <div className="mt-10 pt-4 border-t border-border/40">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-secondary hover:text-foreground transition-colors group"
          >
            <span>SEE FULL WORK</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      )}
    </section>
  );
}


