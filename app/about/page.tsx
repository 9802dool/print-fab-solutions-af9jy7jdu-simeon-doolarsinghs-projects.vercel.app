import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Print Fab Solutions—design and print partner for sublimation sportswear and DTF.",
};

export default function AboutPage() {
  return (
    <main className="border-b border-white/10">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h1 className="font-display text-4xl font-bold text-white">About Print Fab Solutions</h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-300">
          We focus on athletic and team wear: sublimation for performance polyester kits, and DTF for versatile prints
          on mixed fabrics. Our workflow is built around clear proofs, realistic timelines, and print methods that suit
          your roster and budget.
        </p>
        <p className="mt-6 leading-relaxed text-muted">
          Replace this copy with your story—years in business, equipment, certifications, and what makes your shop
          unique for local leagues, schools, and clubs.
        </p>
      </div>
    </main>
  );
}
