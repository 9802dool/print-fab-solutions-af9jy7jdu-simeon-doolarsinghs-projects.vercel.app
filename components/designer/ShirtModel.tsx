"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { CanvasTexture } from "three";

type Props = {
  texture: CanvasTexture;
  baseColor: string;
};

export function ShirtModel({ texture, baseColor }: Props) {
  const backColor = useMemo(() => new THREE.Color(baseColor).multiplyScalar(0.55), [baseColor]);

  return (
    <group rotation={[0, 0.28, 0]}>
      <mesh>
        <planeGeometry args={[1.45, 1.82]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.62}
          metalness={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[0, Math.PI, 0]} position={[0, 0, -0.018]}>
        <planeGeometry args={[1.45, 1.82]} />
        <meshStandardMaterial color={backColor} roughness={0.85} metalness={0} />
      </mesh>
    </group>
  );
}
