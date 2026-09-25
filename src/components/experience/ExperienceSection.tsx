import Link from "next/link";
import { experience } from "@/data/experience";

interface ExperienceSectionProps {
  isPreview?: boolean;
}

export function ExperienceSection({ isPreview = false }: ExperienceSectionProps) {
  const latestJob = experience[0];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20">
      {/* Header */}
      <div className="mb-8 sm:mb-10 pb-4 border-b border-border/60">
        <div className="text-xs font-mono text-secondary tracking-widest uppercase mb-2">
          03 / EXPERIENCE
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {isPreview ? "EXPERIENCE HIGHLIGHT" : "EXPERIENCE & HISTORY"}
        </h2>
      </div>

      {isPreview ? (
        /* Homepage Preview Mode (Full-width 2-column layout) */
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <div className="text-xs font-mono text-secondary tracking-wider uppercase">
              {latestJob.period}
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {latestJob.company}
            </h3>
            <div className="text-sm sm:text-base font-mono text-secondary font-semibold">
              {latestJob.role}
            </div>
            {latestJob.description && (
              <p className="text-sm text-secondary/80 leading-relaxed max-w-md">
                {latestJob.description}
              </p>
            )}

            <div className="pt-2 sm:pt-4">
              <Link
                href="/experience"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-secondary hover:text-foreground transition-colors group"
              >
                <span>SEE FULL EXPERIENCE</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-lg border border-border/60 bg-surface/40 p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="text-xs font-mono text-secondary tracking-wider uppercase border-b border-border/40 pb-3">
              KEY RESPONSIBILITIES & DELIVERABLES
            </div>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-secondary leading-relaxed">
              {latestJob.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 shrink-0 mt-2" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {latestJob.technologies && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 border-t border-border/40">
                {latestJob.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded text-[11px] sm:text-xs font-mono text-secondary bg-background border border-border/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Dedicated Page Timeline View (/experience) */
        <div className="relative max-w-5xl mx-auto mt-4 sm:mt-10">
          {/* Central Line - Left on mobile, Center on desktop */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-border/70 md:-translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12">
            {experience.map((job, index) => {
              const isEven = index % 2 === 0;

              const CardContent = () => (
                <div className="relative group">
                  {/* Date Badge */}
                  <div className="text-xs font-mono text-secondary mb-2 tracking-wider uppercase">
                    {job.period}
                  </div>

                  {/* Role Header */}
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                    {job.role}
                  </h3>

                  {/* Company Subtitle */}
                  <div className="text-sm font-semibold text-secondary mt-1 mb-3">
                    {job.company}
                  </div>

                  {/* Sub-divider */}
                  <div className="w-full border-b border-border/40 mb-4" />

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 text-sm text-secondary leading-relaxed">
                    {job.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 shrink-0 mt-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Badges */}
                  {job.technologies && (
                    <div className="flex flex-wrap gap-2 mt-5 pt-1">
                      {job.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono text-secondary bg-background border border-border/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );

              return (
                <div key={job.id} className="relative flex flex-col md:flex-row justify-between items-center w-full">
                  
                  {/* Node marker */}
                  <div className="absolute left-[15px] md:left-1/2 top-8 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full border-2 border-foreground bg-background z-10 flex items-center justify-center">
                    {job.isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-foreground" />}
                  </div>

                  {/* Left side on Desktop */}
                  <div className="hidden md:block w-[47%]">
                    {isEven && <CardContent />}
                  </div>

                  {/* Right side on Desktop */}
                  <div className="hidden md:block w-[47%]">
                    {!isEven && <CardContent />}
                  </div>

                  {/* Mobile version (Always on right side of left-aligned line) */}
                  <div className="md:hidden w-full pl-10 pr-2">
                    <CardContent />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}




