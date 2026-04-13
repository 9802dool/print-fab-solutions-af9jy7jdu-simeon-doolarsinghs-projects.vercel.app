export type TeeDesign = {
  baseColor: string;
  text: string;
  textColor: string;
  /** Approximate px for texture canvas */
  textSize: number;
  imageSrc: string | null;
};

export const defaultTeeDesign: TeeDesign = {
  baseColor: "#1e3a5f",
  text: "YOUR TEAM",
  textColor: "#ffffff",
  textSize: 72,
  imageSrc: null,
};
