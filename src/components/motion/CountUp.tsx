"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useInViewOnce } from "@/lib/useInViewOnce";

interface CountUpProps {
  value: number;
  duration?: number;
}

/** Counts from the last shown value to `value` (ease-out) once the number is on screen. */
export function CountUp({ value, duration = 1000 }: CountUpProps) {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>("0px");
  const [shown, setShown] = useState(0);
  const shownRef = useRef(0);

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion()) {
      shownRef.current = value;
      setShown(value);
      return;
    }

    const from = shownRef.current;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = Math.round(from + (value - from) * eased);
      shownRef.current = next;
      setShown(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <span ref={ref}>{shown}</span>;
}
