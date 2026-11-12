"use client";

import { Project } from "@/data/projects";
import { Card, CardIndex } from "@/components/ui/Card";
import { TechIcon } from "@/components/stack/TechIcon";
import { CardAction, CardActionBar } from "@/components/ui/CardActions";

interface FeaturedProjectCardProps {
  project: Project;
  index: number;
}

function TechRow({ technologies }: { technologies: string[] }) {
  return (
    <div className="mt-auto pt-3 border-t border-dashed border-border flex flex-wrap items-center gap-2.5">
      {technologies.map((tech) => (
        <div key={tech} title={tech} role="img" aria-label={tech} className="text-secondary cursor-default flex items-center justify-center">
          <TechIcon name={tech} className="w-4 h-4" />
        </div>
      ))}
    </div>
  );
}

function Actions({ project }: { project: Project }) {
  return (
    <CardActionBar bleed={false}>
      <CardAction href={`/work/${project.id}`} primary ariaLabel={`Case study: ${project.title}`}>
        CASE STUDY
      </CardAction>
      {project.previewUrl && <CardAction href={project.previewUrl} external>PREVIEW</CardAction>}
      {project.githubUrl && <CardAction href={project.githubUrl} external>REPO</CardAction>}
    </CardActionBar>
  );
}

export function FeaturedProjectCard({ project, index }: FeaturedProjectCardProps) {
  const layout = project.featured?.layout ?? "compact";
  const highlights = project.featured?.highlights ?? [];

  // Technical interface: full width, spec sheet of modules beside the description
  if (layout === "technical") {
    return (
      <Card className="p-0 flex flex-col lg:col-span-12">
        <div className="grid flex-1 md:grid-cols-[1.15fr_1fr]">
          <div className="p-5 sm:p-8 flex flex-col">
            <div className="flex items-center justify-between gap-2 mb-6">
              <CardIndex index={index} />
              <span className="text-xs font-mono text-secondary tracking-wider">PERSONAL</span>
            </div>
            <div className="text-xs font-mono text-secondary mb-2">{project.subtitle}</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">{project.title}</h3>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed mb-6 max-w-xl">{project.description}</p>
            <TechRow technologies={project.technologies} />
          </div>
          <div className="border-t md:border-t-0 md:border-l border-border p-5 sm:p-8 bg-background/40">
            <div className="text-xs font-mono text-secondary tracking-wider mb-3">{"// MODULES"}</div>
            <ol>
              {highlights.map((item, i) => (
                <li key={item} className="flex gap-4 border-b border-dashed border-border py-2.5 font-mono text-xs sm:text-sm text-foreground">
                  <span className="text-secondary">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <Actions project={project} />
      </Card>
    );
  }

  // Editorial case study: oversized title, ruled highlights
  if (layout === "editorial") {
    return (
      <Card className="p-0 flex flex-col lg:col-span-7">
        <div className="p-5 sm:p-8 flex flex-col flex-1">
          <div className="flex items-center justify-between gap-2 mb-5">
            <CardIndex index={index} />
            <span className="text-xs font-mono text-secondary tracking-wider">CASE STUDY</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-foreground tracking-tighter leading-none mb-2">{project.title}</h3>
          <div className="text-xs font-mono text-secondary mb-4">{project.subtitle}</div>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed mb-5 max-w-prose">{project.description}</p>
          <ul className="mb-5 border-t border-border">
            {highlights.map((item) => (
              <li key={item} className="border-b border-border last:border-b-0 py-2 text-xs sm:text-sm font-medium text-foreground tracking-tight">
                {item}
              </li>
            ))}
          </ul>
          <TechRow technologies={project.technologies} />
        </div>
        <Actions project={project} />
      </Card>
    );
  }

  // Compact: narrower column beside the editorial card, stretched to the same height
  return (
    <Card className="p-0 flex flex-col lg:col-span-5">
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-4">
          <CardIndex index={index} />
          <span className="text-xs font-mono text-secondary tracking-wider">PERSONAL</span>
        </div>
        <h3 className="text-lg sm:text-xl font-medium text-foreground tracking-tight mb-1">{project.title}</h3>
        <div className="text-xs font-mono text-secondary mb-4">{project.subtitle}</div>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed mb-6">{project.description}</p>
        <TechRow technologies={project.technologies} />
      </div>
      <Actions project={project} />
    </Card>
  );
}
