import Link from "next/link";

const services = [
  {
    title: "Sublimation jerseys",
    desc: "Full-dye jerseys with unlimited colour, gradients, and sponsor placement—no crack, no peel.",
    href: "/services#jerseys",
  },
  {
    title: "Shorts & pants",
    desc: "Matching bottoms for training and match day—breathable fabrics cut for movement.",
    href: "/services#bottoms",
  },
  {
    title: "DTF printing",
    desc: "Direct-to-film transfers for cotton blends, hoodies, bags, and promo items with sharp detail.",
    href: "/services#dtf",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(34, 211, 238, 0.25), transparent), radial-gradient(ellipse 60% 50% at 100% 50%, rgba(249, 115, 22, 0.08), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            Design · Print · Perform
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Sublimation sportswear &amp; DTF—built for teams that move.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            From concept to finished kits: we design and print sublimation jerseys, shorts, and pants, plus high-impact
            DTF graphics for apparel and merch.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-ink shadow-glow transition hover:bg-cyan-300"
            >
              Start a project
            </Link>
            <Link
              href="/services"
              className="inline-flex rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-accent/50 hover:bg-white/5"
            >
              Explore services
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">What we deliver</h2>
          <p className="mt-3 max-w-2xl text-muted">
            One partner for athletic graphics—whether you need a full sublimated kit or DTF transfers for layered looks.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.title}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-surface/50 p-6 transition hover:border-accent/40 hover:shadow-glow"
                >
                  <h3 className="font-display text-xl font-semibold text-white group-hover:text-accent">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.desc}</p>
                  <span className="mt-4 text-sm font-semibold text-accent">Learn more →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:grid-cols-2 sm:items-center sm:px-6 lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Why sublimation for sportswear?</h2>
            <ul className="mt-6 space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
                Ink bonds into the fibre—lightweight, breathable, and colourfast wash after wash.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
                All-over graphics, numbers, and logos without heavy vinyl layers.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
                Ideal for jerseys, shorts, and warm-ups in polyester performance fabrics.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-surface to-ink p-8 sm:p-10">
            <h3 className="font-display text-xl font-semibold text-white">DTF when you need flexibility</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Direct-to-film printing shines on cotton-rich garments, dark bases, and small runs—perfect for hoodies,
              staff tees, and add-on merch alongside your sublimated kits.
            </p>
            <Link href="/services#dtf" className="mt-6 inline-block text-sm font-semibold text-accent hover:text-cyan-300">
              DTF capabilities →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl rounded-3xl border border-accent/20 bg-gradient-to-r from-accent/10 via-transparent to-heat/10 px-6 py-14 text-center sm:px-12">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Ready to kit out your squad?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Share your roster sizes, artwork ideas, and timeline—we&apos;ll help you choose sublimation, DTF, or a mix.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-3.5 text-sm font-bold text-ink transition hover:bg-slate-200"
          >
            Get a quote
          </Link>
        </div>
      </section>
    </main>
  );
}
