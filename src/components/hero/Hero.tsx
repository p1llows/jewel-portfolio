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
    <section ref={heroRef} className="relative py-12 sm:py-16 md:py-24 lg:py-28 min-h-[85vh] flex items-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 text-xs font-mono text-secondary tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-foreground" />
                01 / HOME
              </div>

              <h1 className="mb-2 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-muted hero-title">
                HELLO, I AM
              </h1>

              <h2 className="mb-6 text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-foreground hero-subtitle">
                JEWEL
                <br />
                RAMIREZ
              </h2>

              <p className="mb-6 text-xl md:text-2xl font-mono text-secondary max-w-2xl hero-description">
                &lt;Full-Stack Developer /&gt;
              </p>

              <p className="mb-10 text-base md:text-lg text-secondary max-w-2xl leading-relaxed hero-description">
                I build high-performance web applications, resilient backend APIs, seamless integrations, and modern interactive digital experiences.
              </p>

              <div className="flex flex-wrap gap-4 hero-buttons">
                <motion.a
                  href="/work"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-3.5 bg-foreground text-background font-semibold rounded shadow transition-all"
                >
                  VIEW WORK
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-3.5 border border-border rounded font-medium hover:bg-surface transition-all text-foreground"
                >
                  CONTACT ME
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Binary Particle Portrait */}
          <div className="lg:col-span-5 relative z-20 flex justify-center lg:justify-end mt-4 lg:-mt-10">
            <div className="relative w-full max-w-[340px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[700px] h-[360px] sm:h-[500px] md:h-[600px] lg:h-[720px] xl:h-[760px]">
              <BinaryPortrait src="/images/portrait-source.jpg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
