// Binary Portrait Configuration - Centralized parameters
export const PORTRAIT_CONFIG = {
  // Particle system
  particleCount: {
    desktop: 8000,
    mobile: 3000,
  },
  particleSize: 12,
  
  // Image processing
  samplingResolution: 6, // Pixels between samples
  backgroundThreshold: 190, // Brightness threshold for background
  backgroundTolerance: 30, // Tolerance for bright areas that might be subject
  
  // Physics
  springStrength: 0.05,
  damping: 0.85,
  mouseRadius: 1.5,
  mouseForce: 0.5,
  
  // Glyph settings
  useBinaryGlyphs: true,
  glyphScale: 1,
} as const;

// Debug mode - set to true during development to see preprocessing steps
export const DEBUG_MODE = false;
