"use client";

import { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import type { CanvasTexture } from "three";
import type { GarmentTemplateId } from "@/lib/tee-design";

type Props = {
  texture: CanvasTexture;
  baseColor: string;
  template: GarmentTemplateId;
};

/** Width × height × depth (Y-up); +Z is the printed “front” facing the default camera. */
const MOCKUP_DIMS: Record<GarmentTemplateId, { w: number; h: number; d: number }> = {
  "basic-tee": { w: 1.22, h: 1.48, d: 0.32 },
  "soccer-kit": { w: 1.3, h: 1.95, d: 0.36 },
  cricket: { w: 1.44, h: 1.55, d: 0.34 },
  polo: { w: 1.24, h: 1.42, d: 0.34 },
  pants: { w: 0.9, h: 1.78, d: 0.26 },
};

/**
 * Volumetric garment mockup: box with the flat design on the +Z face only, solid fabric-like colours elsewhere.
 * Template tweaks proportions and adds simple geometry (collar, sleeves) so orbit reads as a product, not a card.
 */
export function ShirtModel({ texture, baseColor, template }: Props) {
  const { w, h, d } = MOCKUP_DIMS[template];

  useLayoutEffect(() => {
    const prev = texture.flipY;
    texture.flipY = false;
    texture.needsUpdate = true;
    return () => {
      texture.flipY = prev;
      texture.needsUpdate = true;
    };
  }, [texture]);

  const back = useMemo(
    () => new THREE.Color(baseColor).multiplyScalar(0.52),
    [baseColor],
  );
  const side = useMemo(
    () => new THREE.Color(baseColor).multiplyScalar(0.68),
    [baseColor],
  );
  const top = useMemo(
    () => new THREE.Color(baseColor).multiplyScalar(0.82),
    [baseColor],
  );
  const bottom = useMemo(
    () => new THREE.Color(baseColor).multiplyScalar(0.42),
    [baseColor],
  );

  const yOffset =
    template === "pants" ? -0.14 : template === "soccer-kit" ? 0.02 : 0;

  return (
    <group rotation={[0, 0.28, 0]} position={[0, yOffset, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial attach="material-0" color={side} roughness={0.74} metalness={0.02} />
        <meshStandardMaterial attach="material-1" color={side} roughness={0.74} metalness={0.02} />
        <meshStandardMaterial attach="material-2" color={top} roughness={0.7} metalness={0.02} />
        <meshStandardMaterial attach="material-3" color={bottom} roughness={0.78} metalness={0.02} />
        <meshStandardMaterial
          attach="material-4"
          map={texture}
          roughness={0.58}
          metalness={0.05}
        />
        <meshStandardMaterial attach="material-5" color={back} roughness={0.82} metalness={0.02} />
      </mesh>

      {template === "polo" && (
        <mesh position={[0, h / 2 + 0.042, d * 0.12]} castShadow receiveShadow>
          <boxGeometry args={[w * 0.38, 0.065, d * 0.42]} />
          <meshStandardMaterial color={top} roughness={0.72} metalness={0.02} />
        </mesh>
      )}

      {template === "cricket" && (
        <>
          <mesh position={[-(w / 2 + 0.1), 0.08, 0]} rotation={[0, 0, 0.12]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.42, d * 0.9]} />
            <meshStandardMaterial color={side} roughness={0.74} metalness={0.02} />
          </mesh>
          <mesh position={[w / 2 + 0.1, 0.08, 0]} rotation={[0, 0, -0.12]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.42, d * 0.9]} />
            <meshStandardMaterial color={side} roughness={0.74} metalness={0.02} />
          </mesh>
        </>
      )}

    </group>
  );
}
