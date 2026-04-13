import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Sublimation jerseys, shorts & pants, and DTF printing for teams and brands—Print Fab Solutions.",
};

export default function ServicesPage() {
  return (
    <main className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h1 className="font-display text-4xl font-bold text-white">Services</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          End-to-end design support and production for athletic wear and printed merch.
        </p>

        <article id="jerseys" className="mt-16 scroll-mt-24 border-t border-white/10 pt-16">
          <h2 className="font-display text-2xl font-semibold text-white">Sublimation jerseys</h2>
          <p className="mt-4 max-w-3xl text-slate-300">
            Custom patterns, crests, numbers, and sponsor panels printed directly into polyester fabric. Great for
            football, basketball, cycling, and field sports where breathability matters.
          </p>
          <ul className="mt-6 list-inside list-disc space-y-2 text-sm text-muted">
            <li>Men&apos;s, women&apos;s, and youth cuts</li>
            <li>Name/number styles matched to your brand guide</li>
            <li>Optional design mockups and revision rounds</li>
          </ul>
        </article>

        <article id="bottoms" className="mt-16 scroll-mt-24 border-t border-white/10 pt-16">
          <h2 className="font-display text-2xl font-semibold text-white">Shorts &amp; pants</h2>
          <p className="mt-4 max-w-3xl text-slate-300">
            Coordinated sublimated shorts and track pants to complete the kit—elastic waists, pockets, and inseam options
            depending on fabric availability.
          </p>
          <ul className="mt-6 list-inside list-disc space-y-2 text-sm text-muted">
            <li>Match shorts, training shorts, and warm-up pants</li>
            <li>Designed to pair visually with your jersey graphics</li>
          </ul>
        </article>

        <article id="dtf" className="mt-16 scroll-mt-24 border-t border-white/10 pt-16">
          <h2 className="font-display text-2xl font-semibold text-white">DTF (direct-to-film) printing</h2>
          <p className="mt-4 max-w-3xl text-slate-300">
            Vibrant transfers for cotton, blends, and dark garments—ideal when sublimation isn&apos;t suitable or for
            add-on items like cotton tees, tote bags, and hats.
          </p>
          <ul className="mt-6 list-inside list-disc space-y-2 text-sm text-muted">
            <li>Fine detail and gradients on compatible fabrics</li>
            <li>Great for small batches and roster one-offs</li>
            <li>Works alongside sublimated team orders</li>
          </ul>
        </article>

        <div className="mt-16 rounded-2xl border border-white/10 bg-surface/50 p-8 text-center">
          <p className="text-slate-300">Tell us about quantities, deadlines, and artwork status.</p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-accent px-8 py-3 text-sm font-bold text-ink hover:bg-cyan-300"
          >
            Request a quote
          </Link>
        </div>
      </div>
    </main>
  );
}
