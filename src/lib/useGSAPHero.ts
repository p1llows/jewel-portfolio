import { useEffect } from "react";
import gsap from "gsap";

export function useGSAPHero() {
  useEffect(() => {
    const heroSection = document.querySelector("section");

    if (!heroSection) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      ".hero-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    tl.fromTo(
      ".hero-subtitle",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    tl.fromTo(
      ".hero-description",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power1.out" },
      "-=0.4"
    );

    tl.fromTo(
      ".hero-buttons",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power1.out" },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return {};
}
