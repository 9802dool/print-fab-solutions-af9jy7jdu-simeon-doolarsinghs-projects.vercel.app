import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-surface/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-lg font-bold text-white">Print Fab Solutions</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Custom sublimation team kits and DTF graphics—designed for performance fabrics and bold colour that lasts.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/services#jerseys" className="text-slate-300 hover:text-accent">
                Sublimation jerseys
              </Link>
            </li>
            <li>
              <Link href="/services#bottoms" className="text-slate-300 hover:text-accent">
                Shorts & pants
              </Link>
            </li>
            <li>
              <Link href="/services#dtf" className="text-slate-300 hover:text-accent">
                DTF printing
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</p>
          <p className="mt-4 text-sm text-slate-300">
            <a href="mailto:hello@printfabsolutions.com" className="hover:text-accent">
              hello@printfabsolutions.com
            </a>
          </p>
          <p className="mt-2 text-xs text-muted">Replace with your phone and address in production.</p>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Print Fab Solutions. All rights reserved.
      </div>
    </footer>
  );
}
