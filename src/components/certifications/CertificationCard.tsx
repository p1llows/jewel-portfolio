"use client";

import { Certification } from "@/data/certifications";
import { Card, CardIndex } from "@/components/ui/Card";

interface CertificationCardProps {
  cert: Certification;
  index: number;
  className?: string;
  image?: string;
}

export function CertificationCard({ cert, index, className = "", image }: CertificationCardProps) {
  // Derive 2-letter monogram badge if no image provided
  const getMonogram = (id: string, title: string) => {
    if (id === "itpec-ip") return "IP";
    if (id === "scrum-foundation") return "SF";
    if (id === "nlp-intro") return "NL";
    const words = title.split(" ").filter((w) => w.length > 0);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return title.slice(0, 2).toUpperCase();
  };

  const monogram = getMonogram(cert.id, cert.title);

  return (
    <Card className={`p-5 sm:p-6 flex items-start gap-4 ${className}`}>
      {/* 54x54 Square Monogram Badge on Left */}
      <div className="w-[54px] h-[54px] border border-border bg-background flex items-center justify-center font-mono text-sm font-semibold text-foreground group-hover:bg-foreground group-hover:text-background transition-colors shrink-0 rounded-none select-none">
        {image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={image} alt={cert.title} className="w-full h-full object-cover" />
        ) : (
          <span>{monogram}</span>
        )}
      </div>

      {/* Content on Right */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Header Line: Index + Year */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <CardIndex index={index} />
            <span className="text-xs font-mono text-secondary">
              {cert.year}
            </span>
          </div>

          {/* Title: text-base sm:text-lg font-medium */}
          <h3 className="text-base sm:text-lg font-medium text-foreground leading-snug mb-1">
            {cert.title}
          </h3>

          {/* ISSUER: line in mono */}
          <div className="text-xs font-mono text-secondary mb-3">
            ISSUER: <span className="text-foreground font-medium">{cert.issuer}</span>
          </div>
        </div>

        {/* Footer: VERIFY link + tags in muted */}
        <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <span className="text-foreground font-medium hover:underline cursor-pointer">
            VERIFY ↗
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-muted text-xs">
            {cert.tags.join(" / ")}
          </div>
        </div>
      </div>
    </Card>
  );
}
