"use client";

import { Certification } from "@/data/certifications";
import { Card, CardIndex } from "@/components/ui/Card";

interface CertificationCardProps {
  cert: Certification;
  index: number;
  className?: string;
}

export function CertificationCard({ cert, index, className = "" }: CertificationCardProps) {
  return (
    <Card className={`p-5 sm:p-6 flex flex-col justify-between h-full ${className}`}>
      <div>
        {/* Top Bar: Index + Logo on Left, Status Badge on Right */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <CardIndex index={index} />
            {cert.logo && (
              <div className="flex items-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.logo}
                  alt={cert.title}
                  width={200}
                  height={48}
                  className="h-8 sm:h-10 md:h-12 w-auto max-w-[200px] sm:max-w-[260px] object-contain mix-blend-multiply grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            )}
          </div>

          {/* Status Badge */}
          {cert.status && (
            <div className="text-right shrink-0">
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-foreground">
                <span className="w-2 h-2 bg-foreground inline-block shrink-0 rounded-none" />
                <span>{cert.status}</span>
              </div>
              {cert.category && (
                <div className="font-mono text-[10px] sm:text-xs text-secondary tracking-widest uppercase mt-0.5">
                  {cert.category}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground leading-snug mb-1">
          {cert.title}
        </h3>

        {/* Subtitle / Issuer + Year */}
        <div className="text-xs sm:text-sm font-mono text-secondary mb-2">
          {cert.issuer} {cert.year && `• ${cert.year}`}
        </div>

        {/* Description */}
        {cert.description && (
          <p className="text-xs sm:text-sm text-secondary leading-relaxed max-w-3xl">
            {cert.description}
          </p>
        )}
      </div>

      {/* Footer / Verify Link */}
      <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-end">
        {cert.verifyUrl && cert.verifyUrl !== "#" ? (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-medium tracking-wider uppercase text-foreground hover:underline inline-flex items-center gap-1 group/link"
          >
            <span>VERIFY</span>
            <span className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
              ↗
            </span>
          </a>
        ) : (
          <span className="text-xs font-mono font-medium tracking-wider uppercase text-secondary/60 cursor-not-allowed">
            VERIFY ↗
          </span>
        )}
      </div>
    </Card>
  );
}

