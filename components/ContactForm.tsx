"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Print Fab quote — ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:hello@printfabsolutions.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-2 w-full rounded-xl border border-white/15 bg-surface/80 px-4 py-3 text-white outline-none ring-accent/0 transition focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-white/15 bg-surface/80 px-4 py-3 text-white outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-300">
            Project details
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Sport, quantities, sizes, artwork status, deadline…"
            className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-surface/80 px-4 py-3 text-white outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-accent py-3.5 text-sm font-bold text-ink shadow-glow transition hover:bg-cyan-300 sm:w-auto sm:px-10"
        >
          Open email draft
        </button>
      </form>
      {sent && (
        <p className="mt-4 text-sm text-accent" role="status">
          If your mail app didn&apos;t open, email hello@printfabsolutions.com directly.
        </p>
      )}
    </>
  );
}
