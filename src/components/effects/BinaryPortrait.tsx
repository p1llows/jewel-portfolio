"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "@/app/theme-provider";

interface CanvasParticle {
  normX: number; // 0..1 normalized position relative to image
  normY: number; // 0..1 normalized position relative to image
  x: number; // current canvas x
  y: number; // current canvas y
  targetX: number; // calculated target canvas x
  targetY: number; // calculated target canvas y
  vx: number;
  vy: number;
  lum: number; // original 0..255 pixel luminance
  r: number;
  g: number;
  b: number;
  char: "0" | "1";
  size: number;
}

interface BinaryPortraitProps {
  src: string;
  className?: string;
}

export function BinaryPortrait({ src, className = "" }: BinaryPortraitProps) {
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
  const isRunningRef = useRef<boolean>(false);

  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const particlesRef = useRef<CanvasParticle[]>([]);
  const silhouetteCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageSizeRef = useRef({ width: 1, height: 1 });

  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  // Pre-process image with high resolution sampling & subject silhouette backdrop
  const processImage = useCallback((img: HTMLImageElement) => {
    const processCanvas = document.createElement("canvas");
    const pctx = processCanvas.getContext("2d");
    if (!pctx) return [];

    // High resolution grid sampling (360px width) for fine facial detail
    const sampleWidth = 360;
    const sampleHeight = Math.floor((img.naturalHeight / img.naturalWidth) * sampleWidth);
    processCanvas.width = sampleWidth;
    processCanvas.height = sampleHeight;

    pctx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
    const imageData = pctx.getImageData(0, 0, sampleWidth, sampleHeight);
    const pixels = imageData.data;

    imageSizeRef.current = { width: sampleWidth, height: sampleHeight };

    // Create subject-only dark silhouette mask (clipped strictly to head & body)
    const silCanvas = document.createElement("canvas");
    silCanvas.width = sampleWidth;
    silCanvas.height = sampleHeight;
    const sctx = silCanvas.getContext("2d");
    const silImageData = sctx?.createImageData(sampleWidth, sampleHeight);
    const silPixels = silImageData?.data;

    const particles: CanvasParticle[] = [];
    const step = 3; // 3px sampling grid for crisp detail
    const backgroundThreshold = 220;

    for (let y = 0; y < sampleHeight; y++) {
      for (let x = 0; x < sampleWidth; x++) {
        const idx = (y * sampleWidth + x) * 4;
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        const a = pixels[idx + 3];

        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const isBackground = lum >= backgroundThreshold || (r > 200 && g > 200 && b > 200) || a < 50;

        // Build subject silhouette mask (fills whitespace gaps only inside subject body & head)
        if (silPixels) {
          if (isBackground) {
            silPixels[idx + 3] = 0; // 100% transparent outside subject
          } else {
            silPixels[idx] = 17; // #111111 dark backdrop tone inside subject
            silPixels[idx + 1] = 17;
            silPixels[idx + 2] = 17;
            silPixels[idx + 3] = 235; // Solid dark subject silhouette mask
          }
        }

        // Generate binary particles on step grid
        if (!isBackground && y % step === 0 && x % step === 0) {
          const normX = x / sampleWidth;
          const normY = y / sampleHeight;

          const char: "0" | "1" = lum < 125 ? "1" : "0";

          let size = 9.5;
          if (lum < 50) {
            size = 11;
          } else if (lum < 125) {
            size = 10;
          } else {
            size = 9.0;
          }

          particles.push({
            normX,
            normY,
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            vx: 0,
            vy: 0,
            lum,
            r,
            g,
            b,
            char,
            size,
          });
        }
      }
    }

    if (sctx && silImageData) {
      sctx.putImageData(silImageData, 0, 0);
      silhouetteCanvasRef.current = silCanvas;
    }

    // Sort particles by size so font changes only happen 3 times per frame instead of 10,000 times!
    particles.sort((a, b) => a.size - b.size);

    return particles;
  }, []);

  // Update particle target coordinates when container size changes
  const updateParticleTargets = useCallback((width: number, height: number) => {
    const { width: imgW, height: imgH } = imageSizeRef.current;
    if (imgW === 0 || imgH === 0) return;

    const padding = 10;
    const availableWidth = width - padding * 2;
    const availableHeight = height - padding * 2;

    const scale = Math.min(availableWidth / imgW, availableHeight / imgH);
    const renderW = imgW * scale;
    const renderH = imgH * scale;

    const offsetX = (width - renderW) / 2;
    const offsetY = (height - renderH) / 2;

    particlesRef.current.forEach((p) => {
      const tx = offsetX + p.normX * renderW;
      const ty = offsetY + p.normY * renderH;

      p.targetX = tx;
      p.targetY = ty;

      if (p.x === 0 && p.y === 0) {
        p.x = tx + (Math.random() - 0.5) * 10;
        p.y = ty + (Math.random() - 0.5) * 10;
      }
    });
  }, []);

  // Load Image Once
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const particles = processImage(img);
      particlesRef.current = particles;
      setIsLoaded(true);

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      updateParticleTargets(rect.width, rect.height);
    };

    img.onerror = () => {
      console.error("BinaryPortrait: Failed to load image:", src);
      setHasError(true);
    };

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [src, processImage, updateParticleTargets]);

  // Main animation & physics loop - Bounded, crash-proof physics
  useEffect(() => {
    if (!isLoaded) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isRunningRef.current = true;
    const mouseRadius = 110;
    const mouseRadiusSq = mouseRadius * mouseRadius;
    const springStrength = 0.11;
    const damping = 0.80;

    let lastW = 0;
    let lastH = 0;

    const render = () => {
      if (!isRunningRef.current) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.floor(rect.width * dpr);
      const targetH = Math.floor(rect.height * dpr);

      // Reallocate canvas buffer ONLY when container integer size changes
      if (canvas.width !== targetW || canvas.height !== targetH) {
        if (targetW > 0 && targetH > 0) {
          canvas.width = targetW;
          canvas.height = targetH;
          lastW = rect.width;
          lastH = rect.height;
          updateParticleTargets(rect.width, rect.height);
        }
      } else if (lastW !== rect.width || lastH !== rect.height) {
        lastW = rect.width;
        lastH = rect.height;
        updateParticleTargets(rect.width, rect.height);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      const { width: imgW, height: imgH } = imageSizeRef.current;
      const padding = 10;
      const availableWidth = rect.width - padding * 2;
      const availableHeight = rect.height - padding * 2;
      const scale = Math.min(availableWidth / imgW, availableHeight / imgH);
      const renderW = imgW * scale;
      const renderH = imgH * scale;

      // Pre-calculate per-particle backing cell dimensions (step = 3px)
      const cellW = (3 / imgW) * renderW * 1.15;
      const cellH = (3 / imgH) * renderH * 1.15;

      // Render Binary Characters ('0' and '1') over the canvas
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let lastFont = "";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Calculate smooth target mouse repulsion offset
        let repelX = 0;
        let repelY = 0;

        if (mouse.active && !isNaN(mouse.x) && !isNaN(mouse.y)) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRadiusSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const force = (mouseRadius - dist) / mouseRadius;
            const push = force * force * 35;
            repelX = (dx / dist) * push;
            repelY = (dy / dist) * push;
          }
        }

        // Bounded target position (original target + mouse repulsion offset)
        const desiredX = p.targetX + repelX;
        const desiredY = p.targetY + repelY;

        // Spring update towards desired position
        p.vx = (p.vx + (desiredX - p.x) * springStrength) * damping;
        p.vy = (p.vy + (desiredY - p.y) * springStrength) * damping;

        p.x += p.vx;
        p.y += p.vy;

        // Coordinate sanity check
        if (isNaN(p.x) || isNaN(p.y)) {
          p.x = p.targetX;
          p.y = p.targetY;
          p.vx = 0;
          p.vy = 0;
        }

        // Smooth quadratic fade for backing shape
        const dx = p.x - p.targetX;
        const dy = p.y - p.targetY;
        const distSq = dx * dx + dy * dy;

        if (distSq < 576) {
          const distRatio = Math.sqrt(distSq) / 24;
          const fade = (1 - distRatio) * (1 - distRatio);
          const alpha = 0.92 * fade;

          if (alpha > 0.015) {
            ctx.fillStyle = "#111111";
            ctx.globalAlpha = alpha;
            ctx.fillRect(p.x - cellW / 2, p.y - cellH / 2, cellW, cellH);
          }
        }

        // High-Definition Binary Particle Tone Mapping
        let fillColor: string;
        let fillAlpha: number;

        if (p.lum < 40) {
          fillColor = "#555555";
          fillAlpha = 0.85;
        } else if (p.lum < 95) {
          fillColor = "#888888";
          fillAlpha = 0.90;
        } else if (p.lum < 150) {
          fillColor = "#E6E6E6";
          fillAlpha = 0.95;
        } else {
          fillColor = "#FFFFFF";
          fillAlpha = 0.98;
        }

        // Cache canvas font setter (only set when font size changes)
        const fontStr = `bold ${p.size}px monospace`;
        if (lastFont !== fontStr) {
          ctx.font = fontStr;
          lastFont = fontStr;
        }

        // Render particle glyph
        ctx.fillStyle = fillColor;
        ctx.globalAlpha = fillAlpha;
        ctx.fillText(p.char, p.x, p.y);
      }

      ctx.restore();

      if (isRunningRef.current) {
        animationRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      isRunningRef.current = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isLoaded, updateParticleTargets]);

  // Mouse / Touch event handlers - Safe, fast, 100% crash-proof
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const native = e.nativeEvent;
    if (typeof native.offsetX === "number" && typeof native.offsetY === "number") {
      mouseRef.current = {
        x: native.offsetX,
        y: native.offsetY,
        active: true,
      };
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0 || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
      active: true,
    };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      className={`relative w-full h-full min-h-[450px] overflow-hidden select-none cursor-pointer bg-transparent ${className}`}
    >
      {hasError && (
        <div className="flex items-center justify-center w-full h-full text-sm font-mono text-muted">
          Failed to load portrait image
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
