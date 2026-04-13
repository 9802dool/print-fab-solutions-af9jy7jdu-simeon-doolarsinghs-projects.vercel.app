"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import { defaultTeeDesign, type TeeDesign } from "@/lib/tee-design";
import { useDesignTexture } from "./useDesignTexture";

const ShirtCanvas = dynamic(
  () => import("./ShirtCanvas").then((m) => ({ default: m.ShirtCanvas })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(70vh,560px)] min-h-[320px] items-center justify-center rounded-2xl border border-white/10 bg-surface/80 text-sm text-muted">
        Loading 3D preview…
      </div>
    ),
  },
);

export function DesignStudio() {
  const [baseColor, setBaseColor] = useState(defaultTeeDesign.baseColor);
  const [text, setText] = useState(defaultTeeDesign.text);
  const [textColor, setTextColor] = useState(defaultTeeDesign.textColor);
  const [textSize, setTextSize] = useState(defaultTeeDesign.textSize);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const blobRef = useRef<string | null>(null);

  const design: TeeDesign = useMemo(
    () => ({
      baseColor,
      text,
      textColor,
      textSize,
      imageSrc,
    }),
    [baseColor, text, textColor, textSize, imageSrc],
  );

  const texture = useDesignTexture(design);

  const onImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (blobRef.current) {
      URL.revokeObjectURL(blobRef.current);
      blobRef.current = null;
    }
    if (!file || !file.type.startsWith("image/")) {
      setImageSrc(null);
      return;
    }
    const url = URL.createObjectURL(file);
    blobRef.current = url;
    setImageSrc(url);
  }, []);

  const clearImage = useCallback(() => {
    if (blobRef.current) {
      URL.revokeObjectURL(blobRef.current);
      blobRef.current = null;
    }
    setImageSrc(null);
  }, []);

  const downloadPng = useCallback(() => {
    if (!texture?.image) return;
    const canvas = texture.image as HTMLCanvasElement;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "print-fab-tee-design.png";
    a.click();
  }, [texture]);

  return (
    <main className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">3D tee designer</h1>
            <p className="mt-2 max-w-xl text-muted">
              Pick colours, add your logo or artwork, and set team text—then spin the mockup to preview before you
              order sublimation or DTF with Print Fab.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-2 inline-flex shrink-0 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 sm:mt-0"
          >
            Request a quote →
          </Link>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            {texture ? (
              <ShirtCanvas texture={texture} baseColor={baseColor} />
            ) : (
              <div className="flex h-[min(70vh,560px)] min-h-[320px] items-center justify-center rounded-2xl border border-white/10 bg-surface/50 text-muted">
                Preparing texture…
              </div>
            )}
            <p className="mt-3 text-center text-xs text-muted">Drag to rotate · scroll to zoom</p>
          </div>

          <aside className="space-y-6 rounded-2xl border border-white/10 bg-surface/40 p-5 sm:p-6">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500" htmlFor="base">
                Shirt base colour
              </label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  id="base"
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="h-11 w-14 cursor-pointer rounded border border-white/20 bg-transparent"
                />
                <input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1 rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-white"
                  aria-label="Base colour hex"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500" htmlFor="art">
                Logo / artwork (PNG, JPG, WebP)
              </label>
              <input
                id="art"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="mt-2 block w-full text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-accent file:px-3 file:py-2 file:text-sm file:font-semibold file:text-ink"
              />
              {imageSrc && (
                <button
                  type="button"
                  onClick={clearImage}
                  className="mt-2 text-xs font-semibold text-accent hover:text-cyan-300"
                >
                  Remove image
                </button>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500" htmlFor="tee-text">
                Text on shirt
              </label>
              <input
                id="tee-text"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={40}
                className="mt-2 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500" htmlFor="tc">
                  Text colour
                </label>
                <input
                  id="tc"
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="mt-2 h-11 w-full cursor-pointer rounded border border-white/20 bg-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500" htmlFor="ts">
                  Text size
                </label>
                <input
                  id="ts"
                  type="range"
                  min={40}
                  max={120}
                  value={textSize}
                  onChange={(e) => setTextSize(Number(e.target.value))}
                  className="mt-3 w-full accent-accent"
                />
                <span className="text-xs text-muted">{textSize}px</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={downloadPng}
                disabled={!texture}
                className="rounded-full bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download flat design (PNG)
              </button>
              <p className="text-xs leading-relaxed text-muted">
                Export is a flat layout preview for sharing—production files for sublimation/DTF may need bleed and
                colour profiles from our team.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
