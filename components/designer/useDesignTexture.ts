"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";
import { drawKitDesign, KIT_DESIGN_HEIGHT, KIT_DESIGN_WIDTH } from "@/lib/render-kit-design";
import type { TeeDesign } from "@/lib/tee-design";

export function useDesignTexture(design: TeeDesign) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let cancelled = false;
    const canvas = document.createElement("canvas");
    canvas.width = KIT_DESIGN_WIDTH;
    canvas.height = KIT_DESIGN_HEIGHT;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const apply = (img: HTMLImageElement | null) => {
      if (cancelled) return;
      drawKitDesign(ctx, design, img, { includeLayoutGuide: false });
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
  }, [design]);

  return texture;
}
