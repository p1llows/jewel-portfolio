"use client";

import { Certification } from "@/data/certifications";
import { Card, CardIndex } from "@/components/ui/Card";
import { CardAction, CardActionBar } from "@/components/ui/CardActions";

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
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 mb-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6">
            <CardIndex index={index} />
            {cert.logo && (
              <div className="flex items-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.logo}
                  alt={cert.title}
                  width={200}
                  height={48}
                  className="h-8 sm:h-10 md:h-12 w-auto max-w-[160px] sm:max-w-[260px] object-contain mix-blend-multiply dark:mix-blend-screen dark:invert grayscale opacity-80 group-hover:opacity-100 transition-all duration-300"
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

      {/* Flush action bar along the card's bottom edge (no nested boxes) */}
      <CardActionBar>
        <CardAction
          href={cert.verifyUrl ?? "#"}
          external
          primary
          disabled={!cert.verifyUrl || cert.verifyUrl === "#"}
        >
          VERIFY
        </CardAction>
      </CardActionBar>
    </Card>
  );
}

