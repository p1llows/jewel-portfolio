"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion, useInViewOnce } from "@/lib/useInViewOnce";

const GLYPHS = "01";
const KEEP = /[\s/.,&<>-]/;

function scramble(text: string, resolved: number) {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    out += i < resolved || KEEP.test(ch) ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  }
  return out;
}

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number; // ms
  duration?: number; // ms
}

/** Decodes binary noise into `text` when scrolled into view. Server HTML contains the real text. */
export function ScrambleText({ text, className, delay = 0, duration = 700 }: ScrambleTextProps) {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>();
  const [display, setDisplay] = useState(text);
  const [armed, setArmed] = useState(false);

  // After hydration, swap to noise (off-screen elements are unseen; avoids a flash of final text)
  useEffect(() => {
    if (prefersReducedMotion()) return;
    setDisplay(scramble(text, 0));
    setArmed(true);
  }, [text]);

  useEffect(() => {
    if (!armed || !inView) return;

    let raf = 0;
    let last = 0;
    const start = performance.now() + delay;

    const tick = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - start) / duration));
      if (now - last > 45 || progress === 1) {
        last = now;
        setDisplay(progress >= 1 ? text : scramble(text, Math.floor(progress * (text.length + 2))));
      }
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [armed, inView, text, delay, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
