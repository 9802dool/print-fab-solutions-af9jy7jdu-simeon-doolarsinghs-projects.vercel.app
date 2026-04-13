"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";
import { ShirtModel } from "./ShirtModel";

export type ViewPreset = "front" | "angle" | "side";

type Props = {
  texture: THREE.CanvasTexture;
  baseColor: string;
  view: ViewPreset;
};

function CameraRig({ view }: { view: ViewPreset }) {
  const ref = useRef<OrbitControlsType>(null);

  useEffect(() => {
    const o = ref.current;
    if (!o) return;
    if (view === "front") {
      o.setAzimuthalAngle(0);
      o.setPolarAngle(1.22);
    } else if (view === "angle") {
      o.setAzimuthalAngle(0.48);
      o.setPolarAngle(1.16);
    } else {
      o.setAzimuthalAngle(1.02);
      o.setPolarAngle(1.18);
    }
    o.update();
  }, [view]);

  return (
    <OrbitControls
      ref={ref}
      enablePan={false}
      minPolarAngle={Math.PI / 3.2}
      maxPolarAngle={Math.PI / 2.05}
      minDistance={1.85}
      maxDistance={4.5}
    />
  );
}

export function ShirtCanvas({ texture, baseColor, view }: Props) {
  return (
    <div className="relative h-[min(70vh,560px)] w-full min-h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-ink">
      <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-white/15 bg-ink/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-300">
        {view === "front" ? "Front" : view === "angle" ? "3/4 view" : "Side"} · drag to orbit
      </div>
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
        <CameraRig view={view} />
      </Canvas>
    </div>
  );
}
