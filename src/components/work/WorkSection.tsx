import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/work/ProjectCard";

interface WorkSectionProps {
  isPreview?: boolean;
}

export function WorkSection({ isPreview = false }: WorkSectionProps) {
  const personalProjects = projects.filter((p) => p.category === "personal");
  const professionalProjects = projects.filter((p) => p.category === "professional");

  if (isPreview) {
    // All 3 selected projects in 1 single row across 3 equal columns
    const selectedProjects = projects.slice(0, 3);
    return (
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20">
        <div className="mb-8 sm:mb-10 pb-4 border-b border-border/60 flex items-end justify-between">
          <div>
            <div className="text-xs font-mono text-secondary tracking-widest uppercase mb-2">02 / WORK</div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              SELECTED PROJECTS
            </h2>
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-3">
          {selectedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + 1}
            />
          ))}
        </div>

        <div className="mt-10 pt-4 border-t border-border/40">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-secondary hover:text-foreground transition-colors group"
          >
            <span>SEE ALL PROJECTS ({projects.length})</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20 space-y-12 sm:space-y-16">
      <div className="pb-4 border-b border-border/60">
        <div className="text-xs font-mono text-secondary tracking-widest uppercase mb-2">02 / WORK</div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          ALL PROJECTS & WORK
        </h2>
      </div>

      {/* Section 1: Personal Projects */}
      <div>
        <div className="mb-6 pb-2 border-b border-border/40 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-mono tracking-wider text-secondary uppercase font-semibold">
            {"// PERSONAL PROJECTS"} ({personalProjects.length})
          </h3>
        </div>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {personalProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + 1}
            />
          ))}
        </div>
      </div>

      {/* Section 2: Professional Projects */}
      <div>
        <div className="mb-6 pb-2 border-b border-border/40 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-mono tracking-wider text-secondary uppercase font-semibold">
            {"// PROFESSIONAL & EXPERIENCE PROJECTS"} ({professionalProjects.length})
          </h3>
        </div>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {professionalProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


