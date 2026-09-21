export interface Particle {
  x: number;
  y: number;
  char: "0" | "1";
}

export const PORTAIT_PARTICLES: Particle[] = [
  // Placeholder - will be replaced by generated data
  // Format: { x, y, char } where x, y are normalized (0-1)
];

export const PORTRAIT_CONFIG = {
  particleSize: 8,
  particleSpacing: 4,
  density: 0.3, // 30% of pixels become particles
};
