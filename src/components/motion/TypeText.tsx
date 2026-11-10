"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/useInViewOnce";

interface TypeTextProps {
  text: string;
  className?: string;
  delay?: number; // ms before typing starts
  speed?: number; // ms per character
}

/** Types `text` out with a blinking caret. Full text is reserved in layout so nothing shifts. */
export function TypeText({ text, className, delay = 900, speed = 55 }: TypeTextProps) {
  const [count, setCount] = useState(text.length);
  const [showCaret, setShowCaret] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    setCount(0);
    setShowCaret(true);

    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    let hideCaret: ReturnType<typeof setTimeout> | undefined;

    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          clearInterval(interval);
          hideCaret = setTimeout(() => setShowCaret(false), 1600);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
      if (hideCaret) clearTimeout(hideCaret);
    };
  }, [text, delay, speed]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {showCaret && (
          <span className="relative inline-block w-0 h-[1em] align-text-bottom">
            <span className="absolute left-0 top-0 h-full w-[0.1em] min-w-[2px] bg-foreground animate-caret" />
          </span>
        )}
        <span className="opacity-0">{text.slice(count)}</span>
      </span>
    </span>
  );
}
