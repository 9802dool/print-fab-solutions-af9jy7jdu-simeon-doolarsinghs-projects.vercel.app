import { drawGarmentTemplateGuide, getTemplateLayout } from "@/lib/garment-templates";
import { drawKitPattern } from "@/lib/kit-patterns";
import type { TeeDesign } from "@/lib/tee-design";

export const KIT_DESIGN_WIDTH = 1024;
export const KIT_DESIGN_HEIGHT = 1280;

export type DrawKitDesignOptions = {
  /**
   * Flat “paper doll” guides for production layout. Omit on 3D preview so the mockup reads as
   * fabric, not a 2D diagram; keep for PNG export.
   */
  includeLayoutGuide?: boolean;
};

/**
 * Renders the kit artwork (pattern, optional guide, crest, text) to a 2D canvas.
 */
export function drawKitDesign(
  ctx: CanvasRenderingContext2D,
  design: TeeDesign,
  overlay: HTMLImageElement | null,
  options: DrawKitDesignOptions = {},
) {
  const W = KIT_DESIGN_WIDTH;
  const H = KIT_DESIGN_HEIGHT;
  const { includeLayoutGuide = true } = options;

  ctx.fillStyle = design.baseColor;
  ctx.fillRect(0, 0, W, H);

  drawKitPattern(ctx, W, H, design.baseColor, design.accentColor, design.patternId);

  if (includeLayoutGuide) {
    drawGarmentTemplateGuide(ctx, W, H, design.template);
  }

  const layout = getTemplateLayout(design.template);
  const maxW = W * layout.img.maxW;
  const maxH = H * layout.img.maxH;
  const cx = W * layout.img.cx;
  const top = H * layout.img.top;

  if (overlay && overlay.complete && overlay.naturalWidth) {
    let dw = overlay.naturalWidth;
    let dh = overlay.naturalHeight;
    const scale = Math.min(maxW / dw, maxH / dh, 1);
    dw *= scale;
    dh *= scale;
    const x = cx - dw / 2;
    ctx.drawImage(overlay, x, top, dw, dh);
  }

  ctx.fillStyle = design.textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `800 ${design.textSize}px system-ui, sans-serif`;
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 8;
  ctx.fillText(design.text.trim() ? design.text : " ", W / 2, H * layout.textY);
  ctx.shadowBlur = 0;
}

export function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}
