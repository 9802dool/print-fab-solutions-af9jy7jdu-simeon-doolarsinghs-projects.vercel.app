import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a quote for sublimation sportswear and DTF printing—Print Fab Solutions.",
};

export default function ContactPage() {
  return (
    <main className="border-b border-white/10">
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h1 className="font-display text-4xl font-bold text-white">Contact</h1>
        <p className="mt-4 text-muted">
          Share your project details—we&apos;ll follow up by email. Update the mailto address in{" "}
          <code className="rounded bg-white/10 px-1 text-xs text-accent">components/ContactForm.tsx</code> and{" "}
          <code className="rounded bg-white/10 px-1 text-xs text-accent">SiteFooter.tsx</code>.
        </p>
        <ContactForm />
      </div>
    </main>
  );
}
