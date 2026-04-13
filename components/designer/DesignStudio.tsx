"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import { GARMENT_TEMPLATES } from "@/lib/garment-templates";
import { KIT_COLOR_PALETTE } from "@/lib/kit-palette";
import { KIT_PATTERNS, type KitPatternId } from "@/lib/kit-patterns";
import {
  defaultTeeDesign,
  type GarmentTemplateId,
  type TeeDesign,
} from "@/lib/tee-design";
import type { ViewPreset } from "./ShirtCanvas";
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
  const [template, setTemplate] = useState<GarmentTemplateId>(defaultTeeDesign.template);
  const [patternId, setPatternId] = useState<KitPatternId>(defaultTeeDesign.patternId);
  const [baseColor, setBaseColor] = useState(defaultTeeDesign.baseColor);
  const [accentColor, setAccentColor] = useState(defaultTeeDesign.accentColor);
  const [text, setText] = useState(defaultTeeDesign.text);
  const [textColor, setTextColor] = useState(defaultTeeDesign.textColor);
  const [textSize, setTextSize] = useState(defaultTeeDesign.textSize);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [view, setView] = useState<ViewPreset>("front");
  const blobRef = useRef<string | null>(null);

  const design: TeeDesign = useMemo(
    () => ({
      template,
      patternId,
      baseColor,
      accentColor,
      text,
      textColor,
      textSize,
      imageSrc,
    }),
    [template, patternId, baseColor, accentColor, text, textColor, textSize, imageSrc],
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
    a.download = `print-fab-${template}-${patternId}.png`;
    a.click();
  }, [texture, template, patternId]);

  return (
    <main className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              3D configurator · inspired workflow
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
              Design your kit
            </h1>
            <p className="mt-2 max-w-2xl text-muted">
              Pick a garment block, a base pattern, and colours—then add your crest and text. Rotate the mockup like a
              product page configurator; export a flat PNG to share with Print Fab for sublimation or DTF.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-2 inline-flex shrink-0 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 sm:mt-0"
          >
            Request a quote →
          </Link>
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-surface/30 px-4 py-3 text-sm text-slate-300 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <span>
            <strong className="text-white">Print-ready support:</strong> names, numbers, logos &amp; layout checks—tell
            us your roster on the quote.
          </span>
          <span className="mt-2 block text-xs text-muted sm:mt-0">
            Reference: multi-step configurators like{" "}
            <a
              href="https://www.spized.com/en/football-products/rio-men-s-football-jersey/781001-v2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-2 hover:underline"
            >
              Spized&apos;s jersey customiser
            </a>{" "}
            (independent workflow—not affiliated).
          </span>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            {texture ? (
              <ShirtCanvas texture={texture} baseColor={baseColor} view={view} />
            ) : (
              <div className="flex h-[min(70vh,560px)] min-h-[320px] items-center justify-center rounded-2xl border border-white/10 bg-surface/50 text-muted">
                Preparing texture…
              </div>
            )}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <span className="w-full text-center text-xs text-muted sm:w-auto sm:pr-2">Saved views:</span>
              {(
                [
                  ["front", "Front"],
                  ["angle", "3/4"],
                  ["side", "Side"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setView(id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    view === id
                      ? "bg-accent text-ink"
                      : "border border-white/15 bg-ink/60 text-slate-300 hover:border-accent/40"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <aside className="space-y-6 rounded-2xl border border-white/10 bg-surface/40 p-5 sm:p-6">
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">1 · Garment</h2>
              <label className="sr-only" htmlFor="template">
                Garment template
              </label>
              <select
                id="template"
                value={template}
                onChange={(e) => setTemplate(e.target.value as GarmentTemplateId)}
                className="mt-2 w-full rounded-lg border border-white/15 bg-ink px-3 py-2.5 text-sm text-white outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
              >
                {GARMENT_TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {GARMENT_TEMPLATES.find((t) => t.id === template)?.description}
              </p>
            </section>

            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">2 · Base pattern</h2>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {KIT_PATTERNS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPatternId(p.id)}
                    title={p.description}
                    className={`rounded-lg border px-2 py-2 text-left text-xs font-medium transition ${
                      patternId === p.id
                        ? "border-accent bg-accent/15 text-white ring-1 ring-accent/50"
                        : "border-white/10 bg-ink/50 text-slate-300 hover:border-white/25"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">3 · Colours</h2>
              <p className="mt-1 text-xs text-muted">Tap a swatch for the main field colour. Use accent for stripes.</p>
              <div className="mt-3 grid grid-cols-8 gap-1.5">
                {KIT_COLOR_PALETTE.map((s) => (
                  <button
                    key={s.hex}
                    type="button"
                    title={s.name}
                    onClick={() => setBaseColor(s.hex)}
                    className={`aspect-square rounded-md border-2 transition ${
                      baseColor.toLowerCase() === s.hex.toLowerCase()
                        ? "border-accent ring-2 ring-accent/40"
                        : "border-white/10 hover:border-white/30"
                    }`}
                    style={{ backgroundColor: s.hex }}
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div>
                  <label className="text-[11px] text-slate-500" htmlFor="base-hex">
                    Main (custom)
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      id="base-hex"
                      type="color"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="h-9 w-12 cursor-pointer rounded border border-white/20 bg-transparent"
                    />
                    <input
                      type="text"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="w-24 rounded border border-white/15 bg-ink px-2 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-slate-500" htmlFor="accent-hex">
                    Accent
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      id="accent-hex"
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="h-9 w-12 cursor-pointer rounded border border-white/20 bg-transparent"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-24 rounded border border-white/15 bg-ink px-2 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">4 · Logo &amp; text</h2>
              <label className="mt-2 block text-[11px] text-slate-500" htmlFor="art">
                Logo / artwork
              </label>
              <input
                id="art"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="mt-1 block w-full text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-accent file:px-3 file:py-2 file:text-sm file:font-semibold file:text-ink"
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
              <label className="mt-4 block text-[11px] text-slate-500" htmlFor="tee-text">
                Text
              </label>
              <input
                id="tee-text"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={40}
                className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-white"
              />
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-500" htmlFor="tc">
                    Text colour
                  </label>
                  <input
                    id="tc"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="mt-1 h-9 w-full cursor-pointer rounded border border-white/20"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500" htmlFor="ts">
                    Size ({textSize}px)
                  </label>
                  <input
                    id="ts"
                    type="range"
                    min={40}
                    max={120}
                    value={textSize}
                    onChange={(e) => setTextSize(Number(e.target.value))}
                    className="mt-2 w-full accent-accent"
                  />
                </div>
              </div>
            </section>

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
                Flat export for approval—final print files may include bleed and colour separation from Print Fab.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
