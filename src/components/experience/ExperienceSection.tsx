"use client";

import Link from "next/link";
import { experience } from "@/data/experience";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

interface ExperienceSectionProps {
  isPreview?: boolean;
}

export function ExperienceSection({ isPreview = false }: ExperienceSectionProps) {
  const latestJob = experience[0];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20">
      {/* Header */}
      <div className="mb-8 sm:mb-10 pb-4 border-b border-border/60">
        <div className="text-xs sm:text-sm font-mono font-semibold text-secondary tracking-widest uppercase mb-2">
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
            <div className="text-xs sm:text-sm font-mono text-secondary tracking-wider uppercase">
              {latestJob.period}
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {latestJob.role}
            </h3>
            <div className="text-base sm:text-lg font-mono text-secondary font-medium">
              {latestJob.company}
            </div>
            {latestJob.description && (
              <p className="text-sm sm:text-base md:text-lg text-secondary leading-relaxed max-w-lg">
                {latestJob.description}
              </p>
            )}

            <div className="pt-2 sm:pt-4">
              <Link
                href="/experience"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest uppercase text-secondary hover:text-foreground transition-colors group"
              >
                <span>SEE FULL EXPERIENCE</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <Card className="lg:col-span-7 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Header Strip */}
              <div className="bg-background border-b border-border px-4 py-3 text-xs font-mono font-medium text-foreground tracking-wider uppercase">
                KEY RESPONSIBILITIES & DELIVERABLES
              </div>

              {/* 5 Structured Rows */}
              <div className="divide-y divide-border">
                {[
                  {
                    lead: "Ticket comments and timeline:",
                    detail: "threaded comments, internal notes, public replies, and permissions on Resolve.",
                  },
                  {
                    lead: "REST API and docs:",
                    detail: "ticket creation endpoints and API documentation.",
                  },
                  {
                    lead: "Telegram integration:",
                    detail: "ticket creation, comments, and external users from Telegram into Resolve.",
                  },
                  {
                    lead: "Attachments:",
                    detail: "pasted images, multi-file upload, and storage integration.",
                  },
                  {
                    lead: "Production testing:",
                    detail: "verified features live and reported workflow improvements.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[auto_1fr] gap-4 p-4 hover:bg-background transition-colors group/row"
                  >
                    <span className="font-mono text-xs text-muted group-hover/row:text-foreground font-medium">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-sm sm:text-base font-medium text-foreground mb-0.5">
                        {item.lead}
                      </div>
                      <div className="text-sm text-secondary leading-relaxed">
                        {item.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack Line */}
            {latestJob.technologies && (
              <div className="p-4 border-t border-border flex flex-wrap items-center gap-1.5 font-mono text-xs text-secondary bg-surface">
                {latestJob.technologies.join(" / ")}
              </div>
            )}
          </Card>
        </div>
      ) : (
        /* Dedicated Page Timeline View (/experience) */
        <div className="relative max-w-5xl mx-auto mt-4 sm:mt-10">
          {/* Central Line - Left on mobile, Center on desktop */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12">
            {experience.map((job, index) => {
              const isEven = index % 2 === 0;

              const CardContent = () => (
                <Card className="p-5 sm:p-6">
                  {/* Date Badge */}
                  <div className="text-xs font-mono text-secondary mb-2 tracking-wider uppercase">
                    {job.period}
                  </div>

                  {/* Role Header */}
                  <h3 className="text-lg sm:text-xl font-medium tracking-tight text-foreground">
                    {job.role}
                  </h3>

                  {/* Company Subtitle */}
                  <div className="text-sm font-medium text-secondary mt-1 mb-3">
                    {job.company}
                  </div>

                  {/* Sub-divider */}
                  <div className="w-full border-b border-border mb-4" />

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 text-xs sm:text-sm text-secondary leading-relaxed">
                    {job.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-foreground shrink-0 mt-2 rounded-none" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Line */}
                  {job.technologies && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-5 pt-3 border-t border-border text-xs font-mono text-secondary">
                      {job.technologies.join(" / ")}
                    </div>
                  )}
                </Card>
              );

              return (
                <div key={job.id} className="relative flex flex-col md:flex-row justify-between items-center w-full">
                  
                  {/* Node marker */}
                  <div className="absolute left-[15px] md:left-1/2 top-8 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="w-3.5 h-3.5 rounded-none border-2 border-foreground bg-background flex items-center justify-center"
                    >
                      {job.isCurrent && <div className="w-1.5 h-1.5 rounded-none bg-foreground" />}
                    </motion.div>
                  </div>

                  {/* Left side on Desktop */}
                  <div className="hidden md:block w-[47%]">
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <CardContent />
                      </motion.div>
                    )}
                  </div>

                  {/* Right side on Desktop */}
                  <div className="hidden md:block w-[47%]">
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <CardContent />
                      </motion.div>
                    )}
                  </div>

                  {/* Mobile version (Always on right side of left-aligned line) */}
                  <div className="md:hidden w-full pl-10 pr-2">
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <CardContent />
                    </motion.div>
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




