"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Callback-ref based "has this element ever entered the viewport" hook.
 * Unlike a ref + effect, it works for elements that mount later (e.g. after async data loads).
 */
export function useInViewOnce<T extends Element>(rootMargin = "0px 0px -10% 0px") {
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (!node) return;

      if (typeof IntersectionObserver === "undefined") {
        setInView(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        },
        { rootMargin }
      );
      observer.observe(node);
      observerRef.current = observer;
    },
    [rootMargin]
  );

  return [ref, inView] as const;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
