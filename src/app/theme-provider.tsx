"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent | { x: number; y: number }, targetTheme?: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored) return stored;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

function applyThemeToDOM(newTheme: Theme) {
  const root = window.document.documentElement;
  root.setAttribute("data-theme", newTheme);
  if (newTheme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  localStorage.setItem("theme", newTheme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const toggleTheme = (
    e?: React.MouseEvent | { x: number; y: number },
    targetTheme?: Theme
  ) => {
    const nextTheme = targetTheme || (theme === "light" ? "dark" : "light");
    if (nextTheme === theme) return;

    let x = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
    let y = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

    if (e) {
      if ("clientX" in e && typeof e.clientX === "number") {
        x = e.clientX;
        y = e.clientY;
      } else if ("x" in e && typeof e.x === "number") {
        x = e.x;
        y = e.y;
      }
    }

    const doc = document as unknown as {
      startViewTransition?: (callback: () => void) => { ready: Promise<void> };
    };

    const isReduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (doc.startViewTransition && !isReduceMotion) {
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = doc.startViewTransition(() => {
        setTheme(nextTheme);
        applyThemeToDOM(nextTheme);
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          {
            clipPath: clipPath,
          },
          {
            duration: 650,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      triggerWaveFallback(x, y, nextTheme);
      setTheme(nextTheme);
      applyThemeToDOM(nextTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function triggerWaveFallback(x: number, y: number, nextTheme: Theme) {
  if (typeof document === "undefined") return;

  const ripple = document.createElement("div");
  ripple.style.position = "fixed";
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.width = "0px";
  ripple.style.height = "0px";
  ripple.style.borderRadius = "50%";
  ripple.style.pointerEvents = "none";
  ripple.style.zIndex = "99999";
  ripple.style.transform = "translate(-50%, -50%)";
  ripple.style.backgroundColor = nextTheme === "dark" ? "#111111" : "#F4F4F2";
  ripple.style.boxShadow = `0 0 50px 20px ${nextTheme === "dark" ? "#111111" : "#F4F4F2"}`;
  ripple.style.transition = "width 0.6s cubic-bezier(0.4, 0, 0.2, 1), height 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-out";

  document.body.appendChild(ripple);

  const maxDim = Math.max(window.innerWidth, window.innerHeight) * 2.5;

  requestAnimationFrame(() => {
    ripple.style.width = `${maxDim}px`;
    ripple.style.height = `${maxDim}px`;
    ripple.style.opacity = "0";
  });

  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 650);
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

