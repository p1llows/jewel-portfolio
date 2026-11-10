"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { prefersReducedMotion } from "@/lib/useInViewOnce";

const COLS = 10;
const ROWS = 7;

// Module scope survives route changes, but resets on a full page load.
// The first (hard) load never plays the wipe, so it can't delay LCP or mismatch hydration.
let hasNavigated = false;

// Deterministic pseudo-random so cells dissolve unevenly but identically every time
const jitter = (i: number) => ((i * 9301 + 49297) % 233280) / 233280;

/** Pixel dissolve that reveals each newly navigated page, matching the pixel-grid aesthetic. */
export function PageTransition() {
  const [play, setPlay] = useState(() => hasNavigated && !prefersReducedMotion());

  useEffect(() => {
    hasNavigated = true;
    if (!play) return;
    const t = setTimeout(() => setPlay(false), 1000);
    return () => clearTimeout(t);
  }, [play]);

  if (!play) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 right-0 left-0 md:left-64 z-[80] grid"
      style={{
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      }}
    >
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        return (
          <motion.span
            key={i}
            className="bg-foreground"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.22, delay: (col + row) * 0.03 + jitter(i) * 0.08, ease: "linear" }}
          />
        );
      })}
    </div>
  );
}
