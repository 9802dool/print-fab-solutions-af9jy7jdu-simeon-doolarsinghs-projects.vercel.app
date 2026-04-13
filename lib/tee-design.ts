import type { KitPatternId } from "./kit-patterns";

export type GarmentTemplateId =
  | "basic-tee"
  | "soccer-kit"
  | "cricket"
  | "polo"
  | "pants";

export type TeeDesign = {
  template: GarmentTemplateId;
  /** Base kit graphic (stripes, sash, etc.) */
  patternId: KitPatternId;
  baseColor: string;
  /** Second colour for stripes / panels / fade */
  accentColor: string;
  text: string;
  textColor: string;
  /** Approximate px for texture canvas */
  textSize: number;
  imageSrc: string | null;
};

export const defaultTeeDesign: TeeDesign = {
  template: "soccer-kit",
  patternId: "vertical-stripes",
  baseColor: "#1e3a5f",
  accentColor: "#ffffff",
  text: "YOUR TEAM",
  textColor: "#ffffff",
  textSize: 72,
  imageSrc: null,
};
