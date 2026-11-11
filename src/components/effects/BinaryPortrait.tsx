"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "@/app/theme-provider";

/**
 * Binary particle portrait.
 *
 * The canvas is a fixed, full-viewport layer behind the page (portaled to <body>).
 *  - At the top of the page the particles form the portrait inside the hero's placeholder box.
 *  - As you scroll down, each particle (staggered) drifts to its own spot on the screen and
 *    settles as a faint, slowly drifting binary background behind every section.
 */

interface CanvasParticle {
  normX: number; // 0..1 position within the source image
  normY: number;
  homeX: number; // portrait position, relative to the hero container
  homeY: number;
  bgNX: number; // 0..1 background position within the viewport
  bgNY: number;
  phase: number; // drift phase
  delay: number; // 0..1 scatter stagger
  arc: number; // -1..1 swirl direction/size of the flight path
  thin: number; // 0..1 fixed random rank, used to thin the portrait on small screens
  edge: number; // 0..1, 1 = fully inside the portrait, ->0 at the feathered left/right/bottom edges
  x: number; // current viewport x
  y: number; // current viewport y
  vx: number;
  vy: number;
  lum: number;
  tone: number; // index into TONES
  k: number; // per-particle spring multiplier
  char: "0" | "1";
  size: number;
}

// Portrait tone map by luminance bucket
const TONES = [
  { rgb: [85, 85, 85], alpha: 0.85 },
  { rgb: [136, 136, 136], alpha: 0.9 },
  { rgb: [230, 230, 230], alpha: 0.95 },
  { rgb: [255, 255, 255], alpha: 0.98 },
] as const;

// Background-mode alpha per tone (dark pixels read a touch stronger)
const BG_ALPHA = [0.2, 0.15, 0.11, 0.09] as const;
// Background glyph colour = theme text colour
const THEME_RGB = { light: [23, 23, 23], dark: [241, 241, 237] } as const;

// Responsive sizing. The portrait is scaled to fit its box, so glyphs must scale with it or the same
// 9-11px characters get packed ~2x tighter on a phone (dense, blobby) than on a desktop.
const REF_SCALE = 1.4; // portrait fit-scale the glyph sizes were designed for (desktop)
const MIN_FONT_FACTOR = 0.62; // never shrink glyphs below ~62% (keeps 0/1 legible)
const MAX_FONT_FACTOR = 1.3;
// The suit runs to the left/right/bottom edges of the photo, which reads as a hard rectangle.
// Glyphs dissolve (thinned + dimmed) over this fraction of the image near those edges.
const EDGE_FEATHER_SIDE = 0.17;
const EDGE_FEATHER_BOTTOM = 0.24;
const BG_STRIDE = 3; // only every Nth particle stays visible in background mode
const SPRING = 0.11;
const DAMPING = 0.8;
const MOUSE_RADIUS = 110;

// Scatter pacing (tune these to taste)
const SCATTER_SCROLL_VH = 1.6; // viewport heights of scroll to fully scatter (higher = slower)
const SCATTER_SCROLL_VH_MOBILE = 0.9; // same, for the stacked phone layout (measured from when the portrait is mid-screen)
const STACKED_BELOW = 1024; // matches Tailwind `lg`, where the hero grid stacks
const SCATTER_EASE = 0.05; // per-frame smoothing of the scroll progress (lower = slower)
const SCATTER_LAZINESS = 0.55; // 0..1, how much slower glyphs travel while scattering

function toneFor(lum: number) {
  if (lum < 40) return 0;
  if (lum < 95) return 1;
  if (lum < 150) return 2;
  return 3;
}

// Pre-built colour ramp per theme: [tone][level] from portrait tone -> theme text colour
const LEVELS = 8;
const colorTables: Partial<Record<"light" | "dark", string[][]>> = {};
function colorTable(theme: "light" | "dark") {
  let table = colorTables[theme];
  if (!table) {
    const target = THEME_RGB[theme];
    table = TONES.map(({ rgb }) =>
      Array.from({ length: LEVELS }, (_, level) => {
        const t = level / (LEVELS - 1);
        return `rgb(${Math.round(lerp(rgb[0], target[0], t))},${Math.round(lerp(rgb[1], target[1], t))},${Math.round(
          lerp(rgb[2], target[2], t)
        )})`;
      })
    );
    colorTables[theme] = table;
  }
  return table;
}

/**
 * Scale at which the portrait is drawn: "fit" inside its box times `zoom`. Zoom may push the portrait a
 * little past its column, but is capped (width <= 112% of the box) so it can't swamp the text on narrow screens.
 */
function portraitFit(width: number, height: number, imgW: number, imgH: number, zoom: number) {
  const fit = Math.min((width - 20) / imgW, (height - 20) / imgH);
  const widthCap = (width * 1.12) / imgW;
  return Math.min(fit * zoom, Math.max(fit, widthCap));
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (v: number) => v * v * (3 - 2 * v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface BinaryPortraitProps {
  src: string;
  className?: string;
  /** Multiplies the portrait's size (1 = fit the box exactly) */
  zoom?: number;
}

export function BinaryPortrait({ src, className = "", zoom = 1 }: BinaryPortraitProps) {
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  let currentTheme: "light" | "dark" = "light";
  try {
    const context = useTheme();
    currentTheme = context.theme;
  } catch {
    // Fallback if rendered outside ThemeProvider
  }

  const themeRef = useRef<"light" | "dark">(currentTheme);
  useEffect(() => {
    themeRef.current = currentTheme;
  }, [currentTheme]);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const particlesRef = useRef<CanvasParticle[]>([]);
  const imageSizeRef = useRef({ width: 1, height: 1 });
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const mixRef = useRef(0); // 0 = portrait, 1 = full background
  const wakeRef = useRef<() => void>(() => {});
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => setMounted(true), []);

  // Sample the source image into particles
  const processImage = useCallback((img: HTMLImageElement) => {
    const processCanvas = document.createElement("canvas");
    const pctx = processCanvas.getContext("2d", { willReadFrequently: true });
    if (!pctx) return [];

    const sampleWidth = 360;
    const sampleHeight = Math.floor((img.naturalHeight / img.naturalWidth) * sampleWidth);
    processCanvas.width = sampleWidth;
    processCanvas.height = sampleHeight;

    pctx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
    const pixels = pctx.getImageData(0, 0, sampleWidth, sampleHeight).data;
    imageSizeRef.current = { width: sampleWidth, height: sampleHeight };

    const particles: CanvasParticle[] = [];
    const step = 3;
    const backgroundThreshold = 220;

    for (let y = 0; y < sampleHeight; y += step) {
      for (let x = 0; x < sampleWidth; x += step) {
        const idx = (y * sampleWidth + x) * 4;
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        const a = pixels[idx + 3];

        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const isBackground = lum >= backgroundThreshold || (r > 200 && g > 200 && b > 200) || a < 50;
        if (isBackground) continue;

        const size = lum < 50 ? 11 : lum < 125 ? 10 : 9;

        // Feather the photo's hard edges: random dithered dropout so it dissolves raggedly, not in a line
        const nx = x / sampleWidth;
        const ny = y / sampleHeight;
        const edge = Math.min(
          smooth(clamp01(Math.min(nx, 1 - nx) / EDGE_FEATHER_SIDE)),
          smooth(clamp01((1 - ny) / EDGE_FEATHER_BOTTOM))
        );
        if (Math.random() > Math.pow(edge, 0.8)) continue;

        particles.push({
          normX: x / sampleWidth,
          normY: y / sampleHeight,
          homeX: 0,
          homeY: 0,
          bgNX: Math.random(),
          bgNY: Math.random(),
          phase: Math.random() * Math.PI * 2,
          // The bottom of the portrait lets go first, so it dissolves upward like blown sand
          delay: 0.65 * (1 - y / sampleHeight) + 0.35 * Math.random(),
          arc: Math.random() * 2 - 1,
          thin: Math.random(),
          edge,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          lum,
          tone: toneFor(lum),
          k: 0.9 + Math.random() * 0.25,
          char: lum < 125 ? "1" : "0",
          size,
        });
      }
    }

    // Sort by size, then tone, so font/fill changes happen a handful of times per frame
    particles.sort((a, b) => a.size - b.size || a.tone - b.tone);

    // Visible background glyphs land on an R2 low-discrepancy sequence: evenly spread, no clumps or gaps
    for (let i = 0, k = 0; i < particles.length; i += BG_STRIDE, k++) {
      particles[i].bgNX = (0.5 + k * 0.7548776662) % 1;
      particles[i].bgNY = (0.5 + k * 0.569840291) % 1;
    }
    return particles;
  }, []);

  // Portrait layout inside the container (container-relative). Also seeds initial scattered positions.
  const updateHomeTargets = useCallback((width: number, height: number, originX: number, originY: number) => {
    const { width: imgW, height: imgH } = imageSizeRef.current;
    if (imgW === 0 || imgH === 0 || width <= 0 || height <= 0) return;

    const scale = portraitFit(width, height, imgW, imgH, zoomRef.current);
    const renderW = imgW * scale;
    const renderH = imgH * scale;
    const offsetX = (width - renderW) / 2;
    const offsetY = (height - renderH) / 2;

    for (const p of particlesRef.current) {
      p.homeX = offsetX + p.normX * renderW;
      p.homeY = offsetY + p.normY * renderH;

      if (p.x === 0 && p.y === 0) {
        // Born in place: the portrait is fully formed on load (no scatter-and-rebuild intro)
        p.x = originX + p.homeX;
        p.y = originY + p.homeY;
      }
    }
  }, []);

  // Load the image once; defer pixel processing until after first paint
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let idleHandle: number | undefined;

    const img = new Image();
    img.decoding = "async";
    img.src = src;

    const process = () => {
      if (cancelled) return;
      particlesRef.current = processImage(img);
      const rect = container.getBoundingClientRect();
      updateHomeTargets(rect.width, rect.height, rect.left, rect.top);
      setIsLoaded(true);
    };

    img.onload = () => {
      const ric = (window as unknown as {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      }).requestIdleCallback;
      idleHandle = ric ? ric(process, { timeout: 400 }) : window.setTimeout(process, 50);
    };

    img.onerror = () => {
      console.error("BinaryPortrait: Failed to load image:", src);
      setHasError(true);
    };

    return () => {
      cancelled = true;
      if (idleHandle !== undefined) {
        const cic = (window as unknown as { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback;
        if (cic) cic(idleHandle);
        clearTimeout(idleHandle);
      }
    };
  }, [src, processImage, updateHomeTargets]);

  // Render loop: sleeps whenever the portrait is fully settled at the top of the page
  useEffect(() => {
    if (!isLoaded || !mounted) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouseRadiusSq = MOUSE_RADIUS * MOUSE_RADIUS;

    let running = false;
    let lastDraw = 0;
    let lastOrigin: { x: number; y: number } | null = null;

    const render = (now: number) => {
      if (!running) return;

      // Scroll progress -> 0..1 "scatter" mix, eased toward its target for smoothness
      const { w: vw, h: vh, dpr } = sizeRef.current;
      const rect = container.getBoundingClientRect();
      let mixTarget = 0;
      if (!reduceMotion) {
        if (vw < STACKED_BELOW) {
          // Stacked (phone) layout: the portrait sits below the text, possibly far down a tall screen.
          // Keep it formed while it is on screen; scatter once its centre has scrolled to the top third.
          const start = rect.top + window.scrollY + rect.height * 0.5 - vh * 0.33;
          mixTarget = clamp01((window.scrollY - Math.max(0, start)) / (vh * SCATTER_SCROLL_VH_MOBILE));
        } else {
          mixTarget = clamp01(window.scrollY / (vh * SCATTER_SCROLL_VH));
        }
      }
      const prevMix = mixRef.current;
      let mix = prevMix + (mixTarget - prevMix) * SCATTER_EASE;
      if (Math.abs(mixTarget - mix) < 0.002) mix = mixTarget;
      mixRef.current = mix;

      // Background mode doesn't need 60fps; halve the work
      if (mix > 0.5 && now - lastDraw < 32) {
        animationRef.current = requestAnimationFrame(render);
        return;
      }
      // Frame-rate independent physics: a slow frame (page load, hot reload, 30fps background mode)
      // advances the simulation proportionally further instead of stretching the animation in real time.
      const dt = lastDraw ? Math.min(2.5, (now - lastDraw) / 16.667) : 1;
      const damp = Math.pow(DAMPING, dt);
      lastDraw = now;

      const ox = rect.left;
      const oy = rect.top;
      // The portrait lives on the page but is drawn on a fixed canvas. Carry glyphs along with the page's
      // scroll/layout movement (rigidly, so the spring doesn't have to "chase" it). Otherwise every scroll
      // step leaves the portrait trailing its box and snapping back, which looks like jumping on touch scroll.
      const shiftX = lastOrigin ? ox - lastOrigin.x : 0;
      const shiftY = lastOrigin ? oy - lastOrigin.y : 0;
      lastOrigin = { x: ox, y: oy };
      const { width: imgW, height: imgH } = imageSizeRef.current;
      const portraitScale = portraitFit(rect.width, rect.height, imgW, imgH, zoomRef.current);
      const cell = 3 * portraitScale * 1.15;

      // Glyph size follows the portrait's scale; below the legibility floor, thin the glyphs out
      // instead of letting them overlap. Every BG_STRIDE-th glyph (the background set) is never thinned.
      const rel = portraitScale / REF_SCALE;
      const fontFactor = Math.min(MAX_FONT_FACTOR, Math.max(MIN_FONT_FACTOR, rel));
      const density = rel >= MIN_FONT_FACTOR ? 1 : Math.max(1 / BG_STRIDE, (rel / MIN_FONT_FACTOR) ** 2);
      const showFrac = clamp01((density - 1 / BG_STRIDE) * (BG_STRIDE / (BG_STRIDE - 1)));
      const fonts: Record<number, string> = {
        9: `bold ${(9 * fontFactor).toFixed(1)}px monospace`,
        10: `bold ${(10 * fontFactor).toFixed(1)}px monospace`,
        11: `bold ${(11 * fontFactor).toFixed(1)}px monospace`,
      };

      const spring = SPRING;

      const mouse = mouseRef.current;
      const useMouse = !reduceMotion && mouse.active;

      const table = colorTable(themeRef.current);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const particles = particlesRef.current;
      let lastFont = "";
      let lastColor = -1;
      let moving = mix > 0.002 || mix !== mixTarget; // background drift keeps the loop alive

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const keep = i % BG_STRIDE === 0;
        // Hidden in background mode: freeze (cheap) until we scroll back up
        if (!keep && mix > 0.98) continue;

        // Staggered scatter progress for this particle
        const m = smooth(clamp01(mix * 2 - p.delay));
        if (shiftX !== 0 || shiftY !== 0) {
          // Glyphs still at home ride with the page; scattered ones are pinned to the viewport
          p.x += shiftX * (1 - m);
          p.y += shiftY * (1 - m);
        }
        const hx = ox + p.homeX;
        const hy = oy + p.homeY;
        let tx = hx;
        let ty = hy;
        if (m > 0) {
          const bx = p.bgNX * vw + Math.sin(now * 0.0004 + p.phase) * 10;
          const by = p.bgNY * vh + Math.cos(now * 0.00033 + p.phase * 1.3) * 10;
          // Fly along an arc (perpendicular offset peaks mid-flight) so the scatter swirls
          const dx = bx - hx;
          const dy = by - hy;
          const swirl = Math.sin(Math.PI * m) * p.arc * 0.28;
          tx = hx + dx * m - dy * swirl;
          ty = hy + dy * m + dx * swirl;
        }

        if (reduceMotion) {
          p.x = tx;
          p.y = ty;
          p.vx = 0;
          p.vy = 0;
        } else {
          let repelX = 0;
          let repelY = 0;
          if (useMouse) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < mouseRadiusSq && distSq > 0.001) {
              const dist = Math.sqrt(distSq);
              const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
              const push = force * force * 35;
              repelX = (dx / dist) * push;
              repelY = (dy / dist) * push;
            }
          }

          const kk = spring * p.k * (1 - SCATTER_LAZINESS * m) * dt;
          p.vx = (p.vx + (tx + repelX - p.x) * kk) * damp;
          p.vy = (p.vy + (ty + repelY - p.y) * kk) * damp;
          p.x += p.vx * dt;
          p.y += p.vy * dt;

          if (isNaN(p.x) || isNaN(p.y)) {
            p.x = tx;
            p.y = ty;
            p.vx = 0;
            p.vy = 0;
          }
        }

        const ox2 = p.x - tx;
        const oy2 = p.y - ty;
        const offSq = ox2 * ox2 + oy2 * oy2;
        // Close enough and slow enough: snap home and stop simulating this glyph. Without this,
        // the spring only creeps toward its target and keeps the whole loop "moving" for seconds.
        if (offSq < 0.25 && p.vx * p.vx + p.vy * p.vy < 0.01) {
          p.x = tx;
          p.y = ty;
          p.vx = 0;
          p.vy = 0;
        } else {
          moving = true;
        }

        // Skip drawing particles that are off-screen (e.g. the portrait scrolled out of view)
        if (p.x < -20 || p.x > vw + 20 || p.y < -20 || p.y > vh + 20) continue;

        if (!keep && p.thin >= showFrac) continue; // thinned out on small screens

        const edgeBase = 0.3 + 0.7 * p.edge;
        const edgeMul = edgeBase + (1 - edgeBase) * m;
        const fade = keep ? 1 : 1 - m;

        // Dark backing cell (portrait only): fades with distance from home and as this glyph departs
        if (m < 0.98 && offSq < 576) {
          const f = 1 - Math.sqrt(offSq) / 24;
          const alpha = 0.92 * f * f * (1 - m) * fade * edgeMul;
          if (alpha > 0.015) {
            ctx.fillStyle = "#111111";
            ctx.globalAlpha = alpha;
            ctx.fillRect(p.x - cell / 2, p.y - cell / 2, cell, cell);
            lastColor = -1;
          }
        }

        // Each glyph fades and changes colour with ITS OWN flight progress, dimming mid-flight
        // so scattering glyphs don't clutter the hero text.
        const dip = 1 - 0.55 * Math.sin(Math.PI * m);
        const glyphAlpha = lerp(TONES[p.tone].alpha, BG_ALPHA[p.tone], m) * fade * dip * edgeMul;
        if (glyphAlpha < 0.01) continue;

        const level = Math.round(m * (LEVELS - 1));
        const colorKey = p.tone * LEVELS + level;
        if (colorKey !== lastColor) {
          ctx.fillStyle = table[p.tone][level];
          lastColor = colorKey;
        }
        ctx.globalAlpha = glyphAlpha;

        const fontStr = fonts[p.size];
        if (fontStr !== lastFont) {
          ctx.font = fontStr;
          lastFont = fontStr;
        }
        ctx.fillText(p.char, p.x, p.y);
      }

      ctx.globalAlpha = 1;

      if (moving) {
        animationRef.current = requestAnimationFrame(render);
      } else {
        running = false; // portrait fully settled at the top: stop until the next scroll/pointer event
      }
    };

    const wake = () => {
      if (running) return;
      running = true;
      animationRef.current = requestAnimationFrame(render);
    };
    wakeRef.current = wake;

    // Canvas covers the viewport
    const applyViewport = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Mobile browsers fire `resize` as the address bar collapses/expands during scroll (height-only,
      // ~50-100px). Reallocating the canvas then clears it and rescales every background glyph mid-scroll,
      // which reads as a flicker/jump. Keep the larger height instead of following those changes.
      const prev = sizeRef.current;
      if (prev.w === w && prev.h > 0 && Math.abs(h - prev.h) < 160) {
        if (h <= prev.h) return;
      }
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      wake();
    };

    const applyContainer = () => {
      const rect = container.getBoundingClientRect();
      updateHomeTargets(rect.width, rect.height, rect.left, rect.top);
      wake();
    };

    // Pointer: window-level so the repel effect also works over the scattered background
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
      wake();
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
      wake();
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      const rect = container.getBoundingClientRect();
      const inside = t.clientX >= rect.left && t.clientX <= rect.right && t.clientY >= rect.top && t.clientY <= rect.bottom;
      // Only react to touches on the portrait itself so normal scrolling isn't disturbed
      if (inside && mixRef.current < 0.3) {
        mouseRef.current = { x: t.clientX, y: t.clientY, active: true };
        wake();
      }
    };
    const onTouchEnd = () => {
      mouseRef.current.active = false;
      wake();
    };

    applyViewport();
    window.addEventListener("resize", applyViewport);
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    const resizeObserver = new ResizeObserver(applyContainer);
    resizeObserver.observe(container);

    wake();

    return () => {
      running = false;
      wakeRef.current = () => {};
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
      window.removeEventListener("resize", applyViewport);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [isLoaded, mounted, updateHomeTargets]);

  return (
    <>
      {/* Layout placeholder for the portrait; the canvas itself lives in a fixed layer behind the page */}
      <div
        ref={containerRef}
        className={`relative w-full h-full min-h-[320px] sm:min-h-[450px] select-none bg-transparent ${className}`}
      >
        {hasError && (
          <div className="flex items-center justify-center w-full h-full text-sm font-mono text-muted">
            Failed to load portrait image
          </div>
        )}
      </div>

      {mounted &&
        createPortal(
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`fixed inset-0 -z-10 pointer-events-none transition-opacity duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />,
          document.body
        )}
    </>
  );
}
