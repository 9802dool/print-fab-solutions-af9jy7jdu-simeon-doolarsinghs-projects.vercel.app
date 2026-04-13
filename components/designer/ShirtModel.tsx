"use client";

import { Decal, RoundedBox } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import type { CanvasTexture } from "three";
import type { GarmentTemplateId } from "@/lib/tee-design";

type Props = {
  texture: CanvasTexture;
  baseColor: string;
  template: GarmentTemplateId;
};

/** Matches `useDesignTexture` canvas aspect so the decal projector matches the artwork. */
const TEX_W = 1024;
const TEX_H = 1280;
const TEX_ASPECT = TEX_W / TEX_H;

/**
 * Width × height × depth (Y-up, extrusion along Z). Rounded silhouette + front decal reads like
 * commercial apparel configurators (studio mockup, print projected onto fabric) without using
 * third-party proprietary meshes.
 */
const MOCKUP_DIMS: Record<GarmentTemplateId, { w: number; h: number; d: number }> = {
  "basic-tee": { w: 1.22, h: 1.48, d: 0.32 },
  "soccer-kit": { w: 1.3, h: 1.95, d: 0.36 },
  cricket: { w: 1.44, h: 1.55, d: 0.34 },
  polo: { w: 1.24, h: 1.42, d: 0.34 },
  pants: { w: 0.9, h: 1.78, d: 0.26 },
};

export function ShirtModel({ texture, baseColor, template }: Props) {
  const { w, h, d } = MOCKUP_DIMS[template];
  const radius = useMemo(
    () => Math.min(0.08, Math.max(0.028, Math.min(w, h) * 0.038)),
    [w, h],
  );

  /** Decal box height on the torso; width follows texture aspect to avoid stretching the PNG. */
  const decalScale = useMemo(() => {
    const decH = h * 0.94;
    const decW = decH * TEX_ASPECT;
    return new THREE.Vector3(decW, decH, Math.max(0.22, d * 0.95));
  }, [h, d]);

  const fabric = useMemo(() => new THREE.Color(baseColor), [baseColor]);
  const side = useMemo(() => new THREE.Color(baseColor).multiplyScalar(0.72), [baseColor]);

  const yOffset =
    template === "pants" ? -0.14 : template === "soccer-kit" ? 0.02 : 0;

  /** Slightly inside the +Z cap so DecalGeometry clips cleanly on the curved front. */
  const decalPosition: [number, number, number] = [0, 0, d * 0.48];

  return (
    <group rotation={[0, 0.28, 0]} position={[0, yOffset, 0]}>
      <RoundedBox
        args={[w, h, d]}
        radius={radius}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={fabric}
          roughness={0.91}
          metalness={0}
          clearcoat={0.14}
          clearcoatRoughness={0.55}
        />
        <Decal
          position={decalPosition}
          rotation={[0, 0, 0]}
          scale={decalScale}
          debug={false}
        >
          <meshStandardMaterial
            map={texture}
            roughness={0.5}
            metalness={0.04}
            depthTest={false}
            polygonOffset
            polygonOffsetFactor={-10}
            toneMapped
            transparent={false}
          />
        </Decal>
      </RoundedBox>

      {template === "polo" && (
        <mesh position={[0, h / 2 + 0.042, d * 0.12]} castShadow receiveShadow>
          <boxGeometry args={[w * 0.38, 0.065, d * 0.42]} />
          <meshStandardMaterial color={fabric} roughness={0.78} metalness={0.02} />
        </mesh>
      )}

      {template === "cricket" && (
        <>
          <mesh position={[-(w / 2 + 0.1), 0.08, 0]} rotation={[0, 0, 0.12]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.42, d * 0.9]} />
            <meshStandardMaterial color={side} roughness={0.76} metalness={0.02} />
          </mesh>
          <mesh position={[w / 2 + 0.1, 0.08, 0]} rotation={[0, 0, -0.12]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.42, d * 0.9]} />
            <meshStandardMaterial color={side} roughness={0.76} metalness={0.02} />
          </mesh>
        </>
      )}
    </group>
  );
}
