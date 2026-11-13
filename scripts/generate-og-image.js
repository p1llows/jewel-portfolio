// Renders src/app/opengraph-image.png (1200x630): name/title on the left, binary portrait on the right.
// Usage: node scripts/generate-og-image.js
const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

const W = 1200, H = 630;
const BG = "#111111", FG = "#F1F1ED";

(async () => {
  const src = await loadImage(path.join(process.cwd(), "public", "images", "portrait-source.jpg"));
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  // Head + upper chest, trimmed horizontally so the face gets as many glyphs as possible.
  const cropX = src.width * 0.08, cropW = src.width * 0.84;
  const cropY = src.height * 0.10, cropH = src.height * 0.64;
  const ph = 580;
  const scale = ph / cropH;
  const pw = Math.round(cropW * scale), px = W - pw - 40, py = H - ph - 25;
  const sample = createCanvas(pw, ph);
  const sctx = sample.getContext("2d");
  sctx.drawImage(src, cropX, cropY, cropW, cropH, 0, 0, pw, ph);
  const data = sctx.getImageData(0, 0, pw, ph).data;

  // Glyph grid: cells match a monospace character box (taller than wide) so nothing overlaps.
  const cw = 5, ch = 8;
  const cols = Math.floor(pw / cw), rows = Math.floor(ph / ch);
  const L = new Float32Array(cols * rows);
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      let sum = 0, n = 0;
      for (let y = r * ch; y < r * ch + ch; y += 2)
        for (let x = c * cw; x < c * cw + cw; x += 2) {
          const i = (y * pw + x) * 4;
          sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
          n++;
        }
      L[r * cols + c] = sum / n;
    }
  // Unsharp mask on the cell grid: boosts eyes, brows, nostrils, lips and the hairline.
  const blur = new Float32Array(L.length), R = 2;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      let sum = 0, n = 0;
      for (let dy = -R; dy <= R; dy++)
        for (let dx = -R; dx <= R; dx++) {
          const rr = r + dy, cc = c + dx;
          if (rr < 0 || cc < 0 || rr >= rows || cc >= cols) continue;
          sum += L[rr * cols + cc]; n++;
        }
      blur[r * cols + c] = sum / n;
    }

  // Faint underlay of the actual photo (contrast-boosted, feathered) so the face stays recognisable.
  const under = createCanvas(pw, ph);
  const uctx = under.getContext("2d");
  const ud = uctx.createImageData(pw, ph);
  for (let y = 0; y < ph; y++)
    for (let x = 0; x < pw; x++) {
      const i = (y * pw + x) * 4;
      const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      const v = lum > 238 ? 0 : Math.pow(Math.max(0, Math.min(1, (lum - 25) / 180)), 1.3) * 255;
      const sd = Math.min(1, x / (pw * 0.08), (pw - 1 - x) / (pw * 0.08));
      const bd = Math.min(1, (ph - y) / (ph * 0.12));
      const f = Math.max(0, Math.min(sd, bd));
      ud.data[i] = ud.data[i + 1] = ud.data[i + 2] = v;
      ud.data[i + 3] = lum > 238 ? 0 : 255 * f;
    }
  uctx.putImageData(ud, 0, 0);
  ctx.globalAlpha = 0.5;
  ctx.drawImage(under, px, py);
  ctx.globalAlpha = 1;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const raw = L[r * cols + c];
      if (raw > 238) continue; // white studio background
      const lum = raw + 0.8 * (raw - blur[r * cols + c]);
      const l2 = Math.max(0, Math.min(1, (lum - 25) / (205 - 25)));
      const side = Math.min(1, c / (cols * 0.08), (cols - 1 - c) / (cols * 0.08));
      const bottom = Math.min(1, (rows - r) / (rows * 0.12));
      const fade = Math.max(0.05, Math.min(side, bottom));
      if (rnd() > Math.sqrt(fade)) continue;
      const tone = Math.round(70 + Math.pow(l2, 1.25) * 185);
      const alpha = (0.3 + 0.7 * l2) * (0.4 + 0.6 * fade);
      ctx.fillStyle = `rgba(${tone},${tone},${tone},${alpha})`;
      ctx.font = `bold ${l2 > 0.55 ? 9 : 8}px Consolas, "Courier New", monospace`;
      ctx.fillText(rnd() > 0.5 ? "1" : "0", px + c * cw + cw / 2, py + r * ch + ch / 2);
    }
  }

  // Left-side text, with a soft scrim so glyphs never fight the copy.
  const scrim = ctx.createLinearGradient(0, 0, 760, 0);
  scrim.addColorStop(0, "rgba(17,17,17,1)");
  scrim.addColorStop(0.75, "rgba(17,17,17,0.9)");
  scrim.addColorStop(1, "rgba(17,17,17,0)");
  ctx.fillStyle = scrim;
  ctx.fillRect(0, 0, 760, H);

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#888888";
  ctx.font = 'bold 22px Consolas, "Courier New", monospace';
  ctx.fillText("01 / PORTFOLIO", 80, 150);

  ctx.fillStyle = FG;
  ctx.font = 'bold 96px "Segoe UI", Arial, sans-serif';
  ctx.fillText("Jewel", 76, 290);
  ctx.fillText("Ramirez", 76, 390);

  ctx.fillStyle = "#B5B5B0";
  ctx.font = '36px "Segoe UI", Arial, sans-serif';
  ctx.fillText("Full-Stack Developer", 80, 450);

  ctx.fillStyle = "#888888";
  ctx.font = '24px Consolas, "Courier New", monospace';
  ctx.fillText("jewel-portfolio.pages.dev", 80, 540);

  ctx.fillStyle = FG;
  ctx.fillRect(80, 480, 64, 3);

  const out = path.join(process.cwd(), "src", "app", "opengraph-image.png");
  fs.writeFileSync(out, canvas.toBuffer("image/png"));
  console.log("Wrote", out);
})();
