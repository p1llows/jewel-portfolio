import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { SectionHeader } from "@/components/motion/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";

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
        <SectionHeader label="02 / WORK" title="SELECTED PROJECTS" />

        <div data-reveal className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {selectedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + 1}
            />
          ))}
        </div>

        <div className="mt-10 pt-4 border-t border-border/40">
          <ArrowLink href="/work">SEE ALL PROJECTS ({projects.length})</ArrowLink>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20 space-y-12 sm:space-y-16">
      <SectionHeader label="02 / WORK" title="ALL PROJECTS & WORK" className="" />

      {/* Section 1: Personal Projects */}
      <div>
        <div className="mb-6 pb-2 border-b border-border/40 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-mono tracking-wider text-secondary uppercase font-semibold">
            {"// PERSONAL PROJECTS"} ({personalProjects.length})
          </h3>
        </div>
        <div data-reveal className="grid gap-6 sm:gap-8 grid-cols-1">
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
        <div data-reveal className="grid gap-6 sm:gap-8 grid-cols-1">
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


