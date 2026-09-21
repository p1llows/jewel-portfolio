"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { PORTRAIT_CONFIG, DEBUG_MODE } from "@/lib/portraitConfig";

interface Particle {
  x: number;
  y: number;
  z: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  vx: number;
  vy: number;
  char: "0" | "1";
  size: number;
}

interface BinaryPortraitProps {
  src: string;
  particleCount?: number;
  particleSize?: number;
}

export function BinaryPortrait({
  src,
  particleCount = 8000,
  particleSize = 12,
}: BinaryPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [hasError, setHasError] = useState(false);
  
  // Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const materialRef = useRef<THREE.PointsMaterial | null>(null);
  
  // Physics state
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const particlesRef = useRef<Particle[]>([]);
  
  // Debug canvas refs
  const debugCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate binary portrait data
  const generatePortraitData = useCallback((img: HTMLImageElement): Particle[] => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return [];

    // Resize to manageable resolution for processing
    const maxDim = 300;
    const ratio = Math.min(maxDim / img.naturalWidth, maxDim / img.naturalHeight, 1);
    const width = Math.floor(img.naturalWidth * ratio);
    const height = Math.floor(img.naturalHeight * ratio);
    
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    
    const particles: Particle[] = [];
    
    // Pre-compute luminance and create density map
    const luminanceMap: number[][] = new Array(height);
    const densityMap: number[][] = new Array(height);
    
    for (let y = 0; y < height; y++) {
      luminanceMap[y] = new Array(width);
      densityMap[y] = new Array(width);
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        
        // Luminance with weights
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        luminanceMap[y][x] = lum;
        
        // Contrast enhancement around faces/features (approximate)
        // Higher density for mid-range luminance (skin tones, details)
        // Lower density for pure black/white
        let density = 1.0;
        if (lum > 180) {
          // Bright areas - likely background or highlights
          density = lum > 220 ? 0.2 : 0.5;
        } else if (lum < 50) {
          // Very dark - high density for details
          density = 1.2;
        } else {
          // Mid-range - good detail
          density = 1.0;
        }
        
        // Contrast boost around edges (simplified gradient detection)
        if (x < width - 1 && luminanceMap[y][x + 1] !== undefined) {
          const dx = Math.abs(lum - luminanceMap[y][x + 1]);
          if (dx > 40) {
            density *= 1.5; // Boost density at horizontal edges
          }
        }
        
        if (y < height - 1 && luminanceMap[y + 1]) {
          const dy = Math.abs(lum - luminanceMap[y + 1][x]);
          if (dy > 40) {
            density *= 1.5; // Boost density at vertical edges
          }
        }
        
        densityMap[y][x] = density;
      }
    }

    // Generate particles with adaptive density
    const step = Math.floor(Math.sqrt((width * height) / particleCount));
    const backgroundThreshold = 190;
    
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const lum = luminanceMap[y][x];
        const density = densityMap[y][x];
        
        // Skip background (white) - but keep bright subject areas
        if (lum > backgroundThreshold) {
          // For now, only skip pure white background
          // Keep bright areas that are likely part of the subject
          // Check if this is surrounded by dark pixels (true background)
          let isSurroundedByDark = true;
          for (let dy = -step; dy <= step; dy += step) {
            for (let dx = -step; dx <= step; dx += step) {
              if (dy === 0 && dx === 0) continue;
              const ny = y + dy;
              const nx = x + dx;
              if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
                if (luminanceMap[ny][nx] > backgroundThreshold - 30) {
                  isSurroundedByDark = false;
                  break;
                }
              }
            }
            if (!isSurroundedByDark) break;
          }
          
          if (isSurroundedByDark) continue;
        }
        
        // Skip very dark areas that are likely noise
        if (lum < 30 && density < 0.5) continue;
        
        // Random sampling based on density
        if (Math.random() > density) continue;
        
        // Position in normalized coordinates (-1 to 1)
        const px = ((x / width) * 2 - 1) * 0.85;
        const py = -((y / height) * 2 - 1) * 0.85;
        const pz = (Math.random() - 0.5) * 0.5;
        
        // Determine binary character based on luminance (darker = 1, lighter = 0)
        const char: "0" | "1" = lum < 128 ? "1" : "0";
        
        particles.push({
          x: px,
          y: py,
          z: pz,
          targetX: px,
          targetY: py,
          targetZ: pz,
          vx: 0,
          vy: 0,
          char,
          size: particleSize * density,
        });
      }
    }
    
    return particles;
  }, [particleCount, particleSize]);

  // Initialize Three.js
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      console.error("BinaryPortrait: Container ref is null");
      return;
    }

    console.log("BinaryPortrait: Container dimensions:", container.clientWidth, "x", container.clientHeight);

    if (container.clientWidth === 0 || container.clientHeight === 0) {
      console.error("BinaryPortrait: Container has zero dimensions");
      setHasError(true);
      return;
    }

    // Check if WebGL is supported
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        console.warn("BinaryPortrait: WebGL not supported");
        setHasError(true);
        return;
      }
    } catch (err) {
      console.warn("BinaryPortrait: WebGL check failed:", err);
      setHasError(true);
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 3;
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        preserveDrawingBuffer: true
      });
    } catch (err) {
      console.error("Failed to create WebGL renderer:", err);
      setHasError(true);
      return;
    }
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      console.log("BinaryPortrait: Image loaded successfully");
      console.log("BinaryPortrait: Image URL:", src);
      console.log("BinaryPortrait: Image dimensions:", img.naturalWidth, "x", img.naturalHeight);
      
      const particles = generatePortraitData(img);
      particlesRef.current = particles;
      console.log("BinaryPortrait: Generated", particles.length, "particles");

      // Create texture atlas for 0 and 1
      const fontCanvas = document.createElement("canvas");
      fontCanvas.width = 256;
      fontCanvas.height = 128;
      const fctx = fontCanvas.getContext("2d");
      if (fctx) {
        fctx.fillStyle = "#F1F1ED";
        fctx.font = "bold 100px monospace";
        fctx.textAlign = "center";
        fctx.textBaseline = "middle";
        fctx.fillText("0", 64, 64);
        fctx.fillText("1", 192, 64);
      }
      const texture = new THREE.CanvasTexture(fontCanvas);

      // Create positions array
      const positions: number[] = [];
      const chars: number[] = [];
      const sizes: number[] = [];

      for (const p of particles) {
        positions.push(p.x, p.y, p.z);
        chars.push(p.char === "1" ? 1 : 0);
        sizes.push(p.size);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geometry.setAttribute("aChar", new THREE.Float32BufferAttribute(chars, 1));
      geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
      geometryRef.current = geometry;

      const material = new THREE.PointsMaterial({
        size: 12,
        map: texture,
        vertexColors: false,
        sizeAttenuation: true,
        alphaTest: 0.3,
        transparent: true,
        depthWrite: false,
      });
      materialRef.current = material;

      const points = new THREE.Points(geometry, material);
      scene.add(points);
      pointsRef.current = points;

      // Debug canvas
      if (DEBUG_MODE) {
        const debugCanvas = document.createElement("canvas");
        debugCanvas.width = 300;
        debugCanvas.height = 300;
        debugCanvas.style.position = "absolute";
        debugCanvas.style.top = "10px";
        debugCanvas.style.left = "10px";
        debugCanvas.style.border = "1px solid #fff";
        debugCanvas.style.background = "#000";
        container.appendChild(debugCanvas);
        debugCanvasRef.current = debugCanvas;

        const dctx = debugCanvas.getContext("2d");
        if (dctx) {
          dctx.drawImage(img, 0, 0, 300, 300);
          dctx.fillStyle = "#fff";
          dctx.font = "14px monospace";
          dctx.fillText(`Particles: ${particles.length}`, 10, 280);
        }
      }

      // Mouse interaction handlers
      const handleMouseMove = (event: MouseEvent) => {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        mouseRef.current = { x, y, active: true };
      };

      const handleMouseLeave = () => {
        mouseRef.current.active = false;
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      // Animation loop with physics
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);

        const particles = particlesRef.current;
        const positions = geometryRef.current?.attributes.position.array as Float32Array;
        const mouse = mouseRef.current;
        const { springStrength, damping, mouseRadius, mouseForce } = PORTRAIT_CONFIG;

        for (let i = 0; i < particles.length; i++) {
          // Get current position
          const cx = positions[i * 3];
          const cy = positions[i * 3 + 1];
          const cz = positions[i * 3 + 2];

          // Mouse repulsion
          if (mouse.active) {
            const dx = cx - mouse.x * 0.9;
            const dy = cy - mouse.y * 0.9;
            const dz = cz - 0;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < mouseRadius) {
              const force = (mouseRadius - dist) / mouseRadius;
              const pushX = dx * force * mouseForce * 0.5;
              const pushY = dy * force * mouseForce * 0.5;
              const pushZ = dz * force * mouseForce * 0.5;
              positions[i * 3] = cx + pushX;
              positions[i * 3 + 1] = cy + pushY;
              positions[i * 3 + 2] = cz + pushZ;
            }
          }

          // Spring physics to return to target
          const targetX = particles[i].targetX;
          const targetY = particles[i].targetY;

          const ax = (targetX - cx) * springStrength;
          const ay = (targetY - cy) * springStrength;

          particles[i].vx += ax;
          particles[i].vy += ay;
          particles[i].vx *= damping;
          particles[i].vy *= damping;

          positions[i * 3] = cx + particles[i].vx;
          positions[i * 3 + 1] = cy + particles[i].vy;
        }

        if (geometryRef.current && geometryRef.current.attributes.position) {
          geometryRef.current.attributes.position.needsUpdate = true;
        }

        if (rendererRef.current) {
          rendererRef.current.render(scene, camera);
        }
      };

      animate();

      // Resize handler
      const handleResize = () => {
        if (containerRef.current && rendererRef.current && cameraRef.current) {
          cameraRef.current.aspect =
            containerRef.current.clientWidth / containerRef.current.clientHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(
            containerRef.current.clientWidth,
            containerRef.current.clientHeight
          );
        }
      };

      window.addEventListener("resize", handleResize);

      // Reduced motion support
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        console.log("BinaryPortrait: Reduced motion mode enabled");
        // In reduced motion mode, we could disable physics or make them very subtle
      }

      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        window.removeEventListener("resize", handleResize);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        
        if (containerRef.current && rendererRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        
        geometryRef.current?.dispose();
        materialRef.current?.dispose();
        texture.dispose();
      };
    };

    img.onerror = () => {
      console.error("Failed to load portrait image:", src);
      setHasError(true);
    };
  }, [src, generatePortraitData]);

  return (
    <div ref={containerRef} className="w-full h-full bg-black">
      {hasError && (
        <div className="flex items-center justify-center w-full h-full text-red-500 bg-black">
          Failed to load portrait image
        </div>
      )}
      {/* Debug: Show the source image directly */}
      {!hasError && (
        <img
          src={src}
          alt="Debug portrait"
          className="w-full h-full object-cover opacity-50"
          onError={(e) => {
            console.error("Debug: Image failed to load:", src, e);
          }}
        />
      )}
    </div>
  );
}
