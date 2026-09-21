"use client";

import { BinaryPortrait } from "@/components/effects/BinaryPortrait";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const heroSection = heroRef.current;
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
  }, []);

  return (
    <section ref={heroRef} className="relative py-24 md:py-32">
      <div className="container mx-auto px-8">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 text-xs font-mono text-secondary">
              01 / HOME
            </div>

            <h1 className="mb-4 text-5xl md:text-7xl font-bold tracking-tight hero-title">
              HELLO, I AM
            </h1>

            <h2 className="mb-6 text-6xl md:text-8xl font-bold tracking-tighter hero-subtitle">
              JEWEL
              <br />
              RAMIREZ
            </h2>

            <p className="mb-8 text-xl md:text-2xl text-secondary max-w-2xl hero-description">
              Full-Stack Developer
            </p>

            <p className="mb-12 text-lg md:text-xl text-muted max-w-3xl leading-relaxed hero-description">
              I build modern web applications, APIs, integrations, and digital
              experiences.
            </p>

            <div className="flex flex-wrap gap-4 hero-buttons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-foreground text-background font-medium rounded"
              >
                VIEW WORK
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-border rounded hover:bg-surface"
              >
                CONTACT
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute right-20 top-1/2 -translate-y-1/2 z-0 pointer-events-none w-[60%] h-[70%] opacity-20">
        <BinaryPortrait src="/images/portrait-source.jpg" />
      </div>
    </section>
  );
}
