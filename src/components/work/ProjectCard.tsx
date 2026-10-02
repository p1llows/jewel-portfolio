"use client";

import Link from "next/link";
import { Project } from "@/data/projects";
import { Card, CardIndex } from "@/components/ui/Card";
import { TechIcon } from "@/components/stack/TechIcon";

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

export function ProjectCard({ project, index, className = "" }: ProjectCardProps) {
  const categoryLabel = project.category === "professional" 
    ? (project.company ? project.company.toUpperCase() : "PROFESSIONAL")
    : "PERSONAL";

  return (
    <Card className={`p-5 sm:p-6 flex flex-col justify-between h-full ${className}`}>
      <div className="flex flex-col flex-1">
        {/* Header Row: Index (left), Tag as plain mono text in secondary (right) */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <CardIndex index={index} />
          <span className="text-xs font-mono text-secondary tracking-wider">
            {categoryLabel}
          </span>
        </div>

        {/* Eyebrow: Short subtitle in mono secondary */}
        <div className="text-xs font-mono text-secondary mb-2 tracking-normal">
          {project.subtitle}
        </div>

        {/* Title: 18px-20px font-medium */}
        <h3 className="text-lg sm:text-xl font-medium text-foreground tracking-tight mb-2">
          {project.title}
        </h3>

        {/* Description: text-xs sm:text-sm leading-relaxed */}
        <p className="text-xs sm:text-sm text-secondary leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tech Icons Row: Tech icons with dashed top border */}
        <div className="mt-auto pt-3 pb-3 border-t border-dashed border-border flex flex-wrap items-center gap-2.5">
          {project.technologies.map((tech) => (
            <div
              key={tech}
              title={tech}
              aria-label={tech}
              className="text-secondary hover:text-foreground transition-colors flex items-center justify-center"
            >
              <TechIcon name={tech} className="w-4 h-4" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer: solid top border, CASE STUDY on left (letter spacing widens on hover), PREVIEW/REPO in muted on right */}
      <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
        <Link
          href={`/work/${project.id}`}
          className="text-foreground font-medium tracking-normal group-hover:tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
        >
          CASE STUDY →
        </Link>
        <div className="flex items-center gap-3 text-muted">
          {project.previewUrl && (
            <a
              href={project.previewUrl}
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              PREVIEW ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              REPO ↗
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
