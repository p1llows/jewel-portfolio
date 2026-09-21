import fs from "fs";
import path from "path";
import { createCanvas, loadImage } from "canvas";

const INPUT_PATH = path.join(process.cwd(), "public", "images", "portrait-source.jpg");
const OUTPUT_PATH = path.join(process.cwd(), "public", "images", "portrait-data.json");

interface Particle {
  x: number;
  y: number;
  isParticle: boolean;
  char: "0" | "1";
}

async function generatePortraitData() {
  const img = await loadImage(INPUT_PATH);
  
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");
  
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }
  
  ctx.drawImage(img, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const particles: Particle[] = [];
  
  // Sampling rate - lower = more particles, higher = fewer
  const sampleRate = 4;
  
  for (let y = 0; y < canvas.height; y += sampleRate) {
    for (let x = 0; x < canvas.width; x += sampleRate) {
      const index = (y * canvas.width + x) * 4;
      const r = imageData.data[index];
      const g = imageData.data[index + 1];
      const b = imageData.data[index + 2];
      
      // Calculate luminance
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // Threshold for binary classification
      // Adjust this to control particle density
      const threshold = 128;
      const isParticle = luminance < threshold;
      
      particles.push({
        x: x / canvas.width,
        y: y / canvas.height,
        isParticle,
        char: isParticle ? "1" : "0",
      });
    }
  }
  
  const output = {
    width: canvas.width / sampleRate,
    height: canvas.height / sampleRate,
    particles,
  };
  
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output));
  
  console.log(`Generated ${output.particles.length} particles`);
  console.log(`Output: ${OUTPUT_PATH}`);
}

generatePortraitData().catch((err) => {
  console.error("Error generating portrait data:", err);
  process.exit(1);
});
