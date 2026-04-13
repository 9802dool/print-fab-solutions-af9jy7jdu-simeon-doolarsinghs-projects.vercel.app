import Link from "next/link";

const nav = [
  { href: "/design", label: "3D designer" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex flex-col">
          <span className="font-display text-xl font-bold tracking-tight text-white transition group-hover:text-accent sm:text-2xl">
            Print Fab Solutions
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Sublimation · DTF · Sportswear
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-1 rounded-full bg-accent px-4 py-2 text-sm font-bold text-ink shadow-glow transition hover:bg-cyan-300"
          >
            Get a quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
