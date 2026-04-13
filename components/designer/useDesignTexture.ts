"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";
import type { TeeDesign } from "@/lib/tee-design";

const W = 1024;
const H = 1280;

function drawCanvas(ctx: CanvasRenderingContext2D, design: TeeDesign, overlay: HTMLImageElement | null) {
  ctx.fillStyle = design.baseColor;
  ctx.fillRect(0, 0, W, H);

  if (overlay && overlay.complete && overlay.naturalWidth) {
    const maxW = W * 0.78;
    const maxH = H * 0.52;
    let dw = overlay.naturalWidth;
    let dh = overlay.naturalHeight;
    const scale = Math.min(maxW / dw, maxH / dh, 1);
    dw *= scale;
    dh *= scale;
    const x = (W - dw) / 2;
    const y = H * 0.12;
    ctx.drawImage(overlay, x, y, dw, dh);
  }

  ctx.fillStyle = design.textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `800 ${design.textSize}px system-ui, sans-serif`;
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 8;
  ctx.fillText(design.text.trim() ? design.text : " ", W / 2, H * 0.78);
  ctx.shadowBlur = 0;
}

export function useDesignTexture(design: TeeDesign) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let cancelled = false;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const apply = (img: HTMLImageElement | null) => {
      if (cancelled) return;
      drawCanvas(ctx, design, img);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.generateMipmaps = true;
      setTexture((prev) => {
        prev?.dispose();
        return tex;
      });
    };

    if (design.imageSrc) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => apply(img);
      img.onerror = () => apply(null);
      img.src = design.imageSrc;
    } else {
      apply(null);
    }

    return () => {
      cancelled = true;
      setTexture((prev) => {
        prev?.dispose();
        return null;
      });
    };
  }, [
    design.baseColor,
    design.text,
    design.textColor,
    design.textSize,
    design.imageSrc,
  ]);

  return texture;
}
