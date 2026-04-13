"use client";

import { Canvas } from "@react-three/fiber";
import { Center, ContactShadows, Environment, Float, OrbitControls } from "@react-three/drei";
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
    o.target.set(0, 0.14, 0);
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
      minDistance={1.75}
      maxDistance={4.75}
      enableDamping
      dampingFactor={0.08}
    />
  );
}

export function ShirtCanvas({ texture, baseColor, template, view }: Props) {
  return (
    <div
      className="relative h-[min(72vh,620px)] w-full min-h-[320px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)] ring-1 ring-white/[0.06]"
      style={{
        background:
          "radial-gradient(ellipse 85% 65% at 50% 42%, rgba(51, 65, 85, 0.35) 0%, #070a0f 58%, #040608 100%)",
      }}
    >
      <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-white/15 bg-ink/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-300 backdrop-blur-sm">
        {view === "front" ? "Front" : view === "angle" ? "3/4 view" : "Side"} · drag to orbit
      </div>
      <Canvas
        shadows
        camera={{ position: [0, 0.22, 2.55], fov: 38 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#070a0f"]} />
        <hemisphereLight intensity={0.45} color="#f8fafc" groundColor="#0c1016" />
        <ambientLight intensity={0.26} />
        <directionalLight
          position={[5.5, 9, 6.2]}
          intensity={1.08}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={0.4}
          shadow-camera-far={22}
          shadow-camera-left={-4.5}
          shadow-camera-right={4.5}
          shadow-camera-top={4.5}
          shadow-camera-bottom={-4.5}
          shadow-bias={-0.00015}
        />
        <directionalLight position={[-4.2, 3.2, -3.5]} intensity={0.34} color="#c7e8ff" />
        <spotLight
          position={[-2.8, 3.6, 2.4]}
          intensity={0.48}
          angle={0.55}
          penumbra={0.85}
          decay={2}
          distance={18}
          color="#fff7ed"
        />
        {/* Studio floor — product-style stage (concept similar to e‑commerce 3D viewers). */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#0c1018" roughness={0.98} metalness={0} />
        </mesh>
        <Center bottom>
          <Float
            speed={1.65}
            rotationIntensity={0.1}
            floatIntensity={0.07}
            floatingRange={[-0.025, 0.025]}
          >
            <ShirtModel texture={texture} baseColor={baseColor} template={template} />
          </Float>
        </Center>
        <ContactShadows opacity={0.42} scale={13} blur={2.4} far={5} color="#000000" position={[0, 0.005, 0]} />
        <Environment preset="studio" />
        <CameraRig view={view} />
      </Canvas>
    </div>
  );
}
