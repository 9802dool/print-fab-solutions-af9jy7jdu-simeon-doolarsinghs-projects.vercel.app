import type { Metadata } from "next";
import { DesignStudio } from "@/components/designer/DesignStudio";

export const metadata: Metadata = {
  title: "3D Tee Designer",
  description:
    "Design your own tee mockup—colours, artwork, and text—with a live 3D preview. Print Fab Solutions.",
};

export default function DesignPage() {
  return <DesignStudio />;
}
