import Link from "next/link";
import { certificationsData } from "@/data/certifications";
import { Award, FileCheck2 } from "lucide-react";

interface CertificationsSectionProps {
  isPreview?: boolean;
}

export function CertificationsSection({ isPreview = false }: CertificationsSectionProps) {
  const displayCerts = isPreview ? certificationsData.slice(0, 2) : certificationsData;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20">
      {/* Page Section Header matching PRD design system */}
      <div className="mb-8 sm:mb-10 pb-4 border-b border-border/60 flex items-end justify-between">
        <div>
          <div className="text-xs font-mono text-secondary tracking-widest uppercase mb-2">
            06 / CERTIFICATIONS
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {isPreview ? "CERTIFICATIONS HIGHLIGHT" : "CERTIFICATIONS & CREDENTIALS"}
          </h2>
        </div>

        {isPreview && (
          <Link
            href="/certifications"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-secondary hover:text-foreground transition-colors group"
          >
            <span>SEE FULL CERTIFICATIONS</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>

      {/* Subtitle / Intro */}
      <p className="text-sm sm:text-base text-secondary leading-relaxed max-w-2xl mb-8 font-sans">
        Professional credentials, verified examinations, and specialized training in Data Analysis, Python, SQL, AI, Prompt Engineering, and IT Resilience.
      </p>

      {/* Certifications Grid matching ProjectCard & WorkSection style */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-2 items-stretch">
        {displayCerts.map((cert, index) => (
          <div
            key={cert.id}
            className="group rounded-lg border border-border/60 bg-surface/40 p-5 sm:p-6 transition-all duration-200 hover:border-foreground/30 hover:bg-surface/70 flex flex-col justify-between"
          >
            <div>
              {/* Card Header metadata */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-secondary">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-secondary/80">
                  {cert.year}
                </span>
              </div>

              {/* Certificate Image Placeholder Container (Monochrome PRD theme) */}
              <div className="h-44 sm:h-48 w-full rounded border border-border/50 bg-background/50 relative overflow-hidden mb-5 flex flex-col items-center justify-center p-4 transition-colors group-hover:border-border select-none">
                {/* Subtle Monochrome Tech Background Grid Lines */}
                <div className="absolute inset-0 bg-[radial-gradient(#888888_1px,transparent_1px)] [background-size:12px_12px] opacity-10 dark:opacity-20 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                  <div className="p-3 rounded-md border border-border/70 bg-surface/80 text-foreground group-hover:scale-105 transition-transform duration-200 shadow-sm">
                    <Award className="w-6 h-6 text-foreground" />
                  </div>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest mt-1">
                    CERTIFICATE PLACEHOLDER
                  </span>
                </div>
              </div>

              {/* Title & Issuer */}
              <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-foreground transition-colors mb-2">
                {cert.title}
              </h3>

              <div className="flex items-center gap-2 text-xs font-mono text-secondary mb-4">
                <FileCheck2 className="w-3.5 h-3.5 text-muted shrink-0" />
                <span>
                  ISSUER: <strong className="text-foreground font-semibold">{cert.issuer}</strong>
                </span>
              </div>
            </div>

            {/* Tag Pills matching ProjectCard style */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40">
              {cert.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[11px] font-mono text-secondary bg-background border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isPreview && (
        <div className="mt-8 pt-4 border-t border-border/40 sm:hidden">
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-secondary hover:text-foreground transition-colors group"
          >
            <span>SEE FULL CERTIFICATIONS</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      )}
    </section>
  );
}
