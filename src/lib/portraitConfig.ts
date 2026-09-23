// Binary Portrait Configuration - Centralized parameters
export const PORTRAIT_CONFIG = {
  // Particle system
  particleCount: {
    desktop: 10000,
    mobile: 4000,
  },
  fontSize: 10,

  // Image processing
  samplingResolution: 3, // Fine sampling step (3px) for sharp facial feature details
  backgroundThreshold: 220, // Luminance threshold for background removal (0-255)

  // Physics & Stability
  springStrength: 0.1,
  damping: 0.78,
  mouseRadius: 100, // Distance in canvas pixels
  mouseForce: 0.5,
  maxVelocity: 8.0, // Safety cap to prevent infinite force accumulation

  // Glyph settings
  useBinaryGlyphs: true,
} as const;

// Debug mode - set to true during development to see preprocessing steps
export const DEBUG_MODE = false;



