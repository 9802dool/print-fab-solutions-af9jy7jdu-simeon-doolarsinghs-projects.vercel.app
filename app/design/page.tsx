import type { Metadata } from "next";
import { DesignStudio } from "@/components/designer/DesignStudio";

export const metadata: Metadata = {
  title: "3D Kit Designer",
  description:
    "Configurator-style kit designer: patterns, colours, logo, and text with 3D preview. Sublimation & DTF — Print Fab Solutions.",
};

export default function DesignPage() {
  return <DesignStudio />;
}
