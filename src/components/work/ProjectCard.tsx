import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

export function ProjectCard({ project, index, className = "" }: ProjectCardProps) {
  return (
    <div className={`group rounded-lg border border-border/60 bg-surface/40 p-6 transition-all duration-200 hover:border-foreground/30 hover:bg-surface/70 flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-secondary">
              {index.toString().padStart(2, "0")}
            </span>
            {project.category === "professional" ? (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider bg-surface text-secondary border border-border/60">
                {project.company || "Professional"}
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-surface text-secondary border border-border/40">
                Personal
              </span>
            )}
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-secondary/80">
            {project.subtitle}
          </span>
        </div>

        <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-foreground transition-colors mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-secondary leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[11px] font-mono text-secondary bg-background border border-border/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/40 text-xs font-mono">
        <a
          href={`/work/${project.id}`}
          className="text-foreground font-semibold hover:text-secondary transition-colors"
        >
          CASE STUDY →
        </a>
        {project.previewUrl && (
          <a
            href={project.previewUrl}
            className="text-secondary hover:text-foreground transition-colors ml-auto"
            target="_blank"
            rel="noopener noreferrer"
          >
            PREVIEW ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className="group/link flex items-center gap-1 text-secondary hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>REPO</span>
            <span className="group-hover/link:translate-x-0.5 transition-transform">↗</span>
          </a>
        )}
      </div>
    </div>
  );
}

