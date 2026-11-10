"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the CSS-only scroll animations in globals.css.
 *   data-reveal="N"  -> fades/slides up once in view (N = stagger step, 90ms each)
 *   data-draw        -> hairline draws in from the left once in view
 * Elements are only hidden by CSS when scripting is enabled and motion is allowed,
 * so no-JS and reduced-motion visitors always see the content.
 */
export function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const step = Number(el.dataset.reveal || 0);
          if (step > 0) el.style.transitionDelay = `${Math.min(step, 8) * 90}ms`;
          el.classList.add("is-in");
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), [data-draw]:not(.is-in)")
        .forEach((el) => observer.observe(el));
    };

    scan();
    // Pick up elements that mount later (client navigations, async content)
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
