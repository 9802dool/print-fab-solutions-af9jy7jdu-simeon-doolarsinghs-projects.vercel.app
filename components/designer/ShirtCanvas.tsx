"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { ShirtModel } from "./ShirtModel";

type Props = {
  texture: THREE.CanvasTexture;
  baseColor: string;
};

export function ShirtCanvas({ texture, baseColor }: Props) {
  return (
    <div className="h-[min(70vh,560px)] w-full min-h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-ink">
      <Canvas
        camera={{ position: [0, 0.15, 2.65], fov: 42 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0a0e14"]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 8, 6]} intensity={1.15} castShadow />
        <directionalLight position={[-4, 3, -3]} intensity={0.35} color="#a5f3fc" />
        <ShirtModel texture={texture} baseColor={baseColor} />
        <ContactShadows opacity={0.5} scale={14} blur={2.2} far={5} color="#000000" />
        <Environment preset="city" />
        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 2.05}
          minDistance={1.85}
          maxDistance={4.5}
        />
      </Canvas>
    </div>
  );
}
