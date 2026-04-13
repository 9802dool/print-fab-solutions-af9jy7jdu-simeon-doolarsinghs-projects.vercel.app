"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";
import type { GarmentTemplateId } from "@/lib/tee-design";
import { ShirtModel } from "./ShirtModel";

export type ViewPreset = "front" | "angle" | "side";

type Props = {
  texture: THREE.CanvasTexture;
  baseColor: string;
  template: GarmentTemplateId;
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

export function ShirtCanvas({ texture, baseColor, template, view }: Props) {
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
        <hemisphereLight intensity={0.42} color="#f4f4f5" groundColor="#0f1419" />
        <ambientLight intensity={0.28} />
        <directionalLight position={[5.5, 8.5, 6]} intensity={1.05} castShadow shadow-mapSize={[2048, 2048]} />
        <directionalLight position={[-4.2, 3.2, -3.5]} intensity={0.32} color="#c7e8ff" />
        <spotLight
          position={[-2.8, 3.6, 2.4]}
          intensity={0.45}
          angle={0.55}
          penumbra={0.85}
          decay={2}
          distance={18}
          color="#fff7ed"
        />
        <ShirtModel texture={texture} baseColor={baseColor} template={template} />
        <ContactShadows opacity={0.5} scale={14} blur={2.2} far={5} color="#000000" />
        <Environment preset="studio" />
        <CameraRig view={view} />
      </Canvas>
    </div>
  );
}
