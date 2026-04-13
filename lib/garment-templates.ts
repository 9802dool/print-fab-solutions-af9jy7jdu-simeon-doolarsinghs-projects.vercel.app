import type { GarmentTemplateId } from "./tee-design";

export type TemplateMeta = {
  id: GarmentTemplateId;
  label: string;
  description: string;
};

export const GARMENT_TEMPLATES: TemplateMeta[] = [
  {
    id: "basic-tee",
    label: "Basic tee",
    description: "Simple crew tee layout.",
  },
  {
    id: "soccer-kit",
    label: "Soccer jersey & shorts",
    description: "Match shirt plus shorts—classic kit block.",
  },
  {
    id: "cricket",
    label: "Cricket jersey",
    description: "Long-sleeve style cricket shirt block.",
  },
  {
    id: "polo",
    label: "Polo jersey",
    description: "Collar, placket, and short sleeves.",
  },
  {
    id: "pants",
    label: "Pants",
    description: "Track or training pants front panel.",
  },
];

/** Logo / artwork placement as fractions of canvas W×H */
export type TemplateLayout = {
  img: { maxW: number; maxH: number; cx: number; top: number };
  textY: number;
};

export function getTemplateLayout(id: GarmentTemplateId): TemplateLayout {
  switch (id) {
    case "soccer-kit":
      return {
        img: { maxW: 0.72, maxH: 0.34, cx: 0.5, top: 0.09 },
        textY: 0.66,
      };
    case "cricket":
      return {
        img: { maxW: 0.72, maxH: 0.4, cx: 0.5, top: 0.08 },
        textY: 0.74,
      };
    case "polo":
      return {
        img: { maxW: 0.7, maxH: 0.38, cx: 0.5, top: 0.11 },
        textY: 0.76,
      };
    case "pants":
      return {
        img: { maxW: 0.55, maxH: 0.35, cx: 0.5, top: 0.18 },
        textY: 0.58,
      };
    case "basic-tee":
    default:
      return {
        img: { maxW: 0.78, maxH: 0.52, cx: 0.5, top: 0.12 },
        textY: 0.78,
      };
  }
}

/**
 * Standard garment guides (stroke only) for sublimation layout reference.
 */
export function drawGarmentTemplateGuide(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  id: GarmentTemplateId,
) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = Math.max(2, w / 400);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  switch (id) {
    case "basic-tee":
      drawBasicTee(ctx, w, h);
      break;
    case "soccer-kit":
      drawSoccerJersey(ctx, w, h);
      drawSoccerShorts(ctx, w, h);
      break;
    case "cricket":
      drawCricketJersey(ctx, w, h);
      break;
    case "polo":
      drawPoloJersey(ctx, w, h);
      break;
    case "pants":
      drawPants(ctx, w, h);
      break;
    default:
      drawBasicTee(ctx, w, h);
  }
  ctx.restore();
}

function drawBasicTee(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2;
  const top = h * 0.08;
  const bw = w * 0.38;
  const bh = h * 0.42;
  ctx.beginPath();
  ctx.moveTo(cx - bw * 0.35, top + bh * 0.08);
  ctx.lineTo(cx - bw * 0.85, top + bh * 0.22);
  ctx.lineTo(cx - bw * 0.92, top + bh * 0.55);
  ctx.lineTo(cx - bw * 0.88, top + bh * 0.95);
  ctx.lineTo(cx + bw * 0.88, top + bh * 0.95);
  ctx.lineTo(cx + bw * 0.92, top + bh * 0.55);
  ctx.lineTo(cx + bw * 0.85, top + bh * 0.22);
  ctx.lineTo(cx + bw * 0.35, top + bh * 0.08);
  ctx.quadraticCurveTo(cx, top - h * 0.01, cx - bw * 0.35, top + bh * 0.08);
  ctx.stroke();
}

function drawSoccerJersey(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2;
  const top = h * 0.06;
  const bw = w * 0.36;
  const bh = h * 0.44;
  ctx.beginPath();
  ctx.moveTo(cx - bw * 0.3, top + bh * 0.06);
  ctx.lineTo(cx - bw * 0.95, top + bh * 0.2);
  ctx.lineTo(cx - w * 0.42, top + bh * 0.38);
  ctx.lineTo(cx - w * 0.4, top + bh * 0.88);
  ctx.lineTo(cx + w * 0.4, top + bh * 0.88);
  ctx.lineTo(cx + w * 0.42, top + bh * 0.38);
  ctx.lineTo(cx + bw * 0.95, top + bh * 0.2);
  ctx.lineTo(cx + bw * 0.3, top + bh * 0.06);
  ctx.quadraticCurveTo(cx, top - h * 0.008, cx - bw * 0.3, top + bh * 0.06);
  ctx.stroke();
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.arc(cx, top + bh * 0.14, w * 0.045, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawSoccerShorts(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const top = h * 0.52;
  const cx = w / 2;
  const sw = w * 0.38;
  const sh = h * 0.36;
  ctx.beginPath();
  ctx.moveTo(cx - sw, top);
  ctx.lineTo(cx - sw * 0.92, top + sh * 0.12);
  ctx.lineTo(cx - sw * 0.55, top + sh * 0.95);
  ctx.lineTo(cx - sw * 0.08, top + sh * 0.78);
  ctx.lineTo(cx + sw * 0.08, top + sh * 0.78);
  ctx.lineTo(cx + sw * 0.55, top + sh * 0.95);
  ctx.lineTo(cx + sw * 0.92, top + sh * 0.12);
  ctx.lineTo(cx + sw, top);
  ctx.closePath();
  ctx.stroke();
}

function drawCricketJersey(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2;
  const top = h * 0.06;
  const bh = h * 0.52;
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.12, top + bh * 0.05);
  ctx.lineTo(cx - w * 0.48, top + bh * 0.18);
  ctx.lineTo(cx - w * 0.52, top + bh * 0.42);
  ctx.lineTo(cx - w * 0.48, top + bh * 0.92);
  ctx.lineTo(cx + w * 0.48, top + bh * 0.92);
  ctx.lineTo(cx + w * 0.52, top + bh * 0.42);
  ctx.lineTo(cx + w * 0.48, top + bh * 0.18);
  ctx.lineTo(cx + w * 0.12, top + bh * 0.05);
  ctx.quadraticCurveTo(cx, top - h * 0.01, cx - w * 0.12, top + bh * 0.05);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.48, top + bh * 0.22);
  ctx.lineTo(cx - w * 0.62, top + bh * 0.35);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + w * 0.48, top + bh * 0.22);
  ctx.lineTo(cx + w * 0.62, top + bh * 0.35);
  ctx.stroke();
}

function drawPoloJersey(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2;
  const top = h * 0.08;
  const bw = w * 0.34;
  const bh = h * 0.46;
  ctx.beginPath();
  ctx.moveTo(cx - bw * 0.35, top + bh * 0.14);
  ctx.lineTo(cx - bw * 0.88, top + bh * 0.26);
  ctx.lineTo(cx - bw * 0.9, top + bh * 0.55);
  ctx.lineTo(cx - bw * 0.85, top + bh * 0.92);
  ctx.lineTo(cx + bw * 0.85, top + bh * 0.92);
  ctx.lineTo(cx + bw * 0.9, top + bh * 0.55);
  ctx.lineTo(cx + bw * 0.88, top + bh * 0.26);
  ctx.lineTo(cx + bw * 0.35, top + bh * 0.14);
  ctx.stroke();
  const collarW = w * 0.14;
  const collarH = h * 0.045;
  ctx.beginPath();
  ctx.moveTo(cx - collarW, top + bh * 0.06);
  ctx.lineTo(cx - collarW * 0.4, top + bh * 0.06 - collarH);
  ctx.lineTo(cx + collarW * 0.4, top + bh * 0.06 - collarH);
  ctx.lineTo(cx + collarW, top + bh * 0.06);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, top + bh * 0.06);
  ctx.lineTo(cx, top + bh * 0.28);
  ctx.stroke();
}

function drawPants(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2;
  const top = h * 0.1;
  const legW = w * 0.2;
  const totalH = h * 0.72;
  ctx.beginPath();
  ctx.moveTo(cx - legW * 1.1, top);
  ctx.lineTo(cx - legW * 1.05, top + totalH * 0.92);
  ctx.lineTo(cx - legW * 0.35, top + totalH);
  ctx.lineTo(cx - legW * 0.25, top + totalH * 0.35);
  ctx.lineTo(cx - legW * 0.05, top + totalH * 0.35);
  ctx.lineTo(cx - legW * 0.15, top + totalH);
  ctx.lineTo(cx + legW * 0.15, top + totalH);
  ctx.lineTo(cx + legW * 0.05, top + totalH * 0.35);
  ctx.lineTo(cx + legW * 0.25, top + totalH * 0.35);
  ctx.lineTo(cx + legW * 0.35, top + totalH);
  ctx.lineTo(cx + legW * 1.05, top + totalH * 0.92);
  ctx.lineTo(cx + legW * 1.1, top);
  ctx.closePath();
  ctx.stroke();
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(cx - legW * 1.05, top + totalH * 0.12);
  ctx.lineTo(cx + legW * 1.05, top + totalH * 0.12);
  ctx.stroke();
  ctx.setLineDash([]);
}
