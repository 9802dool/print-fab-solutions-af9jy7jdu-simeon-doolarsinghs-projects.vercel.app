/**
 * Base “kit” graphics (stripes, sash, hoops) — conceptually similar to jersey configurator
 * preset designs, without copying any third-party artwork.
 */

export type KitPatternId =
  | "solid"
  | "vertical-stripes"
  | "center-stripe"
  | "hoops"
  | "sash"
  | "side-panels"
  | "chevron"
  | "fade";

export type KitPatternMeta = {
  id: KitPatternId;
  label: string;
  description: string;
};

export const KIT_PATTERNS: KitPatternMeta[] = [
  { id: "solid", label: "Solid", description: "Single field colour." },
  { id: "vertical-stripes", label: "Vertical stripes", description: "Classic pinstripes." },
  { id: "center-stripe", label: "Centre stripe", description: "Single vertical band." },
  { id: "hoops", label: "Hoops", description: "Horizontal bands." },
  { id: "sash", label: "Sash", description: "Diagonal chest band." },
  { id: "side-panels", label: "Side panels", description: "Contrasting side blocks." },
  { id: "chevron", label: "Chevron", description: "Chevron chest graphic." },
  { id: "fade", label: "Gradient fade", description: "Soft vertical fade." },
];

function parseHex(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const v = parseInt(n, 16);
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
}

function rgba(hex: string, a: number) {
  const { r, g, b } = parseHex(hex);
  return `rgba(${r},${g},${b},${a})`;
}

export function drawKitPattern(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  baseColor: string,
  accentColor: string,
  id: KitPatternId,
) {
  ctx.save();
  switch (id) {
    case "solid":
      break;
    case "vertical-stripes": {
      const n = 10;
      const sw = w / n;
      for (let i = 0; i < n; i++) {
        ctx.fillStyle = i % 2 === 0 ? baseColor : accentColor;
        ctx.fillRect(i * sw, 0, sw + 0.5, h);
      }
      break;
    }
    case "center-stripe": {
      const cw = w * 0.18;
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = accentColor;
      ctx.fillRect(w / 2 - cw / 2, 0, cw, h);
      break;
    }
    case "hoops": {
      const bands = 5;
      const bh = h / bands;
      for (let i = 0; i < bands; i++) {
        ctx.fillStyle = i % 2 === 0 ? baseColor : accentColor;
        ctx.fillRect(0, i * bh, w, bh + 0.5);
      }
      break;
    }
    case "sash": {
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(-w * 0.1, h * 0.15);
      ctx.lineTo(w * 0.55, -h * 0.05);
      ctx.lineTo(w * 0.75, h * 0.45);
      ctx.lineTo(w * 0.12, h * 0.62);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "side-panels": {
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = accentColor;
      ctx.fillRect(0, 0, w * 0.22, h);
      ctx.fillRect(w * 0.78, 0, w * 0.22, h);
      break;
    }
    case "chevron": {
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(w / 2, h * 0.12);
      ctx.lineTo(w * 0.88, h * 0.42);
      ctx.lineTo(w / 2, h * 0.52);
      ctx.lineTo(w * 0.12, h * 0.42);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "fade": {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, baseColor);
      g.addColorStop(1, rgba(accentColor, 1));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      break;
    }
    default:
      break;
  }
  ctx.restore();
}
