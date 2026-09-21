import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="mb-4 text-xs font-mono text-secondary">{index.toString().padStart(2, "0")}</div>
      
      <h3 className="mb-2 text-2xl font-bold tracking-tight">{project.title}</h3>
      
      <p className="mb-4 text-sm text-secondary">{project.subtitle}</p>
      
      <p className="mb-6 text-sm text-muted max-w-md">{project.description}</p>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="text-[10px] font-mono uppercase tracking-wider text-secondary"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
        {project.previewUrl && (
          <a
            href={project.previewUrl}
            className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            PROJECT PREVIEW
          </a>
        )}
        <a
          href={project.githubUrl || "#"}
          className="group/link flex items-center gap-1 text-sm font-medium text-foreground hover:text-secondary transition-colors"
        >
          VIEW CASE STUDY
          <span className="group-hover/link:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  );
}
