"use client";

import Link from "next/link";
import { certificationsData } from "@/data/certifications";
import { CertificationCard } from "@/components/certifications/CertificationCard";
import { SectionHeader } from "@/components/motion/SectionHeader";

interface CertificationsSectionProps {
  isPreview?: boolean;
}

export function CertificationsSection({ isPreview = false }: CertificationsSectionProps) {
  const displayCerts = isPreview
    ? certificationsData.slice(0, 3)
    : certificationsData;

  return (
    <section
      className={`w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 ${
        isPreview ? "max-w-7xl" : "max-w-5xl"
      }`}
    >
      {/* Page Section Header */}
      <SectionHeader
        label="06 / CERTIFICATIONS"
        title={isPreview ? "CERTIFICATIONS HIGHLIGHT" : "CERTIFICATIONS & CREDENTIALS"}
        className="mb-6 sm:mb-8"
        strong
        aside={
          isPreview ? (
            <Link
              href="/certifications"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-secondary hover:text-foreground transition-colors group"
            >
              <span>SEE FULL CERTIFICATIONS</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          ) : undefined
        }
      />

      {/* Subtitle / Intro */}
      <p className="text-sm sm:text-base text-secondary leading-relaxed max-w-3xl mb-8">
        Foundations in IT, Agile delivery, and applied NLP, backed by verified examinations and certificates.
      </p>

      {/* Certifications Container: 3 across in 1 row on home page preview, stacked on full page */}
      <div
        data-reveal
        className={
          isPreview
            ? "grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch"
            : "flex flex-col gap-4 sm:gap-5"
        }
      >
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
