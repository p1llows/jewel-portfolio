"use client";

import Link from "next/link";
import { certificationsData } from "@/data/certifications";
import { CertificationCard } from "@/components/certifications/CertificationCard";

interface CertificationsSectionProps {
  isPreview?: boolean;
}

export function CertificationsSection({ isPreview = false }: CertificationsSectionProps) {
  const displayCerts = isPreview ? certificationsData.slice(0, 2) : certificationsData;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20">
      {/* Page Section Header */}
      <div className="mb-8 sm:mb-10 pb-4 border-b border-border flex items-end justify-between">
        <div>
          <div className="text-xs sm:text-sm font-mono font-semibold text-secondary tracking-widest uppercase mb-2">
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
      <p className="text-xs sm:text-sm text-secondary leading-relaxed max-w-2xl mb-8 font-mono">
        Professional credentials, verified examinations, and specialized training in Data Analysis, Python, SQL, AI, Prompt Engineering, and IT Resilience.
      </p>

      {/* Certifications Grid (2 across on desktop, 1 on mobile) */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 items-stretch">
        {displayCerts.map((cert, index) => (
          <CertificationCard
            key={cert.id}
            cert={cert}
            index={index + 1}
          />
        ))}
      </div>

      {isPreview && (
        <div className="mt-8 pt-4 border-t border-border sm:hidden">
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
