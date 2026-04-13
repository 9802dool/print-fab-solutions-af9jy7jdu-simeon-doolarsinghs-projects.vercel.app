export type GarmentTemplateId =
  | "basic-tee"
  | "soccer-kit"
  | "cricket"
  | "polo"
  | "pants";

export type TeeDesign = {
  template: GarmentTemplateId;
  baseColor: string;
  text: string;
  textColor: string;
  /** Approximate px for texture canvas */
  textSize: number;
  imageSrc: string | null;
};

export const defaultTeeDesign: TeeDesign = {
  template: "soccer-kit",
  baseColor: "#1e3a5f",
  text: "YOUR TEAM",
  textColor: "#ffffff",
  textSize: 72,
  imageSrc: null,
};
